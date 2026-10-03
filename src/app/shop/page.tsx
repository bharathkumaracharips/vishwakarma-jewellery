'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/ui/header-3';
import { ShopTopCategoryBar } from '@/components/shop/ShopTopCategoryBar';
import { ShopSidebarFilters } from '@/components/shop/ShopSidebarFilters';
import { ShopProductCard } from '@/components/shop/ShopProductCard';
import { ShopQuickConfigDrawer } from '@/components/shop/ShopQuickConfigDrawer';
import { BespokeIdeaPortal } from '@/components/life-of-a-jewel/components/BespokeIdeaPortal';
import { ShopItem, SHOP_ITEMS, LIVE_BULLION_RATE_22K, LIVE_BULLION_RATE_18K } from '@/components/shop/shopData';
import { ShieldCheck, Scale, Check, Sparkles, SlidersHorizontal, MessageSquare, Video, MapPin, ArrowRight } from 'lucide-react';

function ShopContent() {
	const searchParams = useSearchParams();

	// Primary Filter States
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [selectedCraftMode, setSelectedCraftMode] = useState<string>('all');
	const [selectedMetal, setSelectedMetal] = useState<string>('all');
	const [selectedWeightRange, setSelectedWeightRange] = useState<string>('all');
	const [selectedStone, setSelectedStone] = useState<string>('all');
	const [selectedCollection, setSelectedCollection] = useState<string>('all');
	const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'weight-desc'>('recommended');

	// Drawer & Modal States
	const [customizingItem, setCustomizingItem] = useState<ShopItem | null>(null);
	const [buyingItem, setBuyingItem] = useState<ShopItem | null>(null);
	const [isIdeaDropOpen, setIsIdeaDropOpen] = useState(false);
	const [isConsultationOpen, setIsConsultationOpen] = useState(false);
	const [successModalMessage, setSuccessModalMessage] = useState<string | null>(null);

	// Read initial query params from URL
	useEffect(() => {
		const catParam = searchParams.get('category');
		const craftParam = searchParams.get('craft');
		const colParam = searchParams.get('collection');

		if (catParam) setSelectedCategory(catParam);
		if (craftParam) setSelectedCraftMode(craftParam);
		if (colParam) setSelectedCollection(colParam);
	}, [searchParams]);

	// Filter Logic
	const filteredItems = useMemo(() => {
		return SHOP_ITEMS.filter((item) => {
			// 1. Upper Category Filter (Rings, Chains, etc.)
			if (selectedCategory !== 'all' && item.category !== selectedCategory) {
				return false;
			}

			// 2. Craft Mode Pillar (All Collections, Handcrafted, Semi Handmade)
			if (selectedCraftMode !== 'all' && item.craftType !== selectedCraftMode) {
				return false;
			}

			// 3. Metal Filter
			if (selectedMetal !== 'all') {
				if (selectedMetal === '22K' && item.metalPurity !== '22K') return false;
				if (selectedMetal === '18K' && item.metalPurity !== '18K') return false;
				if (selectedMetal === 'Rose Gold' && item.metalTone !== 'Rose Gold') return false;
				if (selectedMetal === 'White Gold' && item.metalTone !== 'White Gold') return false;
			}

			// 4. Weight Range Filter
			if (selectedWeightRange !== 'all') {
				if (selectedWeightRange === 'under-10' && item.approxWeight >= 10) return false;
				if (selectedWeightRange === '10-25' && (item.approxWeight < 10 || item.approxWeight > 25)) return false;
				if (selectedWeightRange === '25-40' && (item.approxWeight < 25 || item.approxWeight > 40)) return false;
				if (selectedWeightRange === '40-plus' && item.approxWeight <= 40) return false;
			}

			// 5. Gemstone Filter
			if (selectedStone !== 'all') {
				if (selectedStone === 'None' && item.stoneType !== 'None') return false;
				if (selectedStone !== 'None' && item.stoneType !== selectedStone) return false;
			}

			// 6. Occasion Collection Filter
			if (selectedCollection !== 'all' && item.collection !== selectedCollection) {
				return false;
			}

			return true;
		}).sort((a, b) => {
			if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
			if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
			if (sortBy === 'weight-desc') return b.approxWeight - a.approxWeight;
			return 0; // recommended
		});
	}, [
		selectedCategory,
		selectedCraftMode,
		selectedMetal,
		selectedWeightRange,
		selectedStone,
		selectedCollection,
		sortBy,
	]);

	const handleResetFilters = () => {
		setSelectedCategory('all');
		setSelectedCraftMode('all');
		setSelectedMetal('all');
		setSelectedWeightRange('all');
		setSelectedStone('all');
		setSelectedCollection('all');
		setSortBy('recommended');
	};

	return (
		<div className="min-h-screen w-full bg-[#07080b] text-[#f8fafc] selection:bg-[#fae19c]/25 selection:text-[#fae19c]">
			{/* Top Navbar */}
			<Header />

			{/* UPPER MENU: All, Rings, Chains, Necklaces, Bangles, Earrings, Pendants... */}
			<ShopTopCategoryBar
				selectedCategory={selectedCategory}
				onSelectCategory={(catId) => setSelectedCategory(catId)}
			/>

			{/* Live Bullion & Hallmark Bar */}
			<div className="w-full border-b border-white/[0.06] bg-[#0c0d12]/95 py-2 px-4 text-[10.5px] font-mono tracking-wider text-neutral-400">
				<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
					<div className="flex items-center gap-4">
						<span className="flex items-center gap-1.5 text-neutral-300">
							<span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
							<span>LIVE BULLION:</span>
						</span>
						<span className="text-[#fae19c] font-semibold">22K: ₹{LIVE_BULLION_RATE_22K.toLocaleString('en-IN')}/g</span>
						<span className="text-neutral-600">|</span>
						<span className="text-[#fae19c] font-semibold">18K: ₹{LIVE_BULLION_RATE_18K.toLocaleString('en-IN')}/g</span>
					</div>

					<div className="hidden md:flex items-center gap-5 text-[10px] text-neutral-400">
						<span className="flex items-center gap-1">
							<ShieldCheck className="size-3 text-[#fae19c]" />
							<span>100% BIS 916 Hallmarked</span>
						</span>
						<span>•</span>
						<span className="flex items-center gap-1">
							<Scale className="size-3 text-[#fae19c]" />
							<span>Dual Micro-Balance Verified</span>
						</span>
						<span>•</span>
						<span>Digital Vault Custody Passport Included</span>
					</div>
				</div>
			</div>

			{/* ================= MAIN 2-COLUMN SHOP EXPERIENCE ================= */}
			<main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					{/* ---------------- LEFT SIDEBAR: 3 MODES + GRANULAR FILTERS ---------------- */}
					<div className="lg:col-span-3 lg:sticky lg:top-[160px]">
						<ShopSidebarFilters
							selectedCraftMode={selectedCraftMode}
							onSelectCraftMode={(mode) => setSelectedCraftMode(mode)}
							selectedMetal={selectedMetal}
							onSelectMetal={(m) => setSelectedMetal(m)}
							selectedWeightRange={selectedWeightRange}
							onSelectWeightRange={(w) => setSelectedWeightRange(w)}
							selectedStone={selectedStone}
							onSelectStone={(s) => setSelectedStone(s)}
							selectedCollection={selectedCollection}
							onSelectCollection={(c) => setSelectedCollection(c)}
							onResetFilters={handleResetFilters}
							totalResults={filteredItems.length}
						/>
					</div>

					{/* ---------------- RIGHT CONTENT: PRODUCT CATALOGUE GRID ---------------- */}
					<div className="lg:col-span-9 space-y-6">
						{/* Sorting & Filter Header Bar */}
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0c0d13]/80 p-4 backdrop-blur-md">
							<div className="space-y-0.5">
								<h1 className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-white">
									{selectedCategory === 'all'
										? 'All Jewellery Pieces'
										: selectedCategory.toUpperCase()}
								</h1>
								<p className="text-xs text-neutral-400 font-light">
									Showing {filteredItems.length} hallmarked designs • Filtered by {selectedCraftMode === 'all' ? 'All Collections' : selectedCraftMode}
								</p>
							</div>

							{/* Sort Selector */}
							<div className="flex items-center gap-2">
								<span className="text-[11px] font-mono text-neutral-400 uppercase">Sort:</span>
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value as any)}
									className="rounded-xl border border-white/10 bg-[#14151c] px-3.5 py-1.5 text-xs text-neutral-200 outline-none focus:border-[#fae19c]/60 cursor-pointer"
								>
									<option value="recommended">Curated / Recommended</option>
									<option value="price-asc">Price: Low to High</option>
									<option value="price-desc">Price: High to Low</option>
									<option value="weight-desc">Gold Weight: High to Low</option>
								</select>
							</div>
						</div>

						{/* Product Grid */}
						{filteredItems.length === 0 ? (
							<div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center space-y-4">
								<p className="font-serif text-lg text-white">No ornaments match your active filter combination.</p>
								<p className="text-xs text-neutral-400 font-light">
									Try switching your craft pillar or resetting filters, or bring your own design idea to our karigars.
								</p>
								<button
									onClick={handleResetFilters}
									className="rounded-full border border-[#fae19c]/50 bg-[#fae19c]/10 px-5 py-2 text-xs font-semibold text-[#fae19c] hover:bg-[#fae19c]/20 cursor-pointer"
								>
									Reset All Filters
								</button>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
								{filteredItems.map((item) => (
									<ShopProductCard
										key={item.id}
										item={item}
										onBuy={(selected) => setBuyingItem(selected)}
										onCustomize={(selected) => setCustomizingItem(selected)}
									/>
								))}
							</div>
						)}

						{/* Bottom Bespoke Creation Banner */}
						<div className="rounded-2xl border border-[#fae19c]/30 bg-gradient-to-r from-[#12131d] via-[#0d0e14] to-[#12131d] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-12 shadow-xl">
							<div className="space-y-1.5 text-left max-w-lg">
								<div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fae19c]">
									<Sparkles className="size-3" />
									<span>Have Your Own Idea?</span>
								</div>
								<h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
									Specially Designed For You with Your Ideology.
								</h3>
								<p className="text-xs text-neutral-300 font-light leading-relaxed">
									When ideology meets craftsmanship, it’s an unmatched legacy. Drop your idea in any format—audio, video, sketch, or text description. Select metals, approx weight, and stones.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
								<button
									onClick={() => setIsIdeaDropOpen(true)}
									className="rounded-xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] px-5 py-3 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105 shadow-md cursor-pointer flex items-center gap-1.5"
								>
									<span>Drop Your Idea Portal</span>
									<ArrowRight className="size-3.5" />
								</button>
								<button
									onClick={() => setIsConsultationOpen(true)}
									className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-xs font-semibold text-neutral-300 hover:text-white hover:border-[#fae19c] cursor-pointer"
								>
									Book Consultation
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* ================= MODALS & DRAWERS ================= */}

			{/* Interactive Make It Yours Quick-Configurator Drawer */}
			<ShopQuickConfigDrawer
				item={customizingItem}
				isOpen={!!customizingItem}
				onClose={() => setCustomizingItem(null)}
				onRequestQuote={(config) => {
					setCustomizingItem(null);
					setSuccessModalMessage(
						`Your customized configuration for ${config.item.name} (${config.metal}, ~${config.weight}g, ${config.stone}) estimated at ₹${config.estimatedPrice.toLocaleString('en-IN')} has been submitted to the atelier. Our master goldsmith will review CAD feasibility and reach out within 24 hours.`
					);
				}}
			/>

			{/* Buy As Shown Inquiry Modal */}
			{buyingItem && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-black/85 backdrop-blur-md"
						onClick={() => setBuyingItem(null)}
					/>
					<div className="relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-[#0e0f17] p-6 shadow-2xl space-y-4 animate-in fade-in-50 zoom-in-95">
						<div className="flex items-center justify-between border-b border-white/10 pb-3">
							<div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#fae19c]">
								<ShieldCheck className="size-3.5" />
								<span>Direct Vault Order</span>
							</div>
							<button
								onClick={() => setBuyingItem(null)}
								className="rounded-full border border-white/15 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 hover:text-white cursor-pointer"
							>
								Close
							</button>
						</div>

						<div className="flex gap-3.5 items-center">
							<img
								src={buyingItem.image}
								alt={buyingItem.name}
								className="size-16 rounded-xl object-cover border border-white/10 bg-black"
							/>
							<div>
								<h3 className="font-serif text-base font-semibold text-white">
									{buyingItem.name}
								</h3>
								<p className="text-[11px] text-neutral-400 font-mono">
									{buyingItem.metalPurity} • ~{buyingItem.approxWeight}g • {buyingItem.stone}
								</p>
								<div className="font-serif font-bold text-base text-[#fae19c] mt-0.5">
									₹{buyingItem.basePrice.toLocaleString('en-IN')}
								</div>
							</div>
						</div>

						<p className="text-xs text-neutral-300 font-light leading-relaxed">
							This hallmarked piece is held in our secure Bangalore vault. Would you like to proceed with secure insured armored delivery or reserve for in-person atelier handover?
						</p>

						<div className="space-y-2 pt-2">
							<button
								onClick={() => {
									const item = buyingItem;
									setBuyingItem(null);
									setSuccessModalMessage(
										`Your order inquiry for ${item.name} (Hallmark: ${item.hallmarkCode}) has been initiated. Our private client concierge will contact you via WhatsApp and email to confirm payment and vault pickup/delivery.`
									);
								}}
								className="w-full rounded-xl bg-gradient-to-r from-[#fae19c] to-[#d4af37] py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105 shadow-md cursor-pointer"
							>
								Proceed to Vault Checkout
							</button>
							<button
								onClick={() => {
									const item = buyingItem;
									setBuyingItem(null);
									setCustomizingItem(item);
								}}
								className="w-full rounded-xl border border-white/15 bg-white/5 py-2 text-xs font-medium text-neutral-300 hover:text-white cursor-pointer"
							>
								Wait, I want to customize this piece first →
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Bespoke Idea Drop Modal */}
			{isIdeaDropOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
					<div
						className="fixed inset-0 bg-black/85 backdrop-blur-md"
						onClick={() => setIsIdeaDropOpen(false)}
					/>
					<div className="relative z-10 w-full max-w-xl my-auto animate-in fade-in-50 zoom-in-95">
						<div className="flex justify-end mb-2">
							<button
								onClick={() => setIsIdeaDropOpen(false)}
								className="rounded-full border border-white/20 bg-black/80 px-3.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-neutral-300 hover:text-white hover:border-[#fae19c] cursor-pointer"
							>
								Close
							</button>
						</div>
						<BespokeIdeaPortal
							onSubmitIdea={() => {
								setIsIdeaDropOpen(false);
								setSuccessModalMessage(
									'Your bespoke ideology has been delivered to the Vishwakarma Karigar bench. Our CAD artist will examine your specifications and prepare an initial render within 24 hours.'
								);
							}}
						/>
					</div>
				</div>
			)}

			{/* Video Consultation Modal */}
			{isConsultationOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-black/85 backdrop-blur-md"
						onClick={() => setIsConsultationOpen(false)}
					/>
					<div className="relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-[#0e0f17] p-6 shadow-2xl space-y-4 animate-in fade-in-50 zoom-in-95">
						<div className="flex items-center justify-between border-b border-white/10 pb-3">
							<span className="text-[10px] font-semibold uppercase tracking-widest text-[#fae19c]">
								Private Concierge
							</span>
							<button
								onClick={() => setIsConsultationOpen(false)}
								className="rounded-full border border-white/15 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 hover:text-white cursor-pointer"
							>
								Close
							</button>
						</div>

						<h3 className="font-serif text-xl font-semibold text-white">
							Book Atelier Consultation
						</h3>
						<p className="text-xs text-neutral-300 font-light leading-relaxed">
							Schedule a 1-on-1 private consultation with our Chief Gemologist & Master Goldsmith. Discuss bridal trousseau, diamond grading, or family heirloom remodeling.
						</p>

						<div className="space-y-2 pt-2">
							<button
								onClick={() => {
									setIsConsultationOpen(false);
									setSuccessModalMessage(
										'Your appointment request for a 4K Virtual Video Consultation has been scheduled. A concierge calendar invite has been sent to your registered contact.'
									);
								}}
								className="w-full rounded-xl bg-gradient-to-r from-[#fae19c] to-[#d4af37] py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105 cursor-pointer"
							>
								Confirm 4K Virtual Video Session
							</button>
							<button
								onClick={() => {
									setIsConsultationOpen(false);
									setSuccessModalMessage(
										'Your flagship lounge visit has been reserved at Vishwakarma Atelier, Commercial Street, Bangalore. We look forward to welcoming you.'
									);
								}}
								className="w-full rounded-xl border border-white/15 bg-white/5 py-2 text-xs font-medium text-neutral-300 hover:text-white cursor-pointer"
							>
								Reserve In-Person Bangalore Visit
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Success Feedback Confirmation Modal */}
			{successModalMessage && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-black/85 backdrop-blur-md"
						onClick={() => setSuccessModalMessage(null)}
					/>
					<div className="relative z-10 w-full max-w-md rounded-2xl border border-[#fae19c]/40 bg-[#0e0f17] p-6 shadow-2xl space-y-4 animate-in fade-in-50 zoom-in-95">
						<div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#fae19c]">
							<Check className="size-4" />
							<span>Atelier Notice</span>
						</div>
						<h3 className="font-serif text-lg font-semibold text-white">
							Request Successfully Logged
						</h3>
						<p className="text-xs text-neutral-300 font-light leading-relaxed">
							{successModalMessage}
						</p>
						<button
							onClick={() => setSuccessModalMessage(null)}
							className="w-full rounded-xl bg-gradient-to-r from-[#fae19c] to-[#d4af37] py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105 cursor-pointer"
						>
							Understood
						</button>
					</div>
				</div>
			)}

			{/* Luxury Atelier Footer */}
			<footer className="w-full border-t border-white/[0.08] bg-[#06070a] py-14 px-4 sm:px-8 lg:px-12 mt-20 text-neutral-400">
				<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<span className="font-serif text-lg font-bold tracking-[0.24em] uppercase text-white">
								Vishwakarma
							</span>
							<span className="rounded-full border border-[#fae19c]/30 bg-[#fae19c]/10 px-2 py-0.5 text-[8px] font-semibold tracking-wider text-[#fae19c] uppercase">
								Atelier
							</span>
						</div>
						<p className="text-xs text-neutral-400 font-light leading-relaxed">
							Master goldsmiths and certified fine jewellery since 1984. Every ornament carries generational provenance and tamper-evident digital custody.
						</p>
						<div className="text-[11px] font-mono text-neutral-500">
							BIS HALLMARK LICENCE: HM-916-KA-4412
						</div>
					</div>

					<div className="space-y-2 text-xs">
						<span className="text-[10px] font-semibold uppercase tracking-widest text-white block mb-1">
							Atelier Discovery
						</span>
						<ul className="space-y-1.5 font-light">
							<li><a href="/shop?craft=handcrafted" className="hover:text-[#fae19c]">Handcrafted Archives</a></li>
							<li><a href="/shop?craft=semi-handmade" className="hover:text-[#fae19c]">Semi Handmade Collection</a></li>
							<li><a href="/shop?collection=bridal" className="hover:text-[#fae19c]">The Bridal Treasury</a></li>
							<li><a href="/shop?category=rings" className="hover:text-[#fae19c]">Solitaire Rings</a></li>
							<li><a href="/shop?category=chains" className="hover:text-[#fae19c]">Vedic Rope Chains</a></li>
						</ul>
					</div>

					<div className="space-y-2 text-xs">
						<span className="text-[10px] font-semibold uppercase tracking-widest text-white block mb-1">
							Trust & Services
						</span>
						<ul className="space-y-1.5 font-light">
							<li><a href="#" className="hover:text-[#fae19c]">Digital Custody Passport</a></li>
							<li><a href="#" className="hover:text-[#fae19c]">Heirloom Restoration & Polish</a></li>
							<li><a href="#" className="hover:text-[#fae19c]">Dual Micro-Balance Calibration</a></li>
							<li><a href="#" className="hover:text-[#fae19c]">Insured Armored Logistics</a></li>
							<li><a href="#" className="hover:text-[#fae19c]">Gold Bullion Exchange Policy</a></li>
						</ul>
					</div>

					<div className="space-y-3 text-xs">
						<span className="text-[10px] font-semibold uppercase tracking-widest text-white block">
							Flagship Atelier
						</span>
						<p className="text-neutral-400 font-light leading-relaxed">
							Vishwakarma Jewelers Atelier Lounge<br />
							Commercial Street &bull; Bengaluru, Karnataka 560001
						</p>
						<div className="text-[11px] font-mono text-neutral-300">
							Direct Atelier: +91 (80) 4122-8819<br />
							Concierge: concierge@vishwakarma.com
						</div>
					</div>
				</div>

				<div className="max-w-7xl mx-auto pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-3">
					<div>
						&copy; {new Date().getFullYear()} VISHWAKARMA JEWELERS • ALL RIGHTS RESERVED
					</div>
					<div className="flex gap-4">
						<a href="#" className="hover:underline">Privacy Terms</a>
						<a href="#" className="hover:underline">Hallmark Verification</a>
						<a href="#" className="hover:underline">Security Passports</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default function ShopPage() {
	return (
		<Suspense fallback={<div className="min-h-screen w-full bg-[#07080b] flex items-center justify-center text-xs font-mono text-[#fae19c]">Loading Vishwakarma Archives...</div>}>
			<ShopContent />
		</Suspense>
	);
}
