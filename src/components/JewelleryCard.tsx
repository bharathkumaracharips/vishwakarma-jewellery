"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  Transition,
  Variant,
} from "motion/react";
import { Product } from "@/types";
import {
  ShieldCheck,
  Heart,
  Plus,
  X,
  Hammer,
  Scale,
  Sparkles,
  ShoppingBag,
  FileCheck2,
  Check,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Dialog Context for Morphing Animation ---
interface DialogContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const DialogContext = React.createContext<DialogContextType | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}

interface DialogProviderProps {
  children: React.ReactNode;
  transition?: Transition;
}

function DialogProvider({ children, transition }: DialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
    [isOpen, uniqueId]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogContext.Provider>
  );
}

// --- Main Jewellery Card Component ---
interface JewelleryCardProps {
  product: Product;
  isWishlisted: boolean;
  isAuthenticated?: boolean;
  onRequireAuth?: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenPassportModal?: () => void;
  onOpenCustomDesign?: () => void;
}

export const JewelleryCard: React.FC<JewelleryCardProps> = ({
  product,
  isWishlisted,
  isAuthenticated = false,
  onRequireAuth,
  onToggleWishlist,
  onAddToCart,
  onOpenPassportModal,
  onOpenCustomDesign,
}) => {
  return (
    <DialogProvider
      transition={{
        type: "spring",
        bounce: 0.08,
        duration: 0.55,
      }}
    >
      <JewelleryCardInner
        product={product}
        isWishlisted={isWishlisted}
        isAuthenticated={isAuthenticated}
        onRequireAuth={onRequireAuth}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
        onOpenPassportModal={onOpenPassportModal}
        onOpenCustomDesign={onOpenCustomDesign}
      />
    </DialogProvider>
  );
};

const JewelleryCardInner: React.FC<JewelleryCardProps> = ({
  product,
  isWishlisted,
  isAuthenticated = false,
  onRequireAuth,
  onToggleWishlist,
  onAddToCart,
  onOpenPassportModal,
  onOpenCustomDesign,
}) => {
  const { isOpen, setIsOpen, uniqueId, triggerRef } = useDialog();
  const [isAdded, setIsAdded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const grossWeight = product.grossWeightGrams || parseFloat(product.weight) || 0;
  const netWeight = product.netGoldGrams || (grossWeight * 0.94).toFixed(2);
  const huidCode = product.huid || `VJ916-H${product.id.replace(/\D/g, "").padStart(4, "0")}`;

  const handleCardClick = () => {
    if (!isAuthenticated && onRequireAuth) {
      onRequireAuth(product);
      return;
    }
    // Track ornament view event in local MongoDB
    fetch("/api/auth/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: product.id,
        product_name: product.name,
        event: "ornament_card_click",
      }),
    }).catch(() => {});
    setIsOpen(true);
  };

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isAuthenticated && onRequireAuth) {
      onRequireAuth(product);
      return;
    }
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {/* --- Card in Grid (Trigger) --- */}
      <motion.div
        ref={triggerRef}
        layoutId={`jewellery-card-${uniqueId}`}
        onClick={handleCardClick}
        style={{
          borderRadius: "14px",
          backgroundColor: "#0d0f14",
          border: "1px solid rgba(212, 175, 55, 0.22)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
        }}
        whileHover={{
          y: -6,
          borderColor: "rgba(212, 175, 55, 0.55)",
          boxShadow:
            "0 20px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.2)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group"
      >
        {/* Image Box */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "290px",
            backgroundColor: "#090a0d",
            overflow: "hidden",
          }}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            layoutId={`jewellery-img-${uniqueId}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Luxury Ambient Shimmer Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(13, 15, 20, 0.1) 0%, rgba(13, 15, 20, 0.7) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Floating Badges */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              zIndex: 3,
            }}
          >
            {/* BIS Hallmark Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 8px",
                backgroundColor: "rgba(9, 10, 13, 0.85)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(212, 175, 55, 0.35)",
                borderRadius: "6px",
                color: "var(--gold-light)",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              <ShieldCheck size={12} color="var(--gold-primary)" />
              <span>BIS 916 • {product.purity}</span>
            </div>

            {product.isReadyToShip ? (
              <span
                style={{
                  padding: "3px 8px",
                  backgroundColor: "#10b981",
                  color: "#000",
                  fontSize: "0.64rem",
                  fontWeight: 700,
                  borderRadius: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Ready to Ship
              </span>
            ) : (
              <span
                style={{
                  padding: "3px 8px",
                  backgroundColor: "rgba(212, 175, 55, 0.2)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid var(--gold-primary)",
                  color: "var(--gold-light)",
                  fontSize: "0.64rem",
                  fontWeight: 600,
                  borderRadius: "4px",
                  textTransform: "uppercase",
                }}
              >
                Bespoke Order
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            id={`card-wishlist-${product.id}`}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: isWishlisted
                ? "var(--ruby-accent)"
                : "rgba(13, 15, 20, 0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              cursor: "pointer",
              zIndex: 4,
              transition: "transform 0.2s, background-color 0.2s",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isWishlisted ? "Remove from Wishlist" : "Save to Royal Wishlist"}
          >
            <Heart size={16} fill={isWishlisted ? "#fff" : "none"} />
          </motion.button>
        </div>

        {/* Card Content Details */}
        <div style={{ padding: "18px 20px" }}>
          {/* Artisan Signature */}
          {product.artisanName && (
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--gold-primary)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "6px",
                letterSpacing: "0.03em",
              }}
            >
              <Hammer size={12} />
              <span>By {product.artisanName}</span>
            </div>
          )}

          {/* Title with Morph layoutId */}
          <motion.h3
            layoutId={`jewellery-title-${uniqueId}`}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.1rem",
              color: "#fff",
              margin: "0 0 10px 0",
              lineHeight: 1.35,
              fontWeight: 600,
            }}
          >
            {product.name}
          </motion.h3>

          {/* Dual Weight Display (Gross & Net Pure Gold) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(212, 175, 55, 0.15)",
              borderRadius: "8px",
              padding: "7px 10px",
              marginBottom: "14px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.64rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Gross Weight
              </div>
              <div
                style={{
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "monospace",
                }}
              >
                {grossWeight}g
              </div>
            </div>

            <div style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.08)", paddingLeft: "8px" }}>
              <div
                style={{
                  fontSize: "0.64rem",
                  color: "var(--gold-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Net Gold
              </div>
              <div
                style={{
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  color: "var(--gold-light)",
                  fontFamily: "monospace",
                }}
              >
                {netWeight}g
              </div>
            </div>
          </div>

          {/* Price & Expand Morph Trigger Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "12px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "var(--gold-light)",
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "0.02em",
                }}
              >
                ₹{product.price.toLocaleString("en-IN")}
              </div>
              {product.originalPrice && (
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    textDecoration: "line-through",
                  }}
                >
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </div>
              )}
            </div>

            {/* Plus / Expand Action Button */}
            <motion.div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                border: "1px solid var(--gold-primary)",
                color: "var(--gold-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              whileHover={{
                backgroundColor: "var(--gold-primary)",
                color: "#000",
                scale: 1.08,
              }}
              whileTap={{ scale: 0.95 }}
              title="Inspect Piece & Provenance"
            >
              <Plus size={18} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* --- Expandable Morphing Luxury Dialog --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              key={`backdrop-${uniqueId}`}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(3, 4, 6, 0.85)",
                backdropFilter: "blur(12px)",
                zIndex: 90,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Dialog Content Container */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 95,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                pointerEvents: "none",
              }}
            >
              <motion.div
                ref={containerRef}
                layoutId={`jewellery-card-${uniqueId}`}
                style={{
                  pointerEvents: "auto",
                  width: "100%",
                  maxWidth: "960px",
                  maxHeight: "90vh",
                  backgroundColor: "#0d0f14",
                  border: "1.5px solid var(--gold-primary)",
                  borderRadius: "20px",
                  boxShadow:
                    "0 30px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.25)",
                  overflowY: "auto",
                  position: "relative",
                  color: "var(--text-primary)",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    position: "absolute",
                    top: "18px",
                    right: "18px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 10,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.2)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                  aria-label="Close Preview"
                >
                  <X size={20} />
                </button>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  }}
                >
                  {/* Left: High-Res Masterpiece Image with Radial Gold Spotlight */}
                  <div
                    style={{
                      position: "relative",
                      backgroundColor: "#08090d",
                      padding: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "380px",
                      overflow: "hidden",
                    }}
                  >
                    {/* Ambient Glow */}
                    <div
                      style={{
                        position: "absolute",
                        width: "300px",
                        height: "300px",
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />

                    <motion.img
                      src={product.image}
                      alt={product.name}
                      layoutId={`jewellery-img-${uniqueId}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "380px",
                        objectFit: "contain",
                        borderRadius: "12px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                        zIndex: 2,
                      }}
                    />
                  </div>

                  {/* Right: Technical Specifications & Valuation */}
                  <div style={{ padding: "36px 32px" }}>
                    {/* Category & Hallmark */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "var(--gold-primary)",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                        }}
                      >
                        {product.category}
                      </span>
                      <span style={{ color: "var(--text-muted)" }}>•</span>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <ShieldCheck size={13} color="var(--gold-primary)" />
                        BIS 916 Certified
                      </span>
                    </div>

                    {/* Title */}
                    <motion.h2
                      layoutId={`jewellery-title-${uniqueId}`}
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.7rem",
                        color: "#fff",
                        lineHeight: 1.25,
                        margin: "0 0 16px 0",
                      }}
                    >
                      {product.name}
                    </motion.h2>

                    {/* Master Artisan Heritage Note */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        backgroundColor: "rgba(212, 175, 55, 0.08)",
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        marginBottom: "20px",
                        fontSize: "0.78rem",
                      }}
                    >
                      <Hammer size={14} color="var(--gold-primary)" />
                      <span>
                        Craftsmanship:{" "}
                        <strong style={{ color: "var(--gold-light)" }}>
                          {product.craftsmanshipStyle || "Traditional Temple Hand-Carved"}
                        </strong>{" "}
                        by {product.artisanName || "Master Goldsmith Guild"}
                      </span>
                    </div>

                    {/* Dual Weight & Hallmarking Technical Card */}
                    <div
                      style={{
                        backgroundColor: "#13161f",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "10px",
                        padding: "14px 16px",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: "10px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Scale size={13} color="var(--gold-primary)" />
                        Verifiable Metal Weight Audit
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: "10px",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "rgba(0,0,0,0.3)",
                            padding: "8px",
                            borderRadius: "6px",
                          }}
                        >
                          <div style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>
                            Gross Weight
                          </div>
                          <div
                            style={{
                              fontSize: "0.95rem",
                              fontWeight: 700,
                              color: "#fff",
                              fontFamily: "monospace",
                            }}
                          >
                            {grossWeight}g
                          </div>
                        </div>

                        <div
                          style={{
                            backgroundColor: "rgba(212, 175, 55, 0.1)",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            padding: "8px",
                            borderRadius: "6px",
                          }}
                        >
                          <div style={{ fontSize: "0.68rem", color: "var(--gold-primary)" }}>
                            Net Pure Gold
                          </div>
                          <div
                            style={{
                              fontSize: "0.95rem",
                              fontWeight: 700,
                              color: "var(--gold-light)",
                              fontFamily: "monospace",
                            }}
                          >
                            {netWeight}g
                          </div>
                        </div>

                        <div
                          style={{
                            backgroundColor: "rgba(0,0,0,0.3)",
                            padding: "8px",
                            borderRadius: "6px",
                          }}
                        >
                          <div style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>
                            Laser HUID
                          </div>
                          <div
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: 700,
                              color: "#34d399",
                              fontFamily: "monospace",
                            }}
                          >
                            {huidCode}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "12px",
                        marginBottom: "24px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "2rem",
                          fontWeight: 700,
                          color: "var(--gold-light)",
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span
                          style={{
                            fontSize: "1rem",
                            color: "var(--text-muted)",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "#10b981",
                          fontWeight: 600,
                        }}
                      >
                        (Incl. 3% GST & Insured Dispatch)
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <button
                        onClick={() => handleAddToCart()}
                        style={{
                          width: "100%",
                          padding: "14px",
                          borderRadius: "8px",
                          backgroundColor: isAdded ? "#10b981" : "var(--gold-primary)",
                          color: "#000",
                          fontWeight: 700,
                          fontSize: "0.92rem",
                          letterSpacing: "0.04em",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          transition: "all 0.2s",
                        }}
                      >
                        {isAdded ? (
                          <>
                            <Check size={18} />
                            Secured in Royal Vault!
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={18} />
                            Add to Royal Vault
                          </>
                        )}
                      </button>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            if (onOpenPassportModal) onOpenPassportModal();
                          }}
                          style={{
                            padding: "10px",
                            borderRadius: "8px",
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            color: "var(--gold-light)",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          <FileCheck2 size={14} />
                          HUID Passport
                        </button>

                        <button
                          onClick={() => {
                            setIsOpen(false);
                            if (onOpenCustomDesign) onOpenCustomDesign();
                          }}
                          style={{
                            padding: "10px",
                            borderRadius: "8px",
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            color: "var(--text-secondary)",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          <Sparkles size={14} color="var(--gold-primary)" />
                          Custom Remake
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
