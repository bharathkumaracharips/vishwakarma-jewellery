'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const CASE_STUDIES = [
	{
		id: 'polki-choker',
		title: 'Antique 1940s Polki Choker',
		category: 'Care & Restoration',
		problem: 'Cracked hinge pins, 3 loose syndicate uncut polkis, calcified grime, and frayed silk dori.',
		solution: 'Ultrasonic bio-bath, micro-laser hinge rebuilding, silver foil backing refreshed, hand-woven gold Zari dori installed.',
		weightChange: 'Zero Loss (Before: 64.218g | After: 64.215g)',
		turnaround: '4 Days',
		image: '/images/polki-choker.jpg',
	},
	{
		id: 'rope-chain',
		title: '22K Hand-Woven Rope Chain',
		category: 'Repair',
		problem: 'Snapped at midpoint during daily wear with stretched hollow interlocking links.',
		solution: 'Argon cold-pulsed micro-laser joint fusion. Tensile pull-tested to 12kg resistance with zero stiff joints.',
		weightChange: '+0.012g (Matching 22K alloy laser filler)',
		turnaround: '2 Hours (Same Day)',
		image: '/images/gold-rope-chain.jpg',
	},
	{
		id: 'solitaire-ring',
		title: 'Heirloom Diamond Solitaire Band',
		category: 'Resizing & Stone Services',
		problem: 'Customer required 3 sizes larger (+3.5mm) without losing original 1988 hallmark or stressing diamond seat.',
		solution: 'Precision mandrel cut, 18K gold splice inserted with laser seamless fusion, prongs re-tipped under 20x microscope.',
		weightChange: '+0.450g (18K gold added)',
		turnaround: '24 Hours',
		image: '/images/solitaire-ring.jpg',
	},
];

export function BeforeAfterShowcase() {
	const [activeCase, setActiveCase] = useState(0);
	const current = CASE_STUDIES[activeCase];

	return (
		<section className="w-full rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e0f17] via-[#090a0f] to-[#0e0f17] p-6 sm:p-10 shadow-2xl space-y-8">
			{/* Section Header */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
				<div className="space-y-1.5">
					<div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fae19c]">
						<Sparkles className="size-3" />
						<span>Atelier Case Studies</span>
					</div>
					<h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
						Restoration Case Files
					</h2>
					<p className="text-xs text-neutral-400 font-light max-w-xl">
						True archival restorations from our master goldsmith benches. Documenting exact metallurgical repairs and verifiable weight accounting.
					</p>
				</div>

				{/* Case Study Switcher Tabs */}
				<div className="flex flex-wrap gap-2">
					{CASE_STUDIES.map((item, idx) => (
						<button
							key={item.id}
							onClick={() => setActiveCase(idx)}
							className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
								activeCase === idx
									? 'bg-[#fae19c] text-black shadow-md'
									: 'border border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
							}`}
						>
							{item.title}
						</button>
					))}
				</div>
			</div>

			{/* Active Case Study Details Card */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
				{/* Visual Photography */}
				<div className="lg:col-span-5 relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10">
					<img
						src={current.image}
						alt={current.title}
						className="size-full object-cover filter brightness-95 contrast-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

					<div className="absolute top-3 left-3 rounded-md border border-[#fae19c]/40 bg-black/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#fae19c] backdrop-blur-md">
						{current.category}
					</div>

					<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-300 backdrop-blur-md bg-black/70 rounded-xl px-3 py-1.5 border border-white/10">
						<span>Turnaround: {current.turnaround}</span>
						<span className="text-[#fae19c]">100% Bench Certified</span>
					</div>
				</div>

				{/* Diagnostic Breakdown */}
				<div className="lg:col-span-7 space-y-5 text-left">
					<div className="space-y-1">
						<span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
							Case Study #{activeCase + 1}
						</span>
						<h3 className="font-serif text-2xl font-bold text-white">
							{current.title}
						</h3>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{/* Problem */}
						<div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 space-y-1.5">
							<span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-semibold">
								Condition at Intake
							</span>
							<p className="text-xs text-neutral-300 font-light leading-relaxed">
								{current.problem}
							</p>
						</div>

						{/* Solution */}
						<div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-1.5">
							<span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
								Atelier Bench Resolution
							</span>
							<p className="text-xs text-neutral-300 font-light leading-relaxed">
								{current.solution}
							</p>
						</div>
					</div>

					{/* Calibrated Weight Log */}
					<div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
						<div className="flex items-center gap-2 text-neutral-400">
							<ShieldCheck className="size-4 text-[#fae19c]" />
							<span className="font-mono">Calibrated 0.001g Balance Audit:</span>
						</div>
						<span className="text-[#fae19c] font-mono font-semibold">
							{current.weightChange}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
