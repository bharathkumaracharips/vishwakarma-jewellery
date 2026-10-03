'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryItem {
	id: number;
	title: string;
	tag1: string;
	tag2: string;
	quote: string;
	author: string;
	role: string;
	image: string;
}

const DEFAULT_ITEMS: GalleryItem[] = [
	{
		id: 0,
		title: 'Bridal Heritage Choker',
		tag1: 'Heritage Atelier',
		tag2: '22K BIS Hallmarked',
		quote: 'Vishwakarma Jewellers handcrafted our family bridal heirlooms with breathtaking precision. The heirloom vault passport is pure peace of mind.',
		author: 'Meera R. Nair',
		role: 'Patron since 2012, Bangalore',
		image: '/images/polki-choker.jpg',
	},
	{
		id: 1,
		title: 'Imperial Solitaire Ring',
		tag1: 'Bespoke Atelier',
		tag2: 'GIA Certified Diamonds',
		quote: 'The bespoke 3D CAD visualization and certified diamond curation made creating our engagement solitaire an extraordinary experience.',
		author: 'Devika Singhania',
		role: 'Collector, Mumbai',
		image: '/images/solitaire-ring.jpg',
	},
	{
		id: 2,
		title: 'Royal Temple Necklace',
		tag1: 'Temple Jewellery',
		tag2: 'Artisan Masterpiece',
		quote: 'Four decades of hallmark trust and unmatched gold craftsmanship. Every ornament is a sacred work of art.',
		author: 'Rohan Mehra',
		role: 'Family Patron since 1996',
		image: '/images/hero-necklace.jpg',
	},
	{
		id: 3,
		title: 'Antique Filigree Bangles',
		tag1: 'Antique Edition',
		tag2: 'Pure Handcrafted Gold',
		quote: 'Every millimeter honors traditional Karigar artistry with impeccable finish. Truly South India’s finest jewellery heritage.',
		author: 'Ananya Roy',
		role: 'Design Director, Chennai',
		image: '/images/antique-bangle.jpg',
	},
];

interface CircularImageGalleryProps {
	items?: GalleryItem[];
	autoPlayInterval?: number;
}

export function CircularImageGallery({
	items = DEFAULT_ITEMS,
	autoPlayInterval = 4500,
}: CircularImageGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [prevIndex, setPrevIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [clickOrigin, setClickOrigin] = useState<{ x: number; y: number }>({ x: 50, y: 85 });
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const handleNavigate = (newIndex: number, originX = 50, originY = 85) => {
		if (newIndex === currentIndex || isAnimating) return;
		setClickOrigin({ x: originX, y: originY });
		setPrevIndex(currentIndex);
		setCurrentIndex(newIndex);
		setIsAnimating(true);
		setTimeout(() => {
			setIsAnimating(false);
		}, 700);
	};

	const handleNext = () => {
		const next = (currentIndex + 1) % items.length;
		handleNavigate(next, 75, 50);
	};

	const handlePrev = () => {
		const prev = (currentIndex - 1 + items.length) % items.length;
		handleNavigate(prev, 25, 50);
	};

	// Auto-play timer
	useEffect(() => {
		if (isPaused) return;
		timerRef.current = setInterval(() => {
			handleNext();
		}, autoPlayInterval);
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [currentIndex, isPaused, items.length, autoPlayInterval]);

	const currentItem = items[currentIndex];
	const prevItem = items[prevIndex];

	return (
		<div
			className="relative size-full overflow-hidden rounded-2xl border border-white/[0.08] select-none group"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			{/* Previous slide (stays underneath while next expands) */}
			<div className="absolute inset-0 size-full">
				<img
					src={prevItem.image}
					alt={prevItem.title}
					className="size-full object-cover object-center filter brightness-[0.65] contrast-[1.08]"
				/>
			</div>

			{/* Active slide with Circular Expansion Wipe */}
			<div
				key={currentIndex}
				className="absolute inset-0 size-full"
				style={{
					animation: 'circularWipe 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
					willChange: 'clip-path, transform',
				}}
			>
				<img
					src={currentItem.image}
					alt={currentItem.title}
					className="size-full object-cover object-center filter brightness-[0.70] contrast-[1.08] transition-transform duration-700 hover:scale-105"
				/>
			</div>

			{/* Atmospheric Dark & Golden Luxury Gradient Overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/45 to-[#090a0f]/20 pointer-events-none" />
			<div
				className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
				style={{
					background: 'radial-gradient(circle at 75% 85%, rgba(245, 158, 11, 0.45) 0%, rgba(180, 110, 20, 0.2) 40%, transparent 70%)',
				}}
			/>

			{/* Elegant Geometric Faint Orbit Circles */}
			<svg
				className="absolute -top-12 -right-12 w-[150%] h-[150%] opacity-20 pointer-events-none"
				viewBox="0 0 400 400"
				fill="none"
			>
				<circle cx="200" cy="200" r="160" stroke="#ffffff" strokeWidth="1" strokeDasharray="5 5" />
				<circle cx="240" cy="180" r="120" stroke="#fae19c" strokeWidth="1.2" opacity="0.6" />
				<circle cx="280" cy="220" r="190" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
			</svg>

			{/* Left / Right Chevron Controls */}
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					handlePrev();
				}}
				className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-white/50 hover:bg-black/70 cursor-pointer shadow-md"
				aria-label="Previous image"
			>
				<ChevronLeft className="size-4" />
			</button>

			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					handleNext();
				}}
				className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-white/50 hover:bg-black/70 cursor-pointer shadow-md"
				aria-label="Next image"
			>
				<ChevronRight className="size-4" />
			</button>

			{/* Content Container (Pinned to Bottom) */}
			<div className="relative z-10 size-full p-5 sm:p-6 flex flex-col justify-end">
				{/* Top Badges */}
				<div className="flex items-center gap-2 mb-3">
					<span className="rounded-md border border-neutral-700/70 bg-[#1c1c22]/85 px-2.5 py-1 text-[11px] font-normal text-neutral-300 backdrop-blur-md transition-all">
						{currentItem.tag1}
					</span>
					<span className="rounded-md border border-neutral-700/70 bg-[#1c1c22]/85 px-2.5 py-1 text-[11px] font-normal text-neutral-300 backdrop-blur-md transition-all">
						{currentItem.tag2}
					</span>
				</div>

				{/* Floating Testimonial Quote Card */}
				<div className="rounded-xl border border-white/[0.12] bg-[#141418]/80 p-4 sm:p-5 backdrop-blur-xl shadow-2xl transition-all duration-300">
					<p className="text-xs sm:text-[13px] text-neutral-200 font-normal leading-relaxed">
						{currentItem.quote}
					</p>
					<div className="mt-3.5">
						<div className="text-xs font-semibold text-white tracking-wide">
							{currentItem.author}
						</div>
						<div className="text-[11px] text-neutral-400">
							{currentItem.role}
						</div>
					</div>
				</div>

				{/* Circular Thumbnail Tabs with glowing active indicator */}
				<div className="mt-4 flex items-center justify-center gap-2.5">
					{items.map((item, idx) => {
						const isActive = idx === currentIndex;
						return (
							<button
								key={item.id}
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									const rect = e.currentTarget.getBoundingClientRect();
									handleNavigate(idx, 50, 85);
								}}
								className={`group/thumb relative rounded-full transition-all duration-300 cursor-pointer ${
									isActive
										? 'scale-110 ring-2 ring-[#ea9428] ring-offset-2 ring-offset-black'
										: 'opacity-55 hover:opacity-100 hover:scale-105'
								}`}
								aria-label={`View ${item.title}`}
							>
								{/* Circular image thumbnail */}
								<div className="size-6 sm:size-7 overflow-hidden rounded-full border border-white/30 shadow-md">
									<img
										src={item.image}
										alt={item.title}
										className="size-full object-cover"
									/>
								</div>
								{isActive && (
									<span className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#ea9428]" />
								)}
							</button>
						);
					})}
				</div>
			</div>

			{/* Inline styles for circular expansion keyframes */}
			<style jsx>{`
				@keyframes circularWipe {
					0% {
						clip-path: circle(0% at ${clickOrigin.x}% ${clickOrigin.y}%);
						opacity: 0.6;
						transform: scale(1.04);
					}
					100% {
						clip-path: circle(150% at ${clickOrigin.x}% ${clickOrigin.y}%);
						opacity: 1;
						transform: scale(1);
					}
				}
			`}</style>
		</div>
	);
}
