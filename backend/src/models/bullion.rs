use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CityRate {
    pub city_id: String,
    pub name: String,
    pub state: String,
    pub gold24k: f64,
    pub gold22k: f64,
    pub gold18k: f64,
    pub silver999: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BullionTick {
    pub gold24k: f64,
    pub gold22k: f64,
    pub gold18k: f64,
    pub gold14k: f64,
    pub silver999: f64,
    pub open_price: f64,
    pub day_high: f64,
    pub day_low: f64,
    pub change_amount: f64,
    pub change_percent: f64,
    pub direction: String, // "up", "down", "flat"
    pub last_updated: String,
    pub timestamp_ms: i64,
    pub tick_sequence: u64,
    pub source: String,
    pub selected_city: String,
    pub cities: HashMap<String, CityRate>,
}

#[derive(Debug, Deserialize)]
pub struct RateQuery {
    pub city: Option<String>,
}
