'use client';

import React, { useState } from 'react';
import {
	Upload,
	Mic,
	Video,
	FileText,
	Sparkles,
	ArrowRight,
	Check,
	Sliders,
} from 'lucide-react';
import { MetalConfig, StoneType } from '../types';

interface BespokeIdeaPortalProps {
	onSubmitIdea: (ideaDetails: {
		format: string;
		description: string;
		metal: string;
		approxWeight: number;
		stone: string;
	}) => void;
}

export function BespokeIdeaPortal({ onSubmitIdea }: BespokeIdeaPortalProps) {
	const [activeFormat, setActiveFormat] = useState<'image' | 'voice' | 'video' | 'text'>('text');
	const [ideaText, setIdeaText] = useState('');
	const [selectedMetal, setSelectedMetal] = useState<string>('22K Yellow Gold');
	const [approxWeight, setApproxWeight] = useState<number>(18.5);
	const [selectedStone, setSelectedStone] = useState<string>('Uncut Polki & Emerald');
	const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

	const FORMAT_TABS = [
		{ id: 'image', label: 'Image / Sketch', icon: Upload },
		{ id: 'voice', label: 'Voice Note', icon: Mic },
		{ id: 'video', label: 'Video / Reel', icon: Video },
		{ id: 'text', label: 'Text Idea', icon: FileText },
	] as const;

	const METALS = ['22K Yellow Gold', '18K Yellow Gold', '18K Rose Gold', '18K White Gold'];
	const STONES = ['Uncut Polki & Emerald', 'Natural Diamonds', 'Burmese Ruby', 'Solitaire', 'Solid Gold (No Stone)'];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmitIdea({
			format: activeFormat,
			description: ideaText || 'Attached ' + activeFormat + ' reference',
			metal: selectedMetal,
			approxWeight,
			stone: selectedStone,
		});
	};

	return (
		<div className="w-full max-w-xl rounded-2xl sm:rounded-3xl border border-[#fae19c]/30 bg-[#0c0d14]/95 p-4 sm:p-5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] space-y-3 sm:space-y-3.5 text-left">
			{/* Header */}
			<div className="border-b border-white/[0.08] pb-2.5">
				<div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#fae19c]">
					<Sparkles className="size-3" />
					<span>Bespoke Ideology • Handcrafted For You</span>
				</div>
				<h3 className="font-serif text-lg sm:text-xl font-semibold text-white tracking-wide mt-0.5">
					Have an Idea? Specially Designed for You with Your Ideology.
				</h3>
				<p className="text-[11px] sm:text-xs text-neutral-300 font-light mt-1 leading-relaxed">
					When <span className="text-[#fae19c] font-medium">ideology meets craftsmanship</span>, it’s an unmatched legacy. This is how it works at Vishwakarma: drop your idea in <span className="text-white font-medium">any format</span>—video, voice note, sketch, or text. Select metals, approx weight, and stones. <span className="text-[#fae19c] font-medium">Everything is in your hands—go ahead!</span>
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
				{/* 1. FORMAT SELECTOR TABS */}
				<div>
					<label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
						01 • Drop Your Idea in Any Format
					</label>
					<div className="grid grid-cols-4 gap-1.5">
						{FORMAT_TABS.map((tab) => {
							const Icon = tab.icon;
							const isActive = activeFormat === tab.id;
							return (
								<button
									key={tab.id}
									type="button"
									onClick={() => setActiveFormat(tab.id)}
									className={`flex flex-col items-center justify-center gap-1 rounded-lg sm:rounded-xl border py-1.5 sm:py-2 px-1 text-[10px] font-medium transition-all cursor-pointer ${
										isActive
											? 'border-[#fae19c] bg-[#fae19c]/15 text-[#fae19c] shadow-sm'
											: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-neutral-200'
									}`}
								>
									<Icon className="size-3.5" />
									<span className="text-[9px] sm:text-[10px] truncate max-w-full">{tab.label}</span>
								</button>
							);
						})}
					</div>
				</div>

				{/* 2. DYNAMIC INPUT AREA BASED ON SELECTED FORMAT */}
				<div className="rounded-xl border border-white/10 bg-black/40 p-2.5 sm:p-3 transition-all">
					{activeFormat === 'text' && (
						<div>
							<textarea
								rows={2}
								value={ideaText}
								onChange={(e) => setIdeaText(e.target.value)}
								placeholder="Describe your ideology, symbolism, or dream design (e.g. A sacred lotus pendant with uncut polki and emerald drops)..."
								className="w-full bg-transparent text-xs text-neutral-100 placeholder-neutral-500 outline-none resize-none leading-relaxed"
							/>
						</div>
					)}

					{activeFormat === 'image' && (
						<label className="flex flex-col items-center justify-center py-2.5 border-2 border-dashed border-white/15 rounded-lg hover:border-[#fae19c]/50 transition-colors cursor-pointer group">
							<Upload className="size-5 text-[#fae19c] mb-1 group-hover:scale-110 transition-transform" />
							<span className="text-[11px] font-medium text-neutral-200">
								{attachedFileName || 'Click or drag sketch, CAD draw, or photo'}
							</span>
							<span className="text-[9px] text-neutral-500">
								PNG, JPG, Procreate, or hand sketch up to 50MB
							</span>
							<input
								type="file"
								accept="image/*"
								className="hidden"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) setAttachedFileName(file.name);
								}}
							/>
						</label>
					)}

					{activeFormat === 'voice' && (
						<div className="flex flex-col items-center justify-center py-2 text-center space-y-1.5">
							<div className="size-8 rounded-full border border-[#fae19c]/40 bg-[#fae19c]/10 flex items-center justify-center text-[#fae19c] animate-pulse">
								<Mic className="size-4" />
							</div>
							<div>
								<span className="text-[11px] font-medium text-neutral-200 block">
									Speak your vision directly
								</span>
								<span className="text-[9px] text-neutral-400">
									Explain how you want it to feel, family significance, or motifs
								</span>
							</div>
							<button
								type="button"
								onClick={() => alert('Microphone recording simulation started... Speak your vision!')}
								className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] text-neutral-200 hover:border-[#fae19c] cursor-pointer"
							>
								Tap to Record Voice Note
							</button>
						</div>
					)}

					{activeFormat === 'video' && (
						<label className="flex flex-col items-center justify-center py-2.5 border-2 border-dashed border-white/15 rounded-lg hover:border-[#fae19c]/50 transition-colors cursor-pointer group">
							<Video className="size-5 text-[#fae19c] mb-1 group-hover:scale-110 transition-transform" />
							<span className="text-[11px] font-medium text-neutral-200">
								{attachedFileName || 'Drop a video recording or social media reference'}
							</span>
							<span className="text-[9px] text-neutral-500">
								MP4, MOV, or short video clip
							</span>
							<input
								type="file"
								accept="video/*"
								className="hidden"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) setAttachedFileName(file.name);
								}}
							/>
						</label>
					)}
				</div>

				{/* 3. EVERYTHING IS IN YOUR HANDS (Metals, Weight, Gemstones) */}
				<div className="space-y-2 pt-0.5">
					<div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
						<Sliders className="size-3 text-[#fae19c]" />
						<span>02 • Choose Metals & Specifications</span>
					</div>

					{/* Metal Chips */}
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
						{METALS.map((metal) => (
							<button
								key={metal}
								type="button"
								onClick={() => setSelectedMetal(metal)}
								className={`rounded-lg border px-2 py-1 text-[10px] font-medium truncate transition-all cursor-pointer ${
									selectedMetal === metal
										? 'border-[#fae19c] bg-[#fae19c]/15 text-[#fae19c]'
										: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-neutral-200'
								}`}
							>
								{metal}
							</button>
						))}
					</div>

					{/* Approx. Weight Slider */}
					<div className="rounded-xl border border-white/[0.06] bg-black/30 p-2 px-3">
						<div className="flex justify-between items-center text-[11px] mb-1">
							<span className="text-neutral-400">Approximate Gold Weight</span>
							<span className="font-mono font-semibold text-[#fae19c]">~{approxWeight} g</span>
						</div>
						<input
							type="range"
							min="10"
							max="45"
							step="0.5"
							value={approxWeight}
							onChange={(e) => setApproxWeight(parseFloat(e.target.value))}
							className="w-full accent-[#fae19c] cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
						/>
					</div>

					{/* Stones Selection */}
					<div>
						<div className="flex flex-wrap gap-1">
							{STONES.map((stone) => (
								<button
									key={stone}
									type="button"
									onClick={() => setSelectedStone(stone)}
									className={`rounded-full border px-2.5 py-0.5 text-[9px] font-medium transition-all cursor-pointer ${
										selectedStone === stone
											? 'border-[#fae19c] bg-[#fae19c]/15 text-[#fae19c]'
											: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-neutral-200'
									}`}
								>
									{stone}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Primary Submit Button */}
				<button
					type="submit"
					className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#0a0b0f] shadow-[0_4px_25px_rgba(212,175,55,0.25)] transition-all hover:brightness-105 cursor-pointer mt-1"
				>
					<span>Bring Your Vision to the Karigar</span>
					<ArrowRight className="size-3.5" />
				</button>
			</form>
		</div>
	);
}
