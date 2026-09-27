"use client";

import React, { useState } from "react";
import { X, Wrench, ShieldCheck, Scale, CheckCircle2, ArrowRight, UploadCloud, AlertCircle } from "lucide-react";
import { RepairServiceType, RepairRequest } from "@/types";

interface RepairIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTracker: (trackingCode: string) => void;
}

const REPAIR_SERVICES: { type: RepairServiceType; title: string; desc: string; estCost: string; avgDays: string }[] = [
  { type: "ring_resizing", title: "Ring Resizing", desc: "Expand or shrink gold/platinum rings with laser precision", estCost: "From ₹1,800", avgDays: "2-3 Days" },
  { type: "chain_repair", title: "Chain & Link Repair", desc: "Re-link severed chains, hollow or solid links", estCost: "From ₹1,200", avgDays: "2 Days" },
  { type: "broken_clasp", title: "Clasp / Lock Replacement", desc: "Heavy-duty lobster, S-hook, or barrel locks", estCost: "From ₹1,500", avgDays: "1-2 Days" },
  { type: "prong_repair", title: "Prong Re-tipping & Tightening", desc: "Secure loose solitaires, diamonds & gemstones", estCost: "From ₹2,200", avgDays: "3 Days" },
  { type: "stone_replacement", title: "Gemstone Replacement", desc: "Match natural rubies, emeralds, sapphires", estCost: "On Assessment", avgDays: "4-5 Days" },
  { type: "diamond_replacement", title: "Diamond Replacement", desc: "Certified matching color/clarity solitaire & melee", estCost: "On Assessment", avgDays: "3-4 Days" },
  { type: "soldering", title: "Laser Soldering", desc: "Zero-mark micro-welding for antique filigree", estCost: "From ₹1,400", avgDays: "1-2 Days" },
  { type: "polishing", title: "Ultrasonic Buffing & Polish", desc: "Restore factory mirror luster and remove micro-scratches", estCost: "From ₹800", avgDays: "1 Day" },
  { type: "rhodium_plating", title: "Rhodium / White Gold Plating", desc: "Deep electroplated rhodium for luminous white shine", estCost: "From ₹1,600", avgDays: "2 Days" },
  { type: "gold_plating", title: "24K Micron Gold Plating", desc: "Long-lasting 3-micron immersion plating", estCost: "From ₹2,000", avgDays: "2-3 Days" },
  { type: "bangle_repair", title: "Bangle & Kada Repair", desc: "Hinge repair, screw repair, and circular alignment", estCost: "From ₹2,400", avgDays: "3 Days" },
  { type: "earring_repair", title: "Earring Post & Screw Repair", desc: "South-Indian screw, push-back, or Bombay lock fixes", estCost: "From ₹950", avgDays: "2 Days" },
  { type: "pendant_repair", title: "Pendant Loop / Bail Repair", desc: "Reinforce worn bail hooks for heavy gold chains", estCost: "From ₹1,100", avgDays: "2 Days" },
  { type: "mangalsutra_repair", title: "Mangalsutra Re-stringing", desc: "Auspicious black bead re-threading & knotting", estCost: "From ₹1,500", avgDays: "2 Days" },
  { type: "cleaning", title: "Deep Ultrasonic Cleaning", desc: "Dissolve oil, grime, and oxidation from intricate crevices", estCost: "From ₹500", avgDays: "Same Day" },
  { type: "reshaping", title: "Structural Reshaping", desc: "Re-align bent shanks, crushed bangles, or dented hollow gold", estCost: "From ₹1,800", avgDays: "2-3 Days" },
  { type: "recasting", title: "Recasting & Metal Re-melting", desc: "Melt worn item into a reinforced new silhouette", estCost: "From ₹4,500", avgDays: "6-8 Days" },
  { type: "custom_modification", title: "Custom Heirloom Modification", desc: "Convert grand choker into detachable necklaces/pendants", estCost: "Custom Quote", avgDays: "7-10 Days" },
];

export const RepairIntakeModal: React.FC<RepairIntakeModalProps> = ({ isOpen, onClose, onOpenTracker }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<RepairServiceType>("ring_resizing");
  const [metalType, setMetalType] = useState<string>("22K Gold");
  const [approxWeight, setApproxWeight] = useState<string>("");
  const [dimensions, setDimensions] = useState<string>("");
  const [problemDescription, setProblemDescription] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pickupAddress, setPickupAddress] = useState<string>("");
  const [pickupSlot, setPickupSlot] = useState<string>("Tomorrow, 10:00 AM - 1:00 PM");
  const [generatedJobCode, setGeneratedJobCode] = useState<string>("JWL-REP-004821");

  if (!isOpen) return null;

  const handleServiceSelect = (type: RepairServiceType) => {
    setSelectedService(type);
    setStep(2);
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `JWL-REP-00${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedJobCode(randomCode);
    setStep(4);
  };

  const activeServiceObj = REPAIR_SERVICES.find((s) => s.type === selectedService);

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
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)",
          color: "var(--text-primary)",
          display: "flex",
          flexDirection: "column",
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
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
              <Wrench size={20} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.3rem",
                  color: "var(--gold-light)",
                  margin: 0,
                  letterSpacing: "0.03em",
                }}
              >
                Jewellery Hospital & Traceable Restoration Hub
              </h2>
              <p style={{ margin: "2px 0 0 0", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Secure Armored Pickup • Calibrated Inward Weighing • Master Goldsmith Restoration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              color: "var(--text-secondary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Navigation Pill Indicator */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            padding: "12px 24px",
            gap: "16px",
            backgroundColor: "#090a0d",
            fontSize: "0.78rem",
          }}
        >
          <span style={{ color: step >= 1 ? "var(--gold-primary)" : "var(--text-secondary)", fontWeight: 600 }}>
            1. Select Diagnosis ({REPAIR_SERVICES.length} Services)
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>→</span>
          <span style={{ color: step >= 2 ? "var(--gold-primary)" : "var(--text-secondary)", fontWeight: 600 }}>
            2. Specs & Weight
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>→</span>
          <span style={{ color: step >= 3 ? "var(--gold-primary)" : "var(--text-secondary)", fontWeight: 600 }}>
            3. Armored Pickup
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>→</span>
          <span style={{ color: step >= 4 ? "var(--gold-primary)" : "var(--text-secondary)", fontWeight: 600 }}>
            4. Live Job Card ID
          </span>
        </div>

        {/* Body Content by Step */}
        <div style={{ padding: "24px" }}>
          {/* STEP 1: Select Repair Diagnostic */}
          {step === 1 && (
            <div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
                Select the structural symptom or service required for your gold, diamond, or heirloom piece:
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "12px",
                  maxHeight: "55vh",
                  overflowY: "auto",
                  paddingRight: "6px",
                }}
              >
                {REPAIR_SERVICES.map((s) => (
                  <div
                    key={s.type}
                    onClick={() => handleServiceSelect(s.type)}
                    style={{
                      padding: "14px",
                      borderRadius: "6px",
                      backgroundColor: selectedService === s.type ? "rgba(212, 175, 55, 0.12)" : "rgba(255, 255, 255, 0.02)",
                      border: selectedService === s.type ? "1px solid var(--gold-primary)" : "1px solid rgba(255, 255, 255, 0.08)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                      <h4 style={{ margin: 0, fontSize: "0.92rem", color: "#fff", fontWeight: 600 }}>{s.title}</h4>
                      <span style={{ fontSize: "0.7rem", color: "var(--gold-light)", fontWeight: 600 }}>{s.estCost}</span>
                    </div>
                    <p style={{ margin: "0 0 8px 0", fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                      {s.desc}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)" }}>
                      <span>Avg: {s.avgDays}</span>
                      <span style={{ color: "var(--gold-primary)", display: "flex", alignItems: "center", gap: "2px" }}>
                        Proceed <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Specs, Photos & Description */}
          {step === 2 && (
            <form onSubmit={handleDetailsSubmit}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  backgroundColor: "rgba(212, 175, 55, 0.08)",
                  borderRadius: "6px",
                  marginBottom: "20px",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Selected Diagnostic:</span>
                  <div style={{ fontWeight: 600, color: "var(--gold-light)" }}>{activeServiceObj?.title}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--gold-primary)",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Change Service
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Metal & Purity
                  </label>
                  <select
                    value={metalType}
                    onChange={(e) => setMetalType(e.target.value)}
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
                    <option value="22K Gold">22K Gold (916 BIS Hallmark)</option>
                    <option value="18K Gold">18K Gold (750 Hallmark / Rose / White)</option>
                    <option value="24K Gold">24K Pure Gold</option>
                    <option value="925 Silver">925 Sterling Silver</option>
                    <option value="Platinum">950 Platinum</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Approximate Current Weight (grams)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8.42g (or as per purchase invoice)"
                    value={approxWeight}
                    onChange={(e) => setApproxWeight(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#161922",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "4px",
                      color: "#fff",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Dimensions / Target Size (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Current size 12, expand to size 16 / Chain length 18 inches"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#161922",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "4px",
                    color: "#fff",
                    fontSize: "0.85rem",
                  }}
                />
              </div>

              {/* Photo & Video Upload Mock */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Upload Inspection Media (Photos / 360° Video)
                </label>
                <div
                  style={{
                    border: "1px dashed rgba(212, 175, 55, 0.4)",
                    borderRadius: "6px",
                    padding: "20px",
                    textAlign: "center",
                    backgroundColor: "rgba(212, 175, 55, 0.02)",
                    cursor: "pointer",
                  }}
                >
                  <UploadCloud size={28} color="var(--gold-primary)" style={{ margin: "0 auto 8px" }} />
                  <div style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>
                    Drag & drop photos or close-up diagnostic videos
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Supports PNG, JPG, MP4 (Max 50MB) • Crucial for pre-intake digital condition report
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Detailed Problem Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the damage, loose stones, engraving preservation requirements, or special instructions..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#161922",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "4px",
                    color: "#fff",
                    fontSize: "0.85rem",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.15)",
                    padding: "10px 18px",
                    color: "var(--text-secondary)",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  style={{
                    background: "var(--gold-gradient)",
                    border: "none",
                    padding: "10px 24px",
                    color: "#0a0b0e",
                    fontWeight: 600,
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.88rem",
                  }}
                >
                  Continue to Armored Pickup →
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Armored Pickup & Customer Details */}
          {step === 3 && (
            <form onSubmit={handleBookingSubmit}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px",
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  borderRadius: "6px",
                  marginBottom: "20px",
                  fontSize: "0.8rem",
                  color: "#a7f3d0",
                }}
              >
                <ShieldCheck size={20} color="#10b981" />
                <span>
                  <strong>100% Insured Transit Guarantee:</strong> Your jewellery is sealed in a barcode-serialized tamper-evident bag in your presence. Inward weight is recorded under video surveillance on certified digital micro-scales.
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arundhati Rao"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#161922",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "4px",
                      color: "#fff",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Contact Phone Number (for Pickup OTP)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#161922",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "4px",
                      color: "#fff",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Email Address (for Digital Condition Report & Quotation)
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. arundhati@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#161922",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "4px",
                    color: "#fff",
                    fontSize: "0.85rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Secure Pickup Address
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Enter house/apartment number, street, landmark, and pincode..."
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#161922",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "4px",
                    color: "#fff",
                    fontSize: "0.85rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Preferred Pickup Slot
                </label>
                <select
                  value={pickupSlot}
                  onChange={(e) => setPickupSlot(e.target.value)}
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
                  <option value="Tomorrow, 10:00 AM - 1:00 PM">Tomorrow, 10:00 AM - 1:00 PM</option>
                  <option value="Tomorrow, 2:00 PM - 6:00 PM">Tomorrow, 2:00 PM - 6:00 PM</option>
                  <option value="Day After Tomorrow, 10:00 AM - 1:00 PM">Day After Tomorrow, 10:00 AM - 1:00 PM</option>
                  <option value="In-Boutique Dropoff (Bangalore Flagship)">In-Boutique Dropoff (Bangalore Flagship)</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={{
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.15)",
                    padding: "10px 18px",
                    color: "var(--text-secondary)",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  style={{
                    background: "var(--gold-gradient)",
                    border: "none",
                    padding: "10px 24px",
                    color: "#0a0b0e",
                    fontWeight: 600,
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.88rem",
                  }}
                >
                  Confirm & Generate Tracking Job Card →
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Live Job Card */}
          {step === 4 && (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.4rem",
                  color: "var(--gold-light)",
                  marginBottom: "8px",
                }}
              >
                Repair Job Dispatched to Logistics
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto 20px" }}>
                Your unique jewellery tracking number has been generated. Our armored courier will arrive with a serialized tamper-evident seal during your selected slot.
              </p>

              {/* Job Card Badge */}
              <div
                style={{
                  maxWidth: "400px",
                  margin: "0 auto 24px",
                  padding: "16px",
                  backgroundColor: "#12151c",
                  border: "1px dashed var(--gold-primary)",
                  borderRadius: "8px",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                  Unique Traceability ID
                </span>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "var(--gold-light)",
                    margin: "4px 0",
                  }}
                >
                  {generatedJobCode}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  Service: <strong>{activeServiceObj?.title}</strong> ({metalType})
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                <button
                  onClick={() => {
                    onClose();
                    onOpenTracker(generatedJobCode);
                  }}
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
                  Open Live Repair Stepper Tracker
                </button>
                <button
                  onClick={onClose}
                  style={{
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.15)",
                    padding: "12px 20px",
                    color: "var(--text-secondary)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.88rem",
                  }}
                >
                  Return to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
