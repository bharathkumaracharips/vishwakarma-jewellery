"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, Award, Gem, ArrowRight, Calendar } from "lucide-react";

interface HeroProps {
  onOpenAppointment: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAppointment,
  onOpenCalculator,
}) => {
  return (
    <section style={{
      position: "relative",
      padding: "60px 24px 80px 24px",
      overflow: "hidden",
      background: "radial-gradient(ellipse at 50% 20%, rgba(212, 175, 55, 0.08) 0%, rgba(9, 10, 13, 0.98) 75%)",
    }}>
      {/* Decorative ambient background glows */}
      <div style={{
        position: "absolute",
        top: "10%",
        right: "5%",
        width: "350px",
        height: "350px",
        background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "48px",
        alignItems: "center",
      }}>
        {/* Left Column: Brand Story & Call to Action */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Royal Pill Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "30px",
            background: "rgba(212, 175, 55, 0.1)",
            border: "1px solid var(--border-gold-subtle)",
            width: "fit-content",
          }}>
            <Sparkles size={14} color="var(--gold-primary)" />
            <span style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "var(--gold-light)",
              textTransform: "uppercase",
            }}>
              Sacred Karigari • Estd 1984
            </span>
          </div>

          {/* Majestic Heading */}
          <h1 style={{
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            lineHeight: 1.15,
            fontWeight: 700,
          }}>
            Divine Artistry, <br />
            <span style={{
              background: "var(--gold-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Heirloom Heritage
            </span>
          </h1>

          <p style={{
            fontSize: "1.05rem",
            color: "var(--text-secondary)",
            maxWidth: "540px",
            lineHeight: 1.7,
          }}>
            Adorn your most cherished moments in pure 22K BIS Hallmarked gold, rare Colombian emeralds, and certified solitaire diamonds crafted by master artisans who have perfected their art across generations.
          </p>

          {/* Action CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", paddingTop: "8px" }}>
            <a
              href="#catalog"
              id="hero-explore-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                background: "var(--gold-gradient)",
                color: "#0a0b0e",
                fontWeight: 700,
                fontSize: "0.92rem",
                borderRadius: "4px",
                letterSpacing: "0.05em",
                boxShadow: "0 4px 20px rgba(212, 175, 55, 0.3)",
              }}
            >
              <span>Explore High Jewellery</span>
              <ArrowRight size={18} />
            </a>

            <button
              onClick={onOpenAppointment}
              id="hero-appointment-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 24px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--border-gold-subtle)",
                color: "var(--gold-light)",
                fontWeight: 600,
                fontSize: "0.92rem",
                borderRadius: "4px",
              }}
            >
              <Calendar size={18} />
              <span>Book In-Lounge Viewing</span>
            </button>
          </div>

          {/* Trust Value Badges Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border-dark)",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--gold-primary)" }}>
                <ShieldCheck size={16} />
                <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-primary)" }}>100% BIS 916</span>
              </div>
              <span style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>Govt. Certified Purity</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--gold-primary)" }}>
                <Award size={16} />
                <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-primary)" }}>IGI / GIA</span>
              </div>
              <span style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>Triple-Ex Solitaires</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--gold-primary)" }}>
                <Gem size={16} />
                <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-primary)" }}>Lifetime Value</span>
              </div>
              <span style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>100% Gold Buyback</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Showcase Visual */}
        <div style={{ position: "relative" }}>
          {/* Golden Frame Accent */}
          <div style={{
            position: "relative",
            borderRadius: "16px",
            padding: "10px",
            background: "linear-gradient(145deg, rgba(212, 175, 55, 0.4) 0%, rgba(212, 175, 55, 0.05) 50%, rgba(212, 175, 55, 0.3) 100%)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(212, 175, 55, 0.2)",
          }}>
            <div style={{
              position: "relative",
              width: "100%",
              height: "460px",
              borderRadius: "10px",
              overflow: "hidden",
            }}>
              <Image
                src="/images/hero-necklace.jpg"
                alt="Vishwakarma Jewelers Rajwada Emerald Bridal Choker"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(9, 10, 13, 0.85) 0%, transparent 60%)",
              }} />

              {/* Floating Highlight Card on Image */}
              <div style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                right: "20px",
                padding: "16px 20px",
                borderRadius: "8px",
                background: "rgba(18, 22, 30, 0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--border-gold-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Heirloom Masterpiece
                  </div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}>
                    The Rajwada Maharani Choker
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    22K Gold • Zambian Emeralds • Basra Pearls
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Price Estimate</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--gold-light)" }}>
                    ₹6,85,000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
