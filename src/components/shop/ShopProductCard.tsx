'use client';

import React from 'react';
import { Heart, ArrowUpRight } from 'lucide-react';
import { ShopItem } from './shopData';

interface ShopProductCardProps {
	item: ShopItem;
	onSelect: (item: ShopItem) => void;
	isWishlisted?: boolean;
	onToggleWishlist?: (itemId: string) => void;
}

export function ShopProductCard({
	item,
	onSelect,
	isWishlisted = false,
	onToggleWishlist,
}: ShopProductCardProps) {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onSelect(item);
		}
	};

	const handleWishlistClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (onToggleWishlist) {
			onToggleWishlist(item.id);
		}
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={() => onSelect(item)}
			onKeyDown={handleKeyDown}
			className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e14] p-3.5 sm:p-4 transition-all duration-300 hover:border-[#fae19c]/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#fae19c]/60"
			aria-label={`Explore ${item.name}`}
		>
			{/* Product Photography Canvas (~72% Visual Area) */}
			<div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black/60 mb-3.5">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover filter brightness-[0.94] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

				{/* Single Subtle Craft Label (Top-Left) */}
				{item.craftLabel && (
					<div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
						<span
							className={`rounded-full px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider backdrop-blur-md transition-colors ${
								item.craftType === 'handcrafted'
									? 'border border-[#fae19c]/40 bg-[#0c0d12]/85 text-[#fae19c]'
									: 'border border-white/15 bg-black/75 text-neutral-300'
							}`}
						>
							{item.craftLabel}
						</span>
					</div>
				)}

				{/* Wishlist Heart Icon (Top-Right) */}
				<button
					type="button"
					onClick={handleWishlistClick}
					aria-label={isWishlisted ? `Remove ${item.name} from wishlist` : `Add ${item.name} to wishlist`}
					className="absolute top-2.5 right-2.5 z-10 rounded-full border border-white/15 bg-black/60 p-2 text-neutral-400 hover:text-[#fae19c] hover:border-[#fae19c]/40 transition-colors backdrop-blur-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#fae19c]"
				>
					<Heart
						className={`size-3.5 transition-all ${
							isWishlisted ? 'fill-[#fae19c] text-[#fae19c]' : 'text-neutral-300 hover:text-white'
						}`}
					/>
				</button>

				{/* Subtle Exploration Cue on Desktop Hover */}
				<div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1.5 group-hover:translate-y-0 pointer-events-none">
					<span className="w-full text-center rounded-xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] py-2 text-[10px] font-bold uppercase tracking-wider text-black shadow-lg">
						Explore Piece ✦
					</span>
				</div>
			</div>

			{/* Minimal Editorial Metadata Below Image */}
			<div className="space-y-1.5 flex-1 flex flex-col justify-between text-left">
				<div>
					{/* Line 1: Category & Collection */}
					<div className="text-[9.5px] font-mono text-neutral-400 uppercase tracking-[0.2em]">
						{item.categoryLabel} • {item.collectionLabel}
					</div>

					{/* Line 2: Product Name */}
					<h3 className="font-serif text-[15px] sm:text-base font-medium text-white group-hover:text-[#fae19c] transition-colors mt-0.5 line-clamp-1">
						{item.name}
					</h3>

					{/* Line 3: Metal Purity, Tone & Approx Weight */}
					<p className="text-[11px] font-mono text-neutral-400 mt-0.5">
						{item.metalPurity} {item.metalTone} • ~{item.approxWeight}g
					</p>
				</div>

				{/* Line 4: Price & Micro-Arrow */}
				<div className="pt-2.5 mt-2 border-t border-white/[0.06] flex items-center justify-between">
					<span className="text-[9.5px] uppercase font-mono text-neutral-500">
						Starting at
					</span>
					<div className="flex items-center gap-1.5">
						<span className="font-serif font-bold text-base text-[#fae19c]">
							₹{item.basePrice.toLocaleString('en-IN')}
						</span>
						<ArrowUpRight className="size-3.5 text-neutral-400 group-hover:text-[#fae19c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
					</div>
				</div>
			</div>
		</div>
	);
}
