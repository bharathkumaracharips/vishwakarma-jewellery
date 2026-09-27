use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserDocument {
    pub id: String,
    pub name: String,
    pub email: String,
    pub phone: String,
    pub role: String, // "customer", "goldsmith", "retailer"
    pub city: String,
    #[serde(default)]
    pub workshop_name: Option<String>,
    #[serde(default)]
    pub specialization: Option<String>,
    #[serde(default)]
    pub company_name: Option<String>,
    #[serde(default)]
    pub gstin: Option<String>,
    #[serde(default)]
    pub vault_balance_grams: Option<f64>,
    #[serde(default)]
    pub registered_passports_count: Option<u32>,
    #[serde(default)]
    pub active_orders_count: Option<u32>,
    #[serde(default)]
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OtpRecord {
    pub identifier: String,
    pub code: String,
    pub expires_at: i64,
    pub verified: bool,
}

#[derive(Debug, Deserialize)]
pub struct SendOtpRequest {
    pub identifier: String,
}

#[derive(Debug, Deserialize)]
pub struct LoginOtpRequest {
    pub identifier: String,
    pub otp: String,
}

#[derive(Debug, Deserialize)]
pub struct RegisterRequest {
    pub name: String,
    pub email: String,
    pub phone: String,
    pub role: String,
    pub city: String,
    pub otp: String,
    pub workshop_name: Option<String>,
    pub specialization: Option<String>,
    pub company_name: Option<String>,
    pub gstin: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct TrackEventRequest {
    pub user_id: Option<String>,
    pub product_id: String,
    pub product_name: Option<String>,
    pub event: String,
}
