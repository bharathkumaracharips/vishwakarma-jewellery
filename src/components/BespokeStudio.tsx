"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, Clock, MapPin, CheckCircle, Diamond } from "lucide-react";

interface BespokeStudioProps {
  onSuccessNotification?: (msg: string) => void;
}

export const BespokeStudio: React.FC<BespokeStudioProps> = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    boutique: "Mumbai Flagship - Bandra",
    service: "Bridal Jewellery Suite",
    date: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your name and contact phone number.");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <section id="bespoke" style={{
      padding: "90px 24px",
      maxWidth: "1400px",
      margin: "0 auto",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "50px",
        alignItems: "center",
      }}>
        {/* Left: Atelier Story & 3-Step Process */}
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
            <Diamond size={16} />
            <span>Vishwakarma Bespoke Atelier</span>
          </div>

          <h2 style={{
            fontSize: "clamp(2rem, 3.8vw, 2.8rem)",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}>
            Commission Your Custom Heirloom
          </h2>

          <p style={{
            fontSize: "0.98rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "32px",
          }}>
            Whether bringing a visionary bridal dream to life or remodeling an ancestral heirloom, our master karigars translate your story into immortal high jewellery.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[
              {
                step: "01",
                title: "Private Consultation",
                desc: "Meet one-on-one with our gemologists in our VIP private viewing salon or via 4K video consultation.",
              },
              {
                step: "02",
                title: "CAD & Wax Prototyping",
                desc: "Preview photorealistic 3D renders and try a precision physical wax mold to ensure flawless ergonomics.",
              },
              {
                step: "03",
                title: "Artisanal Hand-Setting",
                desc: "Forged in 22K/18K gold by heritage artisans, certified with BIS 916 laser hallmarking and lifetime provenance.",
              },
            ].map((st) => (
              <div key={st.step} style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
                <span style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--gold-primary)",
                  minWidth: "32px",
                }}>
                  {st.step}
                </span>
                <div>
                  <h4 style={{ fontSize: "1.05rem", color: "#fff", marginBottom: "4px" }}>{st.title}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Appointment Booking Box */}
        <div style={{
          backgroundColor: "var(--bg-card)",
          borderRadius: "14px",
          padding: "36px",
          border: "1px solid var(--border-gold-subtle)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 25px var(--gold-glow)",
        }}>
          {isSubmitted ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <CheckCircle size={56} color="#10b981" style={{ margin: "0 auto 16px auto" }} />
              <h3 style={{ fontSize: "1.4rem", color: "#fff", marginBottom: "8px" }}>
                Private Viewing Requested
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.6 }}>
                Namaste, <strong>{formData.name}</strong>. Our senior jewelry concierge has received your request for <strong>{formData.boutique}</strong>. We will contact you via WhatsApp / Phone shortly to confirm your private salon slot.
              </p>
              <div style={{
                padding: "12px",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "6px",
                fontSize: "0.8rem",
                color: "var(--gold-light)",
                border: "1px solid var(--border-gold-subtle)",
              }}>
                Appointment Ref: VJ-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                style={{
                  marginTop: "24px",
                  padding: "10px 20px",
                  background: "var(--gold-gradient)",
                  color: "#000",
                  fontWeight: 600,
                  borderRadius: "4px",
                  fontSize: "0.85rem",
                }}
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: "1.3rem", color: "#fff", marginBottom: "6px" }}>
                Schedule a VIP Consultation
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "20px" }}>
                Reserve dedicated time in our private viewing lounge.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-dark)",
                      color: "#fff",
                      fontSize: "0.88rem",
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-dark)",
                        color: "#fff",
                        fontSize: "0.88rem",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="radhika@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-dark)",
                        color: "#fff",
                        fontSize: "0.88rem",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Preferred Boutique Salon
                  </label>
                  <select
                    value={formData.boutique}
                    onChange={(e) => setFormData({ ...formData, boutique: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-dark)",
                      color: "#fff",
                      fontSize: "0.88rem",
                    }}
                  >
                    <option value="Mumbai Flagship - Bandra West">Mumbai Flagship - Bandra West</option>
                    <option value="Mumbai Heritage - Zaveri Bazaar">Mumbai Heritage - Zaveri Bazaar</option>
                    <option value="New Delhi - South Extension II">New Delhi - South Extension II</option>
                    <option value="Jaipur - Johari Bazaar">Jaipur - Johari Bazaar</option>
                    <option value="Bengaluru - UB City">Bengaluru - UB City</option>
                    <option value="Virtual 4K Video Appointment">Virtual 4K Video Appointment</option>
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                      Jewellery Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-dark)",
                        color: "#fff",
                        fontSize: "0.88rem",
                      }}
                    >
                      <option value="Bridal Jewellery Suite">Bridal Jewellery Suite</option>
                      <option value="Solitaire Engagement Ring">Solitaire Engagement Ring</option>
                      <option value="Temple Antique Gold">Temple Antique Gold</option>
                      <option value="Polki & Jadau Choker">Polki & Jadau Choker</option>
                      <option value="Ancestral Heirloom Redesign">Ancestral Heirloom Redesign</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-dark)",
                        color: "#fff",
                        fontSize: "0.88rem",
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="submit-bespoke-appointment-btn"
                  style={{
                    marginTop: "8px",
                    width: "100%",
                    padding: "13px",
                    background: "var(--gold-gradient)",
                    color: "#0a0b0e",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    borderRadius: "6px",
                    letterSpacing: "0.04em",
                    boxShadow: "0 4px 15px rgba(212, 175, 55, 0.25)",
                  }}
                >
                  Confirm VIP Reservation
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
