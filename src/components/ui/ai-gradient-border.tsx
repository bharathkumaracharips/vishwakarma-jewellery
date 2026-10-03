'use client';

import React, { useEffect } from 'react';
import {
	animate,
	motion,
	useMotionTemplate,
	useMotionValue,
} from 'motion/react';
import { twMerge } from 'tailwind-merge';

interface AIGradientBorderProps {
	children: React.ReactNode;
	className?: string;
	duration?: number;
}

export const AIGradientBorder = ({
	children,
	className,
	duration = 3.5,
}: AIGradientBorderProps) => {
	const turn = useMotionValue(0);

	useEffect(() => {
		animate(turn, 1, {
			ease: 'linear',
			duration,
			repeat: Infinity,
		});
	}, [duration, turn]);

	const gradient = useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, #f472b600 5%, #f472b6 10%, #c084fc 18%, #818cf8 26%, #38bdf8 34%, #2dd4bf 42%, #fbbf24 46%, #fbbf2400 52%, transparent 56%)`;

	return (
		<div className={twMerge('relative p-px', className)}>
			<motion.div
				style={{ backgroundImage: gradient }}
				className="absolute inset-0 rounded-[inherit] pointer-events-none"
			/>

			<div className="relative rounded-[inherit] overflow-hidden size-full">
				<div className="relative size-full">{children}</div>

				<motion.div
					style={{ backgroundImage: gradient }}
					className="ai-glow-spill-mask opacity-70 blur-2xl pointer-events-none absolute inset-[-40%] z-10 overflow-hidden"
				/>
			</div>
		</div>
	);
};
