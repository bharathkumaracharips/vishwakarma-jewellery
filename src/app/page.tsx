"use client";

import React, { useState } from "react";
import { initialProducts } from "@/data/products";
import { Product, CartItem, ProductCategory, BullionRates, UserProfile, UserRole } from "@/types";
import { GoldRateTicker } from "@/components/GoldRateTicker";
import { MegaNavbar } from "@/components/MegaNavbar";
import { Hero } from "@/components/Hero";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ArtisanSection } from "@/components/ArtisanSection";
import { HeritageSection } from "@/components/HeritageSection";
import { BespokeStudio } from "@/components/BespokeStudio";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

// Modals & Traceability Drawers
import { GoldCalculatorModal } from "@/components/GoldCalculatorModal";
import { ProductQuickViewModal } from "@/components/ProductQuickViewModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { RepairIntakeModal } from "@/components/RepairIntakeModal";
import { RepairTrackerModal } from "@/components/RepairTrackerModal";
import { CustomDesignModal } from "@/components/CustomDesignModal";
import { TransformGoldModal } from "@/components/TransformGoldModal";
import { JewelleryPassportModal } from "@/components/JewelleryPassportModal";
import { AuthModal } from "@/components/AuthModal";

export default function Home() {
  const [rates, setRates] = useState<BullionRates | null>(null);
  const [products] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(["vj-01", "vj-04"]);
  const [activeCatalogCategory, setActiveCatalogCategory] = useState<ProductCategory | "all">("all");

  // User Profile & Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState<UserRole>("customer");
  const [pendingOrnament, setPendingOrnament] = useState<Product | null>(null);
  const [authPromptReason, setAuthPromptReason] = useState<string | undefined>(undefined);

  // Check if visitor is regular / registered, otherwise prompt them on initial load with Skip option
  React.useEffect(() => {
    try {
      const savedUser = localStorage.getItem("vj_auth_user");
      const isGuest = sessionStorage.getItem("vj_browsing_guest");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else if (!isGuest) {
        // First-time visitor: prompt them to sign in or register with Skip option
        const timer = setTimeout(() => {
          setIsAuthOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn("Visitor check error", e);
    }
  }, []);

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem("vj_auth_user", JSON.stringify(user));
    } catch {}

    // If an ornament click triggered this auth modal, track it in MongoDB and open it now
    if (pendingOrnament) {
      fetch("/api/auth/track-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          product_id: pendingOrnament.id,
          product_name: pendingOrnament.name,
          event: "ornament_inspect_after_auth",
        }),
      }).catch(() => {});

      setQuickViewProduct(pendingOrnament);
      setPendingOrnament(null);
      setAuthPromptReason(undefined);
    }
  };

  const handleSkipGuest = () => {
    try {
      sessionStorage.setItem("vj_browsing_guest", "true");
    } catch {}
    setIsAuthOpen(false);
    setPendingOrnament(null);
    setAuthPromptReason(undefined);
  };

  const handleRequireAuth = (product: Product) => {
    setPendingOrnament(product);
    setAuthPromptReason(
      `Sign in or register to inspect hallmark certifications, dual-weight breakdowns, or customize "${product.name}".`
    );
    setIsAuthOpen(true);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("vj_auth_user");
    } catch {}
  };

  // Ingest live rates dynamically on load (Zero hardcoded values)
  React.useEffect(() => {
    let isMounted = true;
    const fetchLiveBullionRates = async () => {
      try {
        const savedCity = typeof window !== "undefined" ? localStorage.getItem("vj_selected_city") || "bangalore" : "bangalore";
        const res = await fetch(`/api/rates?city=${savedCity}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setRates(data);
          }
        }
      } catch (err) {
        console.warn("Awaiting live market stream...", err);
      }
    };
    fetchLiveBullionRates();
    return () => { isMounted = false; };
  }, []);

  // Interactive Platform Modals
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // New Phase 1 Enterprise Modules
  const [isRepairIntakeOpen, setIsRepairIntakeOpen] = useState(false);
  const [isRepairTrackerOpen, setIsRepairTrackerOpen] = useState(false);
  const [activeTrackerCode, setActiveTrackerCode] = useState<string>("JWL-REP-004821");
  const [isCustomDesignOpen, setIsCustomDesignOpen] = useState(false);
  const [customDesignMode, setCustomDesignMode] = useState<"upload_design" | "scratch">("upload_design");
  const [isTransformGoldOpen, setIsTransformGoldOpen] = useState(false);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  const [activePassportId, setActivePassportId] = useState<string>("JWL-2026-000184");

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const scrollToBespoke = () => {
    const el = document.getElementById("bespoke");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-primary)" }}>
      {/* 1. Live Gold & Silver Rates Ticker Bar */}
      <GoldRateTicker
        rates={rates}
        onRatesUpdate={(updated) => setRates(updated)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* 2. Luxury Mega Navigation Bar */}
      <MegaNavbar
        wishlistCount={wishlistIds.length}
        cartCount={totalCartCount}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAppointment={scrollToBespoke}
        onOpenRepairIntake={() => setIsRepairIntakeOpen(true)}
        onOpenRepairTracker={() => setIsRepairTrackerOpen(true)}
        onOpenCustomDesign={(mode) => {
          setCustomDesignMode(mode || "upload_design");
          setIsCustomDesignOpen(true);
        }}
        onOpenTransformGold={() => setIsTransformGoldOpen(true)}
        onOpenPassportModal={() => setIsPassportModalOpen(true)}
        onSelectCategoryFilter={(cat) => setActiveCatalogCategory(cat)}
      />

      {/* 3. Hero Presentation & Quick Service Launchpad */}
      <main style={{ flex: 1 }}>
        <Hero
          onOpenAppointment={scrollToBespoke}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        {/* 4. Signature Collections & Interactive Catalog */}
        <ProductCatalog
          products={products}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          activeCategoryFilter={activeCatalogCategory}
          onOpenPassportModal={() => setIsPassportModalOpen(true)}
          isAuthenticated={!!currentUser}
          onRequireAuth={handleRequireAuth}
          onOpenCustomDesign={() => {
            setCustomDesignMode("scratch");
            setIsCustomDesignOpen(true);
          }}
        />

        {/* 5. Master Goldsmiths & Artisan Guild Showcase */}
        <ArtisanSection
          onOpenCustomWithArtisan={(artisanName) => {
            setCustomDesignMode("scratch");
            setIsCustomDesignOpen(true);
          }}
        />

        {/* 6. Sacred Heritage & Quality Pillars */}
        <HeritageSection />

        {/* 7. Bespoke Commission Studio & VIP Appointment Booking */}
        <BespokeStudio />

        {/* 8. Client Heirloom Testimonials */}
        <Testimonials />
      </main>

      {/* 9. Boutique Locations & Footer */}
      <Footer />

      {/* ---------------------------------------------------- */}
      {/* PLATFORM MODALS & DRAWERS                            */}
      {/* ---------------------------------------------------- */}

      {/* 18-Service Jewellery Hospital & Armored Pickup Intake */}
      <RepairIntakeModal
        isOpen={isRepairIntakeOpen}
        onClose={() => setIsRepairIntakeOpen(false)}
        onOpenTracker={(code) => {
          setActiveTrackerCode(code);
          setIsRepairTrackerOpen(true);
        }}
      />

      {/* Real-time Repair & Chain of Custody Live Stepper */}
      <RepairTrackerModal
        isOpen={isRepairTrackerOpen}
        onClose={() => setIsRepairTrackerOpen(false)}
        initialTrackingCode={activeTrackerCode}
      />

      {/* "I Have a Design" & Custom Jewellery Studio */}
      <CustomDesignModal
        isOpen={isCustomDesignOpen}
        onClose={() => setIsCustomDesignOpen(false)}
        initialMode={customDesignMode}
      />

      {/* "Transform My Gold" & Gold Exchange Engine */}
      <TransformGoldModal
        isOpen={isTransformGoldOpen}
        onClose={() => setIsTransformGoldOpen(false)}
        rates={rates}
        onCityChange={(cityId) => {
          if (rates?.cities && rates.cities[cityId]) {
            const cityData = rates.cities[cityId];
            setRates((prev) => prev ? ({
              ...prev,
              gold24k: cityData.gold24k,
              gold22k: cityData.gold22k,
              gold18k: cityData.gold18k,
              silver999: cityData.silver999,
              selectedCity: cityId,
            }) : null);
            try {
              localStorage.setItem("vj_selected_city", cityId);
            } catch {}
          }
        }}
        onOpenCustomDesign={() => {
          setIsTransformGoldOpen(false);
          setCustomDesignMode("scratch");
          setIsCustomDesignOpen(true);
        }}
      />

      {/* Digital Jewellery Passport & HUID Provenance */}
      <JewelleryPassportModal
        isOpen={isPassportModalOpen}
        onClose={() => setIsPassportModalOpen(false)}
        initialPassportId={activePassportId}
      />

      {/* Standard Modals */}
      <GoldCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        rates={rates}
        onCityChange={(cityId) => {
          if (rates?.cities && rates.cities[cityId]) {
            const cityData = rates.cities[cityId];
            setRates((prev) => prev ? ({
              ...prev,
              gold24k: cityData.gold24k,
              gold22k: cityData.gold22k,
              gold18k: cityData.gold18k,
              silver999: cityData.silver999,
              selectedCity: cityId,
            }) : null);
            try {
              localStorage.setItem("vj_selected_city", cityId);
            } catch {}
          }
        }}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Royal Sovereign Auth & Vault Access Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setPendingOrnament(null);
          setAuthPromptReason(undefined);
        }}
        onLoginSuccess={handleLoginSuccess}
        onSkip={handleSkipGuest}
        initialRole={authRole}
        promptMessage={authPromptReason}
        lockedOrnamentName={pendingOrnament?.name}
      />
    </div>
  );
}
