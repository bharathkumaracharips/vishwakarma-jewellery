'use client';

import React from 'react';
import { Clock, Wrench, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceItem } from './servicesData';

interface ServiceCardProps {
	service: ServiceItem;
	onBook: (service: ServiceItem) => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
	return (
		<div className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d0e14] p-5 sm:p-6 transition-all duration-300 hover:border-[#fae19c]/40 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85)]">
			{/* Top Bar: Category & Turnaround */}
			<div className="space-y-3 mb-4">
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-1.5 flex-wrap">
						<span className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-[#fae19c]">
							{service.categoryLabel}
						</span>
						{service.badge && (
							<span className="rounded-md border border-[#fae19c]/40 bg-[#fae19c]/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#fae19c] flex items-center gap-1">
								<Sparkles className="size-2.5" />
								<span>{service.badge}</span>
							</span>
						)}
					</div>

					<div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 shrink-0">
						<Clock className="size-3 text-[#fae19c]" />
						<span>{service.turnaroundTime}</span>
					</div>
				</div>

				{/* Title & Tagline */}
				<div className="space-y-1">
					<h2 className="font-serif text-lg font-semibold text-white group-hover:text-[#fae19c] transition-colors">
						{service.name}
					</h2>
					<p className="text-xs text-neutral-300 font-light leading-snug">
						{service.tagline}
					</p>
				</div>

				{/* Detailed Description */}
				<p className="text-[11.5px] text-neutral-400 font-light leading-relaxed line-clamp-3">
					{service.description}
				</p>
			</div>

			{/* Bench Methodology & Assurances */}
			<div className="space-y-3 pt-3 border-t border-white/[0.06] mb-4">
				<div className="flex items-start gap-2 text-[10.5px] text-neutral-400 font-mono">
					<Wrench className="size-3.5 text-[#fae19c] shrink-0 mt-0.5" />
					<span className="line-clamp-1">{service.benchMethod}</span>
				</div>

				<div className="flex flex-wrap gap-1.5">
					{service.assurances.map((assurance, i) => (
						<span
							key={i}
							className="inline-flex items-center gap-1 rounded-md bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 text-[9.5px] text-neutral-300"
						>
							<ShieldCheck className="size-2.5 text-[#fae19c]" />
							<span>{assurance}</span>
						</span>
					))}
				</div>
			</div>

			{/* Pricing & CTA */}
			<div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
				<div>
					<span className="block text-[9.5px] font-mono uppercase text-neutral-500">
						{service.startingPrice === 0 ? 'Diagnostic Bench Fee' : 'Starting Bench Fee'}
					</span>
					<span className="font-serif font-bold text-base text-[#fae19c]">
						{service.startingPrice === 0 ? 'Complimentary' : `₹${service.startingPrice.toLocaleString('en-IN')}`}
						{service.priceUnit && (
							<span className="text-[10px] text-neutral-400 font-mono font-normal ml-1">
								{service.priceUnit}
							</span>
						)}
					</span>
				</div>

				<button
					onClick={() => onBook(service)}
					className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] px-4 py-2 text-[10.5px] font-bold uppercase tracking-wider text-black hover:brightness-105 transition-all cursor-pointer shadow-sm"
				>
					<span>Book Service</span>
					<ArrowRight className="size-3" />
				</button>
			</div>
		</div>
	);
}
