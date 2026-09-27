use crate::models::UserDocument;
use chrono::Utc;
use mongodb::{
    bson::{doc, Document},
    options::{ClientOptions, UpdateOptions},
    Client as MongoClient, Collection, Database,
};
use std::collections::HashMap;

pub async fn init_mongodb(mongo_uri: &str, db_name: &str) -> (Option<Database>, HashMap<String, UserDocument>) {
    println!("🍃 Connecting to MongoDB at {}", mongo_uri);

    let mongo_db = match ClientOptions::parse(mongo_uri).await {
        Ok(options) => match MongoClient::with_options(options) {
            Ok(client) => {
                println!("✅ MongoDB Connected successfully! Database: {}", db_name);
                Some(client.database(db_name))
            }
            Err(e) => {
                eprintln!("⚠️ MongoDB client error: {}. Running with persistent in-memory store.", e);
                None
            }
        },
        Err(e) => {
            eprintln!("⚠️ MongoDB URI parse error: {}. Running with persistent in-memory store.", e);
            None
        }
    };

    // Prepopulate initial demo profiles (Patron, Goldsmith, Retailer)
    let mut initial_users = HashMap::new();
    let demo_patron = UserDocument {
        id: "usr_patron_01".to_string(),
        name: "Priya Sharma".to_string(),
        email: "priya.sharma@heritage.in".to_string(),
        phone: "+91 98450 12345".to_string(),
        role: "customer".to_string(),
        city: "Bangalore".to_string(),
        workshop_name: None,
        specialization: None,
        company_name: None,
        gstin: None,
        vault_balance_grams: Some(14.85),
        registered_passports_count: Some(3),
        active_orders_count: Some(1),
        created_at: Utc::now().to_rfc3339(),
    };
    let demo_goldsmith = UserDocument {
        id: "usr_goldsmith_01".to_string(),
        name: "Achari Ramanathan".to_string(),
        email: "ramanathan@vishwakarmaguild.in".to_string(),
        phone: "+91 94480 67890".to_string(),
        role: "goldsmith".to_string(),
        city: "Bangalore".to_string(),
        workshop_name: Some("Achari Heritage Goldsmiths (Est. 1954)".to_string()),
        specialization: Some("Temple Nakshi & Kundan".to_string()),
        company_name: None,
        gstin: None,
        vault_balance_grams: None,
        registered_passports_count: None,
        active_orders_count: Some(4),
        created_at: Utc::now().to_rfc3339(),
    };
    let demo_retailer = UserDocument {
        id: "usr_retailer_01".to_string(),
        name: "Suresh Rao".to_string(),
        email: "procurement@kalyanvault.com".to_string(),
        phone: "+91 99001 54321".to_string(),
        role: "retailer".to_string(),
        city: "Bangalore".to_string(),
        workshop_name: None,
        specialization: None,
        company_name: Some("Kalyan Heritage Vault Ltd".to_string()),
        gstin: Some("29AABCU9603R1ZM".to_string()),
        vault_balance_grams: None,
        registered_passports_count: None,
        active_orders_count: Some(2),
        created_at: Utc::now().to_rfc3339(),
    };

    initial_users.insert(demo_patron.id.clone(), demo_patron.clone());
    initial_users.insert(demo_goldsmith.id.clone(), demo_goldsmith.clone());
    initial_users.insert(demo_retailer.id.clone(), demo_retailer.clone());

    // Upsert demo profiles into MongoDB 'users' collection
    if let Some(ref db) = mongo_db {
        let coll: Collection<Document> = db.collection("users");
        for user in [&demo_patron, &demo_goldsmith, &demo_retailer] {
            if let Ok(bdoc) = mongodb::bson::to_document(user) {
                let filter = doc! { "id": &user.id };
                let update = doc! { "$setOnInsert": bdoc };
                let options = UpdateOptions::builder().upsert(true).build();
                let _ = coll.update_one(filter, update).with_options(options).await;
            }
        }
        println!("🍃 Seeded verified demo profiles into MongoDB 'users' collection.");
    }

    (mongo_db, initial_users)
}
