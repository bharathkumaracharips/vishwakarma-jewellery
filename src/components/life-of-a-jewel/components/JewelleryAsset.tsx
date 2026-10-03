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

	// Rotation degree based on scroll progress
	const rotateY = (progress * 360) % 360;
	// Gentle vertical float
	const floatOffset = Math.sin(progress * Math.PI * 8) * 8;

	// Exploded view layer offsets
	const goldLayerOffset = isExploded ? -35 : 0;
	const stoneLayerOffset = isExploded ? 45 : 0;
	const settingLayerOffset = isExploded ? -10 : 0;

	return (
		<div className="relative flex items-center justify-center pointer-events-none select-none">
			{/* Ambient Radial Spotlight behind the Jewel */}
			<div
				className="absolute size-80 sm:size-96 rounded-full blur-3xl opacity-35 transition-colors duration-700 pointer-events-none"
				style={{
					background: `radial-gradient(circle, ${metal.colorCode}44 0%, ${stone.colorHex}22 50%, transparent 70%)`,
				}}
			/>

			{/* Faint Concentric Alignment Rings (Sacred Geometry) */}
			<div className="absolute size-72 sm:size-84 rounded-full border border-white/[0.06] animate-[spin_60s_linear_infinite]" />
			<div className="absolute size-96 sm:size-[420px] rounded-full border border-white/[0.03] animate-[spin_90s_linear_infinite_reverse]" />

			{/* 3D Perspective Jewel Stage */}
			<div
				className="relative size-64 sm:size-80 flex items-center justify-center transition-transform duration-300 ease-out"
				style={{
					transform: `translateY(${floatOffset}px) rotateY(${rotateY * 0.15}deg) scale(${1 + (approxWeight - 18.4) * 0.01})`,
					perspective: '1000px',
				}}
			>
				{/* 1. SOLID GOLD CORE (Base Ornament) */}
				<div
					className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
					style={{
						transform: `translateY(${goldLayerOffset}px)`,
					}}
				>
					{/* SVG High-Fidelity Royal Choker Silhouette */}
					<svg
						className="size-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
						viewBox="0 0 300 300"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<defs>
							<linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" stopColor={metal.specularHighlight} />
								<stop offset="30%" stopColor={metal.colorCode} />
								<stop offset="70%" stopColor={metal.colorCode} stopOpacity="0.9" />
								<stop offset="100%" stopColor="#4a3710" />
							</linearGradient>

							<radialGradient id="goldShine" cx="50%" cy="30%" r="60%">
								<stop offset="0%" stopColor={metal.specularHighlight} stopOpacity="0.9" />
								<stop offset="60%" stopColor={metal.colorCode} stopOpacity="0.6" />
								<stop offset="100%" stopColor="#2a1f0a" stopOpacity="0.9" />
							</radialGradient>
						</defs>

						{/* Outer Royal Crescent Torque */}
						<path
							d="M 50 160 C 50 80, 250 80, 250 160 C 235 230, 65 230, 50 160 Z"
							fill="url(#goldShine)"
							stroke="url(#metalGradient)"
							strokeWidth="4"
						/>

						{/* Articulated Filigree Flutes */}
						<path
							d="M 70 155 C 80 120, 220 120, 230 155 C 220 200, 80 200, 70 155 Z"
							fill="#090a0f"
							opacity="0.8"
							stroke={metal.colorCode}
							strokeWidth="1.5"
						/>

						{/* Traditional Beaded Fringe Beads */}
						{[...Array(9)].map((_, i) => {
							const angle = (i - 4) * 16;
							const rad = (angle * Math.PI) / 180;
							const cx = 150 + Math.sin(rad) * 88;
							const cy = 185 + Math.cos(rad) * 35;
							return (
								<circle
									key={i}
									cx={cx}
									cy={cy}
									r="4.5"
									fill="url(#metalGradient)"
									stroke="#ffffff"
									strokeWidth="0.5"
								/>
							);
						})}
					</svg>

					{/* Layer Tag in Exploded View */}
					{isExploded && (
						<div className="absolute -left-12 top-6 rounded-md border border-[#fae19c]/40 bg-black/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#fae19c] backdrop-blur-md animate-in fade-in">
							01 • {metal.purity} {metal.tone} Core
						</div>
					)}
				</div>

				{/* 2. GEMSTONE PRONG SETTING LAYER */}
				<div
					className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
					style={{
						transform: `translateY(${settingLayerOffset}px)`,
					}}
				>
					<svg
						className="size-full"
						viewBox="0 0 300 300"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						{/* Center Crown Collet Setting */}
						<circle
							cx="150"
							cy="165"
							r="24"
							stroke={metal.colorCode}
							strokeWidth="2.5"
							fill="#0a0b10"
							opacity="0.9"
						/>
						{/* 4 Micro Prongs */}
						<circle cx="134" cy="149" r="2.5" fill={metal.specularHighlight} />
						<circle cx="166" cy="149" r="2.5" fill={metal.specularHighlight} />
						<circle cx="134" cy="181" r="2.5" fill={metal.specularHighlight} />
						<circle cx="166" cy="181" r="2.5" fill={metal.specularHighlight} />
					</svg>

					{isExploded && (
						<div className="absolute -right-16 top-1/2 -translate-y-1/2 rounded-md border border-white/20 bg-black/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-300 backdrop-blur-md animate-in fade-in">
							02 • Articulated Prong Collet
						</div>
					)}
				</div>

				{/* 3. GEMSTONE LAYER (Responsive to Configurator) */}
				{stone.type !== 'None' && (
					<div
						className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
						style={{
							transform: `translateY(${stoneLayerOffset}px)`,
						}}
					>
						{/* Center Gemstone Visual with Facet Cuts */}
						<div className="relative size-11 flex items-center justify-center">
							{/* Glowing Faceted Gemstone Element */}
							<div
								className="size-9 rounded-full shadow-[0_0_25px_rgba(255,255,255,0.4)] border border-white/40 flex items-center justify-center overflow-hidden transition-all duration-500"
								style={{
									backgroundColor: stone.colorHex || '#f0f5ff',
									boxShadow: `0 0 30px ${stone.colorHex}66, inset 0 0 10px rgba(255,255,255,0.8)`,
								}}
							>
								{/* Gemstone Facet Lines */}
								<svg className="size-full opacity-60" viewBox="0 0 36 36" fill="none">
									<polygon points="18,4 32,18 18,32 4,18" stroke="#ffffff" strokeWidth="0.8" />
									<line x1="4" y1="18" x2="32" y2="18" stroke="#ffffff" strokeWidth="0.6" />
									<line x1="18" y1="4" x2="18" y2="32" stroke="#ffffff" strokeWidth="0.6" />
								</svg>
							</div>

							{/* Diamond/Gemstone Specular Star Flare */}
							<div className="absolute -top-1 -right-1 size-3.5 bg-white rounded-full blur-[1px] opacity-90 animate-pulse" />
						</div>

						{isExploded && (
							<div className="absolute -left-16 bottom-12 rounded-md border border-white/20 bg-black/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-300 backdrop-blur-md animate-in fade-in">
								03 • {stone.carat || '1.2'}ct {stone.color} {stone.type}
							</div>
						)}
					</div>
				)}
			</div>

			{/* Subtle Status Pill at Jewel Base */}
			<div className="absolute -bottom-8 rounded-full border border-white/10 bg-black/60 px-3.5 py-1 text-[10px] font-mono tracking-widest uppercase text-neutral-400 backdrop-blur-md">
				{configuration.baseDesignId} • {metal.purity} {metal.tone}
			</div>
		</div>
	);
}
