"use client";

import React, { useState } from "react";
import { Product, ProductCategory } from "@/types";
import { Sparkles } from "lucide-react";
import { JewelleryCard } from "@/components/JewelleryCard";

interface ProductCatalogProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  activeCategoryFilter?: ProductCategory | "all";
  onOpenPassportModal?: () => void;
  onOpenCustomDesign?: () => void;
  isAuthenticated?: boolean;
  onRequireAuth?: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  activeCategoryFilter = "all",
  onOpenPassportModal,
  onOpenCustomDesign,
  isAuthenticated = false,
  onRequireAuth,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(activeCategoryFilter);
  const [activePurity, setActivePurity] = useState<string>("all");
  const [activeWeightFilter, setActiveWeightFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Sync prop changes
  React.useEffect(() => {
    if (activeCategoryFilter) {
      setActiveCategory(activeCategoryFilter);
    }
  }, [activeCategoryFilter]);

  const categories: { id: string; label: string }[] = [
    { id: "all", label: "All Masterpieces" },
    { id: "bridal", label: "Bridal Suites" },
    { id: "necklaces", label: "Necklaces & Chokers" },
    { id: "rings", label: "Rings & Solitaires" },
    { id: "bangles", label: "Temple Bangles & Kadas" },
    { id: "earrings", label: "Antique Jhumkas" },
    { id: "mens", label: "Men's Sovereign" },
    { id: "chains", label: "Hand-Linked Chains" },
    { id: "mangalsutras", label: "Sacred Mangalsutras" },
  ];

  const purities = [
    { id: "all", label: "All Purities" },
    { id: "22K", label: "22K Gold (916)" },
    { id: "18K", label: "18K Gold (750)" },
  ];

  const weightBrackets = [
    { id: "all", label: "All Weights" },
    { id: "under10", label: "< 10 grams" },
    { id: "10to40", label: "10g - 40g" },
    { id: "over40", label: "> 40 grams" },
  ];

  const filteredProducts = products.filter((item) => {
    if (activeCategory !== "all" && item.category !== activeCategory) return false;
    if (activePurity !== "all" && item.metalPurity !== activePurity) return false;
    if (activeWeightFilter !== "all") {
      const g = item.grossWeightGrams || parseFloat(item.weight) || 0;
      if (activeWeightFilter === "under10" && g >= 10) return false;
      if (activeWeightFilter === "10to40" && (g < 10 || g > 40)) return false;
      if (activeWeightFilter === "over40" && g <= 40) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0; // featured default
  });

  return (
    <section
      id="catalog"
      style={{
        padding: "80px 24px",
        maxWidth: "1440px",
        margin: "0 auto",
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--gold-primary)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          <Sparkles size={16} />
          <span>The Vishwakarma Royal Vault</span>
          <Sparkles size={16} />
        </div>
        <h2
          style={{
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            lineHeight: 1.2,
            marginBottom: "14px",
          }}
        >
          Signature Fine Jewellery & Artisan Vault
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
            maxWidth: "680px",
            margin: "0 auto",
          }}
        >
          Discover master-crafted ornaments with verifiable net gold weight, BIS HUID laser hallmarks, and direct master artisan attribution.
        </p>
      </div>

      {/* Filter and Sort Bar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "36px",
          paddingBottom: "20px",
          borderBottom: "1px solid var(--border-dark)",
        }}
      >
        {/* Row 1: Category Filter Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "8px 16px",
                borderRadius: "30px",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                backgroundColor: activeCategory === cat.id ? "rgba(212, 175, 55, 0.18)" : "transparent",
                border: activeCategory === cat.id ? "1px solid var(--gold-primary)" : "1px solid var(--border-dark)",
                color: activeCategory === cat.id ? "var(--gold-light)" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Row 2: Secondary Filters (Purity, Weight, Sort) */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
            {/* Purity Pills */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Purity:</span>
              {purities.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePurity(p.id)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    backgroundColor: activePurity === p.id ? "rgba(212, 175, 55, 0.2)" : "rgba(255,255,255,0.03)",
                    border: activePurity === p.id ? "1px solid var(--gold-primary)" : "1px solid rgba(255,255,255,0.08)",
                    color: activePurity === p.id ? "var(--gold-light)" : "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Weight Brackets */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Weight:</span>
              {weightBrackets.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setActiveWeightFilter(w.id)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    backgroundColor: activeWeightFilter === w.id ? "rgba(212, 175, 55, 0.2)" : "rgba(255,255,255,0.03)",
                    border: activeWeightFilter === w.id ? "1px solid var(--gold-primary)" : "1px solid rgba(255,255,255,0.08)",
                    color: activeWeightFilter === w.id ? "var(--gold-light)" : "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Select */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "6px 12px",
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-dark)",
                borderRadius: "6px",
                color: "var(--text-primary)",
                fontSize: "0.82rem",
                cursor: "pointer",
              }}
            >
              <option value="featured">Heirloom Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid with Morphing Expandable JewelleryCards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gap: "28px",
        }}
      >
        {sortedProducts.map((product) => (
          <JewelleryCard
            key={product.id}
            product={product}
            isWishlisted={wishlistIds.includes(product.id)}
            isAuthenticated={isAuthenticated}
            onRequireAuth={onRequireAuth}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onOpenPassportModal={onOpenPassportModal}
            onOpenCustomDesign={onOpenCustomDesign}
          />
        ))}
      </div>
    </section>
  );
};
