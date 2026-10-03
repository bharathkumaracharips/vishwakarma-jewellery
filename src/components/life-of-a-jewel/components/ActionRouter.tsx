'use client';

import React from 'react';
import { ShoppingBag, Sliders, PenTool, Wrench, Calendar, Compass, ArrowUpRight } from 'lucide-react';

interface ActionRouterProps {
	onSelectAction: (actionKey: string) => void;
}

export function ActionRouter({ onSelectAction }: ActionRouterProps) {
	const ACTIONS = [
		{
			key: 'shop',
			title: 'Shop',
			subtitle: 'Discover curated jewellery',
			icon: ShoppingBag,
			badge: 'Catalog',
		},
		{
			key: 'customize',
			title: 'Customize',
			subtitle: 'Make an existing design yours',
			icon: Sliders,
			badge: 'Atelier',
		},
		{
			key: 'create',
			title: 'Create',
			subtitle: 'Start bespoke from your sketch',
			icon: PenTool,
			badge: 'Bespoke',
		},
		{
			key: 'repair',
			title: 'Repair & Restore',
			subtitle: 'Care for heirlooms you own',
			icon: Wrench,
			badge: 'Services',
		},
		{
			key: 'consult',
			title: 'Consult',
			subtitle: 'Talk to a master goldsmith',
			icon: Calendar,
			badge: 'Expert',
		},
		{
			key: 'track',
			title: 'Track',
			subtitle: 'Follow your jewellery journey',
			icon: Compass,
			badge: 'Ledger',
		},
	];

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
				{ACTIONS.map((action) => {
					const Icon = action.icon;
					return (
						<button
							key={action.key}
							type="button"
							onClick={() => onSelectAction(action.key)}
							className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d0e14]/80 p-5 text-left backdrop-blur-md transition-all duration-300 hover:border-[#fae19c]/50 hover:bg-[#fae19c]/[0.04] hover:-translate-y-0.5 cursor-pointer shadow-lg"
						>
							<div className="flex items-start justify-between">
								<div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#fae19c] transition-colors group-hover:border-[#fae19c]/30 group-hover:bg-[#fae19c]/10">
									<Icon className="size-5" />
								</div>
								<div className="flex items-center gap-1">
									<span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-neutral-400">
										{action.badge}
									</span>
									<ArrowUpRight className="size-4 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#fae19c]" />
								</div>
							</div>

							<div className="mt-4">
								<h4 className="font-serif text-base font-semibold text-white tracking-wide group-hover:text-[#fae19c] transition-colors">
									{action.title}
								</h4>
								<p className="mt-1 text-xs text-neutral-400 font-light leading-relaxed">
									{action.subtitle}
								</p>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
