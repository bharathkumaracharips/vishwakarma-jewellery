"use client";

import React, { useState } from "react";
import { Sparkles, Heart, ShoppingBag, Menu, X, Calendar, PhoneCall } from "lucide-react";

interface NavbarProps {
  wishlistCount: number;
  cartCount: number;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenAppointment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
  onOpenAppointment,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Bridal Collection", href: "#catalog" },
    { label: "Antique & Temple Gold", href: "#catalog" },
    { label: "Solitaire Diamonds", href: "#catalog" },
    { label: "Bespoke Studio", href: "#bespoke" },
    { label: "Our Legacy", href: "#heritage" },
  ];

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 40,
      backgroundColor: "rgba(9, 10, 13, 0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border-gold-subtle)",
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
      }}>
        {/* Left: Mobile Menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: "none", color: "var(--gold-light)" }}
          className="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo */}
        <a href="#" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={20} color="var(--gold-primary)" />
            <span style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.45rem",
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
          <span style={{
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            paddingLeft: "28px",
          }}>
            Jewelers • Estd 1984
          </span>
        </a>

        {/* Center: Navigation Links (Desktop) */}
        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: "0.85rem",
                letterSpacing: "0.06em",
                color: "var(--text-secondary)",
                fontWeight: 500,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            id="nav-wishlist-btn"
            style={{
              position: "relative",
              padding: "8px",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
            title="Wishlist"
            aria-label="View Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "var(--ruby-accent)",
                color: "#fff",
                fontSize: "0.68rem",
                fontWeight: 700,
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            id="nav-cart-btn"
            style={{
              position: "relative",
              padding: "8px",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
            title="Shopping Cart"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "var(--gold-primary)",
                color: "#000",
                fontSize: "0.68rem",
                fontWeight: 700,
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Book VIP Appointment CTA */}
          <button
            onClick={onOpenAppointment}
            id="nav-book-appointment-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 18px",
              background: "var(--gold-gradient)",
              color: "#0a0b0e",
              fontWeight: 600,
              fontSize: "0.82rem",
              borderRadius: "4px",
              letterSpacing: "0.04em",
              boxShadow: "0 2px 10px rgba(212, 175, 55, 0.25)",
            }}
          >
            <Calendar size={14} />
            <span>Book VIP Visit</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: "var(--bg-secondary)",
          padding: "20px 24px",
          borderTop: "1px solid var(--border-gold-subtle)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "0.95rem",
                color: "var(--text-primary)",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAppointment();
            }}
            style={{
              marginTop: "8px",
              padding: "12px",
              background: "var(--gold-gradient)",
              color: "#000",
              fontWeight: 600,
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            Book In-Boutique Appointment
          </button>
        </div>
      )}
    </header>
  );
};
