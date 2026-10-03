'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Sliders, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { ShopItem, LIVE_BULLION_RATE_22K, LIVE_BULLION_RATE_18K } from './shopData';

interface ShopQuickConfigDrawerProps {
	item: ShopItem | null;
	isOpen: boolean;
	onClose: () => void;
	onRequestQuote: (configSummary: {
		item: ShopItem;
		metal: string;
		weight: number;
		stone: string;
		estimatedPrice: number;
	}) => void;
}

export function ShopQuickConfigDrawer({
	item,
	isOpen,
	onClose,
	onRequestQuote,
}: ShopQuickConfigDrawerProps) {
	const [selectedMetal, setSelectedMetal] = useState<string>('22K Yellow Gold');
	const [weight, setWeight] = useState<number>(20);
	const [selectedStone, setSelectedStone] = useState<string>('Uncut Polki');

	// Synchronize defaults whenever item changes
	useEffect(() => {
		if (item) {
			setSelectedMetal(`${item.metalPurity} ${item.metalTone}`);
			setWeight(item.approxWeight);
			setSelectedStone(item.stoneType === 'None' ? 'Solid Gold (No Stone)' : item.stoneType);
		}
	}, [item]);

	// Close on Escape key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		if (isOpen) {
			window.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		};
	}, [isOpen, onClose]);

	if (!isOpen || !item) return null;

	const METALS = ['22K Yellow Gold', '18K Yellow Gold', '18K Rose Gold', '18K White Gold'];
	const STONES = ['Uncut Polki', 'GIA Natural Diamonds', 'Burmese Ruby', 'Zambian Emerald', 'Solid Gold (No Stone)'];

	// Real-time estimated price calculation
	const is18K = selectedMetal.startsWith('18K');
	const bullionRate = is18K ? LIVE_BULLION_RATE_18K : LIVE_BULLION_RATE_22K;
	const goldValue = weight * bullionRate;
	
	// Stone premium estimation
	let stoneValue = 25000;
	if (selectedStone.includes('Solid Gold')) stoneValue = 0;
	else if (selectedStone.includes('Diamonds')) stoneValue = 45000;
	else if (selectedStone.includes('Ruby')) stoneValue = 35000;
	else if (selectedStone.includes('Emerald')) stoneValue = 38000;

	// Karigar making charge (~16%)
	const makingCharges = goldValue * 0.16;
	const estimatedPrice = Math.round(goldValue + stoneValue + makingCharges);

	const minWeight = Math.max(4, Math.round(item.approxWeight * 0.65));
	const maxWeight = Math.round(item.approxWeight * 1.45);

	const handleProceed = () => {
		onRequestQuote({
			item,
			metal: selectedMetal,
			weight,
			stone: selectedStone,
			estimatedPrice,
		});
	};

	return (
		<div className="fixed inset-0 z-50 flex justify-end">
			{/* Backdrop Overlay */}
			<div
				className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in"
				onClick={onClose}
			/>

			{/* Slide-Over Drawer Container */}
			<div className="relative z-10 w-full max-w-lg bg-[#0c0d13] border-l border-[#fae19c]/25 h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
				<div className="space-y-6">
					{/* Header */}
					<div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
						<div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#fae19c]">
							<Sliders className="size-3" />
							<span>Make It Yours • Atelier Customizer</span>
						</div>
						<button
							onClick={onClose}
							className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-300 hover:text-white hover:border-[#fae19c]/60 cursor-pointer"
						>
							Close
						</button>
					</div>

					{/* Selected Product Identity */}
					<div className="flex gap-4 items-center rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
						<div className="size-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black">
							<img
								src={item.image}
								alt={item.name}
								className="size-full object-cover"
							/>
						</div>
						<div className="space-y-1">
							<span className="text-[10px] font-mono text-[#fae19c] uppercase">
								Base Design: {item.id}
							</span>
							<h3 className="font-serif text-base font-semibold text-white">
								{item.name}
							</h3>
							<p className="text-[11px] text-neutral-400 font-light truncate max-w-[260px]">
								{item.description}
							</p>
						</div>
					</div>

					{/* Interactive Re-Spec Parameters */}
					<div className="space-y-5">
						{/* 1. Metal Selection */}
						<div>
							<label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-2">
								01 • Select Metal Purity & Tone
							</label>
							<div className="grid grid-cols-2 gap-2">
								{METALS.map((metal) => (
									<button
										key={metal}
										type="button"
										onClick={() => setSelectedMetal(metal)}
										className={`rounded-xl border py-2.5 px-3 text-left text-xs font-medium transition-all cursor-pointer ${
											selectedMetal === metal
												? 'border-[#fae19c] bg-[#fae19c]/15 text-[#fae19c]'
												: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
										}`}
									>
										<span className="block truncate">{metal}</span>
									</button>
								))}
							</div>
						</div>

						{/* 2. Weight Slider */}
						<div className="rounded-2xl border border-white/[0.08] bg-black/40 p-4 space-y-2">
							<div className="flex items-center justify-between text-xs">
								<span className="text-neutral-300 font-medium">Approximate Gold Weight</span>
								<span className="font-mono font-bold text-[#fae19c]">
									~{weight.toFixed(1)} grams
								</span>
							</div>
							<input
								type="range"
								min={minWeight}
								max={maxWeight}
								step="0.5"
								value={weight}
								onChange={(e) => setWeight(parseFloat(e.target.value))}
								className="w-full accent-[#fae19c] cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
							/>
							<div className="flex justify-between text-[10px] text-neutral-500 font-mono">
								<span>Min: ~{minWeight}g</span>
								<span>Max: ~{maxWeight}g</span>
							</div>
						</div>

						{/* 3. Gemstones */}
						<div>
							<label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-2">
								02 • Gemstone Curation
							</label>
							<div className="flex flex-wrap gap-1.5">
								{STONES.map((stone) => (
									<button
										key={stone}
										type="button"
										onClick={() => setSelectedStone(stone)}
										className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all cursor-pointer ${
											selectedStone === stone
												? 'border-[#fae19c] bg-[#fae19c]/15 text-[#fae19c]'
												: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
										}`}
									>
										{stone}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Live Recalculated Valuation Breakdown */}
					<div className="rounded-2xl border border-[#fae19c]/30 bg-gradient-to-br from-[#1c1d27] to-[#101118] p-4 space-y-3">
						<div className="flex items-center justify-between">
							<span className="text-[10px] uppercase font-mono tracking-widest text-[#fae19c]">
								Live Estimate Breakdown
							</span>
							<div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400">
								<ShieldCheck className="size-3 text-[#fae19c]" />
								<span>Bullion Synchronized</span>
							</div>
						</div>

						<div className="space-y-1.5 text-xs text-neutral-300 pt-1">
							<div className="flex justify-between">
								<span>Gold Content ({selectedMetal}, ~{weight.toFixed(1)}g):</span>
								<span className="font-mono text-white">₹{Math.round(goldValue).toLocaleString('en-IN')}</span>
							</div>
							<div className="flex justify-between">
								<span>Stone Allocation ({selectedStone}):</span>
								<span className="font-mono text-white">₹{stoneValue.toLocaleString('en-IN')}</span>
							</div>
							<div className="flex justify-between">
								<span>Artisan Making & Hallmarking:</span>
								<span className="font-mono text-white">₹{Math.round(makingCharges).toLocaleString('en-IN')}</span>
							</div>
						</div>

						<div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
							<span className="font-serif text-sm font-semibold text-white">Estimated Investment:</span>
							<span className="font-serif font-bold text-xl text-[#fae19c]">
								₹{estimatedPrice.toLocaleString('en-IN')}*
							</span>
						</div>
						<p className="text-[9.5px] text-neutral-400 font-light">
							*Final invoice certified against official gross/net scale weight upon completion.
						</p>
					</div>
				</div>

				{/* Primary Drawer Actions */}
				<div className="pt-6 space-y-2 border-t border-white/[0.08] mt-6">
					<button
						onClick={handleProceed}
						className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] py-3 text-xs font-bold uppercase tracking-[0.16em] text-black hover:brightness-105 shadow-[0_4px_25px_rgba(212,175,55,0.25)] transition-all cursor-pointer"
					>
						<span>Request CAD Feasibility & Quote</span>
						<ArrowRight className="size-3.5" />
					</button>

					<p className="text-[10px] text-center text-neutral-500 font-light">
						A master goldsmith will review proportions and provide 3D CAD renders within 24 hours.
					</p>
				</div>
			</div>
		</div>
	);
}
