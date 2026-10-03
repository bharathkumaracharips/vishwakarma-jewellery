'use client';

import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, HelpCircle } from 'lucide-react';

const FAQS = [
	{
		q: 'Will my diamonds or precious stones be safe from switching or damage?',
		a: 'Every gemstone is inspected under our 10x-40x stereomicroscope in your presence (or recorded on high-definition video during intake). We record natural inclusions, GIA laser serial inscriptions on diamond girdles, and exact millimeter dimensions on your official digital custody pass before any work commences.',
	},
	{
		q: 'Will my gold weight decrease after cleaning, repair, or polishing?',
		a: 'No. We operate under a strict Zero Unaccounted Metal Loss Policy. Your jewellery is weighed on calibrated dual Sartorius balances accurate to 0.001g at intake and final delivery. While micro-buffing removes negligible surface dirt (typically < 0.005g), any removed gold links or splices from resizing are weighed and returned directly to you.',
	},
	{
		q: 'Can you resize a ring with stones on the band without heat damage?',
		a: 'Yes. Unlike conventional open-flame jeweler torches that heat the entire ring and risk cracking stones or melting solder seams, we utilize PUK 6 pulsed argon arc micro-laser welding. The thermal pulse is confined to a microscopic 0.2mm focal point, keeping stones cool to the touch and hallmarks perfectly intact.',
	},
	{
		q: 'How does the Insured Doorstep Vault Pickup work?',
		a: 'An armored, vetted courier arrives at your location with a tamper-evident serial-numbered security pouch. Your jewellery is sealed in your presence with a dual-signature manifest and insured in transit up to full appraised valuation directly to our high-security atelier vault.',
	},
	{
		q: 'Can you restore antique temple jewellery without ruining its historical patina?',
		a: 'Yes. Commercial jewelers often mistakenly submerge antique pieces in acid or aggressive buffing machines, stripping the precious antique oxidation. Our master karigars perform hand micro-chisel work and selective highlight buffing, carefully preserving the deep oxidized recessed patina that gives heirloom jewellery its soulful depth.',
	},
];

export function ServicesTrustFAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	return (
		<section className="w-full max-w-4xl mx-auto space-y-6 pt-6">
			<div className="text-center space-y-2">
				<div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fae19c]">
					<ShieldCheck className="size-3.5" />
					<span>Atelier Transparency Protocol</span>
				</div>
				<h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
					Frequently Asked Questions
				</h2>
				<p className="text-xs text-neutral-400 font-light">
					Complete transparency on gold accounting, gemstone safety, and master bench protocols.
				</p>
			</div>

			<div className="space-y-3">
				{FAQS.map((faq, idx) => {
					const isOpen = openIndex === idx;
					return (
						<div
							key={idx}
							className="rounded-2xl border border-white/10 bg-[#0c0d14] overflow-hidden transition-colors"
						>
							<button
								onClick={() => setOpenIndex(isOpen ? null : idx)}
								className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-white/[0.02]"
							>
								<span className="font-serif text-sm sm:text-base font-semibold text-white pr-4">
									{faq.q}
								</span>
								<ChevronDown
									className={`size-4 text-[#fae19c] transition-transform duration-300 shrink-0 ${
										isOpen ? 'rotate-180' : ''
									}`}
								/>
							</button>

							{isOpen && (
								<div className="px-5 pb-5 text-xs text-neutral-300 font-light leading-relaxed border-t border-white/[0.04] pt-3">
									{faq.a}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
}
