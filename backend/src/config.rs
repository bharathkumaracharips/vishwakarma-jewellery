use std::env;

#[derive(Debug, Clone)]
pub struct AppConfig {
    pub port: u16,
    pub mongo_uri: String,
    pub db_name: String,
}

impl AppConfig {
    pub fn from_env() -> Self {
        let port = env::var("PORT")
            .ok()
            .and_then(|p| p.parse().ok())
            .unwrap_or(8080);

        let mongo_uri = env::var("MONGODB_URI")
            .unwrap_or_else(|_| "mongodb://127.0.0.1:27017".to_string());

        let db_name = env::var("MONGODB_DATABASE")
            .unwrap_or_else(|_| "vishwakarma_jewelers".to_string());

        Self {
            port,
            mongo_uri,
            db_name,
        }
    }
}
