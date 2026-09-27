use crate::models::{LoginOtpRequest, OtpRecord, RegisterRequest, TrackEventRequest, UserDocument};
use crate::state::EngineState;
use chrono::Utc;
use mongodb::{
    bson::{doc, Document},
    Collection,
};
use std::sync::Arc;

pub struct AuthService;

impl AuthService {
    /// Generates a cryptographic 6-digit OTP and persists it in memory and MongoDB
    pub async fn send_otp(state: &Arc<EngineState>, identifier: &str) -> (bool, String, String) {
        let clean = identifier.trim().to_string();
        let code: u32 = rand::random::<u32>() % 900000 + 100000;
        let code_str = code.to_string();
        let expires_at = Utc::now().timestamp() + 300;

        let record = OtpRecord {
            identifier: clean.clone(),
            code: code_str.clone(),
            expires_at,
            verified: false,
        };

        // Save in memory cache
        {
            let mut otps = state.local_otps.write().await;
            otps.insert(clean.clone(), record);
        }

        // Save in MongoDB if connected
        if let Some(ref db) = state.mongo_db {
            let coll: Collection<Document> = db.collection("otps");
            let doc = doc! {
                "identifier": &clean,
                "code": &code_str,
                "expires_at": expires_at,
                "verified": false,
                "created_at": Utc::now().to_rfc3339(),
            };
            let _ = coll.insert_one(doc).await;
        }

        println!("🔑 [Auth Service] Generated OTP {} for {}", code_str, clean);
        (true, format!("One-time passcode dispatched to {}", clean), code_str)
    }

    /// Verifies OTP and retrieves the corresponding user document
    pub async fn login_with_otp(
        state: &Arc<EngineState>,
        payload: &LoginOtpRequest,
    ) -> Result<UserDocument, String> {
        let identifier = payload.identifier.trim().to_lowercase();
        let entered_otp = payload.otp.trim();

        // Check OTP validity
        let is_valid = {
            let mut otps = state.local_otps.write().await;
            if let Some(rec) = otps.get_mut(&identifier) {
                if (rec.code == entered_otp || entered_otp == "482916")
                    && Utc::now().timestamp() <= rec.expires_at
                {
                    rec.verified = true;
                    true
                } else if entered_otp == "482916" {
                    true
                } else {
                    false
                }
            } else if entered_otp == "482916" {
                true
            } else {
                false
            }
        };

        if !is_valid {
            return Err("Invalid or expired OTP code. Use 482916 for instant demo access.".to_string());
        }

        // Query user in MongoDB
        if let Some(ref db) = state.mongo_db {
            let coll: Collection<Document> = db.collection("users");
            let filter = doc! {
                "$or": [
                    { "email": &identifier },
                    { "phone": &identifier },
                    { "phone": format!("+91 {}", identifier.trim_start_matches("+91").trim()) }
                ]
            };
            if let Ok(Some(doc)) = coll.find_one(filter).await {
                if let Ok(u) = mongodb::bson::from_document::<UserDocument>(doc) {
                    return Ok(u);
                }
            }
        }

        // Fallback query in local in-memory store
        let users = state.local_users.read().await;
        for u in users.values() {
            if u.email.to_lowercase() == identifier
                || u.phone.contains(&identifier)
                || identifier.contains(&u.phone.replace(' ', "").replace("+91", ""))
            {
                return Ok(u.clone());
            }
        }

        Err("NOT_REGISTERED".to_string())
    }

    /// Validates mandatory mobile and email fields, verifies OTP, and inserts user into MongoDB
    pub async fn register_user(
        state: &Arc<EngineState>,
        payload: &RegisterRequest,
    ) -> Result<UserDocument, String> {
        let name = payload.name.trim().to_string();
        let email = payload.email.trim().to_lowercase();
        let phone = payload.phone.trim().to_string();
        let role = payload.role.trim().to_string();
        let city = payload.city.trim().to_string();
        let entered_otp = payload.otp.trim();

        if name.is_empty() || email.is_empty() || phone.is_empty() {
            return Err("Full Name, Mobile Number (+91), and Email Address are all mandatory for registration.".to_string());
        }

        // Verify OTP
        let is_valid = entered_otp == "482916" || {
            let otps = state.local_otps.read().await;
            otps.get(&phone).map(|r| r.code == entered_otp).unwrap_or(false)
                || otps.get(&email).map(|r| r.code == entered_otp).unwrap_or(false)
        };

        if !is_valid {
            return Err("Invalid OTP code. Please enter the code sent or demo code 482916.".to_string());
        }

        let user_id = format!("usr_{}", Utc::now().timestamp_millis());
        let formatted_phone = if phone.starts_with("+91") {
            phone
        } else {
            format!("+91 {}", phone)
        };

        let user_doc = UserDocument {
            id: user_id.clone(),
            name,
            email: email.clone(),
            phone: formatted_phone,
            role: if role.is_empty() { "customer".to_string() } else { role },
            city: if city.is_empty() { "Bangalore".to_string() } else { city },
            workshop_name: payload.workshop_name.clone(),
            specialization: payload.specialization.clone(),
            company_name: payload.company_name.clone(),
            gstin: payload.gstin.clone(),
            vault_balance_grams: Some(0.0),
            registered_passports_count: Some(0),
            active_orders_count: Some(0),
            created_at: Utc::now().to_rfc3339(),
        };

        // Cache in memory
        {
            let mut users = state.local_users.write().await;
            users.insert(user_id.clone(), user_doc.clone());
        }

        // Persist in MongoDB
        if let Some(ref db) = state.mongo_db {
            let coll: Collection<Document> = db.collection("users");
            if let Ok(bdoc) = mongodb::bson::to_document(&user_doc) {
                let _ = coll.insert_one(bdoc).await;
                println!("🍃 [MongoDB] User saved into 'users' collection: {}", user_doc.name);
            }
        }

        Ok(user_doc)
    }

    /// Logs an interaction event into MongoDB
    pub async fn track_interaction(state: &Arc<EngineState>, payload: &TrackEventRequest) {
        let timestamp = Utc::now().to_rfc3339();
        println!(
            "👁️ [Interaction Tracker] User: {:?} | Product: {} | Event: {}",
            payload.user_id, payload.product_id, payload.event
        );

        if let Some(ref db) = state.mongo_db {
            let coll: Collection<Document> = db.collection("interactions");
            let doc = doc! {
                "user_id": &payload.user_id,
                "product_id": &payload.product_id,
                "product_name": &payload.product_name,
                "event": &payload.event,
                "timestamp": timestamp,
            };
            let _ = coll.insert_one(doc).await;
        }
    }
}
