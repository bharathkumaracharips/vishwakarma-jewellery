"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 70,
      backgroundColor: "rgba(0,0,0,0.75)",
      backdropFilter: "blur(6px)",
      display: "flex",
      justifyContent: "flex-end",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "460px",
        height: "100%",
        backgroundColor: "var(--bg-card)",
        borderLeft: "1px solid var(--border-gold-subtle)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "-10px 0 30px rgba(0,0,0,0.8)",
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-dark)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Heart size={20} color="#ff4d6d" fill="#ff4d6d" />
            <h3 style={{ fontSize: "1.15rem", color: "#fff" }}>
              My Wishlist ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            id="close-wishlist-drawer-btn"
            style={{ color: "var(--text-muted)", padding: "6px" }}
            aria-label="Close Wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {wishlistProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 10px", color: "var(--text-muted)" }}>
              <Heart size={48} style={{ opacity: 0.3, margin: "0 auto 12px auto" }} />
              <p style={{ fontSize: "0.95rem" }}>Your wishlist is empty.</p>
              <p style={{ fontSize: "0.8rem", marginTop: "4px" }}>Click the heart icon on any jewelry piece to save it here.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    gap: "14px",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-dark)",
                  }}
                >
                  <div style={{
                    position: "relative",
                    width: "72px",
                    height: "72px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="72px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h4 style={{ fontSize: "0.88rem", color: "#fff", lineHeight: 1.3, marginBottom: "2px" }}>
                        {product.name}
                      </h4>
                      <div style={{ fontSize: "0.72rem", color: "var(--gold-primary)" }}>
                        {product.purity}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                      <span style={{ fontWeight: 700, color: "var(--gold-light)", fontSize: "0.92rem" }}>
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button
                          onClick={() => {
                            onAddToCart(product);
                            onRemoveFromWishlist(product);
                          }}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "4px",
                            background: "var(--gold-gradient)",
                            color: "#000",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <ShoppingBag size={12} />
                          <span>Move to Bag</span>
                        </button>

                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          style={{ color: "var(--text-muted)", padding: "4px" }}
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
