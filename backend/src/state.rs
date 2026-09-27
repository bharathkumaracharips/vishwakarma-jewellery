use crate::models::{BullionTick, OtpRecord, UserDocument};
use mongodb::Database;
use std::collections::{HashMap, VecDeque};
use tokio::sync::{broadcast, RwLock};

#[derive(Debug)]
pub struct EngineState {
    pub current_tick: RwLock<Option<BullionTick>>,
    pub history: RwLock<VecDeque<BullionTick>>,
    pub broadcaster: broadcast::Sender<BullionTick>,
    pub mongo_db: Option<Database>,
    pub local_users: RwLock<HashMap<String, UserDocument>>,
    pub local_otps: RwLock<HashMap<String, OtpRecord>>,
}
