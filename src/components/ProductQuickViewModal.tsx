"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { X, ShieldCheck, Award, Heart, ShoppingBag, PhoneCall, Sparkles } from "lucide-react";

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 60,
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-gold-subtle)",
        borderRadius: "14px",
        width: "100%",
        maxWidth: "850px",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 30px 60px rgba(0,0,0,0.9), 0 0 35px var(--gold-glow)",
        position: "relative",
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-quickview-btn"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "var(--text-muted)",
            padding: "8px",
            zIndex: 10,
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          aria-label="Close Preview"
        >
          <X size={20} />
        </button>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
          padding: "32px",
        }}>
          {/* Image Container */}
          <div style={{
            position: "relative",
            width: "100%",
            height: "380px",
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid var(--border-gold-subtle)",
          }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: "cover" }}
            />
            {product.isBestseller && (
              <span style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                padding: "4px 10px",
                backgroundColor: "rgba(212, 175, 55, 0.9)",
                color: "#000",
                fontSize: "0.72rem",
                fontWeight: 700,
                borderRadius: "4px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                Bestseller
              </span>
            )}
          </div>

          {/* Details Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.75rem",
                color: "var(--gold-light)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}>
                <Sparkles size={13} color="var(--gold-primary)" />
                <span>{product.purity}</span>
              </div>

              <h2 style={{ fontSize: "1.45rem", lineHeight: 1.25, color: "#fff" }}>
                {product.name}
              </h2>
            </div>

            {/* Price section */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
              <span style={{
                fontSize: "1.65rem",
                fontWeight: 700,
                color: "var(--gold-light)",
                fontFamily: "var(--font-heading)",
              }}>
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span style={{
                  fontSize: "1.05rem",
                  color: "var(--text-muted)",
                  textDecoration: "line-through",
                }}>
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 600 }}>
                (Incl. of 3% GST & Insured Transit)
              </span>
            </div>

            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {product.description}
            </p>

            {/* Specifications Grid */}
            <div style={{
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "8px",
              padding: "14px 16px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              fontSize: "0.8rem",
              border: "1px solid var(--border-dark)",
            }}>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>Gross Weight:</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{product.weight}</span>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>Hallmark / Certificate:</span>
                <span style={{ fontWeight: 600, color: "var(--gold-light)" }}>{product.certification}</span>
              </div>
              {product.gemstones && (
                <div style={{ gridColumn: "span 2" }}>
                  <span style={{ color: "var(--text-muted)", display: "block" }}>Gemstone Accent:</span>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{product.gemstones}</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                id="quickview-add-to-cart-btn"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "13px",
                  background: "var(--gold-gradient)",
                  color: "#0a0b0e",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  borderRadius: "6px",
                }}
              >
                <ShoppingBag size={18} />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                id="quickview-wishlist-btn"
                style={{
                  padding: "12px",
                  border: isWishlisted ? "1px solid var(--ruby-accent)" : "1px solid var(--border-gold-subtle)",
                  backgroundColor: isWishlisted ? "rgba(159, 18, 57, 0.2)" : "rgba(255, 255, 255, 0.05)",
                  color: isWishlisted ? "#ff4d6d" : "var(--text-primary)",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Toggle Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? "#ff4d6d" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
