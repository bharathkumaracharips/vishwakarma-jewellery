pub mod auth;
pub mod bullion;
pub mod health;

use crate::state::EngineState;
use axum::{
    http::{header, Method},
    routing::{get, post},
    Router,
};
use std::sync::Arc;
use tower_http::cors::{Any, CorsLayer};

pub fn create_router(shared_state: Arc<EngineState>) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([header::CONTENT_TYPE, header::ACCEPT, header::AUTHORIZATION]);

    Router::new()
        // Health & Diagnostics
        .route("/health", get(health::health_check))
        // Bullion & Market Data Endpoints
        .route("/api/rates", get(bullion::get_current_rates))
        .route("/api/rates/sse", get(bullion::sse_rates_stream))
        .route("/api/rates/history", get(bullion::get_rates_history))
        // Passwordless OTP Authentication & MongoDB Endpoints
        .route("/api/auth/send-otp", post(auth::send_otp_handler))
        .route("/api/auth/login-otp", post(auth::login_otp_handler))
        .route("/api/auth/register", post(auth::register_handler))
        .route("/api/auth/profile", get(auth::profile_handler))
        .route("/api/auth/track-event", post(auth::track_event_handler))
        .layer(cors)
        .with_state(shared_state)
}
