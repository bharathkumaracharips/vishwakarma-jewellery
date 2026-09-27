mod config;
mod db;
mod models;
mod routes;
mod services;
mod state;

use config::AppConfig;
use db::init_mongodb;
use routes::create_router;
use services::{fetch_all_live_market_data, start_real_market_ingestion_loop};
use state::EngineState;

use std::{
    collections::{HashMap, VecDeque},
    net::SocketAddr,
    sync::Arc,
    time::Duration,
};
use tokio::sync::{broadcast, RwLock};

#[tokio::main]
async fn main() {
    println!("🦀 Initializing Vishwakarma Real-Time Rust Bullion & Auth Engine...");
    println!("   └─ Strict Policy: ZERO hardcoded rates. Dynamic live ingestion only.");

    let config = AppConfig::from_env();
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(12))
        .build()
        .unwrap_or_default();

    println!("📡 Ingesting live market ground truth from official feeds...");

    // Retry loop on boot until live market data is successfully retrieved
    let mut initial_tick = None;
    for attempt in 1..=5 {
        if let Some(tick) = fetch_all_live_market_data(&client).await {
            println!(
                "✅ Live Market Connected! Bangalore 24K: ₹{}/g | 22K: ₹{}/g | 18K: ₹{}/g ({} cities ingested)",
                tick.gold24k,
                tick.gold22k,
                tick.gold18k,
                tick.cities.len()
            );
            initial_tick = Some(tick);
            break;
        }
        eprintln!(
            "⚠️ [Attempt {}/5] Connecting to live bullion feeds... retrying in 2s",
            attempt
        );
        tokio::time::sleep(Duration::from_secs(2)).await;
    }

    let (tx, _rx) = broadcast::channel(100);
    let mut history_deque = VecDeque::with_capacity(60);

    if let Some(ref tick) = initial_tick {
        history_deque.push_back(tick.clone());
    }

    // Initialize MongoDB connection and seed verified demo profiles
    let (mongo_db, initial_users) = init_mongodb(&config.mongo_uri, &config.db_name).await;

    let shared_state = Arc::new(EngineState {
        current_tick: RwLock::new(initial_tick),
        history: RwLock::new(history_deque),
        broadcaster: tx.clone(),
        mongo_db,
        local_users: RwLock::new(initial_users),
        local_otps: RwLock::new(HashMap::new()),
    });

    // Spawn continuous live market ingestion background worker
    let background_state = Arc::clone(&shared_state);
    tokio::spawn(async move {
        start_real_market_ingestion_loop(background_state).await;
    });

    // Assemble modular router with health, bullion, and auth endpoints
    let app = create_router(shared_state);

    let addr = SocketAddr::from(([0, 0, 0, 0], config.port));
    println!("🚀 Real Bullion & Auth Engine listening on http://127.0.0.1:{}", config.port);
    println!("   └─ Verified Live Rates: http://127.0.0.1:{}/api/rates", config.port);
    println!("   └─ Auth OTP Endpoints:  http://127.0.0.1:{}/api/auth/send-otp", config.port);
    println!("   └─ Interaction Tracker: http://127.0.0.1:{}/api/auth/track-event", config.port);

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("Failed to bind TCP listener on port 8080");

    axum::serve(listener, app)
        .await
        .expect("Axum server crashed");
}
