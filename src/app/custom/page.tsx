'use client';

import React, { useState, Suspense } from 'react';
import { Header } from '@/components/ui/header-3';
import { AiIdeologyStudio } from '@/components/custom/AiIdeologyStudio';
import { CatalogueChecklistExplorer } from '@/components/custom/CatalogueChecklistExplorer';
import { LIVE_BULLION_RATE_22K, LIVE_BULLION_RATE_18K } from '@/components/shop/shopData';
import {
	Sparkles,
	CheckSquare,
	ShieldCheck,
	Scale,
	Compass,
	Award,
	Lock,
	Clock,
	Check,
} from 'lucide-react';

export default function CustomJewelleryPage() {
	// Primary Pathway Switcher: 'ai-studio' | 'catalogue-checklist'
	const [activePathway, setActivePathway] = useState<'ai-studio' | 'catalogue-checklist'>('ai-studio');
	const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);

	return (
		<div className="min-h-screen w-full bg-[#07080b] text-[#f8fafc] selection:bg-[#fae19c]/25 selection:text-[#fae19c]">
			{/* Global Header Navigation */}
			<Header />

			{/* Sticky Live Bullion Ticker Bar */}
			<div className="w-full border-b border-white/[0.06] bg-[#0c0d12]/95 backdrop-blur-md sticky top-[84px] z-40 py-2.5 px-4 sm:px-8 text-[11px] font-mono text-neutral-400 shadow-md">
				<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
					<div className="flex items-center gap-4">
						<span className="flex items-center gap-1.5 text-neutral-300">
							<span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
							<span>LIVE BESPOKE BULLION:</span>
						</span>
						<span className="text-[#fae19c] font-semibold">22K: ₹{LIVE_BULLION_RATE_22K.toLocaleString('en-IN')}/g</span>
						<span className="text-neutral-600">|</span>
						<span className="text-[#fae19c] font-semibold">18K: ₹{LIVE_BULLION_RATE_18K.toLocaleString('en-IN')}/g</span>
						<span className="text-neutral-600">|</span>
						<span className="text-[#fae19c] font-semibold">PT950: ₹4,200/g</span>
					</div>

					<div className="hidden md:flex items-center gap-5 text-[10px] text-neutral-400">
						<span className="flex items-center gap-1">
							<ShieldCheck className="size-3 text-[#fae19c]" />
							<span>100% BIS Hallmarked</span>
						</span>
						<span>&bull;</span>
						<span className="flex items-center gap-1">
							<Scale className="size-3 text-[#fae19c]" />
							<span>Dual Micro-Balance Calibrated</span>
						</span>
						<span>&bull;</span>
						<span className="flex items-center gap-1">
							<Clock className="size-3 text-[#fae19c]" />
							<span>24-Hour 3D CAD Feasibility</span>
						</span>
					</div>
				</div>
			</div>

			{/* Main Content Hero & Pathway Selector */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
				{/* Top Atelier Hero Banner */}
				<div className="text-center space-y-3.5 max-w-3xl mx-auto">
					<div className="inline-flex items-center gap-2 rounded-full border border-[#fae19c]/30 bg-[#fae19c]/[0.08] px-4 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-[#fae19c]">
						<Sparkles className="size-3.5" />
						<span>The Vishwakarma Custom Atelier &bull; Estd 1984</span>
					</div>

					<h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-wide leading-tight">
						When Ideology Meets Generational Craftsmanship.
					</h1>

					<p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
						Every bespoke ornament begins with a sentiment. Choose whether you want to co-create from scratch with our multi-modal AI studio, or customize a proven design from our hallmarked archives.
					</p>
				</div>

				{/* Two Primary Pathway Selection Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
					{/* CARD 1: AI STUDIO */}
					<button
						type="button"
						onClick={() => {
							setActivePathway('ai-studio');
							setSubmittedSummary(null);
						}}
						className={`group relative rounded-3xl border p-6 sm:p-7 text-left transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
							activePathway === 'ai-studio'
								? 'border-[#fae19c] bg-[#12131e] shadow-[0_15px_50px_rgba(250,225,156,0.12)] ring-1 ring-[#fae19c]/40'
								: 'border-white/10 bg-[#0c0d14]/70 hover:border-white/25 hover:bg-[#0c0d14]'
						}`}
					>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="size-11 rounded-2xl bg-[#fae19c]/10 border border-[#fae19c]/30 flex items-center justify-center text-[#fae19c]">
									<Sparkles className="size-5" />
								</span>
								<span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ${
									activePathway === 'ai-studio'
										? 'bg-[#fae19c] text-black font-bold'
										: 'bg-white/10 text-neutral-400'
								}`}>
									{activePathway === 'ai-studio' ? 'Active Mode' : 'Option 1'}
								</span>
							</div>

							<div className="space-y-1">
								<h3 className="font-serif text-xl sm:text-2xl font-semibold text-white group-hover:text-[#fae19c] transition-colors">
									Craft from Scratch (AI Studio)
								</h3>
								<p className="text-xs text-neutral-400 font-light leading-relaxed">
									Have your own concept? Upload text prompts, voice notes, video clips, sketches, or links from Instagram & Pinterest. Then customize metals, stones, and weight with live pricing.
								</p>
							</div>
						</div>

						<div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-[#fae19c]">
							<span>Start Custom Creation &rarr;</span>
						</div>
					</button>

					{/* CARD 2: CATALOGUE CHECKLIST */}
					<button
						type="button"
						onClick={() => {
							setActivePathway('catalogue-checklist');
							setSubmittedSummary(null);
						}}
						className={`group relative rounded-3xl border p-6 sm:p-7 text-left transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
							activePathway === 'catalogue-checklist'
								? 'border-[#fae19c] bg-[#12131e] shadow-[0_15px_50px_rgba(250,225,156,0.12)] ring-1 ring-[#fae19c]/40'
								: 'border-white/10 bg-[#0c0d14]/70 hover:border-white/25 hover:bg-[#0c0d14]'
						}`}
					>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="size-11 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-white">
									<CheckSquare className="size-5" />
								</span>
								<span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ${
									activePathway === 'catalogue-checklist'
										? 'bg-[#fae19c] text-black font-bold'
										: 'bg-white/10 text-neutral-400'
								}`}>
									{activePathway === 'catalogue-checklist' ? 'Active Mode' : 'Option 2'}
								</span>
							</div>

							<div className="space-y-1">
								<h3 className="font-serif text-xl sm:text-2xl font-semibold text-white group-hover:text-[#fae19c] transition-colors">
									Guided Catalogue Checklist
								</h3>
								<p className="text-xs text-neutral-400 font-light leading-relaxed">
									Not sure where to begin? Answer 4 quick checklist questions to discover curated hallmarked baselines from our shop, then customize metals, stones, and weight.
								</p>
							</div>
						</div>

						<div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-[#fae19c]">
							<span>Explore Catalogue Checklist &rarr;</span>
						</div>
					</button>
				</div>

				{/* Active Pathway View */}
				<div className="pt-4">
					{activePathway === 'ai-studio' ? (
						<AiIdeologyStudio
							onCompleteSubmission={(data) => {
								setSubmittedSummary(
									`Your bespoke AI inquiry for custom ${data.category.toUpperCase()} estimated at ₹${data.configuredPrice?.totalEstimate.toLocaleString('en-IN') || 'Pending'} has been logged. Our CAD artisan will reach out within 24 hours.`
								);
							}}
						/>
					) : (
						<CatalogueChecklistExplorer
							onCompleteSubmission={(data) => {
								setSubmittedSummary(
									`Your customized inquiry for ${data.baselineItem?.name || 'Catalogue Baseline'} (${data.configuredSpecs?.metalPurity || '22K'}, ~${data.configuredSpecs?.weightGrams || 'Custom'}g) estimated at ₹${data.configuredPrice?.totalEstimate.toLocaleString('en-IN') || 'Pending'} has been logged.`
								);
							}}
						/>
					)}
				</div>

				{/* Success Notice Modal */}
				{submittedSummary && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
						<div className="relative z-10 w-full max-w-md rounded-3xl border border-[#fae19c]/40 bg-[#0e0f17] p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
							<div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#fae19c]">
								<Check className="size-4" />
								<span>Atelier Custody Notice</span>
							</div>
							<h3 className="font-serif text-xl font-semibold text-white">
								Bespoke Ideology Logged Successfully
							</h3>
							<p className="text-xs text-neutral-300 font-light leading-relaxed">
								{submittedSummary}
							</p>
							<div className="rounded-xl border border-white/10 bg-black/40 p-3 text-[11px] font-mono text-neutral-400 space-y-1">
								<p>&bull; 4K Photorealistic CAD Render (within 24 hrs)</p>
								<p>&bull; Live Bullion Locking Guarantee (48 hrs)</p>
								<p>&bull; 100% BIS 916 Hallmarked Pure Alloy</p>
							</div>
							<button
								type="button"
								onClick={() => setSubmittedSummary(null)}
								className="w-full rounded-xl bg-gradient-to-r from-[#fae19c] to-[#d4af37] py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105 cursor-pointer"
							>
								Understood
							</button>
						</div>
					</div>
				)}

				{/* Atelier Craftsmanship Assurances Strip */}
				<div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 border-t border-white/[0.08]">
					<div className="rounded-2xl border border-white/5 bg-[#0b0c12] p-5 space-y-2">
						<ShieldCheck className="size-5 text-[#fae19c]" />
						<h4 className="font-serif text-sm font-semibold text-white">100% BIS Hallmarked</h4>
						<p className="text-xs text-neutral-400 font-light">
							Laser assay tested and stamped under Government BIS license HM-916-KA-4412.
						</p>
					</div>

					<div className="rounded-2xl border border-white/5 bg-[#0b0c12] p-5 space-y-2">
						<Scale className="size-5 text-[#fae19c]" />
						<h4 className="font-serif text-sm font-semibold text-white">Dual Sartorius Scale</h4>
						<p className="text-xs text-neutral-400 font-light">
							Calibrated micro-balance weight certificate issued before and after stone setting.
						</p>
					</div>

					<div className="rounded-2xl border border-white/5 bg-[#0b0c12] p-5 space-y-2">
						<Clock className="size-5 text-[#fae19c]" />
						<h4 className="font-serif text-sm font-semibold text-white">24h 3D CAD Turnaround</h4>
						<p className="text-xs text-neutral-400 font-light">
							Inspect exact photorealistic renders and wax model simulations before casting.
						</p>
					</div>

					<div className="rounded-2xl border border-white/5 bg-[#0b0c12] p-5 space-y-2">
						<Lock className="size-5 text-[#fae19c]" />
						<h4 className="font-serif text-sm font-semibold text-white">Insured Armored Delivery</h4>
						<p className="text-xs text-neutral-400 font-light">
							Sealed in tamper-evident vault custody with door-to-door armored security transit.
						</p>
					</div>
				</div>
			</main>

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
							Master goldsmiths and certified fine jewellery since 1984. Every bespoke ornament carries generational provenance and tamper-evident digital custody.
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
							<li><a href="/custom" className="text-[#fae19c] font-medium">Bespoke Custom Studio</a></li>
							<li><a href="/shop?category=rings" className="hover:text-[#fae19c]">Solitaire Rings</a></li>
							<li><a href="/shop?category=chains" className="hover:text-[#fae19c]">Vedic Rope Chains</a></li>
						</ul>
					</div>

					<div className="space-y-2 text-xs">
						<span className="text-[10px] font-semibold uppercase tracking-widest text-white block mb-1">
							Bespoke Services
						</span>
						<ul className="space-y-1.5 font-light">
							<li><a href="/custom" className="hover:text-[#fae19c]">AI Ideology Studio</a></li>
							<li><a href="/services" className="hover:text-[#fae19c]">Heirloom Remodeling</a></li>
							<li><a href="/services" className="hover:text-[#fae19c]">Laser Hallmark Verification</a></li>
							<li><a href="/services" className="hover:text-[#fae19c]">Diamond Gemology Certification</a></li>
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
						&copy; {new Date().getFullYear()} VISHWAKARMA JEWELERS &bull; ALL RIGHTS RESERVED
					</div>
					<div className="flex gap-4">
						<a href="#" className="hover:underline">Privacy Terms</a>
						<a href="#" className="hover:underline">Hallmark Verification</a>
						<a href="#" className="hover:underline">Digital Vault Passports</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
