"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CartItem } from "@/types";
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Check } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const gst = subtotal * 0.03;
  const grandTotal = subtotal + gst;

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      setCheckoutComplete(false);
      onClose();
    }, 3000);
  };

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
            <ShoppingBag size={20} color="var(--gold-primary)" />
            <h3 style={{ fontSize: "1.15rem", color: "#fff" }}>
              Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            id="close-cart-drawer-btn"
            style={{ color: "var(--text-muted)", padding: "6px" }}
            aria-label="Close Shopping Bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {checkoutComplete ? (
            <div style={{ textAlign: "center", padding: "60px 10px" }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
              }}>
                <Check size={32} />
              </div>
              <h4 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "8px" }}>
                Order Inscribed Successfully!
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Our master concierge will reach out to schedule secure armored courier delivery or in-boutique pickup.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 10px", color: "var(--text-muted)" }}>
              <ShoppingBag size={48} style={{ opacity: 0.3, margin: "0 auto 12px auto" }} />
              <p style={{ fontSize: "0.95rem" }}>Your shopping bag is empty.</p>
              <p style={{ fontSize: "0.8rem", marginTop: "4px" }}>Discover our heirloom jewelry collection.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {items.map(({ product, quantity }) => (
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
                        {product.purity} • {product.weight}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                      <span style={{ fontWeight: 700, color: "var(--gold-light)", fontSize: "0.92rem" }}>
                        ₹{(product.price * quantity).toLocaleString("en-IN")}
                      </span>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "rgba(255,255,255,0.06)",
                          borderRadius: "4px",
                          border: "1px solid var(--border-dark)",
                        }}>
                          <button
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            style={{ padding: "4px 6px", color: "var(--text-muted)" }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: "0.78rem", padding: "0 6px", fontWeight: 600 }}>{quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            style={{ padding: "4px 6px", color: "var(--text-muted)" }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(product.id)}
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

        {/* Drawer Footer with Totals */}
        {items.length > 0 && !checkoutComplete && (
          <div style={{
            padding: "20px 24px",
            borderTop: "1px solid var(--border-dark)",
            backgroundColor: "var(--bg-secondary)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "12px" }}>
              <span>GST (3%):</span>
              <span>₹{Math.round(gst).toLocaleString("en-IN")}</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.1rem",
              fontWeight: 700,
              paddingTop: "10px",
              borderTop: "1px solid var(--border-dark)",
              marginBottom: "16px",
            }}>
              <span style={{ color: "#fff" }}>Grand Total:</span>
              <span style={{ color: "var(--gold-light)", fontFamily: "var(--font-heading)" }}>
                ₹{Math.round(grandTotal).toLocaleString("en-IN")}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.72rem", marginBottom: "16px" }}>
              <ShieldCheck size={14} color="var(--gold-primary)" />
              <span>Complimentary Armored & Insured Transit Included</span>
            </div>

            <button
              onClick={handleCheckout}
              id="cart-checkout-btn"
              style={{
                width: "100%",
                padding: "13px",
                background: "var(--gold-gradient)",
                color: "#0a0b0e",
                fontWeight: 700,
                fontSize: "0.92rem",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <span>Proceed to Inscribed Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
