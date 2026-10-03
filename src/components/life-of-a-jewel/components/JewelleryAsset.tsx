'use client';

import React from 'react';
import { JewelleryConfiguration } from '../types';

interface JewelleryAssetProps {
	configuration: JewelleryConfiguration;
	progress: number; // 0.0 to 1.0
	isExploded?: boolean;
}

export function JewelleryAsset({
	configuration,
	progress,
	isExploded = false,
}: JewelleryAssetProps) {
	const { metal, stone, approxWeight } = configuration;

	// Dynamic CSS filter based on metal selection for realistic material change
	let metalFilter = 'brightness(1.02) contrast(1.08)';
	let ambientGlow = 'rgba(232, 195, 90, 0.35)'; // Warm 22K Gold

	if (metal.tone === 'Rose Gold') {
		metalFilter = 'brightness(1.04) contrast(1.1) hue-rotate(335deg) saturate(1.35)';
		ambientGlow = 'rgba(229, 154, 132, 0.35)'; // Rose Gold
	} else if (metal.tone === 'White Gold') {
		metalFilter = 'brightness(1.12) contrast(1.15) grayscale(0.85) saturate(0.2)';
		ambientGlow = 'rgba(230, 235, 250, 0.4)'; // Platinum / White Gold
	} else if (metal.purity === '18K') {
		metalFilter = 'brightness(1.03) contrast(1.08) saturate(1.1)';
		ambientGlow = 'rgba(222, 185, 80, 0.3)';
	}

	// Gentle floating animation based on progress
	const floatY = Math.sin(progress * Math.PI * 6) * 6;
	const rotateZ = Math.sin(progress * Math.PI * 4) * 2;

	return (
		<div className="relative flex items-center justify-center select-none">
			{/* Atmospheric Ambient Glow behind the Jewel */}
			<div
				className="absolute size-80 sm:size-96 rounded-full blur-3xl opacity-40 transition-all duration-700 pointer-events-none"
				style={{
					background: `radial-gradient(circle, ${ambientGlow} 0%, ${stone.colorHex || '#f0f5ff'}22 45%, transparent 70%)`,
				}}
			/>

			{/* Concentric Blueprint Rings for luxury technical presentation */}
			<div className="absolute size-72 sm:size-84 rounded-full border border-white/[0.07] animate-[spin_80s_linear_infinite]" />
			<div className="absolute size-96 sm:size-[430px] rounded-full border border-white/[0.04] animate-[spin_120s_linear_infinite_reverse]" />

			{/* Main Photorealistic Jewel Container */}
			<div
				className="relative size-64 sm:size-80 lg:size-88 rounded-3xl overflow-hidden border border-white/10 bg-[#0e0f17] shadow-[0_20px_60px_rgba(0,0,0,0.9)] transition-all duration-500 ease-out"
				style={{
					transform: `translateY(${floatY}px) rotate(${rotateZ}deg) scale(${1 + (approxWeight - 18.4) * 0.012})`,
				}}
			>
				{/* The Real High-Resolution Luxury Ornament Photograph */}
				<img
					src="/images/polki-choker.jpg"
					alt={configuration.baseDesignName}
					className="size-full object-cover object-center transition-all duration-700 pointer-events-none"
					style={{
						filter: metalFilter,
					}}
				/>

				{/* High-Luster Specular Sheen Overlay */}
				<div
					className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 transition-opacity duration-500"
					style={{
						background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)',
					}}
				/>

				{/* Dynamic Gemstone Flare (reflects chosen stone color) */}
				{stone.type !== 'None' && (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
						<div
							className="size-10 rounded-full blur-md opacity-60 transition-colors duration-500 animate-pulse"
							style={{ backgroundColor: stone.colorHex || '#f0f5ff' }}
						/>
						{/* Sharp brilliance diamond star */}
						<div className="size-2 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
					</div>
				)}

				{/* Bottom subtle luxury watermark badge */}
				<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-black/60 px-3 py-1.5 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
					<span className="font-semibold text-[#fae19c]">{metal.purity} {metal.tone}</span>
					<span>~{approxWeight.toFixed(1)}g</span>
					<span className="text-white">{stone.type}</span>
				</div>
			</div>

			{/* ================= EXPLODED ANATOMY CALLOUTS (Chapter 02) ================= */}
			{isExploded && (
				<>
					{/* Callout 1: 22K Solid Gold Core */}
					<div className="absolute -top-6 -left-8 sm:-left-20 z-20 flex items-center gap-2 animate-in fade-in-50 slide-in-from-left duration-500">
						<div className="rounded-xl border border-[#fae19c]/40 bg-black/85 px-3 py-1.5 text-left backdrop-blur-md shadow-xl">
							<span className="block text-[9px] font-mono uppercase tracking-wider text-[#fae19c]">
								01 • Solid Gold Foundation
							</span>
							<span className="text-xs font-semibold text-white">
								Hand-hammered 22K Alloy
							</span>
						</div>
						<div className="h-[1.5px] w-8 sm:w-14 bg-[#fae19c]/60" />
					</div>

					{/* Callout 2: Uncut Polki Diamonds / Center Gem */}
					<div className="absolute -top-6 -right-8 sm:-right-20 z-20 flex items-center gap-2 animate-in fade-in-50 slide-in-from-right duration-500">
						<div className="h-[1.5px] w-8 sm:w-14 bg-[#fae19c]/60" />
						<div className="rounded-xl border border-white/20 bg-black/85 px-3 py-1.5 text-left backdrop-blur-md shadow-xl">
							<span className="block text-[9px] font-mono uppercase tracking-wider text-neutral-400">
								02 • Gemstone Pavé
							</span>
							<span className="text-xs font-semibold text-white">
								Natural Uncut Polki & Collet
							</span>
						</div>
					</div>

					{/* Callout 3: Articulated Link Clasp */}
					<div className="absolute -bottom-6 -left-8 sm:-left-20 z-20 flex items-center gap-2 animate-in fade-in-50 slide-in-from-left duration-500">
						<div className="rounded-xl border border-white/20 bg-black/85 px-3 py-1.5 text-left backdrop-blur-md shadow-xl">
							<span className="block text-[9px] font-mono uppercase tracking-wider text-neutral-400">
								03 • Articulation
							</span>
							<span className="text-xs font-semibold text-white">
								Flexible Silk Dori & Links
							</span>
						</div>
						<div className="h-[1.5px] w-8 sm:w-14 bg-[#fae19c]/60" />
					</div>

					{/* Callout 4: Surface Hallmark Seal */}
					<div className="absolute -bottom-6 -right-8 sm:-right-20 z-20 flex items-center gap-2 animate-in fade-in-50 slide-in-from-right duration-500">
						<div className="h-[1.5px] w-8 sm:w-14 bg-[#fae19c]/60" />
						<div className="rounded-xl border border-[#fae19c]/40 bg-black/85 px-3 py-1.5 text-left backdrop-blur-md shadow-xl">
							<span className="block text-[9px] font-mono uppercase tracking-wider text-[#fae19c]">
								04 • Provenance
							</span>
							<span className="text-xs font-semibold text-white">
								BIS 916 Laser Hallmarked
							</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
