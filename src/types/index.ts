export type ProductCategory =
  | 'rings'
  | 'earrings'
  | 'necklaces'
  | 'chains'
  | 'bangles'
  | 'bracelets'
  | 'pendants'
  | 'mangalsutras'
  | 'nosepins'
  | 'anklets'
  | 'bridal'
  | 'mens'
  | 'kids'
  | 'diamond'
  | 'gold'
  | 'silver'
  | 'platinum'
  | 'gemstones';

export type MetalPurity = '18K' | '22K' | '24K' | '925_Silver' | '950_Platinum';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  purity: string;
  metalPurity?: MetalPurity;
  weight: string;
  grossWeightGrams?: number;
  netGoldGrams?: number;
  gemstones?: string;
  diamondCarat?: number;
  certification: string;
  huid?: string;
  isBestseller?: boolean;
  isNew?: boolean;
  isReadyToShip?: boolean;
  isCustomizable?: boolean;
  craftsmanshipStyle?: 'Temple Nakshi' | 'Filigree' | 'Jadau Kundan' | 'Handmade Casting' | 'Modern Solitaire' | 'Meenakari';
  artisanId?: string;
  artisanName?: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CityRate {
  city_id?: string;
  cityId?: string;
  name: string;
  state: string;
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silver999: number;
}

export interface BullionRates {
  gold24k: number;
  gold22k: number;
  gold18k: number;
  gold14k?: number;
  silver999: number;
  lastUpdated: string;
  changePercent: number;
  direction?: 'up' | 'down' | 'flat';
  dayHigh?: number;
  dayLow?: number;
  source?: string;
  selectedCity?: string;
  cities?: Record<string, CityRate>;
}

// ----------------------------------------------------
// 2. REPAIR JEWELLERY DOMAIN (18 Diagnostic Types)
// ----------------------------------------------------
export type RepairServiceType =
  | 'ring_resizing'
  | 'chain_repair'
  | 'broken_clasp'
  | 'broken_links'
  | 'stone_replacement'
  | 'diamond_replacement'
  | 'prong_repair'
  | 'polishing'
  | 'rhodium_plating'
  | 'gold_plating'
  | 'soldering'
  | 'bangle_repair'
  | 'earring_repair'
  | 'pendant_repair'
  | 'mangalsutra_repair'
  | 'cleaning'
  | 'reshaping'
  | 'recasting'
  | 'custom_modification';

export type RepairStatus =
  | 'PICKUP_SCHEDULED'
  | 'WEIGHT_VERIFIED'
  | 'INSPECTION'
  | 'ASSIGNED_TO_ARTISAN'
  | 'IN_PRODUCTION'
  | 'QC_PENDING'
  | 'PACKAGING'
  | 'DISPATCHED'
  | 'DELIVERED';

export interface RepairTimelineEvent {
  step: RepairStatus;
  label: string;
  timestamp: string;
  completed: boolean;
  verifiedBy?: string;
  notes?: string;
  recordedWeight?: string;
}

export interface RepairRequest {
  id: string;
  repairType: RepairServiceType;
  metalType: '22K Gold' | '18K Gold' | '24K Gold' | '925 Silver' | 'Platinum';
  approxWeight: string;
  dimensions?: string;
  problemDescription: string;
  customerName: string;
  phone: string;
  email: string;
  pickupAddress: string;
  pickupSlot: string;
  status: RepairStatus;
  estimatedCost: number;
  inwardWeight?: string;
  finalWeight?: string;
  assignedArtisan?: string;
  timeline: RepairTimelineEvent[];
}

// ----------------------------------------------------
// 3. CUSTOM JEWELLERY & "I HAVE A DESIGN" DOMAIN
// ----------------------------------------------------
export type CustomDesignStatus =
  | 'INQUIRY_RECEIVED'
  | 'DESIGNER_REVIEW'
  | 'CAD_IN_PROGRESS'
  | 'CAD_3D_READY'
  | 'QUOTATION_SUBMITTED'
  | 'CUSTOMER_APPROVED'
  | 'CASTING_MANUFACTURING'
  | 'QC_HALLMARKING'
  | 'DISPATCHED';

export interface CustomDesignRequest {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  jewelleryType: 'Ring' | 'Necklace' | 'Bangle' | 'Earrings' | 'Pendant' | 'Mangalsutra' | 'Men Bracelet';
  metal: '22K Yellow Gold' | '18K Rose Gold' | '18K White Gold' | 'Platinum' | 'Silver 925';
  targetWeightGrams: number;
  stonePreference: 'Solitaire Diamond' | 'Emerald' | 'Ruby' | 'Polki' | 'Navratna' | 'None';
  ringOrBangleSize?: string;
  budgetRange: string;
  referenceImages: string[];
  requirementsNotes: string;
  status: CustomDesignStatus;
  cadModelAvailable: boolean;
  estimatedQuote?: number;
  assignedGoldsmith?: string;
  createdAt: string;
}

// ----------------------------------------------------
// 4. "TRANSFORM MY GOLD" & GOLD EXCHANGE DOMAIN
// ----------------------------------------------------
export interface GoldTransformCalculation {
  oldGrossWeight: number; // in grams
  oldKaratage: '24K' | '22K' | '18K' | '14K' | 'Old_Unmarked';
  estimatedPurityPct: number;
  meltLossAllowancePct: number;
  netPureGoldGrams: number;
  goldCreditValue: number;
  newJewelleryPrice: number;
  newMakingCharges: number;
  netPayableDifference: number; // if negative, customer gets cash/store refund
}

// ----------------------------------------------------
// 5. DIGITAL JEWELLERY PASSPORT & PROVENANCE
// ----------------------------------------------------
export interface ProvenanceLog {
  id: string;
  event: 'MINTED_AND_HALLMARKED' | 'QC_VERIFIED' | 'PURCHASED' | 'SERVICED_POLISHED' | 'RESIZED' | 'AUTHENTICITY_RECHECK';
  date: string;
  actor: string;
  weightGrams: number;
  hashPointer: string;
  notes: string;
}

export interface DigitalJewelleryPassport {
  passportId: string; // e.g. JWL-2026-000184
  title: string;
  type: string;
  metal: string;
  purity: string;
  grossWeight: string;
  netGoldWeight: string;
  gemstoneCarat: string;
  huidNumber: string;
  artisanId: string;
  artisanName: string;
  manufactureDate: string;
  currentOwner: string;
  qrVerificationCode: string;
  provenanceHistory: ProvenanceLog[];
}

// ----------------------------------------------------
// 6. ARTISAN & GOLDSMITH PROFILE DOMAIN
// ----------------------------------------------------
export interface ArtisanProfile {
  id: string;
  name: string;
  heritageTitle: string;
  lineageExperienceYears: number;
  location: string;
  specialization: string[];
  rating: number;
  goldInventoryAvailable: {
    gold22k: number; // in grams
    gold18k: number;
    silver: number;
  };
  bio: string;
  avatar: string;
  completedJobs?: number;
}

// ----------------------------------------------------
// 7. USER AUTHENTICATION & ACCESS DOMAIN
// ----------------------------------------------------
export type UserRole = 'customer' | 'goldsmith' | 'retailer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  city?: string;
  vaultBalanceGrams?: number;
  registeredPassportsCount?: number;
  activeOrdersCount?: number;
  // Goldsmith specific
  artisanId?: string;
  workbenchTier?: string;
  // Retailer specific
  companyName?: string;
  gstin?: string;
}

