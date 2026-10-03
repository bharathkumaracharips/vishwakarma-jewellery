'use client';

import React from 'react';
import { CHAPTERS } from '../state/useJewelleryJourney';

interface GoldenTraceProps {
	progress: number; // 0.0 to 1.0
	className?: string;
}

export function GoldenTrace({ progress, className = '' }: GoldenTraceProps) {
	// Active chapter index
	const activeIndex = Math.min(
		Math.floor(progress * CHAPTERS.length),
		CHAPTERS.length - 1
	);

	return (
		<div
			className={`pointer-events-none fixed left-4 sm:left-8 lg:left-12 top-28 bottom-20 z-10 hidden md:flex flex-col items-center justify-between opacity-80 ${className}`}
		>
			{/* Vertical Ambient Background Guide Line */}
			<div className="absolute top-0 bottom-0 w-[1.5px] bg-white/[0.08]" />

			{/* Active Golden Progress Thread */}
			<div
				className="absolute top-0 w-[2px] bg-gradient-to-b from-[#fae19c] via-[#d4af37] to-[#fae19c] shadow-[0_0_12px_rgba(250,225,156,0.8)] transition-all duration-150 ease-out"
				style={{
					height: `${Math.min(Math.max(progress * 100, 2), 100)}%`,
				}}
			/>

			{/* Discrete Milestone Nodes along the Journey Rail */}
			{CHAPTERS.map((ch, idx) => {
				const isPassed = idx <= activeIndex;
				const isCurrent = idx === activeIndex;

				return (
					<div
						key={ch.id}
						className="relative z-10 flex items-center group pointer-events-auto cursor-pointer"
						onClick={() => {
							const el = document.querySelector('section');
							if (el) {
								const targetTop = el.offsetTop + el.scrollHeight * ch.range[0];
								window.scrollTo({ top: targetTop, behavior: 'smooth' });
							}
						}}
					>
						{/* Glowing Milestone Bead */}
						<div
							className={`size-2.5 rounded-full border transition-all duration-300 ${
								isCurrent
									? 'scale-125 border-[#fae19c] bg-[#fae19c] shadow-[0_0_12px_#fae19c]'
									: isPassed
									? 'border-[#d4af37] bg-[#d4af37]/80'
									: 'border-neutral-700 bg-neutral-900 opacity-40'
							}`}
						/>

						{/* Hover/Active Chapter Label (Aligned to the right of the rail) */}
						<div
							className={`absolute left-6 whitespace-nowrap rounded-md px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest transition-all duration-200 ${
								isCurrent
									? 'opacity-100 translate-x-0 bg-black/80 border border-[#fae19c]/40 text-[#fae19c]'
									: 'opacity-0 -translate-x-1 group-hover:opacity-80 group-hover:translate-x-0 bg-black/60 text-neutral-400'
							}`}
						>
							{ch.number} • {ch.title}
						</div>
					</div>
				);
			})}
		</div>
	);
}
