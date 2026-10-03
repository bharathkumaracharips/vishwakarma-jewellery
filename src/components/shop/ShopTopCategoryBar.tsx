'use client';

import React from 'react';
import { TOP_CATEGORIES } from './shopData';

interface ShopTopCategoryBarProps {
	selectedCategory: string;
	onSelectCategory: (categoryId: string) => void;
}

export function ShopTopCategoryBar({
	selectedCategory,
	onSelectCategory,
}: ShopTopCategoryBarProps) {
	return (
		<nav className="w-full border-b border-white/[0.08] bg-[#090a0f]/95 backdrop-blur-md sticky top-[120px] z-30 px-3 sm:px-6 lg:px-8">
			<div className="max-w-[1720px] mx-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto py-2.5 scrollbar-none">
				{TOP_CATEGORIES.map((cat) => {
					const isActive = selectedCategory === cat.id;
					return (
						<button
							key={cat.id}
							onClick={() => onSelectCategory(cat.id)}
							className={`shrink-0 rounded-full px-4 sm:px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
								isActive
									? 'bg-gradient-to-r from-[#fae19c] to-[#d4af37] text-black shadow-[0_2px_15px_rgba(212,175,55,0.25)]'
									: 'border border-white/10 bg-white/[0.02] text-neutral-300 hover:text-white hover:border-[#fae19c]/40 hover:bg-white/[0.06]'
							}`}
						>
							{cat.label}
						</button>
					);
				})}
			</div>
		</nav>
	);
}
