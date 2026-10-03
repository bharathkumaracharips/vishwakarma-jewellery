'use client';

import React from 'react';

interface GoldenTraceProps {
	progress: number; // 0.0 to 1.0
	className?: string;
}

export function GoldenTrace({ progress, className = '' }: GoldenTraceProps) {
	// A continuous smooth organic curve flowing from top to bottom
	const pathLength = 1200;
	const strokeDashoffset = pathLength * (1 - Math.min(Math.max(progress, 0.02), 1));

	return (
		<div
			className={`pointer-events-none fixed inset-0 z-10 flex items-center justify-center overflow-hidden opacity-85 transition-opacity duration-300 ${className}`}
		>
			<svg
				className="h-full w-full max-w-5xl"
				viewBox="0 0 400 1200"
				fill="none"
				preserveAspectRatio="xMidYMid meet"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					{/* Glowing Linear Gradient for the trace */}
					<linearGradient id="goldenTraceGlow" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#fae19c" stopOpacity="0.9" />
						<stop offset="35%" stopColor="#d4af37" stopOpacity="1" />
						<stop offset="70%" stopColor="#c59b27" stopOpacity="0.95" />
						<stop offset="100%" stopColor="#fae19c" stopOpacity="0.8" />
					</linearGradient>

					{/* Radial Glow Filter */}
					<filter id="traceBloom" x="-30%" y="-30%" width="160%" height="160%">
						<feGaussianBlur stdDeviation="3.5" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Faint Guide Trail */}
				<path
					d="M200 20 C 180 150, 220 280, 200 400 C 170 540, 230 680, 200 800 C 185 920, 215 1060, 200 1180"
					stroke="rgba(212, 175, 55, 0.12)"
					strokeWidth="1.5"
					strokeDasharray="4 6"
				/>

				{/* Active Golden Trace Path */}
				<path
					d="M200 20 C 180 150, 220 280, 200 400 C 170 540, 230 680, 200 800 C 185 920, 215 1060, 200 1180"
					stroke="url(#goldenTraceGlow)"
					strokeWidth="2.5"
					strokeLinecap="round"
					filter="url(#traceBloom)"
					strokeDasharray={pathLength}
					strokeDashoffset={strokeDashoffset}
					className="transition-[stroke-dashoffset] duration-150 ease-out"
				/>
			</svg>
		</div>
	);
}
