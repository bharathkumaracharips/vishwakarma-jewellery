'use client';

import React from 'react';
import { ShoppingBag, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { ShopItem } from './shopData';

interface ShopProductCardProps {
	item: ShopItem;
	onBuy: (item: ShopItem) => void;
	onCustomize: (item: ShopItem) => void;
}

export function ShopProductCard({ item, onBuy, onCustomize }: ShopProductCardProps) {
	return (
		<div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e14] p-4 transition-all duration-300 hover:border-[#fae19c]/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
			{/* Product Photography */}
			<div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black/60 mb-3.5">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover filter brightness-[0.90] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

				{/* Top Badges */}
				<div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
					<span className={`rounded-md px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-wider backdrop-blur-md ${
						item.craftType === 'handcrafted'
							? 'border border-[#fae19c]/40 bg-[#0d0e14]/90 text-[#fae19c]'
							: 'border border-white/15 bg-black/70 text-neutral-300'
					}`}>
						{item.craftLabel}
					</span>
					<span className="rounded-md border border-white/15 bg-black/70 px-2 py-0.5 text-[8.5px] font-mono text-neutral-300 backdrop-blur-md">
						{item.metalPurity}
					</span>
				</div>

				{/* Hallmark & Serial Seal */}
				<div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md border border-white/10 bg-black/75 px-1.5 py-0.5 text-[8px] font-mono text-neutral-400 backdrop-blur-md">
					<ShieldCheck className="size-2.5 text-[#fae19c]" />
					<span>{item.hallmarkCode}</span>
				</div>

				{/* Quick Spec Bottom Strip */}
				<div className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-neutral-300">
					~{item.approxWeight}g • {item.stone}
				</div>
			</div>

			{/* Metadata */}
			<div className="space-y-1.5 mb-4">
				<div className="flex items-center justify-between text-[9.5px] font-mono text-neutral-500 uppercase tracking-widest">
					<span>{item.categoryLabel}</span>
					<span>{item.collectionLabel}</span>
				</div>

				<h3 className="font-serif text-base font-semibold text-white truncate group-hover:text-[#fae19c] transition-colors">
					{item.name}
				</h3>

				<p className="text-[11px] text-neutral-400 font-light line-clamp-2 leading-relaxed">
					{item.description}
				</p>

				<div className="pt-2 flex items-baseline justify-between border-t border-white/[0.06]">
					<span className="text-[10px] uppercase font-mono text-neutral-500">Starting at</span>
					<span className="font-serif font-bold text-lg text-[#fae19c]">
						₹{item.basePrice.toLocaleString('en-IN')}
					</span>
				</div>
			</div>

			{/* DUAL CTA BAR: Buy As Shown vs Make It Yours */}
			<div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08]">
				<button
					onClick={() => onBuy(item)}
					className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] py-2.5 text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-wider text-neutral-200 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all cursor-pointer"
				>
					<ShoppingBag className="size-3" />
					<span>Buy As Shown</span>
				</button>

				<button
					onClick={() => onCustomize(item)}
					className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] py-2.5 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-black hover:brightness-105 transition-all cursor-pointer shadow-sm"
				>
					<SlidersHorizontal className="size-3" />
					<span>Make Yours ✦</span>
				</button>
			</div>
		</div>
	);
}
