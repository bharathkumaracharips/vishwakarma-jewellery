'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
	ShieldCheck,
	Scale,
	Sparkles,
	SlidersHorizontal,
	Info,
	Check,
	Flame,
	Gem,
	Coins,
} from 'lucide-react';
import {
	METAL_OPTIONS,
	STONE_OPTIONS,
	FINISH_OPTIONS,
	CATEGORY_WEIGHTS,
	calculateJewelleryPrice,
	PriceBreakdown,
	MetalOption,
	StoneOption,
	FinishOption,
} from './pricingEngine';

export interface JewellerySpecs {
	category: string;
	metalId: string;
	metalName: string;
	metalPurity: string;
	metalToneColor: string;
	weightGrams: number;
	stoneId: string;
	stoneName: string;
	finishId: string;
	finishName: string;
}

export interface JewellerySpecConfiguratorProps {
	category?: string;
	initialMetalId?: string;
	initialWeight?: number;
	initialStoneId?: string;
	initialFinishId?: string;
	onChange?: (specs: JewellerySpecs, priceBreakdown: PriceBreakdown) => void;
	className?: string;
	showLiveBreakdown?: boolean;
	compactMode?: boolean;
	title?: string;
}

export function JewellerySpecConfigurator({
	category = 'rings',
	initialMetalId = '22k-yellow',
	initialWeight,
	initialStoneId = 'solitaire-diamond',
	initialFinishId = 'mirror-polish',
	onChange,
	className = '',
	showLiveBreakdown = true,
	compactMode = false,
	title = 'Atelier Metallurgy & Gemstone Configuration',
}: JewellerySpecConfiguratorProps) {
	const weightConfig = CATEGORY_WEIGHTS[category] || CATEGORY_WEIGHTS['other'];

	const [selectedMetalId, setSelectedMetalId] = useState<string>(initialMetalId);
	const [selectedWeight, setSelectedWeight] = useState<number>(
		initialWeight ?? weightConfig.default
	);
	const [selectedStoneId, setSelectedStoneId] = useState<string>(initialStoneId);
	const [selectedFinishId, setSelectedFinishId] = useState<string>(initialFinishId);

	// Synchronize when category changes
	useEffect(() => {
		const newConfig = CATEGORY_WEIGHTS[category] || CATEGORY_WEIGHTS['other'];
		if (initialWeight === undefined) {
			setSelectedWeight(newConfig.default);
		}
	}, [category, initialWeight]);

	// Selected entities
	const activeMetal = useMemo(
		() => METAL_OPTIONS.find((m) => m.id === selectedMetalId) || METAL_OPTIONS[0],
		[selectedMetalId]
	);
	const activeStone = useMemo(
		() => STONE_OPTIONS.find((s) => s.id === selectedStoneId) || STONE_OPTIONS[0],
		[selectedStoneId]
	);
	const activeFinish = useMemo(
		() => FINISH_OPTIONS.find((f) => f.id === selectedFinishId) || FINISH_OPTIONS[0],
		[selectedFinishId]
	);

	// Calculated Price Breakdown
	const priceBreakdown = useMemo(() => {
		return calculateJewelleryPrice(selectedMetalId, selectedWeight, selectedStoneId);
	}, [selectedMetalId, selectedWeight, selectedStoneId]);

	// Broadcast specs to parent
	useEffect(() => {
		if (onChange) {
			const specs: JewellerySpecs = {
				category,
				metalId: activeMetal.id,
				metalName: activeMetal.name,
				metalPurity: activeMetal.purity,
				metalToneColor: activeMetal.color,
				weightGrams: selectedWeight,
				stoneId: activeStone.id,
				stoneName: activeStone.name,
				finishId: activeFinish.id,
				finishName: activeFinish.name,
			};
			onChange(specs, priceBreakdown);
		}
	}, [activeMetal, selectedWeight, activeStone, activeFinish, category, priceBreakdown, onChange]);

	return (
		<div className={`space-y-6 rounded-3xl border border-white/10 bg-[#0c0d14]/90 p-5 sm:p-7 shadow-2xl backdrop-blur-xl ${className}`}>
			{/* Component Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
				<div className="space-y-1">
					<div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[#fae19c]">
						<Sparkles className="size-3" />
						<span>Atelier Specifications Engine</span>
					</div>
					<h3 className="font-serif text-lg sm:text-xl font-semibold text-white tracking-wide">
						{title}
					</h3>
				</div>

				{/* Live Bullion Ticker Pill */}
				<div className="flex items-center gap-2 rounded-full border border-[#fae19c]/30 bg-[#fae19c]/[0.06] px-3.5 py-1 text-[11px] font-mono text-neutral-300">
					<span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
					<span className="text-neutral-400">Live Basis:</span>
					<span className="text-[#fae19c] font-semibold">
						₹{activeMetal.ratePerGram.toLocaleString('en-IN')}/g
					</span>
				</div>
			</div>

			{/* ================= 1. METAL ALLOY & PURITY SELECTION ================= */}
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5 font-mono">
						<Coins className="size-3.5 text-[#fae19c]" />
						<span>1. Select Metal Alloy & Purity</span>
					</label>
					<span className="text-[11px] font-mono text-[#fae19c]">
						{activeMetal.purity}
					</span>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
					{METAL_OPTIONS.map((metal) => {
						const isSelected = selectedMetalId === metal.id;
						return (
							<button
								key={metal.id}
								type="button"
								onClick={() => setSelectedMetalId(metal.id)}
								className={`group relative flex flex-col justify-between rounded-2xl border p-3 text-left transition-all cursor-pointer ${
									isSelected
										? 'border-[#fae19c] bg-[#fae19c]/[0.08] shadow-[0_0_20px_rgba(250,225,156,0.15)] ring-1 ring-[#fae19c]/50'
										: 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
								}`}
							>
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center gap-2">
										<span
											className="size-4 rounded-full border border-white/20 shadow-sm"
											style={{ backgroundColor: metal.color }}
										/>
										<span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
											{metal.badge}
										</span>
									</div>
									{isSelected && <Check className="size-3.5 text-[#fae19c]" />}
								</div>

								<div>
									<div className={`text-xs font-medium ${isSelected ? 'text-white font-semibold' : 'text-neutral-200'}`}>
										{metal.name}
									</div>
									<div className="mt-1 flex items-center justify-between text-[10px] font-mono text-neutral-400">
										<span>₹{metal.ratePerGram.toLocaleString('en-IN')}/g</span>
										<span className="text-neutral-500">BIS 916</span>
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{/* ================= 2. WEIGHT CALCULATOR & PRESETS ================= */}
			<div className="space-y-3 rounded-2xl border border-white/[0.06] bg-black/40 p-4 sm:p-5">
				<div className="flex items-center justify-between">
					<label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5 font-mono">
						<Scale className="size-3.5 text-[#fae19c]" />
						<span>2. Target Gold Weight ({category.toUpperCase()})</span>
					</label>
					<div className="flex items-baseline gap-1 font-mono">
						<span className="text-lg font-bold text-[#fae19c]">
							{selectedWeight}
						</span>
						<span className="text-xs text-neutral-400">grams</span>
					</div>
				</div>

				{/* Range Slider */}
				<div className="space-y-2 pt-1">
					<input
						type="range"
						min={weightConfig.min}
						max={weightConfig.max}
						step={weightConfig.step}
						value={selectedWeight}
						onChange={(e) => setSelectedWeight(parseFloat(e.target.value))}
						className="w-full accent-[#fae19c] cursor-pointer bg-white/10 h-1.5 rounded-lg"
					/>
					<div className="flex justify-between text-[10px] font-mono text-neutral-500">
						<span>Min: {weightConfig.min}g</span>
						<span>Atelier Benchmark: ~{weightConfig.default}g</span>
						<span>Max: {weightConfig.max}g</span>
					</div>
				</div>

				{/* Preset Benchmark Buttons */}
				<div className="flex items-center gap-2 pt-1 flex-wrap">
					<span className="text-[10px] font-mono text-neutral-400 uppercase">Presets:</span>
					{weightConfig.presets.map((preset) => (
						<button
							key={preset}
							type="button"
							onClick={() => setSelectedWeight(preset)}
							className={`rounded-lg px-2.5 py-1 text-[10.5px] font-mono transition-all cursor-pointer ${
								selectedWeight === preset
									? 'bg-[#fae19c] text-black font-bold shadow-sm'
									: 'border border-white/15 bg-white/5 text-neutral-300 hover:text-white hover:border-white/30'
							}`}
						>
							~{preset}g
						</button>
					))}
				</div>
			</div>

			{/* ================= 3. STONES & GEMSTONES ================= */}
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5 font-mono">
						<Gem className="size-3.5 text-[#fae19c]" />
						<span>3. Gemstones & Center Setting</span>
					</label>
					<span className="text-[11px] font-mono text-[#fae19c]">
						{activeStone.name}
					</span>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
					{STONE_OPTIONS.map((stone) => {
						const isSelected = selectedStoneId === stone.id;
						return (
							<button
								key={stone.id}
								type="button"
								onClick={() => setSelectedStoneId(stone.id)}
								className={`group flex flex-col justify-between rounded-2xl border p-3 text-left transition-all cursor-pointer ${
									isSelected
										? 'border-[#fae19c] bg-[#fae19c]/[0.08] shadow-[0_0_20px_rgba(250,225,156,0.15)] ring-1 ring-[#fae19c]/50'
										: 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
								}`}
							>
								<div className="flex items-center justify-between mb-1.5">
									<div className="flex items-center gap-2">
										<span
											className="size-3 rounded-full border border-white/20 shadow-sm"
											style={{ backgroundColor: stone.color }}
										/>
										<span className="text-xs font-semibold text-white">
											{stone.name}
										</span>
									</div>
									{isSelected && <Check className="size-3.5 text-[#fae19c]" />}
								</div>

								<p className="text-[11px] text-neutral-400 font-light line-clamp-1 mb-2">
									{stone.description}
								</p>

								<div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] font-mono text-neutral-300">
									<span>Price Basis:</span>
									<span className={stone.basePrice === 0 ? 'text-emerald-400 font-semibold' : 'text-[#fae19c] font-semibold'}>
										{stone.basePrice === 0
											? 'Included (₹0)'
											: `+₹${stone.basePrice.toLocaleString('en-IN')}`}
									</span>
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{/* ================= 4. SURFACE FINISH & TEXTURE ================= */}
			<div className="space-y-3">
				<label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5 font-mono">
					<SlidersHorizontal className="size-3.5 text-[#fae19c]" />
					<span>4. Hand-Crafted Surface Finish</span>
				</label>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
					{FINISH_OPTIONS.map((finish) => {
						const isSelected = selectedFinishId === finish.id;
						return (
							<button
								key={finish.id}
								type="button"
								onClick={() => setSelectedFinishId(finish.id)}
								className={`rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
									isSelected
										? 'border-[#fae19c] bg-[#fae19c]/10 text-white'
										: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/25 hover:text-neutral-200'
								}`}
							>
								<div className="text-xs font-medium truncate mb-1">
									{finish.name}
								</div>
								<div className="text-[10px] text-neutral-500 font-light line-clamp-1">
									{finish.description}
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{/* ================= 5. LIVE BULLION PRICE BREAKDOWN MATRIX ================= */}
			{showLiveBreakdown && (
				<div className="rounded-2xl border border-[#fae19c]/30 bg-gradient-to-br from-[#12131d] via-[#0d0e14] to-[#12131d] p-5 sm:p-6 space-y-4 shadow-xl">
					<div className="flex items-center justify-between border-b border-white/10 pb-3">
						<div className="space-y-0.5">
							<div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#fae19c]">
								<ShieldCheck className="size-3.5" />
								<span>Transparent Atelier Price Calculation</span>
							</div>
							<p className="text-xs text-neutral-400 font-light">
								Real-time quotation calculated against live bullion rates and certified gemstones.
							</p>
						</div>

						<div className="text-right">
							<span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
								Estimated Investment
							</span>
							<span className="font-serif text-2xl sm:text-3xl font-bold text-[#fae19c]">
								₹{priceBreakdown.totalEstimate.toLocaleString('en-IN')}
							</span>
						</div>
					</div>

					{/* Line Items Breakdown */}
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
						<div className="rounded-xl border border-white/5 bg-black/40 p-3 space-y-1">
							<span className="text-[10px] font-mono uppercase text-neutral-500 block">
								Gold Bullion Base ({selectedWeight}g)
							</span>
							<span className="text-white font-mono font-medium text-sm">
								₹{priceBreakdown.bullionCost.toLocaleString('en-IN')}
							</span>
							<p className="text-[9.5px] font-mono text-neutral-400">
								@ ₹{activeMetal.ratePerGram.toLocaleString('en-IN')}/g
							</p>
						</div>

						<div className="rounded-xl border border-white/5 bg-black/40 p-3 space-y-1">
							<span className="text-[10px] font-mono uppercase text-neutral-500 block">
								Gemstones / Setting
							</span>
							<span className="text-white font-mono font-medium text-sm">
								₹{priceBreakdown.stoneCost.toLocaleString('en-IN')}
							</span>
							<p className="text-[9.5px] font-mono text-neutral-400 truncate">
								{activeStone.name}
							</p>
						</div>

						<div className="rounded-xl border border-white/5 bg-black/40 p-3 space-y-1">
							<span className="text-[10px] font-mono uppercase text-neutral-500 block">
								Atelier Making ({priceBreakdown.makingChargeRate}%)
							</span>
							<span className="text-white font-mono font-medium text-sm">
								₹{priceBreakdown.makingCharges.toLocaleString('en-IN')}
							</span>
							<p className="text-[9.5px] font-mono text-emerald-400">
								Free BIS 916 Hallmark
							</p>
						</div>

						<div className="rounded-xl border border-white/5 bg-black/40 p-3 space-y-1">
							<span className="text-[10px] font-mono uppercase text-neutral-500 block">
								Statutory GST (3%)
							</span>
							<span className="text-white font-mono font-medium text-sm">
								₹{priceBreakdown.gst.toLocaleString('en-IN')}
							</span>
							<p className="text-[9.5px] font-mono text-neutral-400">
								Government Hallmarking
							</p>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 pt-1 border-t border-white/5 gap-2">
						<div className="flex items-center gap-2">
							<span className="size-1.5 rounded-full bg-[#fae19c]" />
							<span>BIS Hallmarked Pure Alloy • Dual Sartorius Scale Certificate</span>
						</div>
						<span className="text-neutral-500">
							Exact bullion locked for 48 hours upon quotation submission.
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
