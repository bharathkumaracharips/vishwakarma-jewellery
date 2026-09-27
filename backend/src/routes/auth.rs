use crate::models::{LoginOtpRequest, RegisterRequest, SendOtpRequest, TrackEventRequest, UserDocument};
use crate::services::AuthService;
use crate::state::EngineState;
use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use mongodb::bson::doc;
use std::{collections::HashMap, sync::Arc};

/// POST /api/auth/send-otp
pub async fn send_otp_handler(
    State(state): State<Arc<EngineState>>,
    Json(payload): Json<SendOtpRequest>,
) -> impl IntoResponse {
    let clean = payload.identifier.trim();
    if clean.is_empty() {
        return (
            StatusCode::BAD_REQUEST,
            Json(serde_json::json!({
                "success": false,
                "message": "Please provide a valid mobile number or email address."
            })),
        );
    }

    let (success, message, code) = AuthService::send_otp(&state, clean).await;

    (
        StatusCode::OK,
        Json(serde_json::json!({
            "success": success,
            "message": message,
            "test_otp": code,
            "expires_in_seconds": 300
        })),
    )
}

/// POST /api/auth/login-otp
pub async fn login_otp_handler(
    State(state): State<Arc<EngineState>>,
    Json(payload): Json<LoginOtpRequest>,
) -> impl IntoResponse {
    match AuthService::login_with_otp(&state, &payload).await {
        Ok(user) => (
            StatusCode::OK,
            Json(serde_json::json!({
                "success": true,
                "message": format!("Welcome back to the Vault, {}", user.name),
                "user": user
            })),
        ),
        Err(err) if err == "NOT_REGISTERED" => (
            StatusCode::NOT_FOUND,
            Json(serde_json::json!({
                "success": false,
                "not_registered": true,
                "message": "No registered vault account found for this contact. Please create an account."
            })),
        ),
        Err(err) => (
            StatusCode::UNAUTHORIZED,
            Json(serde_json::json!({
                "success": false,
                "message": err
            })),
        ),
    }
}

/// POST /api/auth/register
pub async fn register_handler(
    State(state): State<Arc<EngineState>>,
    Json(payload): Json<RegisterRequest>,
) -> impl IntoResponse {
    match AuthService::register_user(&state, &payload).await {
        Ok(user) => (
            StatusCode::CREATED,
            Json(serde_json::json!({
                "success": true,
                "message": "Vault membership established successfully!",
                "user": user
            })),
        ),
        Err(err) => (
            StatusCode::BAD_REQUEST,
            Json(serde_json::json!({
                "success": false,
                "message": err
            })),
        ),
    }
}

/// GET /api/auth/profile?id=usr_xxx
pub async fn profile_handler(
    State(state): State<Arc<EngineState>>,
    Query(params): Query<HashMap<String, String>>,
) -> impl IntoResponse {
    let user_id = match params.get("id") {
        Some(id) => id,
        None => {
            return (
                StatusCode::BAD_REQUEST,
                Json(serde_json::json!({ "error": "Missing user id parameter" })),
            )
        }
    };

    if let Some(ref db) = state.mongo_db {
        let coll = db.collection::<mongodb::bson::Document>("users");
        if let Ok(Some(doc)) = coll.find_one(doc! { "id": user_id }).await {
            if let Ok(u) = mongodb::bson::from_document::<UserDocument>(doc) {
                return (StatusCode::OK, Json(serde_json::to_value(u).unwrap_or_default()));
            }
        }
    }

    let users = state.local_users.read().await;
    if let Some(u) = users.get(user_id) {
        return (StatusCode::OK, Json(serde_json::to_value(u).unwrap_or_default()));
    }

    (
        StatusCode::NOT_FOUND,
        Json(serde_json::json!({ "error": "User profile not found in vault registry" })),
    )
}

/// POST /api/auth/track-event
pub async fn track_event_handler(
    State(state): State<Arc<EngineState>>,
    Json(payload): Json<TrackEventRequest>,
) -> impl IntoResponse {
    AuthService::track_interaction(&state, &payload).await;

    (
        StatusCode::OK,
        Json(serde_json::json!({ "success": true, "recorded": true })),
    )
}
