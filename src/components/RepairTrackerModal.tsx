"use client";

import React, { useState } from "react";
import { X, Search, CheckCircle2, Clock, ShieldCheck, Scale, UserCheck, MessageSquare, AlertCircle } from "lucide-react";
import { activeRepairRecords } from "@/data/repairs";
import { RepairRequest } from "@/types";

interface RepairTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackingCode?: string;
}

export const RepairTrackerModal: React.FC<RepairTrackerModalProps> = ({
  isOpen,
  onClose,
  initialTrackingCode = "JWL-REP-004821",
}) => {
  const [searchCode, setSearchCode] = useState(initialTrackingCode);
  const [activeRequest, setActiveRequest] = useState<RepairRequest | null>(
    activeRepairRecords[0] || null
  );
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = activeRepairRecords.find(
      (r) => r.id.toLowerCase() === searchCode.trim().toLowerCase()
    );
    if (found) {
      setActiveRequest(found);
      setNotFound(false);
    } else {
      // Create a simulated live request if not strictly found
      if (searchCode.toUpperCase().startsWith("JWL-REP-")) {
        setActiveRequest({
          ...activeRepairRecords[0],
          id: searchCode.toUpperCase(),
        });
        setNotFound(false);
      } else {
        setNotFound(true);
      }
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
          maxWidth: "800px",
          maxHeight: "90vh",
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
            <Scale size={20} color="var(--gold-primary)" />
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.25rem",
                  color: "var(--gold-light)",
                  margin: 0,
                }}
              >
                Jewellery Custody & Repair Live Tracker
              </h2>
              <p style={{ margin: "2px 0 0 0", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                Real-Time Chain of Custody • Inward vs Outward Weight Audit
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

        {/* Search Bar */}
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
                placeholder="Enter Repair ID (e.g. JWL-REP-004821)"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
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
              Track Item
            </button>
          </form>
          {notFound && (
            <p style={{ margin: "8px 0 0 0", color: "#f87171", fontSize: "0.78rem" }}>
              Tracking code not found. Please try example code <strong>JWL-REP-004821</strong>.
            </p>
          )}
        </div>

        {/* Tracking Details */}
        {activeRequest && (
          <div style={{ padding: "24px" }}>
            {/* Top Summary Card */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
                padding: "16px",
                backgroundColor: "#13161f",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.08)",
                marginBottom: "24px",
              }}
            >
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                  Tracking Code
                </span>
                <div style={{ fontFamily: "monospace", fontSize: "1.05rem", fontWeight: 700, color: "var(--gold-light)" }}>
                  {activeRequest.id}
                </div>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                  Customer
                </span>
                <div style={{ fontSize: "0.88rem", fontWeight: 600 }}>{activeRequest.customerName}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                  Inward Weight (Scale)
                </span>
                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#34d399" }}>
                  {activeRequest.inwardWeight || activeRequest.approxWeight}
                </div>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                  Assigned Goldsmith
                </span>
                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--gold-primary)" }}>
                  {activeRequest.assignedArtisan || "Bench Master #04"}
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <h4
              style={{
                fontSize: "0.92rem",
                color: "var(--gold-light)",
                letterSpacing: "0.04em",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              Live Custody Checkpoints
            </h4>

            <div style={{ position: "relative", paddingLeft: "32px" }}>
              {/* Vertical guideline */}
              <div
                style={{
                  position: "absolute",
                  left: "11px",
                  top: "10px",
                  bottom: "20px",
                  width: "2px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              />

              {activeRequest.timeline.map((event, idx) => {
                const isCurrent = !event.completed && event.timestamp === "Currently Active";
                const isPending = !event.completed && !isCurrent;

                return (
                  <div key={idx} style={{ position: "relative", marginBottom: "20px" }}>
                    {/* Checkpoint Dot */}
                    <div
                      style={{
                        position: "absolute",
                        left: "-32px",
                        top: "2px",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: event.completed
                          ? "#10b981"
                          : isCurrent
                          ? "var(--gold-primary)"
                          : "#1a1d26",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: event.completed || isCurrent ? "#000" : "rgba(255,255,255,0.3)",
                        boxShadow: isCurrent ? "0 0 12px var(--gold-primary)" : "none",
                      }}
                    >
                      {event.completed ? (
                        <CheckCircle2 size={16} />
                      ) : isCurrent ? (
                        <Clock size={14} />
                      ) : (
                        <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>{idx + 1}</span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div
                      style={{
                        backgroundColor: isCurrent ? "rgba(212, 175, 55, 0.08)" : "transparent",
                        padding: isCurrent ? "12px" : "0",
                        borderRadius: "6px",
                        border: isCurrent ? "1px solid rgba(212, 175, 55, 0.25)" : "none",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <h5
                          style={{
                            margin: 0,
                            fontSize: "0.92rem",
                            fontWeight: 600,
                            color: event.completed ? "#fff" : isCurrent ? "var(--gold-light)" : "var(--text-secondary)",
                          }}
                        >
                          {event.label}
                        </h5>
                        <span style={{ fontSize: "0.72rem", color: isCurrent ? "var(--gold-primary)" : "rgba(255,255,255,0.4)" }}>
                          {event.timestamp}
                        </span>
                      </div>

                      {event.notes && (
                        <p style={{ margin: "4px 0 0 0", fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                          {event.notes}
                        </p>
                      )}

                      {event.recordedWeight && (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            marginTop: "6px",
                            padding: "3px 8px",
                            backgroundColor: "rgba(16, 185, 129, 0.15)",
                            color: "#6ee7b7",
                            borderRadius: "4px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                          }}
                        >
                          <Scale size={12} />
                          Verified Inward Gross Weight: {event.recordedWeight}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Goldsmith Chat CTA */}
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                borderRadius: "6px",
                backgroundColor: "rgba(212, 175, 55, 0.04)",
                border: "1px solid var(--border-gold-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>
                  Have questions about this repair?
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  Connect directly with the bench goldsmith handling job #{activeRequest.id}
                </div>
              </div>
              <button
                onClick={() => alert(`Connecting you to bench thread for ${activeRequest.id}...`)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: "#25D366",
                  color: "#000",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <MessageSquare size={14} />
                Message Goldsmith on Bench
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
