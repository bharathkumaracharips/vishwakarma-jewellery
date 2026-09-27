"use client";

import React, { useState } from "react";
import { X, Sparkles, UploadCloud, CheckCircle2, Box, Eye, Layers, ShieldCheck, ArrowRight } from "lucide-react";

interface CustomDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "upload_design" | "scratch";
}

export const CustomDesignModal: React.FC<CustomDesignModalProps> = ({
  isOpen,
  onClose,
  initialMode = "upload_design",
}) => {
  const [mode, setMode] = useState<"upload_design" | "scratch">(initialMode);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [jewelleryType, setJewelleryType] = useState<string>("Ring");
  const [metal, setMetal] = useState<string>("22K Yellow Gold (916)");
  const [approxWeight, setApproxWeight] = useState<string>("8.50");
  const [stonePreference, setStonePreference] = useState<string>("Solitaire Diamond (VVS1/E-Color)");
  const [size, setSize] = useState<string>("Size 21");
  const [budget, setBudget] = useState<string>("₹80,000 - ₹1,20,000");
  const [notes, setNotes] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [hasUploadedSample, setHasUploadedSample] = useState<boolean>(true);
  const [generatedRequestId, setGeneratedRequestId] = useState<string>("JWL-DES-00918");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = `JWL-DES-00${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedRequestId(randomId);
    setStep(3);
  };

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
              <Sparkles size={20} />
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
                Custom Jewellery & CAD Design Studio
              </h2>
              <p style={{ margin: "2px 0 0 0", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                “I Have a Design” Upload • 3D Rhino/CAD Modeling • Direct Master Goldsmith Casting
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
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "#090a0d",
          }}
        >
          <button
            onClick={() => {
              setMode("upload_design");
              setStep(1);
            }}
            style={{
              flex: 1,
              padding: "14px",
              background: mode === "upload_design" ? "rgba(212, 175, 55, 0.1)" : "none",
              border: "none",
              borderBottom: mode === "upload_design" ? "2px solid var(--gold-primary)" : "none",
              color: mode === "upload_design" ? "var(--gold-light)" : "var(--text-secondary)",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <UploadCloud size={16} />
            📸 "I Have a Design" (Instagram/Pinterest Reference)
          </button>
          <button
            onClick={() => {
              setMode("scratch");
              setStep(1);
            }}
            style={{
              flex: 1,
              padding: "14px",
              background: mode === "scratch" ? "rgba(212, 175, 55, 0.1)" : "none",
              border: "none",
              borderBottom: mode === "scratch" ? "2px solid var(--gold-primary)" : "none",
              color: mode === "scratch" ? "var(--gold-light)" : "var(--text-secondary)",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Box size={16} />
            ✨ Create Your Jewellery (From Scratch Configurator)
          </button>
        </div>

        <div style={{ padding: "24px" }}>
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              {mode === "upload_design" ? (
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "8px" }}>
                    Upload Reference Images (Instagram / Pinterest / Sketch / Physical Photo)
                  </label>
                  <div
                    style={{
                      border: "2px dashed rgba(212, 175, 55, 0.35)",
                      borderRadius: "8px",
                      padding: "24px",
                      textAlign: "center",
                      backgroundColor: "rgba(212, 175, 55, 0.02)",
                      cursor: "pointer",
                    }}
                    onClick={() => setHasUploadedSample(true)}
                  >
                    <UploadCloud size={32} color="var(--gold-primary)" style={{ margin: "0 auto 8px" }} />
                    <div style={{ fontSize: "0.9rem", color: "#fff", fontWeight: 600 }}>
                      Drop screenshots or camera photos here
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                      Our 3D CAD team will recreate this exact silhouette or customize elements to your taste.
                    </div>
                    {hasUploadedSample && (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          marginTop: "12px",
                          padding: "4px 10px",
                          backgroundColor: "rgba(16, 185, 129, 0.15)",
                          color: "#34d399",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                        }}
                      >
                        <CheckCircle2 size={14} /> 1 Reference image attached (mens_royal_signet_ref.jpg)
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: "16px",
                    backgroundColor: "rgba(212, 175, 55, 0.05)",
                    borderRadius: "6px",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    marginBottom: "20px",
                    fontSize: "0.82rem",
                    color: "var(--gold-light)",
                  }}
                >
                  Configure your bespoke piece below. Our master goldsmiths and CAD sculptors will generate a 3D model for your approval before casting.
                </div>
              )}

              {/* Grid Form Fields */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Jewellery Category
                  </label>
                  <select
                    value={jewelleryType}
                    onChange={(e) => setJewelleryType(e.target.value)}
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
                    <option value="Ring">Ring (Men's / Women's / Solitaire)</option>
                    <option value="Necklace">Necklace / Choker / Royal Har</option>
                    <option value="Chain">Solid Handcrafted Gold Chain</option>
                    <option value="Bangle">Bangles / Royal Kada</option>
                    <option value="Earrings">Earrings / Jhumkas / Chandbalis</option>
                    <option value="Pendant">Pendant / Devotional Icon</option>
                    <option value="Mangalsutra">Bespoke Diamond Mangalsutra</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Metal & Purity
                  </label>
                  <select
                    value={metal}
                    onChange={(e) => setMetal(e.target.value)}
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
                    <option value="22K Yellow Gold (916)">22K Yellow Gold (BIS 916)</option>
                    <option value="18K Rose Gold (750)">18K Rose Gold (BIS 750)</option>
                    <option value="18K White Gold (750)">18K White Gold (BIS 750)</option>
                    <option value="Platinum 950">Platinum 950</option>
                    <option value="24K Pure Gold Casting">24K Pure Gold Casting</option>
                    <option value="925 Sterling Silver">925 Sterling Silver</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Target Weight (approx. grams)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8.5g or 15-20g"
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

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Size / Dimensions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Indian Ring Size 21 or 2.4 Bangle size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Stone / Diamond Preference
                  </label>
                  <select
                    value={stonePreference}
                    onChange={(e) => setStonePreference(e.target.value)}
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
                    <option value="Solitaire Diamond (VVS1/E-Color)">Natural Solitaire Diamond (GIA/IGI)</option>
                    <option value="Uncut Polki & Kundan">Heritage Uncut Polki Diamonds</option>
                    <option value="Zambian Emeralds">Natural Zambian / Colombian Emeralds</option>
                    <option value="Burmese Rubies">Natural Burmese Pigeon Blood Rubies</option>
                    <option value="Navratna Gemstones">Sacred Navratna Nine-Gems</option>
                    <option value="Plain Gold (No Stones)">Solid Plain Gold (No Stones)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Estimated Target Budget
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹80,000 - ₹1,20,000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
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

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Special Details & Engravings
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention finish (satin matte / high polish), inner shank engraving text, or specific cultural motifs..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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

              {/* 3D CAD Production Pipeline Visualizer */}
              <div
                style={{
                  padding: "14px",
                  borderRadius: "6px",
                  backgroundColor: "#11141c",
                  border: "1px solid rgba(255,255,255,0.08)",
                  marginBottom: "20px",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "var(--gold-light)", fontWeight: 600, textTransform: "uppercase", marginBottom: "8px" }}>
                  Digital Bespoke CAD Lifecycle
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                  <span>1. Design Upload</span>
                  <span>→</span>
                  <span>2. 3D Rhino CAD Model</span>
                  <span>→</span>
                  <span>3. WebGL 3D Preview</span>
                  <span>→</span>
                  <span>4. Transparent Quote</span>
                  <span>→</span>
                  <span>5. Artisan Casting</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
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
                  Proceed to Contact Details →
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: "1.1rem", color: "var(--gold-light)", marginBottom: "16px" }}>
                Where should we send your 3D CAD preview & quotation?
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Singhania"
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
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99880 77665"
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

              {/* Review Specs Summary */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "6px",
                  backgroundColor: "#13161f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  marginBottom: "20px",
                }}
              >
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--gold-primary)", marginBottom: "8px" }}>
                  Design Request Summary
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "0.78rem" }}>
                  <div>Category: <strong>{jewelleryType}</strong></div>
                  <div>Metal: <strong>{metal}</strong></div>
                  <div>Target Weight: <strong>~{approxWeight}g</strong></div>
                  <div>Size: <strong>{size}</strong></div>
                  <div>Stones: <strong>{stonePreference}</strong></div>
                  <div>Budget: <strong>{budget}</strong></div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                    padding: "12px 24px",
                    color: "#0a0b0e",
                    fontWeight: 600,
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.88rem",
                  }}
                >
                  Submit Custom Commission Request →
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(212, 175, 55, 0.15)",
                  color: "var(--gold-primary)",
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
                CAD Design Request Registered
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto 20px" }}>
                Your request has been routed to our Senior Jewellery Modeler. You will receive an interactive 3D link and exact quotation within 24 hours.
              </p>

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
                  Design Docket Reference
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
                  {generatedRequestId}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  Estimated CAD Turnaround: <strong>24 Hours</strong>
                </div>
              </div>

              <button
                onClick={onClose}
                style={{
                  background: "var(--gold-gradient)",
                  border: "none",
                  padding: "12px 28px",
                  color: "#0a0b0e",
                  fontWeight: 600,
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.88rem",
                }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
