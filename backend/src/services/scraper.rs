use crate::models::{BullionTick, CityRate};
use crate::state::EngineState;
use chrono::{Local, Utc};
use regex::Regex;
use std::{collections::HashMap, sync::Arc, time::Duration};

/// Continuous market ingestion loop - continuously scrapes real live data
pub async fn start_real_market_ingestion_loop(state: Arc<EngineState>) {
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(10))
        .build()
        .unwrap_or_default();

    let mut poll_interval = tokio::time::interval(Duration::from_secs(25));

    loop {
        poll_interval.tick().await;

        // Fetch fresh dynamic rates directly from the live web
        if let Some(mut fresh_tick) = fetch_all_live_market_data(&client).await {
            let mut current = state.current_tick.write().await;
            let mut history = state.history.write().await;

            if let Some(ref prev) = *current {
                fresh_tick.open_price = prev.open_price;
                fresh_tick.day_high = prev.day_high.max(fresh_tick.gold24k);
                fresh_tick.day_low = prev.day_low.min(fresh_tick.gold24k);
                fresh_tick.change_amount = fresh_tick.gold24k - prev.open_price;
                fresh_tick.change_percent = if prev.open_price > 0.0 {
                    ((fresh_tick.change_amount / prev.open_price) * 10000.0).round() / 100.0
                } else {
                    0.0
                };
                fresh_tick.direction = if fresh_tick.gold24k > prev.gold24k {
                    "up".to_string()
                } else if fresh_tick.gold24k < prev.gold24k {
                    "down".to_string()
                } else {
                    "flat".to_string()
                };
                fresh_tick.tick_sequence = prev.tick_sequence + 1;
                fresh_tick.selected_city = prev.selected_city.clone();
            }

            *current = Some(fresh_tick.clone());

            if history.len() >= 50 {
                history.pop_front();
            }
            history.push_back(fresh_tick.clone());

            let _ = state.broadcaster.send(fresh_tick);
        }
    }
}

/// Dynamic live web scraper: Ingests ground-truth rates across 12+ Indian cities
pub async fn fetch_all_live_market_data(client: &reqwest::Client) -> Option<BullionTick> {
    let cities_to_fetch = vec![
        ("bangalore", "Bangalore", "Karnataka"),
        ("mumbai", "Mumbai", "Maharashtra"),
        ("delhi", "Delhi", "Delhi NCR"),
        ("chennai", "Chennai", "Tamil Nadu"),
        ("hyderabad", "Hyderabad", "Telangana"),
        ("kolkata", "Kolkata", "West Bengal"),
        ("ahmedabad", "Ahmedabad", "Gujarat"),
        ("coimbatore", "Coimbatore", "Tamil Nadu"),
        ("pune", "Pune", "Maharashtra"),
        ("jaipur", "Jaipur", "Rajasthan"),
        ("kerala", "Kerala", "Kerala"),
        ("surat", "Surat", "Gujarat"),
    ];

    let mut city_rates: HashMap<String, CityRate> = HashMap::new();
    let mut futures = Vec::new();

    for (slug, name, state) in cities_to_fetch {
        let client_ref = client.clone();
        futures.push(tokio::spawn(async move {
            let res = scrape_city_rate(&client_ref, slug, name, state).await;
            (slug.to_string(), res)
        }));
    }

    for f in futures {
        if let Ok((slug, Some(rate))) = f.await {
            city_rates.insert(slug, rate);
        }
    }

    // Must have at least Bangalore or primary benchmark to proceed
    if city_rates.is_empty() {
        return None;
    }

    let blr = city_rates.get("bangalore")?;
    let g24 = blr.gold24k;
    let g22 = blr.gold22k;
    let g18 = blr.gold18k;
    let sil = blr.silver999;
    let g14 = (g24 * (585.0 / 999.0)).round();

    let now_str = Local::now().format("%Y-%m-%d %H:%M:%S IST").to_string();
    let timestamp_ms = Utc::now().timestamp_millis();

    Some(BullionTick {
        gold24k: g24,
        gold22k: g22,
        gold18k: g18,
        gold14k: g14,
        silver999: sil,
        open_price: g24,
        day_high: g24,
        day_low: g24,
        change_amount: 0.0,
        change_percent: 0.0,
        direction: "flat".to_string(),
        last_updated: now_str,
        timestamp_ms,
        tick_sequence: 1,
        source: "live-goodreturns-market-stream".to_string(),
        selected_city: "bangalore".to_string(),
        cities: city_rates,
    })
}

/// Dynamically parse rates for a specific Indian metropolitan hub
async fn scrape_city_rate(
    client: &reqwest::Client,
    city_slug: &str,
    name: &str,
    state: &str,
) -> Option<CityRate> {
    let url = format!("https://www.goodreturns.in/gold-rates/{}.html", city_slug);
    let res = client
        .get(&url)
        .header(
            "User-Agent",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        )
        .header("Accept", "text/html,application/xhtml+xml")
        .send()
        .await
        .ok()?;

    if !res.status().is_success() {
        return None;
    }

    let html = res.text().await.ok()?;

    // Dynamic extraction of 22K (10g) & 24K (10g)
    let re_22k = Regex::new(
        r#"(?s)<tr[^>]*>\s*<td[^>]*>.*?10\s*gram.*?</td>\s*<td[^>]*>.*?&#x20b9;([0-9,]+).*?</td>"#,
    )
    .ok()?;
    let re_24k = Regex::new(
        r#"(?s)<div id="24k-gold"[^>]*>.*?<tr[^>]*>\s*<td[^>]*>.*?10\s*gram.*?</td>\s*<td[^>]*>.*?&#x20b9;([0-9,]+).*?</td>"#,
    )
    .ok()?;

    let mut gold22k_10g: f64 = 0.0;
    if let Some(caps) = re_22k.captures(&html) {
        if let Some(m) = caps.get(1) {
            let clean = m.as_str().replace(',', "").trim().to_string();
            gold22k_10g = clean.parse().unwrap_or(0.0);
        }
    }

    let mut gold24k_10g: f64 = 0.0;
    if let Some(caps) = re_24k.captures(&html) {
        if let Some(m) = caps.get(1) {
            let clean = m.as_str().replace(',', "").trim().to_string();
            gold24k_10g = clean.parse().unwrap_or(0.0);
        }
    }

    if gold22k_10g == 0.0 || gold24k_10g == 0.0 {
        return None;
    }

    let gold24k_per_gram = (gold24k_10g / 10.0).round();
    let gold22k_per_gram = (gold22k_10g / 10.0).round();
    let gold18k_per_gram = (gold24k_per_gram * (750.0 / 999.0)).round();

    let silver = scrape_live_silver_rate(client, city_slug).await.unwrap_or(245.0);

    Some(CityRate {
        city_id: city_slug.to_string(),
        name: name.to_string(),
        state: state.to_string(),
        gold24k: gold24k_per_gram,
        gold22k: gold22k_per_gram,
        gold18k: gold18k_per_gram,
        silver999: silver,
    })
}

/// Dynamically parse local live silver rates per 100g
async fn scrape_live_silver_rate(client: &reqwest::Client, city_slug: &str) -> Option<f64> {
    let url = format!("https://www.goodreturns.in/silver-rates/{}.html", city_slug);
    let res = client
        .get(&url)
        .header(
            "User-Agent",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        )
        .send()
        .await
        .ok()?;

    let html = res.text().await.ok()?;
    let re_silver = Regex::new(r#"silver in [^>]+ today is <strong>&#x20b9;(\d+)<"#).ok()?;
    let sil: f64 = re_silver.captures(&html)?.get(1)?.as_str().parse().ok()?;
    Some(sil)
}
