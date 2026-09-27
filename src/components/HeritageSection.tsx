"use client";

import React from "react";
import { ShieldCheck, Gem, Sparkles, RefreshCw, Feather, CheckCircle2 } from "lucide-react";

export const HeritageSection: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck size={28} color="var(--gold-primary)" />,
      title: "100% BIS Hallmarked 916",
      desc: "Every gram of gold is tested and laser-inscribed with 6-digit HUID purity standards certified by the Government of India.",
    },
    {
      icon: <Gem size={28} color="var(--gold-primary)" />,
      title: "Ethically Sourced Diamonds",
      desc: "All solitaires are graded by GIA and IGI with Triple Excellent cuts, strictly adhering to the Kimberley Process.",
    },
    {
      icon: <Feather size={28} color="var(--gold-primary)" />,
      title: "Master Karigari Heritage",
      desc: "Preserving royal Rajasthani Kundan, Tanjore temple carving, and Bengal filigree traditions spanning four decades.",
    },
    {
      icon: <RefreshCw size={28} color="var(--gold-primary)" />,
      title: "Lifetime Buyback & Exchange",
      desc: "Guaranteed 100% gold value exchange across any of our flagship boutiques nationwide, accompanied by complimentary lifetime rejuvenation.",
    },
  ];

  return (
    <section id="heritage" style={{
      padding: "90px 24px",
      backgroundColor: "var(--bg-secondary)",
      borderTop: "1px solid var(--border-gold-subtle)",
      borderBottom: "1px solid var(--border-gold-subtle)",
      position: "relative",
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
      }}>
        {/* Heritage Story Intro */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "48px",
          alignItems: "center",
          marginBottom: "70px",
        }}>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--gold-primary)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}>
              <Sparkles size={16} />
              <span>The Sacred Legacy</span>
            </div>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 2.9rem)",
              lineHeight: 1.2,
              marginBottom: "18px",
            }}>
              Born from the Spirit of the Divine Architect
            </h2>
            <p style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginBottom: "16px",
            }}>
              Named after Lord Vishwakarma—the celestial architect and craftsman of the gods—Vishwakarma Jewelers was established in 1984 with a singular reverence: to forge wearable masterpieces that transcend fashion into immortal family heirlooms.
            </p>
            <p style={{
              fontSize: "0.95rem",
              color: "var(--text-muted)",
              lineHeight: 1.8,
            }}>
              Over forty years and three generations, our ateliers have adorned over fifteen thousand royal brides and jewelry connoisseurs, marrying Vedic goldsmithing secrets with state-of-the-art precision.
            </p>
          </div>

          {/* Legacy Achievement Stats Box */}
          <div style={{
            backgroundColor: "var(--bg-card)",
            borderRadius: "14px",
            padding: "36px",
            border: "1px solid var(--border-gold-subtle)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px",
          }}>
            <div>
              <div style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "var(--gold-light)",
              }}>
                40+
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                Years of Pure Heritage
              </div>
            </div>

            <div>
              <div style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "var(--gold-light)",
              }}>
                15K+
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                Royal Brides Adorned
              </div>
            </div>

            <div>
              <div style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "var(--gold-light)",
              }}>
                100%
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                BIS 916 HUID Purity
              </div>
            </div>

            <div>
              <div style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "var(--gold-light)",
              }}>
                4
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                Flagship Boutiques
              </div>
            </div>
          </div>
        </div>

        {/* 4 Trust Pillars */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}>
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "10px",
                padding: "28px 24px",
                border: "1px solid var(--border-dark)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-gold-subtle)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-dark)")}
            >
              <div>{pillar.icon}</div>
              <h3 style={{ fontSize: "1.1rem", color: "#fff" }}>{pillar.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
