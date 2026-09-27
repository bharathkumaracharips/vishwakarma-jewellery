"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Wrench,
  RefreshCw,
  Award,
  Layers,
  Search,
  Hammer,
  Clock,
  Compass,
  UploadCloud,
  User,
  Crown,
  Store,
  LogOut,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { ProductCategory, UserProfile } from "@/types";

interface MegaNavbarProps {
  wishlistCount: number;
  cartCount: number;
  currentUser?: UserProfile | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenAppointment: () => void;
  onOpenRepairIntake: () => void;
  onOpenRepairTracker: () => void;
  onOpenCustomDesign: (mode?: "upload_design" | "scratch") => void;
  onOpenTransformGold: () => void;
  onOpenPassportModal: () => void;
  onSelectCategoryFilter?: (cat: ProductCategory) => void;
}

export const MegaNavbar: React.FC<MegaNavbarProps> = ({
  wishlistCount,
  cartCount,
  currentUser = null,
  onOpenAuth,
  onSignOut,
  onOpenWishlist,
  onOpenCart,
  onOpenAppointment,
  onOpenRepairIntake,
  onOpenRepairTracker,
  onOpenCustomDesign,
  onOpenTransformGold,
  onOpenPassportModal,
  onSelectCategoryFilter,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleCategoryClick = (cat: ProductCategory) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onSelectCategoryFilter) {
      onSelectCategoryFilter(cat);
    }
    const el = document.getElementById("catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(9, 10, 13, 0.94)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border-gold-subtle)",
      }}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: "none", color: "var(--gold-light)", background: "none", border: "none", cursor: "pointer" }}
          className="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo */}
        <a
          href="#"
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px", textDecoration: "none" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={20} color="var(--gold-primary)" />
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.45rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "var(--gold-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Vishwakarma
            </span>
          </div>
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.26em",
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              paddingLeft: "28px",
            }}
          >
            Fine Jewellery & Artisan Guild
          </span>
        </a>

        {/* Main Desktop Navigation Items */}
        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }} className="desktop-nav">
          {/* 1. SHOP MEGA MENU */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setActiveDropdown("shop")}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: activeDropdown === "shop" ? "var(--gold-light)" : "var(--text-secondary)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                padding: "8px 0",
              }}
            >
              SHOP <ChevronDown size={14} />
            </button>

            {activeDropdown === "shop" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "-120px",
                  width: "680px",
                  backgroundColor: "#0d0f14",
                  border: "1px solid var(--border-gold-subtle)",
                  borderRadius: "8px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                  padding: "24px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "24px",
                  zIndex: 60,
                }}
              >
                <div>
                  <h4 style={{ fontSize: "0.75rem", color: "var(--gold-primary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                    Fine Jewellery
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      { label: "Rings", cat: "rings" },
                      { label: "Earrings & Jhumkas", cat: "earrings" },
                      { label: "Necklaces & Chokers", cat: "necklaces" },
                      { label: "Solid Gold Chains", cat: "chains" },
                      { label: "Bangles & Kadas", cat: "bangles" },
                      { label: "Mangalsutras", cat: "mangalsutras" },
                      { label: "Pendants", cat: "pendants" },
                      { label: "Bracelets", cat: "bracelets" },
                    ].map((item) => (
                      <span
                        key={item.cat}
                        onClick={() => handleCategoryClick(item.cat as ProductCategory)}
                        style={{ fontSize: "0.82rem", color: "var(--text-secondary)", cursor: "pointer", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: "0.75rem", color: "var(--gold-primary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                    Curated Collections
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      { label: "Bridal Heirloom Suites", cat: "bridal" },
                      { label: "Men's Sovereign Signets", cat: "mens" },
                      { label: "Solitaire Diamonds", cat: "diamond" },
                      { label: "Handmade Temple Nakshi", cat: "bangles" },
                      { label: "Silver Filigree (Tarakasi)", cat: "silver" },
                      { label: "Precious Gemstones", cat: "gemstones" },
                    ].map((item) => (
                      <span
                        key={item.label}
                        onClick={() => handleCategoryClick(item.cat as ProductCategory)}
                        style={{ fontSize: "0.82rem", color: "var(--text-secondary)", cursor: "pointer", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Banner inside Shop mega menu */}
                <div
                  style={{
                    backgroundColor: "rgba(212, 175, 55, 0.05)",
                    border: "1px solid rgba(212, 175, 55, 0.15)",
                    borderRadius: "6px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--gold-primary)", textTransform: "uppercase", fontWeight: 700 }}>
                      Custom Commission
                    </span>
                    <h5 style={{ margin: "6px 0", fontSize: "0.95rem", color: "#fff" }}>
                      Have a Pinterest or Instagram photo?
                    </h5>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                      Upload any image reference to generate a 3D CAD model and get an exact quote.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      onOpenCustomDesign("upload_design");
                    }}
                    style={{
                      marginTop: "12px",
                      padding: "8px",
                      background: "var(--gold-gradient)",
                      color: "#000",
                      fontWeight: 600,
                      fontSize: "0.78rem",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Upload Reference Image
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. CUSTOM JEWELLERY */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setActiveDropdown("custom")}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: activeDropdown === "custom" ? "var(--gold-light)" : "var(--text-secondary)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                padding: "8px 0",
              }}
            >
              CUSTOM STUDIO <ChevronDown size={14} />
            </button>

            {activeDropdown === "custom" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  width: "360px",
                  backgroundColor: "#0d0f14",
                  border: "1px solid var(--border-gold-subtle)",
                  borderRadius: "8px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  zIndex: 60,
                }}
              >
                <div
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenCustomDesign("upload_design");
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--gold-light)", fontWeight: 600, fontSize: "0.85rem" }}>
                    <UploadCloud size={16} /> 📸 "I Have a Design"
                  </div>
                  <p style={{ margin: "4px 0 0 0", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    Upload reference photo to craft something identical or customized.
                  </p>
                </div>

                <div
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenCustomDesign("scratch");
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--gold-light)", fontWeight: 600, fontSize: "0.85rem" }}>
                    <Sparkles size={16} /> ✨ Create Your Jewellery
                  </div>
                  <p style={{ margin: "4px 0 0 0", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    Configure silhouette, metal purity, diamond carat, and ring size.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 3. REPAIR JEWELLERY */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setActiveDropdown("repair")}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: activeDropdown === "repair" ? "var(--gold-light)" : "var(--text-secondary)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                padding: "8px 0",
              }}
            >
              🛠️ REPAIR <ChevronDown size={14} />
            </button>

            {activeDropdown === "repair" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  width: "360px",
                  backgroundColor: "#0d0f14",
                  border: "1px solid var(--border-gold-subtle)",
                  borderRadius: "8px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  zIndex: 60,
                }}
              >
                <div
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenRepairIntake();
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--gold-light)", fontWeight: 600, fontSize: "0.85rem" }}>
                    <Wrench size={16} /> Book Repair & Armored Pickup
                  </div>
                  <p style={{ margin: "4px 0 0 0", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    18 services: Resizing, Soldering, Stone setting, Polishing, Recasting.
                  </p>
                </div>

                <div
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenRepairTracker();
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--gold-light)", fontWeight: 600, fontSize: "0.85rem" }}>
                    <Clock size={16} /> Track In-Progress Repair
                  </div>
                  <p style={{ margin: "4px 0 0 0", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    View calibrated inward weight, assigned artisan, and bench progress.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 4. TRANSFORM GOLD */}
          <button
            onClick={onOpenTransformGold}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
              padding: "8px 0",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            ♻️ TRANSFORM GOLD
          </button>

          {/* 5. MASTER ARTISANS */}
          <a
            href="#artisans"
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "8px 0",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            👨🎨 ARTISANS
          </a>

          {/* 6. DIGITAL PASSPORT */}
          <button
            onClick={onOpenPassportModal}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
              padding: "8px 0",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            🧪 PASSPORT
          </button>
        </nav>

        {/* Action Buttons on Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            style={{
              position: "relative",
              padding: "8px",
              color: "var(--text-secondary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span
                style={{
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
                }}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            style={{
              position: "relative",
              padding: "8px",
              color: "var(--text-secondary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span
                style={{
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
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* User Vault Account / Auth Pill */}
          {!currentUser ? (
            <button
              onClick={onOpenAuth}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                background: "rgba(212, 175, 55, 0.08)",
                border: "1px solid rgba(212, 175, 55, 0.35)",
                borderRadius: "6px",
                color: "var(--gold-light)",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.16)";
                e.currentTarget.style.borderColor = "var(--gold-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.08)";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.35)";
              }}
              title="Sign in or register your jewellery vault"
            >
              <Crown size={15} color="var(--gold-primary)" />
              <span>Sign In / Vault</span>
            </button>
          ) : (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 12px",
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  borderRadius: "20px",
                  color: "#fff",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    backgroundColor: "var(--gold-primary)",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  {currentUser.role === "customer" ? "👑" : currentUser.role === "goldsmith" ? "🔨" : "🏛️"}
                </div>
                <span>{currentUser.name.split(" ")[0]}</span>
                <ChevronDown size={14} color="var(--gold-light)" />
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: "300px",
                    backgroundColor: "#0d0f14",
                    border: "1px solid rgba(212, 175, 55, 0.35)",
                    borderRadius: "10px",
                    boxShadow: "0 20px 45px rgba(0, 0, 0, 0.85)",
                    padding: "16px",
                    zIndex: 100,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {/* Header Profile summary */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background: "rgba(212, 175, 55, 0.2)",
                        border: "1px solid rgba(212, 175, 55, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                      }}
                    >
                      {currentUser.role === "customer" ? "👑" : currentUser.role === "goldsmith" ? "🔨" : "🏛️"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {currentUser.name}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--gold-primary)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                        {currentUser.role === "customer" ? "Verified Vault Patron" : currentUser.role === "goldsmith" ? "Master Goldsmith" : "Guild Retail Partner"}
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "#64748b" }}>
                        {currentUser.city || "Bangalore Hub"}
                      </div>
                    </div>
                  </div>

                  {/* Role details box */}
                  <div
                    style={{
                      padding: "8px 10px",
                      background: "rgba(255, 255, 255, 0.03)",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      fontSize: "0.74rem",
                    }}
                  >
                    {currentUser.role === "customer" && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#94a3b8" }}>Digital Gold Vault:</span>
                        <span style={{ color: "#fef08a", fontWeight: 700 }}>{currentUser.vaultBalanceGrams || 14.85}g 24K</span>
                      </div>
                    )}
                    {currentUser.role === "goldsmith" && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#94a3b8" }}>Bench Lineage:</span>
                        <span style={{ color: "#fef08a", fontWeight: 700 }}>{currentUser.workbenchTier || "Master 5th Gen"}</span>
                      </div>
                    )}
                    {currentUser.role === "retailer" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span style={{ color: "#94a3b8" }}>{currentUser.companyName || "Kalyan Heritage Vault"}</span>
                        <span style={{ color: "#64748b", fontSize: "0.68rem" }}>GST: {currentUser.gstin || "29AABCU9603R1ZM"}</span>
                      </div>
                    )}
                  </div>

                  {/* Quick shortcuts */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onOpenPassportModal();
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        padding: "6px 8px",
                        borderRadius: "4px",
                        color: "var(--gold-light)",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <ShieldCheck size={14} /> My Digital Passports & HUIDs
                    </button>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onOpenRepairTracker();
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        padding: "6px 8px",
                        borderRadius: "4px",
                        color: "#e2e8f0",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <Clock size={14} /> Track Orders & Repairs
                    </button>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onSignOut();
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        padding: "6px 8px",
                        borderRadius: "4px",
                        color: "#f87171",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "4px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <LogOut size={14} /> Sign Out of Vault
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Book VIP CTA */}
          <button
            onClick={onOpenAppointment}
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
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(212, 175, 55, 0.25)",
            }}
          >
            Book VIP Visit
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: "var(--bg-secondary)",
            padding: "20px 24px",
            borderTop: "1px solid var(--border-gold-subtle)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* Mobile User Profile Section */}
          <div
            style={{
              padding: "12px",
              backgroundColor: "rgba(212, 175, 55, 0.08)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              borderRadius: "8px",
              marginBottom: "6px",
            }}
          >
            {currentUser ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{currentUser.name}</div>
                  <div style={{ color: "var(--gold-primary)", fontSize: "0.72rem", textTransform: "uppercase" }}>
                    {currentUser.role} • {currentUser.city || "Bangalore"}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  style={{
                    background: "none",
                    border: "1px solid rgba(239, 68, 68, 0.4)",
                    color: "#f87171",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.72rem",
                    cursor: "pointer",
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "var(--gold-gradient)",
                  border: "none",
                  borderRadius: "6px",
                  color: "#000",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Crown size={16} /> Sign In or Register Vault
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRepairIntake();
            }}
            style={{ textAlign: "left", background: "none", border: "none", color: "#fff", fontSize: "0.95rem", padding: "6px 0" }}
          >
            🛠️ Book Jewellery Repair (18 Services)
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCustomDesign("upload_design");
            }}
            style={{ textAlign: "left", background: "none", border: "none", color: "#fff", fontSize: "0.95rem", padding: "6px 0" }}
          >
            📸 Upload Design ("I Have a Design")
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTransformGold();
            }}
            style={{ textAlign: "left", background: "none", border: "none", color: "#fff", fontSize: "0.95rem", padding: "6px 0" }}
          >
            ♻️ Transform Old Gold to New Jewellery
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPassportModal();
            }}
            style={{ textAlign: "left", background: "none", border: "none", color: "#fff", fontSize: "0.95rem", padding: "6px 0" }}
          >
            🧪 Verify Digital Jewellery Passport
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRepairTracker();
            }}
            style={{ textAlign: "left", background: "none", border: "none", color: "#fff", fontSize: "0.95rem", padding: "6px 0" }}
          >
            📦 Track Ongoing Repair / Order
          </button>
        </div>
      )}
    </header>
  );
};
