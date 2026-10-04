'use client';

import React, { useState, useMemo } from 'react';
import {
	CheckSquare,
	Sparkles,
	SlidersHorizontal,
	ShoppingBag,
	ArrowRight,
	Check,
	ShieldCheck,
	Scale,
	Filter,
} from 'lucide-react';
import { SHOP_ITEMS, ShopItem } from '@/components/shop/shopData';
import { JewellerySpecConfigurator, JewellerySpecs } from './JewellerySpecConfigurator';
import { PriceBreakdown } from './pricingEngine';

interface CatalogueChecklistExplorerProps {
	onCompleteSubmission?: (data: any) => void;
}

export function CatalogueChecklistExplorer({ onCompleteSubmission }: CatalogueChecklistExplorerProps) {
	// Guided Checklist State
	const [selectedCategory, setSelectedCategory] = useState<string>('rings');
	const [selectedOccasion, setSelectedOccasion] = useState<string>('bridal');
	const [selectedCraftPillar, setSelectedCraftPillar] = useState<string>('all');
	const [selectedBudget, setSelectedBudget] = useState<string>('all');

	// Active baseline piece selected from catalogue
	const [selectedBaselineItem, setSelectedBaselineItem] = useState<ShopItem | null>(null);

	// Configured Specs
	const [configuredSpecs, setConfiguredSpecs] = useState<JewellerySpecs | null>(null);
	const [configuredPrice, setConfiguredPrice] = useState<PriceBreakdown | null>(null);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	// Filter shop items according to checklist criteria
	const matchingCatalogueItems = useMemo(() => {
		return SHOP_ITEMS.filter((item) => {
			if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
			if (selectedCraftPillar !== 'all' && item.craftType !== selectedCraftPillar) return false;
			if (selectedOccasion !== 'all' && item.collection !== selectedOccasion) {
				// loose match if no items
			}
			if (selectedBudget === 'under-100k' && item.basePrice > 100000) return false;
			if (selectedBudget === '100k-250k' && (item.basePrice < 100000 || item.basePrice > 250000)) return false;
			if (selectedBudget === '250k-plus' && item.basePrice <= 250000) return false;
			return true;
		}).slice(0, 6);
	}, [selectedCategory, selectedCraftPillar, selectedOccasion, selectedBudget]);

	const handleSelectBaseline = (item: ShopItem) => {
		setSelectedBaselineItem(item);
		// Smooth scroll down to configurator
		setTimeout(() => {
			const el = document.getElementById('catalogue-configurator-section');
			if (el) el.scrollIntoView({ behavior: 'smooth' });
		}, 100);
	};

	const handleFinalSubmit = () => {
		setIsSubmitted(true);
		onCompleteSubmission?.({
			baselineItem: selectedBaselineItem,
			checklist: {
				category: selectedCategory,
				occasion: selectedOccasion,
				craft: selectedCraftPillar,
				budget: selectedBudget,
			},
			configuredSpecs,
			configuredPrice,
		});
	};

	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			{/* Checklist Guided Questionnaire Card */}
			<div className="rounded-3xl border border-white/10 bg-[#0c0d14]/95 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
				<div className="space-y-2">
					<div className="flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.24em] text-[#fae19c]">
						<CheckSquare className="size-3.5" />
						<span>Guided Catalogue Discovery & Checklist</span>
					</div>
					<h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
						Not Sure Where to Start? Let&apos;s Discover Your Ideology
					</h2>
					<p className="text-xs sm:text-sm text-neutral-300 font-light max-w-3xl leading-relaxed">
						Complete this quick 4-step checklist to find your perfect design baseline from our certified archives. You can then customize metals, stones, and weight with live pricing.
					</p>
				</div>

				{/* 4-Step Interactive Checklist Matrix */}
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
					{/* STEP 1: JEWELLERY CATEGORY */}
					<div className="space-y-2.5">
						<label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono flex items-center gap-2">
							<span className="size-5 rounded-full bg-[#fae19c] text-black text-[10px] font-bold flex items-center justify-center">1</span>
							<span>Which Jewellery Piece Do You Envision?</span>
						</label>
						<div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
							{[
								{ id: 'rings', label: 'Rings' },
								{ id: 'chains', label: 'Chains' },
								{ id: 'necklaces', label: 'Necklaces' },
								{ id: 'bangles', label: 'Bangles' },
								{ id: 'earrings', label: 'Earrings' },
								{ id: 'mangalsutra', label: 'Mangalsutra' },
								{ id: 'pendants', label: 'Pendants' },
								{ id: 'all', label: 'All Items' },
							].map((cat) => (
								<button
									key={cat.id}
									type="button"
									onClick={() => {
										setSelectedCategory(cat.id);
										setSelectedBaselineItem(null);
									}}
									className={`rounded-xl border p-2 text-xs font-mono text-center transition-all cursor-pointer ${
										selectedCategory === cat.id
											? 'border-[#fae19c] bg-[#fae19c]/15 text-[#fae19c] font-semibold shadow-sm'
											: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-white'
									}`}
								>
									{cat.label}
								</button>
							))}
						</div>
					</div>

					{/* STEP 2: OCCASION & SENTIMENT */}
					<div className="space-y-2.5">
						<label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono flex items-center gap-2">
							<span className="size-5 rounded-full bg-[#fae19c] text-black text-[10px] font-bold flex items-center justify-center">2</span>
							<span>Occasion & Sentiment</span>
						</label>
						<div className="grid grid-cols-2 gap-2">
							{[
								{ id: 'bridal', label: 'Bridal Wedding Trousseau' },
								{ id: 'daily-wear', label: 'Daily Fine Luxury' },
								{ id: 'temple', label: 'Temple & Vedic Rituals' },
								{ id: 'contemporary', label: 'Contemporary Fine Fashion' },
							].map((occ) => (
								<button
									key={occ.id}
									type="button"
									onClick={() => {
										setSelectedOccasion(occ.id);
										setSelectedBaselineItem(null);
									}}
									className={`rounded-xl border p-2.5 text-xs text-left transition-all cursor-pointer ${
										selectedOccasion === occ.id
											? 'border-[#fae19c] bg-[#fae19c]/15 text-[#fae19c] font-semibold'
											: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-white'
									}`}
								>
									{occ.label}
								</button>
							))}
						</div>
					</div>

					{/* STEP 3: CRAFT PILLAR */}
					<div className="space-y-2.5">
						<label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono flex items-center gap-2">
							<span className="size-5 rounded-full bg-[#fae19c] text-black text-[10px] font-bold flex items-center justify-center">3</span>
							<span>Artisan Craftsmanship Method</span>
						</label>
						<div className="grid grid-cols-3 gap-2">
							{[
								{ id: 'all', label: 'All Methods' },
								{ id: 'handcrafted', label: '100% Handcrafted' },
								{ id: 'semi-handmade', label: 'Semi Handmade' },
							].map((craft) => (
								<button
									key={craft.id}
									type="button"
									onClick={() => {
										setSelectedCraftPillar(craft.id);
										setSelectedBaselineItem(null);
									}}
									className={`rounded-xl border p-2.5 text-xs text-center transition-all cursor-pointer ${
										selectedCraftPillar === craft.id
											? 'border-[#fae19c] bg-[#fae19c]/15 text-[#fae19c] font-semibold'
											: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-white'
									}`}
								>
									{craft.label}
								</button>
							))}
						</div>
					</div>

					{/* STEP 4: TARGET INVESTMENT BUDGET */}
					<div className="space-y-2.5">
						<label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono flex items-center gap-2">
							<span className="size-5 rounded-full bg-[#fae19c] text-black text-[10px] font-bold flex items-center justify-center">4</span>
							<span>Target Price Benchmark</span>
						</label>
						<div className="grid grid-cols-3 gap-2">
							{[
								{ id: 'all', label: 'Any Budget' },
								{ id: 'under-100k', label: 'Under ₹1,00,000' },
								{ id: '100k-250k', label: '₹1,00,000 - ₹2.5L' },
								{ id: '250k-plus', label: 'Above ₹2,50,000' },
							].map((bud) => (
								<button
									key={bud.id}
									type="button"
									onClick={() => {
										setSelectedBudget(bud.id);
										setSelectedBaselineItem(null);
									}}
									className={`rounded-xl border p-2.5 text-xs text-center transition-all cursor-pointer ${
										selectedBudget === bud.id
											? 'border-[#fae19c] bg-[#fae19c]/15 text-[#fae19c] font-semibold'
											: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-white'
									}`}
								>
									{bud.label}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* ================= MATCHING CATALOGUE PIECES ================= */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<h3 className="font-serif text-xl font-semibold text-white">
							Curated Catalogue Baselines ({matchingCatalogueItems.length} Designs Found)
						</h3>
						<p className="text-xs text-neutral-400 font-light">
							Select any piece below to load into the bespoke customizer and modify metals, stones, and weights:
						</p>
					</div>

					<a
						href="/shop"
						className="text-xs font-mono text-[#fae19c] hover:underline flex items-center gap-1"
					>
						<span>Explore Full Shop Catalogue &rarr;</span>
					</a>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{matchingCatalogueItems.map((item) => {
						const isSelected = selectedBaselineItem?.id === item.id;
						return (
							<div
								key={item.id}
								className={`rounded-2xl border p-4 transition-all flex flex-col justify-between ${
									isSelected
										? 'border-[#fae19c] bg-[#fae19c]/[0.08] shadow-[0_10px_40px_rgba(250,225,156,0.15)] ring-1 ring-[#fae19c]'
										: 'border-white/10 bg-[#0d0e15] hover:border-white/25'
								}`}
							>
								<div className="space-y-3">
									<div className="relative aspect-square rounded-xl overflow-hidden bg-black/60">
										<img
											src={item.image}
											alt={item.name}
											className="size-full object-cover filter brightness-[0.95]"
										/>
										<span className="absolute top-2 left-2 rounded-full border border-white/15 bg-black/80 px-2 py-0.5 text-[8.5px] font-mono text-neutral-300">
											{item.craftLabel}
										</span>
									</div>

									<div>
										<span className="text-[9.5px] font-mono uppercase tracking-wider text-neutral-400">
											{item.categoryLabel} &bull; {item.collectionLabel}
										</span>
										<h4 className="font-serif text-base font-semibold text-white mt-0.5 truncate">
											{item.name}
										</h4>
										<p className="text-[11px] font-mono text-neutral-400 mt-0.5">
											{item.metalPurity} ({item.metalTone}) &bull; ~{item.approxWeight}g
										</p>
									</div>
								</div>

								<div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
									<span className="font-serif text-base font-bold text-[#fae19c]">
										₹{item.basePrice.toLocaleString('en-IN')}
									</span>

									<button
										type="button"
										onClick={() => handleSelectBaseline(item)}
										className={`rounded-xl px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
											isSelected
												? 'bg-[#fae19c] text-black font-bold'
												: 'border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-[#fae19c]'
										}`}
									>
										<SlidersHorizontal className="size-3" />
										<span>{isSelected ? 'Configuring ✦' : 'Customize ✦'}</span>
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* ================= CONFIGURATOR SECTION FOR SELECTED PIECE ================= */}
			{selectedBaselineItem && (
				<div id="catalogue-configurator-section" className="space-y-6 pt-4 animate-in fade-in-50 zoom-in-98 duration-300">
					<div className="rounded-2xl border border-[#fae19c]/40 bg-[#fae19c]/10 p-4 flex items-center justify-between text-xs text-neutral-200">
						<div className="flex items-center gap-3">
							<img
								src={selectedBaselineItem.image}
								alt={selectedBaselineItem.name}
								className="size-12 rounded-xl object-cover border border-white/15"
							/>
							<div>
								<span className="font-mono text-[10.5px] uppercase tracking-wider text-[#fae19c] block">
									Customizing Baseline Design:
								</span>
								<h4 className="font-serif text-base font-semibold text-white">
									{selectedBaselineItem.name} ({selectedBaselineItem.id})
								</h4>
							</div>
						</div>

						<span className="text-[11px] font-mono text-neutral-400">
							Baseline: ₹{selectedBaselineItem.basePrice.toLocaleString('en-IN')}
						</span>
					</div>

					{/* Reusable Standalone Spec Configurator */}
					<JewellerySpecConfigurator
						category={selectedBaselineItem.category}
						initialWeight={selectedBaselineItem.approxWeight}
						initialMetalId={selectedBaselineItem.metalPurity === '22K' ? '22k-yellow' : '18k-rose'}
						onChange={(specs, price) => {
							setConfiguredSpecs(specs);
							setConfiguredPrice(price);
						}}
						showLiveBreakdown={true}
						title={`Modify Metals, Stones & Weight for ${selectedBaselineItem.name}`}
					/>

					{/* Final Submission Block */}
					<div className="rounded-3xl border border-[#fae19c]/30 bg-gradient-to-r from-[#12131e] via-[#0d0e14] to-[#12131e] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
						<div className="space-y-1.5 text-left max-w-xl">
							<div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#fae19c]">
								<ShieldCheck className="size-4" />
								<span>Customized Catalogue Order Guarantee</span>
							</div>
							<h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
								Submit Customized Design to Atelier Bench
							</h3>
							<p className="text-xs text-neutral-300 font-light leading-relaxed">
								Your tailored configuration will be reviewed by our master goldsmith. Receive 3D CAD confirmation and exact metal balance passport.
							</p>
						</div>

						{isSubmitted ? (
							<div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-4 text-center text-emerald-400 space-y-1 font-mono text-xs">
								<Check className="size-6 mx-auto" />
								<p className="font-bold">Custom Inquiry Logged!</p>
								<p className="text-[10.5px] text-neutral-300">
									Reference: VK-CATALOGUE-{Math.floor(1000 + Math.random() * 9000)}
								</p>
							</div>
						) : (
							<button
								type="button"
								onClick={handleFinalSubmit}
								className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105 shadow-xl cursor-pointer flex items-center justify-center gap-2 shrink-0"
							>
								<span>Request Customization & Lock Rate</span>
								<ArrowRight className="size-4 text-black" />
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
