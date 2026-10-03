'use client';

import React from 'react';
import { ShieldCheck, Scale, Sparkles, Eye, ArrowRight, HelpCircle, Hammer } from 'lucide-react';
import { BENCH_TRUST_FACTORS } from './servicesData';

interface ServicesHeroProps {
	onOpenBooking: () => void;
	onOpenDiagnostic: () => void;
}

export function ServicesHero({ onOpenBooking, onOpenDiagnostic }: ServicesHeroProps) {
	const getIcon = (name: string) => {
		switch (name) {
			case 'Scale':
				return <Scale className="size-4 text-[#fae19c]" />;
			case 'Sparkles':
				return <Sparkles className="size-4 text-[#fae19c]" />;
			case 'Eye':
				return <Eye className="size-4 text-[#fae19c]" />;
			default:
				return <ShieldCheck className="size-4 text-[#fae19c]" />;
		}
	};

	return (
		<section className="relative w-full overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#090a10] via-[#0c0d14] to-[#07080b] py-14 sm:py-20 px-4 sm:px-8 lg:px-12">
			{/* Subtle Golden Ambient Glow */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#d4af37]/8 blur-[140px] pointer-events-none rounded-full" />

			<div className="relative max-w-7xl mx-auto text-center space-y-7">
				{/* Top Atelier Badge */}
				<div className="inline-flex items-center gap-2 rounded-full border border-[#fae19c]/30 bg-[#fae19c]/10 px-4 py-1.5 backdrop-blur-md">
					<Hammer className="size-3.5 text-[#fae19c]" />
					<span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#fae19c]">
						The Master Goldsmith Bench • Estd 1984
					</span>
				</div>

				{/* Main Headline */}
				<div className="space-y-3 max-w-4xl mx-auto">
					<h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
						The Atelier Clinic for Heirlooms & Precision Bench Services
					</h1>
					<p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
						Restoring structural integrity, brilliance, and sentimental legacy. From microscopic laser welding to 100% hallmark-safe ring resizing and vintage Nakashi restorations.
					</p>
				</div>

				{/* Action CTAs */}
				<div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
					<button
						onClick={onOpenBooking}
						className="rounded-full bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-black hover:brightness-105 shadow-[0_4px_25px_rgba(212,175,55,0.3)] transition-all cursor-pointer flex items-center gap-2"
					>
						<span>Book Bench Intake</span>
						<ArrowRight className="size-4" />
					</button>

					<button
						onClick={onOpenDiagnostic}
						className="rounded-full border border-white/20 bg-white/[0.04] px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-200 hover:text-white hover:border-[#fae19c]/50 hover:bg-white/[0.08] transition-all cursor-pointer flex items-center gap-2"
					>
						<HelpCircle className="size-4 text-[#fae19c]" />
						<span>I Don't Know What's Wrong</span>
					</button>
				</div>

				{/* 4 Atelier Bench Trust Factors */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-8 text-left max-w-6xl mx-auto">
					{BENCH_TRUST_FACTORS.map((factor, index) => (
						<div
							key={index}
							className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4.5 backdrop-blur-md hover:border-[#fae19c]/30 transition-colors space-y-2"
						>
							<div className="flex items-center gap-2.5">
								<div className="p-2 rounded-xl border border-white/10 bg-white/5">
									{getIcon(factor.iconName)}
								</div>
								<h2 className="text-xs font-serif font-bold uppercase tracking-wider text-white">
									{factor.title}
								</h2>
							</div>
							<p className="text-[11.5px] text-neutral-400 font-light leading-relaxed">
								{factor.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
