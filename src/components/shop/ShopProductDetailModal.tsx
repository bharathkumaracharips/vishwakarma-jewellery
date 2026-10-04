'use client';

import React, { useState, useEffect } from 'react';
import {
	X,
	ShieldCheck,
	Scale,
	SlidersHorizontal,
	ShoppingBag,
	Check,
	Sparkles,
	Plus,
	Image as ImageIcon,
	Paintbrush,
} from 'lucide-react';
import { ShopItem, LIVE_BULLION_RATE_22K, LIVE_BULLION_RATE_18K } from './shopData';
import {
	PopoverRoot,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverCloseButton,
	PopoverButton,
	PopoverForm,
	PopoverLabel,
	PopoverTextarea,
	PopoverSubmitButton,
} from '@/components/ui/popover';

interface ShopProductDetailModalProps {
	item: ShopItem | null;
	isOpen: boolean;
	onClose: () => void;
	onBuy: (item: ShopItem) => void;
	onCustomize: (item: ShopItem) => void;
}

export function ShopProductDetailModal({
	item,
	isOpen,
	onClose,
	onBuy,
	onCustomize,
}: ShopProductDetailModalProps) {
	// Mutually exclusive active popover state on the Explore Card ("one after the other")
	const [activePopover, setActivePopover] = useState<'feedback' | 'actions' | 'color' | 'preview' | null>(null);
	const [activeTone, setActiveTone] = useState<string>(item?.metalTone || 'Yellow Gold');
	const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

	// Update active tone when new item is opened
	useEffect(() => {
		if (item) {
			setActiveTone(item.metalTone);
			setActivePopover(null);
			setFeedbackSubmitted(false);
		}
	}, [item]);

	// Close on Escape key press
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				if (activePopover) {
					setActivePopover(null);
				} else {
					onClose();
				}
			}
		};
		if (isOpen) {
			window.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		};
	}, [isOpen, onClose, activePopover]);

	if (!isOpen || !item) return null;

	const liveBullionRate = item.metalPurity === '22K' ? LIVE_BULLION_RATE_22K : LIVE_BULLION_RATE_18K;

	const colors = [
		{ name: 'Yellow Gold', color: '#E5C378', label: 'YG' },
		{ name: 'Rose Gold', color: '#E0A899', label: 'RG' },
		{ name: 'White Gold', color: '#E2E8F0', label: 'WG' },
		{ name: 'Antique Gold', color: '#D4AF37', label: 'Antique' },
		{ name: 'Champagne Gold', color: '#C5A059', label: 'Champagne' },
		{ name: 'Platinum 950', color: '#E5E4E2', label: 'Pt 950' },
		{ name: 'Sunset Bronze', color: '#FF5733', label: 'Bronze' },
		{ name: 'Emerald Mint', color: '#33FF57', label: 'Mint' },
		{ name: 'Sapphire Azure', color: '#3357FF', label: 'Azure' },
	];

	const handleFeedbackSubmit = () => {
		setFeedbackSubmitted(true);
		setTimeout(() => {
			setFeedbackSubmitted(false);
			setActivePopover(null);
		}, 1400);
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-product-title"
		>
			{/* Backdrop click to close */}
			<div
				className="fixed inset-0"
				onClick={() => {
					if (activePopover) {
						setActivePopover(null);
					} else {
						onClose();
					}
				}}
				aria-hidden="true"
			/>

			{/* Modal Container */}
			<div className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/15 bg-[#0d0e15] shadow-2xl max-h-[92vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
				{/* Accessible Close Button */}
				<button
					onClick={onClose}
					aria-label="Close product details"
					className="absolute top-4 right-4 z-20 rounded-full border border-white/15 bg-black/70 p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#fae19c]"
				>
					<X className="size-5" />
				</button>

				{/* LEFT: Product Photography Gallery with Popover Action Stack */}
				<div className="relative w-full md:w-[45%] bg-[#08090d] flex flex-col justify-between p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/10 rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
					{/* Top Craft Label & Hallmark ID */}
					<div className="flex items-center justify-between z-10">
						<span
							className={`rounded-full px-3 py-1 text-[9.5px] font-mono uppercase tracking-wider backdrop-blur-md ${
								item.craftType === 'handcrafted'
									? 'border border-[#fae19c]/40 bg-[#0c0d12]/90 text-[#fae19c]'
									: 'border border-white/15 bg-black/80 text-neutral-300'
							}`}
						>
							{item.craftLabel}
						</span>

						<div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/80 px-2.5 py-1 text-[9px] font-mono text-neutral-300">
							<ShieldCheck className="size-3 text-[#fae19c]" />
							<span>{item.hallmarkCode}</span>
						</div>
					</div>

					{/* Center High-Res Image with Right-Side Popover Action Stack */}
					<div className="relative my-4 aspect-square">
						{/* Image Frame */}
						<div className="size-full rounded-2xl overflow-hidden bg-black/40 border border-white/10">
							<img
								src={item.image}
								alt={item.name}
								className="size-full object-cover filter brightness-[0.96] contrast-[1.05]"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
						</div>

						{/* RIGHT-SIDE BUTTONS STACK ON THIS EXPLORE CARD */}
						<div
							className="absolute right-3 top-3 z-30 flex flex-col gap-2 items-end"
							onClick={(e) => e.stopPropagation()}
						>
							{/* 1. Add Feedback Popover */}
							<PopoverRoot
								open={activePopover === 'feedback'}
								onOpenChange={(open) => setActivePopover(open ? 'feedback' : null)}
							>
								<PopoverTrigger className="rounded-xl border border-white/15 bg-[#262833]/90 hover:bg-[#343644] backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-neutral-200 hover:text-white transition-all shadow-lg cursor-pointer">
									Add Feedback
								</PopoverTrigger>
								<PopoverContent side="left" className="w-64">
									{feedbackSubmitted ? (
										<div className="p-3 text-center space-y-1 text-emerald-400">
											<Check className="size-5 mx-auto" />
											<p className="text-xs font-semibold">Feedback recorded!</p>
										</div>
									) : (
										<PopoverForm onSubmit={handleFeedbackSubmit}>
											<PopoverLabel>Add Feedback</PopoverLabel>
											<PopoverTextarea placeholder="Ask a question or request custom specifications..." />
											<PopoverFooter>
												<PopoverCloseButton />
												<PopoverSubmitButton>Submit</PopoverSubmitButton>
											</PopoverFooter>
										</PopoverForm>
									)}
								</PopoverContent>
							</PopoverRoot>

							{/* 2. Quick Actions Popover */}
							<PopoverRoot
								open={activePopover === 'actions'}
								onOpenChange={(open) => setActivePopover(open ? 'actions' : null)}
							>
								<PopoverTrigger className="rounded-xl border border-white/15 bg-[#262833]/90 hover:bg-[#343644] backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-neutral-200 hover:text-white transition-all shadow-lg cursor-pointer">
									Quick Actions
								</PopoverTrigger>
								<PopoverContent side="left" className="w-52">
									<PopoverHeader>Quick Actions</PopoverHeader>
									<PopoverBody>
										<PopoverButton
											onClick={() => {
												setActivePopover(null);
											}}
										>
											<Plus className="size-3.5 text-neutral-300" />
											<span>New File</span>
										</PopoverButton>
										<PopoverButton
											onClick={() => {
												setActivePopover('preview');
											}}
										>
											<ImageIcon className="size-3.5 text-neutral-300" />
											<span>Upload Image</span>
										</PopoverButton>
										<PopoverButton
											onClick={() => {
												setActivePopover('color');
											}}
										>
											<Paintbrush className="size-3.5 text-neutral-300" />
											<span>Edit Colors</span>
										</PopoverButton>
										<PopoverButton
											onClick={() => {
												onClose();
												onCustomize(item);
											}}
										>
											<SlidersHorizontal className="size-3.5 text-[#fae19c]" />
											<span className="text-[#fae19c]">Make It Yours ✦</span>
										</PopoverButton>
									</PopoverBody>
								</PopoverContent>
							</PopoverRoot>

							{/* 3. Choose Color Popover */}
							<PopoverRoot
								open={activePopover === 'color'}
								onOpenChange={(open) => setActivePopover(open ? 'color' : null)}
							>
								<PopoverTrigger className="rounded-xl border border-white/15 bg-[#262833]/90 hover:bg-[#343644] backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-neutral-200 hover:text-white transition-all shadow-lg cursor-pointer flex items-center gap-1.5">
									<span
										className="size-2.5 rounded-full border border-white/30"
										style={{
											backgroundColor:
												activeTone === 'Rose Gold'
													? '#E0A899'
													: activeTone === 'White Gold'
													? '#E2E8F0'
													: '#E5C378',
										}}
									/>
									<span>Choose Color</span>
								</PopoverTrigger>
								<PopoverContent side="left" className="w-56">
									<PopoverHeader>Pick a Color</PopoverHeader>
									<PopoverBody>
										<div className="grid grid-cols-3 gap-2 py-1">
											{colors.map((c) => (
												<button
													key={c.name}
													type="button"
													onClick={() => {
														setActiveTone(c.name);
													}}
													className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-center transition-all cursor-pointer ${
														activeTone === c.name
															? 'border-[#fae19c] bg-[#fae19c]/20 text-white'
															: 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/30'
													}`}
												>
													<span
														className="size-5 rounded-full border border-white/20 shadow-md"
														style={{ backgroundColor: c.color }}
													/>
													<span className="text-[9px] font-mono truncate w-full">{c.label}</span>
												</button>
											))}
										</div>
										<p className="text-[10px] text-neutral-400 font-mono text-center pt-1 border-t border-white/5">
											Selected: <span className="text-[#fae19c] font-semibold">{activeTone}</span>
										</p>
									</PopoverBody>
									<PopoverFooter>
										<PopoverCloseButton />
									</PopoverFooter>
								</PopoverContent>
							</PopoverRoot>

							{/* 4. Preview Image Popover */}
							<PopoverRoot
								open={activePopover === 'preview'}
								onOpenChange={(open) => setActivePopover(open ? 'preview' : null)}
							>
								<PopoverTrigger className="rounded-xl border border-white/15 bg-[#262833]/90 hover:bg-[#343644] backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-neutral-200 hover:text-white transition-all shadow-lg cursor-pointer">
									Preview Image
								</PopoverTrigger>
								<PopoverContent side="left" className="w-64">
									<PopoverHeader>Preview Image</PopoverHeader>
									<PopoverBody>
										<img
											src={item.image}
											alt={item.name}
											className="w-full h-auto rounded-xl object-cover border border-white/10"
										/>
										<div className="mt-2 text-xs text-neutral-200 font-light">
											<p className="font-semibold text-white">{item.name}</p>
											<p className="text-[11px] text-neutral-400 font-mono mt-0.5">
												{item.metalPurity} ({activeTone}) • ~{item.approxWeight}g
											</p>
										</div>
									</PopoverBody>
									<PopoverFooter>
										<PopoverCloseButton />
									</PopoverFooter>
								</PopoverContent>
							</PopoverRoot>
						</div>
					</div>

					{/* Bottom Assurance Strip */}
					<div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400 border-t border-white/5 pt-3">
						<div className="flex items-center gap-1.5">
							<Scale className="size-3 text-[#fae19c]" />
							<span>Dual Balance Weighed</span>
						</div>
						<div className="flex items-center gap-1.5">
							<ShieldCheck className="size-3 text-[#fae19c]" />
							<span>100% BIS Hallmarked</span>
						</div>
					</div>
				</div>

				{/* RIGHT: Editorial Dossier & Actions (~55% on desktop) */}
				<div className="w-full md:w-[55%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6 text-left">
					{/* Top Header */}
					<div className="space-y-1.5">
						<div className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#fae19c]">
							{item.categoryLabel} • {item.collectionLabel}
						</div>
						<h2 id="modal-product-title" className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
							{item.name}
						</h2>
						<div className="flex items-baseline gap-3 pt-1">
							<span className="font-serif text-2xl sm:text-3xl font-bold text-[#fae19c]">
								₹{item.basePrice.toLocaleString('en-IN')}
							</span>
							<span className="text-[10.5px] font-mono text-neutral-400">
								(Starting price benchmark)
							</span>
						</div>
					</div>

					{/* The Atelier: Craftsmanship Story */}
					<div className="space-y-1.5 border-t border-white/10 pt-4">
						<div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#fae19c]">
							<Sparkles className="size-3" />
							<span>The Atelier Craftsmanship</span>
						</div>
						<p className="text-xs sm:text-[12.5px] text-neutral-300 font-light leading-relaxed">
							{item.description}
						</p>
					</div>

					{/* Vault Specifications Matrix */}
					<div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-2.5 text-xs">
						<span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block border-b border-white/5 pb-1.5">
							Vault Specifications
						</span>
						<div className="grid grid-cols-2 gap-y-2.5 text-[11.5px]">
							<span className="text-neutral-500 font-mono">Metal Purity:</span>
							<span className="text-white font-medium">
								{item.metalPurity} Gold ({activeTone})
							</span>

							<span className="text-neutral-500 font-mono">Approx. Weight:</span>
							<span className="text-white font-medium">~{item.approxWeight} grams</span>

							<span className="text-neutral-500 font-mono">Gemstone / Setting:</span>
							<span className="text-white font-medium">{item.stone}</span>

							<span className="text-neutral-500 font-mono">Product Vault ID:</span>
							<span className="text-white font-mono">{item.id}</span>

							<span className="text-neutral-500 font-mono">Live Bullion Basis:</span>
							<span className="text-[#fae19c] font-mono">₹{liveBullionRate.toLocaleString('en-IN')}/g</span>
						</div>
					</div>

					{/* Verified Details / Trust Area */}
					<div className="rounded-xl border border-white/5 bg-black/40 px-3.5 py-2.5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
						<div className="flex items-center gap-1.5">
							<ShieldCheck className="size-3.5 text-[#fae19c]" />
							<span>Verified: {item.hallmarkCode} • Dual Sartorius Scale</span>
						</div>
						<span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">
							Demo Data
						</span>
					</div>

					{/* Primary Actions: BUY AS SHOWN vs MAKE IT YOURS */}
					<div className="space-y-2.5 pt-2 border-t border-white/10">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<button
								onClick={() => {
									onClose();
									onBuy(item);
								}}
								className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
							>
								<ShoppingBag className="size-4" />
								<span>Buy As Shown</span>
							</button>

							<button
								onClick={() => {
									onClose();
									onCustomize(item);
								}}
								className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] py-3 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105 transition-all cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-[#fae19c]"
							>
								<SlidersHorizontal className="size-4" />
								<span>Make It Yours ✦</span>
							</button>
						</div>

						<p className="text-[10px] text-center text-neutral-500 font-mono">
							100% Insured Delivery • BIS 916 Vault Certified • 15-Day Inspection
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
