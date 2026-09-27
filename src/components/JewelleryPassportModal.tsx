"use client";

import React, { useState } from "react";
import { X, Search, ShieldCheck, QrCode, Award, CheckCircle2, User, Sparkles, FileText, ExternalLink } from "lucide-react";
import { registeredPassports } from "@/data/passports";
import { DigitalJewelleryPassport } from "@/types";

interface JewelleryPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPassportId?: string;
}

export const JewelleryPassportModal: React.FC<JewelleryPassportModalProps> = ({
  isOpen,
  onClose,
  initialPassportId = "JWL-2026-000184",
}) => {
  const [searchId, setSearchId] = useState(initialPassportId);
  const [activePassport, setActivePassport] = useState<DigitalJewelleryPassport | null>(
    registeredPassports[initialPassportId] || registeredPassports["JWL-2026-000184"]
  );
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchId.trim().toUpperCase();
    if (registeredPassports[clean]) {
      setActivePassport(registeredPassports[clean]);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
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
            <Award size={22} color="var(--gold-primary)" />
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.3rem",
                  color: "var(--gold-light)",
                  margin: 0,
                }}
              >
                Digital Jewellery Passport & Provenance
              </h2>
              <p style={{ margin: "2px 0 0 0", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                Cryptographic Authenticity • BIS HUID Hallmarking • Master Artisan Attribution
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

        {/* Passport Search Lookup */}
        <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search
                size={16}
                color="var(--text-secondary)"
                style={{ position: "absolute", left: "12px", top: "12px" }}
              />
              <input
                type="text"
                placeholder="Enter Passport ID (e.g. JWL-2026-000184 or JWL-2026-000215)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 10px 10px 38px",
                  backgroundColor: "#161922",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "0.85rem",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: "var(--gold-gradient)",
                border: "none",
                padding: "10px 20px",
                color: "#0a0b0e",
                fontWeight: 600,
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              Verify Passport
            </button>
          </form>
          {notFound && (
            <p style={{ margin: "8px 0 0 0", color: "#f87171", fontSize: "0.78rem" }}>
              Passport ID not found. Try sample codes <strong>JWL-2026-000184</strong> or <strong>JWL-2026-000215</strong>.
            </p>
          )}
        </div>

        {/* Passport Certificate Card */}
        {activePassport && (
          <div style={{ padding: "24px" }}>
            <div
              style={{
                border: "2px solid var(--border-gold-subtle)",
                borderRadius: "8px",
                backgroundColor: "#0a0c10",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              {/* Gold Top Banner */}
              <div
                style={{
                  background: "var(--gold-gradient)",
                  color: "#000",
                  padding: "8px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                <span>Vishwakarma Official Certificate of Authenticity</span>
                <span>BIS Registered • India</span>
              </div>

              <div style={{ padding: "24px" }}>
                {/* Passport Title Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", letterSpacing: "0.1em" }}>
                      DIGITAL JEWELLERY PASSPORT NO.
                    </span>
                    <h3
                      style={{
                        fontFamily: "monospace",
                        fontSize: "1.6rem",
                        color: "var(--gold-light)",
                        letterSpacing: "0.08em",
                        margin: "4px 0",
                      }}
                    >
                      {activePassport.passportId}
                    </h3>
                    <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff" }}>
                      {activePassport.title}
                    </div>
                  </div>

                  {/* QR Code Graphic Badge */}
                  <div
                    style={{
                      border: "1px solid rgba(212, 175, 55, 0.4)",
                      padding: "8px",
                      borderRadius: "6px",
                      textAlign: "center",
                      backgroundColor: "#fff",
                      color: "#000",
                    }}
                  >
                    <QrCode size={56} />
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, marginTop: "2px" }}>SCAN TO VERIFY</div>
                  </div>
                </div>

                {/* Specs Matrix */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                    gap: "16px",
                    padding: "16px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                      Metal & Purity
                    </span>
                    <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--gold-light)" }}>
                      {activePassport.purity}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                      Gross Weight
                    </span>
                    <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#fff" }}>
                      {activePassport.grossWeight}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                      Net Pure Gold
                    </span>
                    <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#34d399" }}>
                      {activePassport.netGoldWeight}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                      Gemstones / Diamonds
                    </span>
                    <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#fff" }}>
                      {activePassport.gemstoneCarat}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                      BIS HUID Laser Inscription
                    </span>
                    <div style={{ fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 700, color: "var(--gold-primary)" }}>
                      {activePassport.huidNumber}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                      Crafted By Master Artisan
                    </span>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>
                      {activePassport.artisanName}
                    </div>
                  </div>
                </div>

                {/* Quality Verification Status Checkpoints */}
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "0.85rem", color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
                    Triple-Level Assaying & Quality Checks
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                    <div style={{ padding: "10px", borderRadius: "4px", backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle2 size={16} color="#10b981" />
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#a7f3d0" }}>XRF Purity: Verified</span>
                    </div>
                    <div style={{ padding: "10px", borderRadius: "4px", backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle2 size={16} color="#10b981" />
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#a7f3d0" }}>Gross Weight: Verified</span>
                    </div>
                    <div style={{ padding: "10px", borderRadius: "4px", backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle2 size={16} color="#10b981" />
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#a7f3d0" }}>Stones & Claw: Verified</span>
                    </div>
                  </div>
                </div>

                {/* Immutable Provenance Audit Trail */}
                <div>
                  <h4 style={{ fontSize: "0.85rem", color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
                    Immutable Lifecycle Provenance History
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {activePassport.provenanceHistory.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "6px",
                          backgroundColor: "#13161f",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gold-primary)" }}>
                            {item.event.replace(/_/g, " ")}
                          </span>
                          <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>{item.date}</span>
                        </div>
                        <p style={{ margin: "0 0 6px 0", fontSize: "0.78rem", color: "#fff", lineHeight: 1.4 }}>
                          {item.notes}
                        </p>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)" }}>
                          <span>Actor: {item.actor}</span>
                          <span style={{ fontFamily: "monospace", color: "var(--gold-light)" }}>Hash: {item.hashPointer}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
