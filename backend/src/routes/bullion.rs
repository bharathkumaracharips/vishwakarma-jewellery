use crate::models::{BullionTick, RateQuery};
use crate::state::EngineState;
use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::{
        sse::{Event, KeepAlive, Sse},
        IntoResponse, Json,
    },
};
use std::{convert::Infallible, sync::Arc, time::Duration};
use tokio_stream::{wrappers::BroadcastStream, StreamExt};

/// GET /api/rates?city=bangalore
pub async fn get_current_rates(
    State(state): State<Arc<EngineState>>,
    Query(query): Query<RateQuery>,
) -> impl IntoResponse {
    let tick_lock = state.current_tick.read().await;
    match *tick_lock {
        Some(ref tick) => {
            let requested_city = query
                .city
                .as_deref()
                .unwrap_or(&tick.selected_city)
                .to_lowercase();

            let mut response_tick = tick.clone();
            if let Some(city_rate) = tick.cities.get(&requested_city) {
                response_tick.gold24k = city_rate.gold24k;
                response_tick.gold22k = city_rate.gold22k;
                response_tick.gold18k = city_rate.gold18k;
                response_tick.silver999 = city_rate.silver999;
                response_tick.gold14k = (city_rate.gold24k * (585.0 / 999.0)).round();
                response_tick.selected_city = requested_city;
            }

            (StatusCode::OK, Json(serde_json::to_value(response_tick).unwrap_or_default()))
        }
        None => (
            StatusCode::SERVICE_UNAVAILABLE,
            Json(serde_json::json!({
                "error": "Connecting to live market feeds",
                "message": "Real-time rates are being ingested directly from live market benchmarks. No hardcoded rates are permitted."
            })),
        ),
    }
}

/// GET /api/rates/history
pub async fn get_rates_history(State(state): State<Arc<EngineState>>) -> impl IntoResponse {
    let history = state.history.read().await;
    let items: Vec<BullionTick> = history.iter().cloned().collect();
    Json(items)
}

/// GET /api/rates/sse
pub async fn sse_rates_stream(
    State(state): State<Arc<EngineState>>,
) -> Sse<impl tokio_stream::Stream<Item = Result<Event, Infallible>>> {
    let rx = state.broadcaster.subscribe();
    let stream = BroadcastStream::new(rx).filter_map(|res| match res {
        Ok(tick) => {
            let json = serde_json::to_string(&tick).unwrap_or_default();
            Some(Ok(Event::default().event("bullion_tick").data(json)))
        }
        Err(_) => None,
    });

    Sse::new(stream).keep_alive(
        KeepAlive::new()
            .interval(Duration::from_secs(15))
            .text("heartbeat"),
    )
}
