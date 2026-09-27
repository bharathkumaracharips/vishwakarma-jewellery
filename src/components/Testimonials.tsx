"use client";

import React from "react";
import { Star, Quote, Sparkles } from "lucide-react";

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Meera & Siddharth Singhania",
      city: "Mumbai",
      ornament: "Custom Rajwada Bridal Suite",
      quote:
        "Commissioning my wedding jewelry with Vishwakarma was the smoothest experience. The master karigars rendered my grandmother's motif in 22K gold with Colombian emeralds that left our entire wedding party speechless.",
      rating: 5,
    },
    {
      name: "Ananya Deshmukh",
      city: "Bengaluru",
      ornament: "2.5ct Celestial Solitaire Ring",
      quote:
        "The light performance of their triple-excellent GIA solitaire is mesmerizing. From certification verification to custom platinum prong setting, Vishwakarma represents genuine luxury.",
      rating: 5,
    },
    {
      name: "Rajeshwari Devi",
      city: "Jaipur",
      ornament: "Temple Antique Lakshmi Kada",
      quote:
        "True authentic temple carving is exceedingly rare today. Vishwakarma's Nakshi artisans have preserved pure Vedic goldsmithing. Their lifetime buyback and hallmark transparency give complete peace of mind.",
      rating: 5,
    },
  ];

  return (
    <section style={{
      padding: "80px 24px",
      backgroundColor: "var(--bg-primary)",
      maxWidth: "1400px",
      margin: "0 auto",
    }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
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
          <span>Heirloom Testimonials</span>
          <Sparkles size={16} />
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", lineHeight: 1.2 }}>
          Cherished by Generations
        </h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "28px",
      }}>
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "var(--bg-card)",
              borderRadius: "12px",
              padding: "32px",
              border: "1px solid var(--border-gold-subtle)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Quote size={28} color="rgba(212, 175, 55, 0.3)" style={{ marginBottom: "16px" }} />

            <div style={{ display: "flex", gap: "4px", marginBottom: "14px" }}>
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} size={15} fill="var(--gold-primary)" color="var(--gold-primary)" />
              ))}
            </div>

            <p style={{
              fontSize: "0.92rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "20px",
              fontStyle: "italic",
            }}>
              &ldquo;{rev.quote}&rdquo;
            </p>

            <div style={{ marginTop: "auto", borderTop: "1px solid var(--border-dark)", paddingTop: "14px" }}>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>{rev.name}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--gold-light)", marginTop: "2px" }}>
                {rev.ornament} • {rev.city}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
