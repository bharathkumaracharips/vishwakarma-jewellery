'use client';

import React from 'react';
import { SERVICE_CATEGORIES, ServiceCategory } from './servicesData';

interface ServicesCategoryBarProps {
	selectedCategory: string;
	onSelectCategory: (categoryId: string) => void;
	counts: Record<string, number>;
}

export function ServicesCategoryBar({
	selectedCategory,
	onSelectCategory,
	counts,
}: ServicesCategoryBarProps) {
	return (
		<nav className="w-full border-b border-white/[0.08] bg-[#090a0f]/95 backdrop-blur-md sticky top-[84px] z-30 px-3 sm:px-6 lg:px-8 shadow-lg">
			<div className="max-w-[1720px] mx-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto py-3 scrollbar-none">
				{SERVICE_CATEGORIES.map((cat) => {
					const isActive = selectedCategory === cat.id;
					const count = counts[cat.id] ?? 0;
					return (
						<button
							key={cat.id}
							onClick={() => onSelectCategory(cat.id)}
							className={`shrink-0 rounded-full px-4 sm:px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer flex items-center gap-2 ${
								isActive
									? 'bg-gradient-to-r from-[#fae19c] to-[#d4af37] text-black shadow-[0_2px_15px_rgba(212,175,55,0.25)]'
									: 'border border-white/10 bg-white/[0.02] text-neutral-300 hover:text-white hover:border-[#fae19c]/40 hover:bg-white/[0.06]'
							}`}
						>
							<span>{cat.label}</span>
							<span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
								isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-400'
							}`}>
								{count}
							</span>
						</button>
					);
				})}
			</div>
		</nav>
	);
}
