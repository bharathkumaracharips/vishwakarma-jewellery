"use client";

import React, { useState } from "react";
import { X, RefreshCw, Scale, ArrowRight, ShieldCheck, CheckCircle2, Coins, ArrowRightLeft, MapPin } from "lucide-react";
import { BullionRates } from "@/types";

interface TransformGoldModalProps {
  isOpen: boolean;
  onClose: () => void;
  rates: BullionRates | null;
  onCityChange?: (cityId: string) => void;
  onOpenCustomDesign: () => void;
}

export const TransformGoldModal: React.FC<TransformGoldModalProps> = ({
  isOpen,
  onClose,
  rates,
  onCityChange,
  onOpenCustomDesign,
}) => {
  const [activeTab, setActiveTab] = useState<"transform" | "exchange">("transform");
  const [currentCityId, setCurrentCityId] = useState<string>("bangalore");

  // Old gold inputs
  const [oldWeight, setOldWeight] = useState<number>(12.5);
  const [oldKarat, setOldKarat] = useState<"22k" | "18k" | "24k" | "unmarked">("22k");
  const [meltingLossPercent, setMeltingLossPercent] = useState<number>(1.5); // standard 1.5% melting/slag tolerance

  // Target item selection for transformation
  const [targetType, setTargetType] = useState<string>("Bespoke Signet Ring (~8.5g)");
  const [targetCostEstimate, setTargetCostEstimate] = useState<number>(78000);
  const [makingCharges, setMakingCharges] = useState<number>(12500);

  if (!isOpen) return null;

  if (!rates) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.85)" }}>
        <div style={{ backgroundColor: "#0d0f14", border: "1px solid var(--border-gold-subtle)", borderRadius: "8px", padding: "28px", textAlign: "center" }}>
          <p style={{ color: "var(--gold-light)", margin: 0, fontSize: "0.9rem" }}>Connecting to Live Bullion Engine...</p>
        </div>
      </div>
    );
  }

  const activeCity = rates.cities ? rates.cities[currentCityId] : null;
  const current24k = activeCity ? activeCity.gold24k : rates.gold24k;
  const current22k = activeCity ? activeCity.gold22k : rates.gold22k;
  const current18k = activeCity ? activeCity.gold18k : rates.gold18k;

  const handleCitySelect = (cityId: string) => {
    setCurrentCityId(cityId);
    if (onCityChange) {
      onCityChange(cityId);
    }
  };

  // Calculation helpers
  let purityFactor = 0.916; // 22K
  let baseRatePerGram = current22k;

  if (oldKarat === "24k") {
    purityFactor = 0.999;
    baseRatePerGram = current24k;
  } else if (oldKarat === "18k") {
    purityFactor = 0.75;
    baseRatePerGram = current18k;
  } else if (oldKarat === "unmarked") {
    purityFactor = 0.88; // conservative estimate pending XRF testing
    baseRatePerGram = current22k * (0.88 / 0.916);
  }

  // Net Pure Gold Recovered (in grams)
  const netPureGoldGrams = Math.max(0, oldWeight * purityFactor * (1 - meltingLossPercent / 100));
  // Total Old Gold Credit Value (₹)
  const oldGoldCreditValue = Math.round(netPureGoldGrams * current24k);

  // Balance payable in Transform mode
  const netDifference = targetCostEstimate + makingCharges - oldGoldCreditValue;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(3, 4, 6, 0.88)",
        backdropFilter: "blur(10px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: "#0d0f14",
          border: "1px solid var(--border-gold-subtle)",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "850px",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)",
          color: "var(--text-primary)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-gold-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(212, 175, 55, 0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold-primary)",
              }}
            >
              <RefreshCw size={20} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.3rem",
                  color: "var(--gold-light)",
                  margin: 0,
                }}
              >
                Transform Old Gold & Digital Exchange Hub
              </h2>
              <p style={{ margin: "2px 0 0 0", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                Zero Waste Recycling • Digital Scrap Valuation • Live Spot Rate Settlement
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {rates.cities && (
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <MapPin size={13} color="var(--gold-primary)" />
                <select
                  id="transform-modal-city-select"
                  value={currentCityId}
                  onChange={(e) => handleCitySelect(e.target.value)}
                  style={{
                    backgroundColor: "rgba(212, 175, 55, 0.12)",
                    border: "1px solid var(--gold-primary)",
                    color: "var(--gold-light)",
                    fontSize: "0.76rem",
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
            <button
              onClick={onClose}
              style={{
                color: "var(--text-secondary)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "#090a0d",
          }}
        >
          <button
            onClick={() => setActiveTab("transform")}
            style={{
              flex: 1,
              padding: "14px",
              background: activeTab === "transform" ? "rgba(212, 175, 55, 0.1)" : "none",
              border: "none",
              borderBottom: activeTab === "transform" ? "2px solid var(--gold-primary)" : "none",
              color: activeTab === "transform" ? "var(--gold-light)" : "var(--text-secondary)",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <RefreshCw size={16} />
            ♻️ Transform My Gold (Old Chain/Bangles $\to$ New Jewellery)
          </button>
          <button
            onClick={() => setActiveTab("exchange")}
            style={{
              flex: 1,
              padding: "14px",
              background: activeTab === "exchange" ? "rgba(212, 175, 55, 0.1)" : "none",
              border: "none",
              borderBottom: activeTab === "exchange" ? "2px solid var(--gold-primary)" : "none",
              color: activeTab === "exchange" ? "var(--gold-light)" : "var(--text-secondary)",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <ArrowRightLeft size={16} />
            💰 Instant Gold Exchange Calculator (Scrap Gold to Cash/Store Credit)
          </button>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Live Rate Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              backgroundColor: "rgba(212, 175, 55, 0.06)",
              borderRadius: "6px",
              border: "1px solid rgba(212, 175, 55, 0.15)",
              marginBottom: "24px",
              fontSize: "0.8rem",
            }}
          >
            <div>
              <span style={{ color: "var(--text-secondary)" }}>Live Market 24K Pure Gold: </span>
              <strong style={{ color: "var(--gold-light)" }}>₹{rates.gold24k.toLocaleString()}/g</strong>
              <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.2)" }}>|</span>
              <span style={{ color: "var(--text-secondary)" }}>22K Standard: </span>
              <strong style={{ color: "var(--gold-light)" }}>₹{rates.gold22k.toLocaleString()}/g</strong>
            </div>
            <div style={{ color: "#34d399", fontWeight: 600 }}>● Live Ticker Rate</div>
          </div>

          {/* Form Step 1: Input Old Gold */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
            <div>
              <h3 style={{ fontSize: "1rem", color: "var(--gold-light)", marginBottom: "16px" }}>
                1. Your Existing Gold Ornaments
              </h3>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Gross Weight of Old Gold (grams)
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    type="number"
                    step="0.01"
                    min="0.5"
                    value={oldWeight}
                    onChange={(e) => setOldWeight(parseFloat(e.target.value) || 0)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      backgroundColor: "#161922",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "4px",
                      color: "#fff",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                    }}
                  />
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>grams</span>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Gold Karatage / Known Purity
                </label>
                <select
                  value={oldKarat}
                  onChange={(e) => setOldKarat(e.target.value as any)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#161922",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "4px",
                    color: "#fff",
                    fontSize: "0.85rem",
                  }}
                >
                  <option value="22k">22K Gold (91.6% BIS Hallmark)</option>
                  <option value="18k">18K Gold (75.0% Purity)</option>
                  <option value="24k">24K Pure Gold Coins / Bars (99.9%)</option>
                  <option value="unmarked">Unmarked / Vintage Ancestral Gold (~88% Est.)</option>
                </select>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Standard Melting Loss Allowance ({meltingLossPercent}%)
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={meltingLossPercent}
                  onChange={(e) => setMeltingLossPercent(parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--gold-primary)" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>
                  <span>0.5% (Coins)</span>
                  <span>1.5% (Chains/Bangles)</span>
                  <span>3.0% (Antique Solders)</span>
                </div>
              </div>
            </div>

            {/* Calculations Breakdown Card */}
            <div>
              <h3 style={{ fontSize: "1rem", color: "var(--gold-light)", marginBottom: "16px" }}>
                2. Recovered Gold Accounting
              </h3>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "6px",
                  backgroundColor: "#13161f",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Input Gross Weight:</span>
                  <strong>{oldWeight.toFixed(2)} g</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Assayed Purity Factor:</span>
                  <strong>{(purityFactor * 100).toFixed(1)}%</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Refining & Melt Loss ({meltingLossPercent}%):</span>
                  <span style={{ color: "#f87171" }}>-{(oldWeight * purityFactor * (meltingLossPercent / 100)).toFixed(3)} g</span>
                </div>

                <div
                  style={{
                    borderTop: "1px dashed rgba(255,255,255,0.1)",
                    paddingTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#fff", fontSize: "0.85rem" }}>
                    Net 24K Pure Gold Credited:
                  </span>
                  <span style={{ fontWeight: 700, color: "#34d399", fontSize: "0.95rem" }}>
                    {netPureGoldGrams.toFixed(3)} grams
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                    padding: "12px",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.85rem", color: "var(--gold-light)", fontWeight: 600 }}>
                    Old Gold Value Credit:
                  </span>
                  <span style={{ fontSize: "1.2rem", color: "var(--gold-light)", fontWeight: 700 }}>
                    ₹{oldGoldCreditValue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mode A: Transform into Target Jewellery Selection */}
          {activeTab === "transform" && (
            <div
              style={{
                marginTop: "16px",
                padding: "20px",
                borderRadius: "6px",
                backgroundColor: "#11141c",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3 style={{ fontSize: "1rem", color: "var(--gold-light)", marginBottom: "14px" }}>
                3. Choose Target New Jewellery to Craft
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Select New Piece
                  </label>
                  <select
                    value={targetType}
                    onChange={(e) => {
                      setTargetType(e.target.value);
                      if (e.target.value.includes("Ring")) {
                        setTargetCostEstimate(78000);
                        setMakingCharges(12000);
                      } else if (e.target.value.includes("Choker")) {
                        setTargetCostEstimate(245000);
                        setMakingCharges(35000);
                      } else if (e.target.value.includes("Bangle")) {
                        setTargetCostEstimate(155000);
                        setMakingCharges(22000);
                      }
                    }}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#161922",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "4px",
                      color: "#fff",
                      fontSize: "0.85rem",
                    }}
                  >
                    <option value="Bespoke Signet Ring (~8.5g)">Bespoke Men's/Women's Ring (~8.5g)</option>
                    <option value="Temple Lakshmi Kada Bangle (~24g)">Temple Lakshmi Kada Bangle (~24g)</option>
                    <option value="Filigree Bridal Choker (~38g)">Royal Filigree Bridal Choker (~38g)</option>
                    <option value="Custom CAD Upload">I have my own custom CAD design</option>
                  </select>
                </div>

                {/* Net Settlement Balance */}
                <div
                  style={{
                    backgroundColor: netDifference <= 0 ? "rgba(16, 185, 129, 0.15)" : "rgba(212, 175, 55, 0.1)",
                    border: netDifference <= 0 ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid rgba(212, 175, 55, 0.3)",
                    borderRadius: "6px",
                    padding: "12px 16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                    {netDifference <= 0 ? "Surplus Refund Due to You" : "Net Difference Payable"}
                  </span>
                  <div
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      color: netDifference <= 0 ? "#34d399" : "var(--gold-light)",
                    }}
                  >
                    {netDifference <= 0
                      ? `+ ₹${Math.abs(netDifference).toLocaleString()} (Refund / Store Credit)`
                      : `₹${netDifference.toLocaleString()} (Includes Making & Hallmark)`}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <ShieldCheck size={16} color="#10b981" />
                  Your old gold is physically assayed via XRF Karatmeter in your presence before melting.
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenCustomDesign();
                  }}
                  style={{
                    background: "var(--gold-gradient)",
                    border: "none",
                    padding: "10px 22px",
                    color: "#0a0b0e",
                    fontWeight: 600,
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  Book Inward Melting & Transformation →
                </button>
              </div>
            </div>
          )}

          {/* Mode B: Direct Exchange to Cash / Store Balance */}
          {activeTab === "exchange" && (
            <div
              style={{
                marginTop: "16px",
                padding: "20px",
                borderRadius: "6px",
                backgroundColor: "#11141c",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3 style={{ fontSize: "1rem", color: "var(--gold-light)", marginBottom: "10px" }}>
                Instant Gold Exchange Settlement
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: "0 0 16px 0" }}>
                Convert your idle scrap ornaments directly into digital bullion balance, instant bank payout, or a store gift card with 0% deduction on live spot rates.
              </p>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  onClick={() => alert(`Instant payout voucher generated for ₹${oldGoldCreditValue.toLocaleString()}. Visit any Vishwakarma boutique with original ID.`)}
                  style={{
                    background: "var(--gold-gradient)",
                    border: "none",
                    padding: "12px 24px",
                    color: "#0a0b0e",
                    fontWeight: 600,
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.88rem",
                  }}
                >
                  Redeem Instant Cash / Voucher (₹{oldGoldCreditValue.toLocaleString()})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
