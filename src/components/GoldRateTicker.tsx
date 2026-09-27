"use client";

import React, { useEffect, useState, useRef } from "react";
import { BullionRates, CityRate } from "@/types";
import { TrendingUp, TrendingDown, Calculator, ShieldCheck, MapPin, ChevronDown, Check, Zap } from "lucide-react";

interface GoldRateTickerProps {
  rates: BullionRates | null;
  onOpenCalculator: () => void;
  onRatesUpdate?: (updated: BullionRates) => void;
}

export const GoldRateTicker: React.FC<GoldRateTickerProps> = ({
  rates,
  onOpenCalculator,
  onRatesUpdate,
}) => {
  const [currentRates, setCurrentRates] = useState<BullionRates | null>(rates);
  const [tickFlash, setTickFlash] = useState<"up" | "down" | null>(null);
  const [isRustConnected, setIsRustConnected] = useState<boolean>(false);
  const [selectedCityId, setSelectedCityId] = useState<string>("bangalore");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync when parent rates loads
  useEffect(() => {
    if (rates) {
      setCurrentRates(rates);
    }
  }, [rates]);

  // Load saved city preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vj_selected_city");
      if (saved) {
        setSelectedCityId(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Real-time SSE listener
  useEffect(() => {
    let eventSource: EventSource | null = null;
    let pollInterval: NodeJS.Timeout | null = null;

    try {
      eventSource = new EventSource("http://127.0.0.1:8080/api/rates/sse");

      eventSource.addEventListener("tick", (e: MessageEvent) => {
        try {
          const raw = JSON.parse(e.data);
          const cityMap: Record<string, CityRate> = raw.cities || {};
          const cityData = cityMap[selectedCityId];

          const updated: BullionRates = {
            gold24k: cityData ? cityData.gold24k : raw.gold24k,
            gold22k: cityData ? cityData.gold22k : raw.gold22k,
            gold18k: cityData ? cityData.gold18k : raw.gold18k,
            gold14k: raw.gold14k,
            silver999: cityData ? cityData.silver999 : raw.silver999,
            lastUpdated: raw.last_updated,
            changePercent: raw.change_percent,
            direction: raw.direction as "up" | "down" | "flat",
            dayHigh: raw.day_high,
            dayLow: raw.day_low,
            source: "rust-bullion-engine (IBJA Live)",
            selectedCity: selectedCityId,
            cities: cityMap,
          };

          setCurrentRates((prev) => {
            if (prev) {
              if (updated.gold24k > prev.gold24k) {
                setTickFlash("up");
              } else if (updated.gold24k < prev.gold24k) {
                setTickFlash("down");
              }
              setTimeout(() => setTickFlash(null), 1200);
            }
            return updated;
          });

          setIsRustConnected(true);
          if (onRatesUpdate) {
            onRatesUpdate(updated);
          }
        } catch (err) {
          console.error("Error parsing Rust bullion SSE tick:", err);
        }
      });

      eventSource.onerror = () => {
        setIsRustConnected(false);
      };
    } catch {
      setIsRustConnected(false);
    }

    // Fallback polling through Next.js proxy if SSE drops
    pollInterval = setInterval(async () => {
      if (!isRustConnected) {
        try {
          const res = await fetch(`/api/rates?city=${selectedCityId}`);
          if (res.ok) {
            const data = await res.json();
            const updated: BullionRates = {
              gold24k: data.gold24k,
              gold22k: data.gold22k,
              gold18k: data.gold18k,
              silver999: data.silver999,
              lastUpdated: data.last_updated || data.lastUpdated,
              changePercent: data.change_percent ?? data.changePercent,
              direction: data.direction,
              source: data.source,
              selectedCity: selectedCityId,
              cities: data.cities,
            };
            setCurrentRates(updated);
            if (onRatesUpdate) onRatesUpdate(updated);
            setIsRustConnected(true);
          }
        } catch {
          // offline
        }
      }
    }, 4000);

    return () => {
      if (eventSource) eventSource.close();
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [isRustConnected, onRatesUpdate, selectedCityId]);

  const handleCitySelect = (cityId: string) => {
    setSelectedCityId(cityId);
    setIsCityDropdownOpen(false);
    try {
      localStorage.setItem("vj_selected_city", cityId);
    } catch {
      // ignore
    }

    if (currentRates && currentRates.cities && currentRates.cities[cityId]) {
      const cityData = currentRates.cities[cityId];
      const updated: BullionRates = {
        ...currentRates,
        gold24k: cityData.gold24k,
        gold22k: cityData.gold22k,
        gold18k: cityData.gold18k,
        silver999: cityData.silver999,
        selectedCity: cityId,
      };
      setCurrentRates(updated);
      if (onRatesUpdate) onRatesUpdate(updated);
    }
  };

  if (!currentRates) {
    return (
      <div
        style={{
          background: "linear-gradient(90deg, #090a0d 0%, #151922 50%, #090a0d 100%)",
          borderBottom: "1px solid var(--border-gold-subtle)",
          padding: "10px 24px",
          fontSize: "0.82rem",
          color: "var(--text-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 55,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 10px #10b981",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "0.76rem", color: "var(--gold-light)", fontWeight: 600 }}>
            ⚡ Ingesting Live Bullion Market Stream (Zero Static Rates)...
          </span>
        </div>
      </div>
    );
  }

  const isUp = (currentRates.changePercent || 0) >= 0;
  const activeCityObj = currentRates.cities ? currentRates.cities[selectedCityId] : null;
  const activeCityName = activeCityObj ? activeCityObj.name : "Bangalore";

  return (
    <div
      style={{
        background: tickFlash === "up"
          ? "linear-gradient(90deg, #090a0d 0%, #0d2818 50%, #090a0d 100%)"
          : tickFlash === "down"
          ? "linear-gradient(90deg, #090a0d 0%, #2b1115 50%, #090a0d 100%)"
          : "linear-gradient(90deg, #090a0d 0%, #151922 50%, #090a0d 100%)",
        borderBottom: "1px solid var(--border-gold-subtle)",
        padding: "8px 24px",
        fontSize: "0.82rem",
        color: "var(--text-secondary)",
        transition: "background 0.4s ease",
        position: "relative",
        zIndex: 55,
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* Left: Rust Live Engine & City Selector */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Rust Status */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: isRustConnected ? "#10b981" : "#f59e0b",
                boxShadow: isRustConnected ? "0 0 10px #10b981" : "none",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontWeight: 700,
                color: isRustConnected ? "#34d399" : "var(--gold-light)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontSize: "0.72rem",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {isRustConnected ? (
                <>
                  <Zap size={11} fill="#34d399" />
                  Live Market Rates
                </>
              ) : (
                "Connecting to Live Stream..."
              )}
            </span>
          </div>

          {/* City Selector Pill & Dropdown */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              id="city-selector-dropdown-btn"
              title="Click to change city for local bullion rates"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "20px",
                backgroundColor: "rgba(212, 175, 55, 0.18)",
                border: "1px solid var(--gold-primary)",
                color: "var(--gold-light)",
                fontSize: "0.76rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 0 10px rgba(212, 175, 55, 0.15)",
              }}
            >
              <MapPin size={13} color="var(--gold-primary)" />
              <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>City:</span>
              <span style={{ color: "#fff", fontWeight: 700 }}>{activeCityName}</span>
              <ChevronDown size={13} color="var(--gold-primary)" />
            </button>

            {/* City Selection Modal Dropdown */}
            {isCityDropdownOpen && currentRates.cities && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  width: "320px",
                  maxHeight: "360px",
                  overflowY: "auto",
                  backgroundColor: "#0d0f14",
                  border: "1px solid var(--border-gold-subtle)",
                  borderRadius: "8px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.85)",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  zIndex: 70,
                }}
              >
                <div style={{ padding: "4px 8px", fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Select City / Region
                </div>
                {Object.values(currentRates.cities).map((city) => {
                  const id = city.city_id || city.cityId || "";
                  const isSelected = selectedCityId === id;
                  return (
                    <div
                      key={id}
                      onClick={() => handleCitySelect(id)}
                      style={{
                        padding: "8px 10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        backgroundColor: isSelected ? "rgba(212, 175, 55, 0.15)" : "transparent",
                        border: isSelected ? "1px solid var(--gold-primary)" : "1px solid transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", gap: "4px" }}>
                          {city.name}
                          {isSelected && <Check size={12} color="var(--gold-primary)" />}
                        </div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>
                          {city.state}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--gold-light)", fontFamily: "monospace" }}>
                          22K: ₹{city.gold22k.toLocaleString("en-IN")}
                        </div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
                          24K: ₹{city.gold24k.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.75rem" }}>
            <ShieldCheck size={14} color="var(--gold-primary)" />
            <span>BIS Hallmarked 916</span>
          </div>
        </div>

        {/* Center: Live Bullion Prices for Selected City */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
          {/* 24K Pure Gold */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "var(--text-muted)" }}>24K Pure:</span>
            <span
              style={{
                fontWeight: 700,
                color: tickFlash === "up" ? "#34d399" : tickFlash === "down" ? "#f87171" : "var(--gold-light)",
                fontFamily: "monospace",
                fontSize: "0.88rem",
                transition: "color 0.2s ease",
              }}
            >
              ₹{currentRates.gold24k.toLocaleString("en-IN")}/g
            </span>
          </div>

          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>

          {/* 22K Hallmarked 916 */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "var(--text-muted)" }}>22K (916):</span>
            <span
              style={{
                fontWeight: 700,
                color: tickFlash === "up" ? "#34d399" : tickFlash === "down" ? "#f87171" : "var(--gold-light)",
                fontFamily: "monospace",
                fontSize: "0.88rem",
                transition: "color 0.2s ease",
              }}
            >
              ₹{currentRates.gold22k.toLocaleString("en-IN")}/g
            </span>
          </div>

          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>

          {/* 18K Fine Jewellery */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "var(--text-muted)" }}>18K (750):</span>
            <span
              style={{
                fontWeight: 700,
                color: "var(--text-primary)",
                fontFamily: "monospace",
                fontSize: "0.88rem",
              }}
            >
              ₹{currentRates.gold18k.toLocaleString("en-IN")}/g
            </span>
          </div>

          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>

          {/* Silver 999 */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "var(--text-muted)" }}>Silver 999:</span>
            <span
              style={{
                fontWeight: 700,
                color: "var(--text-primary)",
                fontFamily: "monospace",
                fontSize: "0.88rem",
              }}
            >
              ₹{currentRates.silver999.toFixed(2)}/g
            </span>
          </div>

          {/* Trend Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: isUp ? "#34d399" : "#f87171",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            <span>
              {isUp ? "+" : ""}
              {currentRates.changePercent}%
            </span>
          </div>
        </div>

        {/* Right: Calculator CTA & Time */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
            {currentRates.lastUpdated}
          </span>
          <button
            onClick={onOpenCalculator}
            id="gold-rate-calculator-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "4px",
              background: "rgba(212, 175, 55, 0.12)",
              border: "1px solid var(--border-gold-subtle)",
              color: "var(--gold-light)",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Calculator size={13} />
            <span>Price Calculator</span>
          </button>
        </div>
      </div>
    </div>
  );
};
