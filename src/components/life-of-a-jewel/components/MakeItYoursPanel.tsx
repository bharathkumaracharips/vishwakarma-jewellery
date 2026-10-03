'use client';

import React from 'react';
import { JewelleryConfiguration, MetalConfig, StoneType } from '../types';
import { Sparkles, SlidersHorizontal, ArrowRight, Bookmark, PhoneCall } from 'lucide-react';

interface MakeItYoursPanelProps {
	configuration: JewelleryConfiguration;
	onUpdateMetal: (tone: MetalConfig['tone'], purity: MetalConfig['purity']) => void;
	onUpdateWeight: (weight: number) => void;
	onUpdateStone: (stoneUpdate: any) => void;
	onRequestQuote: () => void;
	onSaveDesign: () => void;
	onBookConsultation: () => void;
}

export function MakeItYoursPanel({
	configuration,
	onUpdateMetal,
	onUpdateWeight,
	onUpdateStone,
	onRequestQuote,
	onSaveDesign,
	onBookConsultation,
}: MakeItYoursPanelProps) {
	const { metal, stone, approxWeight, budget } = configuration;

	const METALS: { purity: MetalConfig['purity']; tone: MetalConfig['tone']; label: string; dotColor: string }[] = [
		{ purity: '22K', tone: 'Yellow Gold', label: '22K Yellow Gold', dotColor: '#e8c35a' },
		{ purity: '18K', tone: 'Yellow Gold', label: '18K Yellow Gold', dotColor: '#deb950' },
		{ purity: '18K', tone: 'Rose Gold', label: '18K Rose Gold', dotColor: '#e59a84' },
		{ purity: '18K', tone: 'White Gold', label: '18K White Gold', dotColor: '#dcdde2' },
	];

	const STONES: { type: StoneType; label: string; color: string }[] = [
		{ type: 'Diamond', label: 'Diamond', color: '#f0f5ff' },
		{ type: 'Ruby', label: 'Ruby', color: '#c41e3a' },
		{ type: 'Emerald', label: 'Emerald', color: '#097969' },
		{ type: 'Sapphire', label: 'Sapphire', color: '#0f52ba' },
		{ type: 'Polki', label: 'Polki', color: '#fae19c' },
		{ type: 'None', label: 'No Stone', color: 'transparent' },
	];

	return (
		<div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0e0f16]/90 p-5 sm:p-6 backdrop-blur-xl shadow-2xl space-y-5">
			{/* Panel Header */}
			<div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
				<div>
					<div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fae19c]">
						<Sparkles className="size-3" />
						<span>Atelier Co-Creation</span>
					</div>
					<h3 className="font-serif text-lg font-semibold text-white tracking-wide mt-0.5">
						Make It Yours
					</h3>
				</div>
				<span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-neutral-400">
					VK-CFG-2041
				</span>
			</div>

			{/* 01. METAL SELECTION */}
			<div>
				<label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-2">
					01 • Metal & Purity
				</label>
				<div className="grid grid-cols-2 gap-2">
					{METALS.map((m) => {
						const isSelected = metal.purity === m.purity && metal.tone === m.tone;
						return (
							<button
								key={m.label}
								type="button"
								onClick={() => onUpdateMetal(m.tone, m.purity)}
								className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all cursor-pointer ${
									isSelected
										? 'border-[#fae19c] bg-[#fae19c]/10 text-white shadow-sm'
										: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-neutral-200'
								}`}
							>
								<span
									className="size-3 rounded-full border border-white/30 shrink-0"
									style={{ backgroundColor: m.dotColor }}
								/>
								<span className="truncate">{m.label}</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* 02. APPROXIMATE GOLD WEIGHT */}
			<div>
				<div className="flex items-center justify-between mb-1.5">
					<label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
						02 • Approx. Gold Weight
					</label>
					<span className="text-xs font-semibold text-[#fae19c] font-mono">
						~{approxWeight.toFixed(1)} g
					</span>
				</div>
				<input
					type="range"
					min="14"
					max="26"
					step="0.2"
					value={approxWeight}
					onChange={(e) => onUpdateWeight(parseFloat(e.target.value))}
					className="w-full accent-[#fae19c] cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
				/>
				<div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
					<span>14g (Lightweight)</span>
					<span>18.4g (Standard)</span>
					<span>26g (Royal Solid)</span>
				</div>
			</div>

			{/* 03. STONE SELECTION */}
			<div>
				<label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-2">
					03 • Center Gemstone
				</label>
				<div className="grid grid-cols-3 gap-2">
					{STONES.map((s) => {
						const isSelected = stone.type === s.type;
						return (
							<button
								key={s.type}
								type="button"
								onClick={() => onUpdateStone({ type: s.type })}
								className={`flex items-center justify-center gap-1.5 rounded-xl border py-2 px-2 text-xs font-medium transition-all cursor-pointer ${
									isSelected
										? 'border-[#fae19c] bg-[#fae19c]/10 text-white shadow-sm'
										: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-neutral-200'
								}`}
							>
								{s.type !== 'None' && (
									<span
										className="size-2 rounded-full shrink-0"
										style={{ backgroundColor: s.color }}
									/>
								)}
								<span>{s.label}</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* 04. CONTEXT-AWARE STONE SPECS */}
			{stone.type === 'Diamond' && (
				<div className="rounded-xl border border-white/[0.06] bg-black/40 p-3 space-y-2 text-xs">
					<div className="flex justify-between text-neutral-400">
						<span>Carat / Clarity</span>
						<span className="text-white font-medium">1.2 ct • VVS1 Triple Ex</span>
					</div>
					<div className="flex justify-between text-neutral-400">
						<span>Color & Cut</span>
						<span className="text-white font-medium">D Colorless • Oval Brilliant</span>
					</div>
				</div>
			)}

			{stone.type === 'Ruby' && (
				<div className="rounded-xl border border-white/[0.06] bg-black/40 p-3 space-y-2 text-xs">
					<div className="flex justify-between text-neutral-400">
						<span>Grade</span>
						<span className="text-white font-medium">Unheated Pigeon Blood • AA+</span>
					</div>
					<div className="flex justify-between text-neutral-400">
						<span>Carat Weight</span>
						<span className="text-white font-medium">1.45 ct Oval Cabochon</span>
					</div>
				</div>
			)}

			{stone.type === 'Emerald' && (
				<div className="rounded-xl border border-white/[0.06] bg-black/40 p-3 space-y-2 text-xs">
					<div className="flex justify-between text-neutral-400">
						<span>Origin & Clarity</span>
						<span className="text-white font-medium">Zambian Vivid Green • Minor Oil</span>
					</div>
					<div className="flex justify-between text-neutral-400">
						<span>Carat Weight</span>
						<span className="text-white font-medium">1.30 ct Octagonal Step Cut</span>
					</div>
				</div>
			)}

			{/* 05. ESTIMATED BUDGET & CREDIBILITY DISCLAIMER */}
			<div className="rounded-xl border border-[#fae19c]/20 bg-[#fae19c]/[0.03] p-3.5 space-y-1">
				<div className="flex items-center justify-between">
					<span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
						Estimated Range
					</span>
					<span className="font-serif text-sm sm:text-base font-bold text-[#fae19c]">
						₹{budget.min.toLocaleString('en-IN')} – ₹{budget.max.toLocaleString('en-IN')}
					</span>
				</div>
				<p className="text-[9px] text-neutral-400 leading-normal">
					*Estimated configuration range. Final pricing depends on confirmed metal weight, stone selection, workmanship, and current daily gold rates.
				</p>
			</div>

			{/* CONVERSION ACTIONS */}
			<div className="space-y-2 pt-1">
				<button
					type="button"
					onClick={onRequestQuote}
					className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#0a0b0f] shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all hover:brightness-105 cursor-pointer"
				>
					<span>Request Atelier Quote</span>
					<ArrowRight className="size-3.5" />
				</button>

				<div className="grid grid-cols-2 gap-2">
					<button
						type="button"
						onClick={onSaveDesign}
						className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-[11px] font-medium text-neutral-300 transition-colors hover:border-white/30 hover:bg-white/[0.06] cursor-pointer"
					>
						<Bookmark className="size-3.5 text-[#fae19c]" />
						<span>Save to Vault</span>
					</button>

					<button
						type="button"
						onClick={onBookConsultation}
						className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-[11px] font-medium text-neutral-300 transition-colors hover:border-white/30 hover:bg-white/[0.06] cursor-pointer"
					>
						<PhoneCall className="size-3.5 text-[#fae19c]" />
						<span>Book Expert</span>
					</button>
				</div>
			</div>
		</div>
	);
}
