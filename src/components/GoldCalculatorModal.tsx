"use client";

import React, { useState } from "react";
import { BullionRates } from "@/types";
import { X, Calculator, ShieldCheck, Sparkles, PhoneCall, MapPin } from "lucide-react";

interface GoldCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  rates: BullionRates | null;
  onCityChange?: (cityId: string) => void;
}

export const GoldCalculatorModal: React.FC<GoldCalculatorModalProps> = ({
  isOpen,
  onClose,
  rates,
  onCityChange,
}) => {
  const [selectedPurity, setSelectedPurity] = useState<"24k" | "22k" | "18k">("22k");
  const [weightGrams, setWeightGrams] = useState<number>(20);
  const [makingChargePct, setMakingChargePct] = useState<number>(12);
  const [currentCityId, setCurrentCityId] = useState<string>("bangalore");

  if (!isOpen) return null;

  if (!rates) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.8)" }}>
        <div style={{ backgroundColor: "#0d0f14", border: "1px solid var(--border-gold-subtle)", borderRadius: "12px", padding: "28px", textAlign: "center" }}>
          <p style={{ color: "var(--gold-light)", margin: 0, fontSize: "0.9rem" }}>Connecting to Live Market Feeds...</p>
        </div>
      </div>
    );
  }

  // If user changed city locally or via parent
  const activeCity = rates.cities ? rates.cities[currentCityId] : null;
  const current24k = activeCity ? activeCity.gold24k : rates.gold24k;
  const current22k = activeCity ? activeCity.gold22k : rates.gold22k;
  const current18k = activeCity ? activeCity.gold18k : rates.gold18k;

  const currentRatePerGram =
    selectedPurity === "24k"
      ? current24k
      : selectedPurity === "22k"
      ? current22k
      : current18k;

  const handleCitySelect = (cityId: string) => {
    setCurrentCityId(cityId);
    if (onCityChange) {
      onCityChange(cityId);
    }
  };

  const goldCost = weightGrams * currentRatePerGram;
  const makingCharges = (goldCost * makingChargePct) / 100;
  const subtotal = goldCost + makingCharges;
  const gst = subtotal * 0.03; // 3% GST on jewelry in India
  const totalAmount = subtotal + gst;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 50,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-gold-subtle)",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "540px",
        padding: "28px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.8), 0 0 30px var(--gold-glow)",
        position: "relative",
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-calculator-btn"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "var(--text-muted)",
            padding: "6px",
          }}
          aria-label="Close Calculator"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Calculator size={22} color="var(--gold-primary)" />
            <h3 style={{ fontSize: "1.3rem", color: "#fff", margin: 0 }}>Gold Price & Valuation Estimator</h3>
          </div>

          {/* City Selector */}
          {rates.cities && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <MapPin size={13} color="var(--gold-primary)" />
              <select
                id="calculator-city-select"
                value={currentCityId}
                onChange={(e) => handleCitySelect(e.target.value)}
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.12)",
                  border: "1px solid var(--gold-primary)",
                  color: "var(--gold-light)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  borderRadius: "6px",
                  padding: "4px 8px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {Object.values(rates.cities).map((c) => (
                  <option key={c.city_id || c.cityId} value={c.city_id || c.cityId} style={{ backgroundColor: "#0d0f14", color: "#fff" }}>
                    📍 {c.name} ({c.state})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
          Calculate live certified gold cost for <span style={{ color: "var(--gold-light)", fontWeight: 600 }}>{activeCity ? activeCity.name : "Bangalore"}</span>, craft charges, and GST with transparent pricing.
        </p>

        {/* Karat Selection */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "8px" }}>
            Select Gold Karat Purity:
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {[
              { id: "24k", label: "24K (99.9%)", rate: current24k },
              { id: "22k", label: "22K (91.6% BIS)", rate: current22k },
              { id: "18k", label: "18K (75.0%)", rate: current18k },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPurity(item.id as "24k" | "22k" | "18k")}
                style={{
                  padding: "10px 8px",
                  borderRadius: "6px",
                  border: selectedPurity === item.id ? "1.5px solid var(--gold-primary)" : "1px solid var(--border-dark)",
                  backgroundColor: selectedPurity === item.id ? "rgba(212, 175, 55, 0.15)" : "var(--bg-secondary)",
                  color: selectedPurity === item.id ? "var(--gold-light)" : "var(--text-secondary)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{item.label}</div>
                <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "2px" }}>₹{item.rate.toLocaleString("en-IN")}/g</div>
              </button>
            ))}
          </div>
        </div>

        {/* Weight in Grams Input */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.8rem" }}>
            <label style={{ color: "var(--text-muted)" }}>Weight (in Grams):</label>
            <span style={{ fontWeight: 700, color: "var(--gold-light)" }}>{weightGrams} grams</span>
          </div>
          <input
            type="range"
            min="1"
            max="250"
            value={weightGrams}
            onChange={(e) => setWeightGrams(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--gold-primary)" }}
          />
          <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
            {[5, 10, 20, 50, 100].map((quickGrams) => (
              <button
                key={quickGrams}
                type="button"
                onClick={() => setWeightGrams(quickGrams)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  background: weightGrams === quickGrams ? "var(--gold-primary)" : "rgba(255, 255, 255, 0.05)",
                  color: weightGrams === quickGrams ? "#000" : "var(--text-secondary)",
                  fontWeight: 600,
                }}
              >
                {quickGrams}g
              </button>
            ))}
          </div>
        </div>

        {/* Making Charges Slider */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.8rem" }}>
            <label style={{ color: "var(--text-muted)" }}>Artisan Karigari / Making Charges:</label>
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{makingChargePct}%</span>
          </div>
          <input
            type="range"
            min="6"
            max="25"
            value={makingChargePct}
            onChange={(e) => setMakingChargePct(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--gold-primary)" }}
          />
        </div>

        {/* Calculation Breakdown Table */}
        <div style={{
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "8px",
          padding: "16px",
          border: "1px solid var(--border-dark)",
          marginBottom: "20px",
          fontSize: "0.85rem",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "var(--text-secondary)" }}>
            <span>Net Gold Value ({weightGrams}g × ₹{currentRatePerGram}):</span>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>₹{Math.round(goldCost).toLocaleString("en-IN")}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "var(--text-secondary)" }}>
            <span>Handcraft Making ({makingChargePct}%):</span>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>₹{Math.round(makingCharges).toLocaleString("en-IN")}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "var(--text-secondary)" }}>
            <span>GST (3% Indian Bullion Levy):</span>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>₹{Math.round(gst).toLocaleString("en-IN")}</span>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "12px",
            borderTop: "1px solid var(--border-gold-subtle)",
            fontSize: "1.05rem",
          }}>
            <span style={{ fontWeight: 700, color: "#fff" }}>Total Estimated Value:</span>
            <span style={{ fontWeight: 700, color: "var(--gold-light)" }}>
              ₹{Math.round(totalAmount).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              alert(`Rate locked for 24 hours for ${weightGrams}g of ${selectedPurity.toUpperCase()} Gold. Our concierge will contact you shortly.`);
              onClose();
            }}
            id="lock-rate-submit-btn"
            style={{
              flex: 1,
              padding: "12px",
              background: "var(--gold-gradient)",
              color: "#0a0b0e",
              fontWeight: 700,
              fontSize: "0.88rem",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            Lock-In Today&apos;s Rate
          </button>
        </div>
      </div>
    </div>
  );
};
