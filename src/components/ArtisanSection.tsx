"use client";

import React, { useState } from "react";
import { masterArtisans } from "@/data/artisans";
import { Star, ShieldCheck, Hammer, Award, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { ArtisanProfile } from "@/types";

interface ArtisanSectionProps {
  onSelectArtisan?: (artisanId: string) => void;
  onOpenCustomWithArtisan?: (artisanName: string) => void;
}

export const ArtisanSection: React.FC<ArtisanSectionProps> = ({
  onSelectArtisan,
  onOpenCustomWithArtisan,
}) => {
  const [selectedArtisan, setSelectedArtisan] = useState<ArtisanProfile>(masterArtisans[0]);

  return (
    <section
      id="artisans"
      style={{
        padding: "100px 24px",
        backgroundColor: "#07080b",
        borderTop: "1px solid var(--border-gold-subtle)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "20px",
              backgroundColor: "rgba(212, 175, 55, 0.08)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              color: "var(--gold-light)",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "16px",
            }}
          >
            <Hammer size={14} />
            Master Goldsmiths & Artisan Guild
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "2.4rem",
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            Honoring the Sacred Hands Behind the Gold
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Unlike anonymous mass manufacturing, every heirloom piece at Vishwakarma is signed by a master craftsman. Explore their lineages, regional specialties, and commission directly from their bench.
          </p>
        </div>

        {/* Artisans Showcase Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "24px",
          }}
        >
          {masterArtisans.map((artisan) => (
            <div
              key={artisan.id}
              style={{
                backgroundColor: "#0d0f14",
                borderRadius: "8px",
                border: "1px solid var(--border-gold-subtle)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                transition: "transform 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold-primary)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-gold-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div>
                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.75rem",
                        color: "var(--gold-primary)",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {artisan.id}
                    </span>
                    <h3 style={{ fontSize: "1.25rem", color: "#fff", margin: "4px 0", fontWeight: 700 }}>
                      {artisan.name}
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--gold-light)", fontWeight: 500 }}>
                      {artisan.heritageTitle}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "rgba(212, 175, 55, 0.12)",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      color: "var(--gold-light)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                    }}
                  >
                    <Star size={14} fill="var(--gold-primary)" color="var(--gold-primary)" />
                    {artisan.rating}
                  </div>
                </div>

                {/* Location & Stats */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--text-secondary)",
                    fontSize: "0.78rem",
                    marginBottom: "16px",
                  }}
                >
                  <MapPin size={13} color="var(--gold-primary)" />
                  <span>{artisan.location}</span>
                  <span style={{ margin: "0 4px" }}>•</span>
                  <span>{artisan.lineageExperienceYears} Years Lineage</span>
                </div>

                {/* Bio */}
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "20px" }}>
                  "{artisan.bio}"
                </p>

                {/* Specialization Tags */}
                <div style={{ marginBottom: "20px" }}>
                  <span style={{ display: "block", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Specializations & Master Disciplines
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {artisan.specialization.map((spec) => (
                      <span
                        key={spec}
                        style={{
                          fontSize: "0.72rem",
                          padding: "3px 8px",
                          borderRadius: "3px",
                          backgroundColor: "rgba(255,255,255,0.04)",
                          color: "var(--gold-light)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Goldsmith Workshop Live Bench Stats */}
                <div
                  style={{
                    backgroundColor: "#11141c",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "4px" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Lifetime Handcrafted Orders:</span>
                    <strong style={{ color: "#fff" }}>{(artisan.completedJobs ?? 1200).toLocaleString()} Pieces</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Bench Active Gold Allocation:</span>
                    <strong style={{ color: "#34d399" }}>{artisan.goldInventoryAvailable.gold22k}g (22K)</strong>
                  </div>
                </div>
              </div>

              {/* Commission Action */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => onOpenCustomWithArtisan && onOpenCustomWithArtisan(artisan.name)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "var(--gold-gradient)",
                    border: "none",
                    borderRadius: "4px",
                    color: "#0a0b0e",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  Commission This Artisan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
