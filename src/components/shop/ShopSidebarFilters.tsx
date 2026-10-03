'use client';

import React from 'react';
import { Hammer, Sparkles, Layers, RotateCcw, Filter, Check } from 'lucide-react';
import { CRAFT_MODES } from './shopData';

interface ShopSidebarFiltersProps {
	selectedCraftMode: string;
	onSelectCraftMode: (mode: string) => void;
	selectedMetal: string;
	onSelectMetal: (metal: string) => void;
	selectedWeightRange: string;
	onSelectWeightRange: (range: string) => void;
	selectedStone: string;
	onSelectStone: (stone: string) => void;
	selectedCollection: string;
	onSelectCollection: (collection: string) => void;
	onResetFilters: () => void;
	totalResults: number;
}

export function ShopSidebarFilters({
	selectedCraftMode,
	onSelectCraftMode,
	selectedMetal,
	onSelectMetal,
	selectedWeightRange,
	onSelectWeightRange,
	selectedStone,
	onSelectStone,
	selectedCollection,
	onSelectCollection,
	onResetFilters,
	totalResults,
}: ShopSidebarFiltersProps) {
	const METALS = [
		{ id: 'all', label: 'All Metals' },
		{ id: '22K', label: '22K Gold (BIS 916)' },
		{ id: '18K', label: '18K Fine Gold' },
		{ id: 'Rose Gold', label: '18K Rose Gold' },
		{ id: 'White Gold', label: '18K White Gold' },
	];

	const WEIGHT_RANGES = [
		{ id: 'all', label: 'All Weights' },
		{ id: 'under-10', label: 'Lightweight (< 10g)' },
		{ id: '10-25', label: 'Medium (10g – 25g)' },
		{ id: '25-40', label: 'Statement (25g – 40g)' },
		{ id: '40-plus', label: 'Grand Bridal (40g+)' },
	];

	const STONES = [
		{ id: 'all', label: 'All Gemstones' },
		{ id: 'Polki', label: 'Uncut Syndicate Polki' },
		{ id: 'Diamond', label: 'GIA Natural Diamonds' },
		{ id: 'Ruby', label: 'Burmese Rubies' },
		{ id: 'Emerald', label: 'Zambian Emeralds' },
		{ id: 'None', label: 'Solid Gold (No Stones)' },
	];

	const COLLECTIONS = [
		{ id: 'all', label: 'All Occasions' },
		{ id: 'bridal', label: 'The Bridal Treasury' },
		{ id: 'temple', label: 'Temple & Heritage' },
		{ id: 'contemporary', label: 'Contemporary Fine' },
		{ id: 'daily', label: 'Daily Wear Fine Gold' },
	];

	return (
		<aside className="w-full space-y-7 rounded-2xl border border-white/10 bg-[#0c0d13]/90 p-5 sm:p-6 backdrop-blur-xl">
			{/* Top Header */}
			<div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
				<div className="flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-white">
					<Filter className="size-3.5 text-[#fae19c]" />
					<span>Filter Archives</span>
				</div>
				<button
					onClick={onResetFilters}
					className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-[#fae19c] transition-colors cursor-pointer"
					title="Reset all filters"
				>
					<RotateCcw className="size-3" />
					<span>Reset</span>
				</button>
			</div>

			{/* ---------------- 1. THE 3 MAIN CRAFT PILLARS ---------------- */}
			<div className="space-y-2.5">
				<label className="block text-[10px] font-mono uppercase tracking-[0.22em] text-[#fae19c]">
					Atelier Creation Pillar
				</label>
				<div className="space-y-1.5">
					{CRAFT_MODES.map((mode) => {
						const isActive = selectedCraftMode === mode.id;
						return (
							<button
								key={mode.id}
								onClick={() => onSelectCraftMode(mode.id)}
								className={`w-full flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer ${
									isActive
										? 'border-[#fae19c] bg-[#fae19c]/15 shadow-sm'
										: 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
								}`}
							>
								<div className="flex w-full items-center justify-between">
									<span className={`text-xs font-semibold uppercase tracking-wider ${
										isActive ? 'text-[#fae19c]' : 'text-white'
									}`}>
										{mode.label}
									</span>
									{isActive && (
										<div className="size-4 rounded-full bg-[#fae19c] text-black flex items-center justify-center">
											<Check className="size-2.5 stroke-[3]" />
										</div>
									)}
								</div>
								<span className="text-[10.5px] text-neutral-400 font-light mt-0.5">
									{mode.description}
								</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* ---------------- 2. METAL PURITY ---------------- */}
			<div className="space-y-2 border-t border-white/[0.08] pt-4">
				<label className="block text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400">
					Metal Purity & Tone
				</label>
				<div className="space-y-1">
					{METALS.map((m) => {
						const isSelected = selectedMetal === m.id;
						return (
							<button
								key={m.id}
								onClick={() => onSelectMetal(m.id)}
								className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-left transition-colors cursor-pointer ${
									isSelected
										? 'bg-white/15 text-white font-medium'
										: 'text-neutral-400 hover:text-neutral-200'
								}`}
							>
								<span>{m.label}</span>
								{isSelected && <span className="size-1.5 rounded-full bg-[#fae19c]" />}
							</button>
						);
					})}
				</div>
			</div>

			{/* ---------------- 3. WEIGHT RANGE ---------------- */}
			<div className="space-y-2 border-t border-white/[0.08] pt-4">
				<label className="block text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400">
					Gold Weight
				</label>
				<div className="space-y-1">
					{WEIGHT_RANGES.map((w) => {
						const isSelected = selectedWeightRange === w.id;
						return (
							<button
								key={w.id}
								onClick={() => onSelectWeightRange(w.id)}
								className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-left transition-colors cursor-pointer ${
									isSelected
										? 'bg-white/15 text-white font-medium'
										: 'text-neutral-400 hover:text-neutral-200'
								}`}
							>
								<span>{w.label}</span>
								{isSelected && <span className="size-1.5 rounded-full bg-[#fae19c]" />}
							</button>
						);
					})}
				</div>
			</div>

			{/* ---------------- 4. GEMSTONES ---------------- */}
			<div className="space-y-2 border-t border-white/[0.08] pt-4">
				<label className="block text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400">
					Gemstone Curation
				</label>
				<div className="space-y-1">
					{STONES.map((s) => {
						const isSelected = selectedStone === s.id;
						return (
							<button
								key={s.id}
								onClick={() => onSelectStone(s.id)}
								className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-left transition-colors cursor-pointer ${
									isSelected
										? 'bg-white/15 text-white font-medium'
										: 'text-neutral-400 hover:text-neutral-200'
								}`}
							>
								<span>{s.label}</span>
								{isSelected && <span className="size-1.5 rounded-full bg-[#fae19c]" />}
							</button>
						);
					})}
				</div>
			</div>

			{/* ---------------- 5. OCCASION COLLECTIONS ---------------- */}
			<div className="space-y-2 border-t border-white/[0.08] pt-4">
				<label className="block text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400">
					Occasion Collection
				</label>
				<div className="space-y-1">
					{COLLECTIONS.map((c) => {
						const isSelected = selectedCollection === c.id;
						return (
							<button
								key={c.id}
								onClick={() => onSelectCollection(c.id)}
								className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-left transition-colors cursor-pointer ${
									isSelected
										? 'bg-white/15 text-white font-medium'
										: 'text-neutral-400 hover:text-neutral-200'
								}`}
							>
								<span>{c.label}</span>
								{isSelected && <span className="size-1.5 rounded-full bg-[#fae19c]" />}
							</button>
						);
					})}
				</div>
			</div>

			{/* Total matches footer */}
			<div className="border-t border-white/[0.08] pt-4 text-center">
				<span className="text-[11px] font-mono text-neutral-400">
					Showing <span className="text-[#fae19c] font-bold">{totalResults}</span> Handcrafted Heirlooms
				</span>
			</div>
		</aside>
	);
}
