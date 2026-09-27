use crate::state::EngineState;
use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use std::sync::Arc;

pub async fn health_check(State(state): State<Arc<EngineState>>) -> impl IntoResponse {
    let tick_lock = state.current_tick.read().await;
    match *tick_lock {
        Some(ref tick) => (
            StatusCode::OK,
            Json(serde_json::json!({
                "status": "healthy",
                "source": tick.source,
                "selected_city": tick.selected_city,
                "gold24k": tick.gold24k,
                "gold22k": tick.gold22k,
                "cities_count": tick.cities.len(),
                "last_updated": tick.last_updated,
                "mongodb": state.mongo_db.is_some(),
            })),
        ),
        None => (
            StatusCode::SERVICE_UNAVAILABLE,
            Json(serde_json::json!({
                "status": "initializing",
                "message": "Connecting to live market feeds (Zero hardcoded fallbacks)..."
            })),
        ),
    }
}
