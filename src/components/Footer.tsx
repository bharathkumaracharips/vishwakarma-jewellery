"use client";

import React, { useState } from "react";
import { Sparkles, MapPin, Phone, Mail, ShieldCheck, ArrowRight, Check } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer style={{
      backgroundColor: "var(--bg-secondary)",
      borderTop: "1px solid var(--border-gold-subtle)",
      paddingTop: "70px",
      paddingBottom: "40px",
      fontSize: "0.88rem",
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 24px",
      }}>
        {/* Main Footer Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "40px",
          marginBottom: "60px",
        }}>
          {/* Column 1: Brand & Philosophy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={20} color="var(--gold-primary)" />
              <span style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.4rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "var(--gold-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Vishwakarma
              </span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>
              Purveyors of divine goldsmithing, certified uncut diamonds, and sacred temple heirlooms since 1984. Honoring the spirit of the celestial architect.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--gold-light)", fontSize: "0.8rem" }}>
              <ShieldCheck size={18} />
              <span>100% BIS 916 HUID Laser-Hallmarked</span>
            </div>
          </div>

          {/* Column 2: Flagship Boutiques */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "1rem", marginBottom: "18px" }}>
              Flagship Boutiques
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", color: "var(--text-secondary)", fontSize: "0.82rem" }}>
              <div>
                <strong style={{ color: "#fff" }}>Mumbai (Salon & High Vault):</strong>
                <p style={{ color: "var(--text-muted)" }}>Plot 14, Turner Road, Bandra West & Zaveri Bazaar</p>
              </div>
              <div>
                <strong style={{ color: "#fff" }}>New Delhi:</strong>
                <p style={{ color: "var(--text-muted)" }}>E-12, South Extension Part II, New Delhi</p>
              </div>
              <div>
                <strong style={{ color: "#fff" }}>Jaipur (Kundan Atelier):</strong>
                <p style={{ color: "var(--text-muted)" }}>Johari Bazaar, Pink City, Jaipur</p>
              </div>
              <div>
                <strong style={{ color: "#fff" }}>Bengaluru:</strong>
                <p style={{ color: "var(--text-muted)" }}>The Collection, UB City, Vittal Mallya Road</p>
              </div>
            </div>
          </div>

          {/* Column 3: VIP Concierge */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "1rem", marginBottom: "18px" }}>
              VIP Concierge
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Phone size={16} color="var(--gold-primary)" />
                <span>+91 22 2640 8899 / +91 98200 11984</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Mail size={16} color="var(--gold-primary)" />
                <span>concierge@vishwakarmajewelers.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <MapPin size={16} color="var(--gold-primary)" />
                <span>Private Valet & High-Security Parking Available</span>
              </div>
              <div style={{ color: "var(--gold-light)", fontSize: "0.78rem", marginTop: "6px" }}>
                Salon Hours: 10:30 AM – 8:30 PM (All 7 Days)
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter / Private Salon Invitations */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "1rem", marginBottom: "18px" }}>
              The Private Gazette
            </h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "14px" }}>
              Subscribe for private previews of high jewellery releases, bullion market insights, and bridal trunk shows.
            </p>

            {subscribed ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
                fontSize: "0.82rem",
              }}>
                <Check size={16} />
                <span>You are invited to our Private Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex" }}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: "4px 0 0 4px",
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border-dark)",
                      color: "#fff",
                      fontSize: "0.82rem",
                    }}
                  />
                  <button
                    type="submit"
                    id="newsletter-subscribe-btn"
                    style={{
                      padding: "10px 16px",
                      background: "var(--gold-gradient)",
                      color: "#000",
                      borderRadius: "0 4px 4px 0",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: "24px",
          borderTop: "1px solid var(--border-dark)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          fontSize: "0.78rem",
          color: "var(--text-muted)",
        }}>
          <div>
            © {new Date().getFullYear()} Vishwakarma Jewelers Ltd. All rights reserved. Registered under Bureau of Indian Standards (BIS).
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="#" style={{ color: "var(--text-muted)" }}>Privacy Policy</a>
            <a href="#" style={{ color: "var(--text-muted)" }}>Hallmark Transparency</a>
            <a href="#" style={{ color: "var(--text-muted)" }}>Buyback Terms</a>
            <a href="#" style={{ color: "var(--text-muted)" }}>Terms of Heritage</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
