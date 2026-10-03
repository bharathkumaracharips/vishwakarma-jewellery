'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import { AuthModal } from '@/components/ui/auth-modal';

export function Header() {
	const [open, setOpen] = useState(false);
	const [isAuthOpen, setIsAuthOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const scrolled = useScroll(10);

	const handleMouseEnter = (menu: string) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setActiveDropdown(menu);
	};

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			setActiveDropdown(null);
		}, 180);
	};

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'sticky top-0 z-50 w-full transition-all duration-300 border-b',
				scrolled
					? 'bg-[#08090d]/95 backdrop-blur-xl border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
					: 'bg-[#08090d] border-white/[0.06]'
			)}
		>
			<nav className="flex h-[84px] w-full items-center justify-between px-6 sm:px-10 lg:px-12 xl:px-16">
				{/* ---------------- 1. BRAND LOGO (End of Left with Slight Gap) ---------------- */}
				<div className="flex items-center flex-shrink-0">
					<a
						href="/"
						className="group flex flex-col items-start gap-1 py-1 transition-opacity hover:opacity-90"
					>
						<span className="font-serif text-xl sm:text-[22px] font-bold tracking-[0.24em] uppercase text-white leading-none">
							Vishwakarma
						</span>
						<span className="text-[9px] font-semibold tracking-[0.38em] uppercase text-slate-400 pl-0.5 leading-none">
							Jewelers &bull; Estd 1984
						</span>
					</a>
				</div>

				{/* ---------------- 2. MAIN NAVIGATION (Centered Dropdowns) ---------------- */}
				<div className="hidden lg:flex items-center gap-8 xl:gap-10 2xl:gap-12">
					{/* ITEM 1: SHOP (Mega menu - Clean Centered) */}
					<div
						className="relative flex-shrink-0"
						onMouseEnter={() => handleMouseEnter('shop')}
						onMouseLeave={handleMouseLeave}
					>
						<button
							className={cn(
								'group flex items-center gap-1.5 py-2.5 text-[12px] xl:text-[12.5px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap transition-colors cursor-pointer',
								activeDropdown === 'shop'
									? 'text-white'
									: 'text-slate-300 hover:text-white'
							)}
							aria-expanded={activeDropdown === 'shop'}
						>
							<span className="relative">
								SHOP
								<span
									className={cn(
										'absolute -bottom-1 left-0 h-[1.5px] w-full bg-[#fae19c] transition-all duration-200',
										activeDropdown === 'shop'
											? 'opacity-100 scale-x-100'
											: 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
									)}
								/>
							</span>
							<ChevronDown
								className={cn(
									'size-3 text-slate-400 transition-transform duration-250',
									activeDropdown === 'shop' && 'rotate-180 text-white'
								)}
							/>
						</button>

						{/* SHOP Dropdown: Centered from hovered position */}
						{activeDropdown === 'shop' && (
							<div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-in fade-in-50 zoom-in-98 duration-150">
								<div className="w-[780px] rounded-2xl border border-white/[0.09] bg-[#0c0d14]/98 p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
									<div className="grid grid-cols-12 gap-7">
										{/* JEWELLERY (2 sub-columns for 13 items) */}
										<div className="col-span-6">
											<div className="mb-3 border-b border-white/[0.07] pb-2.5">
												<span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#fae19c]">
													JEWELLERY
												</span>
											</div>
											<div className="grid grid-cols-2 gap-x-4">
												<ul className="space-y-1.5">
													{jewelleryCol1.map((item) => (
														<li key={item.title}>
															<a
																href={item.href}
																className="block text-[12.5px] font-normal text-slate-300 hover:text-[#fae19c] transition-colors py-0.5"
															>
																{item.title}
															</a>
														</li>
													))}
												</ul>
												<ul className="space-y-1.5">
													{jewelleryCol2.map((item) => (
														<li key={item.title}>
															<a
																href={item.href}
																className="block text-[12.5px] font-normal text-slate-300 hover:text-[#fae19c] transition-colors py-0.5"
															>
																{item.title}
															</a>
														</li>
													))}
												</ul>
											</div>
										</div>

										{/* COLLECTIONS */}
										<div className="col-span-3 border-l border-white/[0.06] pl-6">
											<div className="mb-3 border-b border-white/[0.07] pb-2.5">
												<span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#fae19c]">
													COLLECTIONS
												</span>
											</div>
											<ul className="space-y-1.5">
												{collectionsList.map((item) => (
													<li key={item.title}>
														<a
															href={item.href}
															className="block text-[12.5px] font-normal text-slate-300 hover:text-[#fae19c] transition-colors py-0.5"
														>
															{item.title}
														</a>
													</li>
												))}
											</ul>
										</div>

										{/* SHOP BY */}
										<div className="col-span-3 border-l border-white/[0.06] pl-6">
											<div className="mb-3 border-b border-white/[0.07] pb-2.5">
												<span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#fae19c]">
													SHOP BY
												</span>
											</div>
											<ul className="space-y-1.5">
												{shopByList.map((item) => (
													<li key={item.title}>
														<a
															href={item.href}
															className="block text-[12.5px] font-normal text-slate-300 hover:text-[#fae19c] transition-colors py-0.5"
														>
															{item.title}
														</a>
													</li>
												))}
											</ul>
										</div>
									</div>

									{/* Bottom Co-Creation Teaser Strip */}
									<div className="mt-5 border-t border-white/[0.08] pt-3.5">
										<a
											href="#make-it-yours"
											onClick={(e) => {
												e.preventDefault();
												setActiveDropdown(null);
												const el = document.querySelector('section');
												if (el) {
													const top = el.offsetTop + el.scrollHeight * 0.32;
													window.scrollTo({ top, behavior: 'smooth' });
												}
											}}
											className="group/strip flex flex-col sm:flex-row sm:items-center justify-between gap-1 w-full rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#fae19c]/30 hover:bg-[#fae19c]/[0.04] px-4 py-2.5 transition-all"
										>
											<div className="flex items-center gap-2">
												<span className="text-[#fae19c] text-xs">✨</span>
												<span className="text-xs font-semibold text-white tracking-wider uppercase group-hover/strip:text-[#fae19c] transition-colors">
													Found something you love? Make it yours →
												</span>
											</div>
											<span className="text-[11px] text-neutral-400 font-light">
												Customize metal • approx. weight • stones • colour • budget
											</span>
										</a>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* ITEM 2: JEWELLERY SERVICES (Mega menu - Clean Centered) */}
					<div
						className="relative flex-shrink-0"
						onMouseEnter={() => handleMouseEnter('services')}
						onMouseLeave={handleMouseLeave}
					>
						<button
							className={cn(
								'group flex items-center gap-1.5 py-2.5 text-[12px] xl:text-[12.5px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap transition-colors cursor-pointer',
								activeDropdown === 'services'
									? 'text-white'
									: 'text-slate-300 hover:text-white'
							)}
							aria-expanded={activeDropdown === 'services'}
						>
							<span className="relative">
								JEWELLERY SERVICES
								<span
									className={cn(
										'absolute -bottom-1 left-0 h-[1.5px] w-full bg-[#fae19c] transition-all duration-200',
										activeDropdown === 'services'
											? 'opacity-100 scale-x-100'
											: 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
									)}
								/>
							</span>
							<ChevronDown
								className={cn(
									'size-3 text-slate-400 transition-transform duration-250',
									activeDropdown === 'services' && 'rotate-180 text-white'
								)}
							/>
						</button>

						{/* JEWELLERY SERVICES Dropdown: Centered from hovered position */}
						{activeDropdown === 'services' && (
							<div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-in fade-in-50 zoom-in-98 duration-150">
								<div className="w-[980px] rounded-2xl border border-white/[0.09] bg-[#0c0d14]/98 p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
									<div className="grid grid-cols-5 gap-6">
										{/* Column 1: REPAIR */}
										<div>
											<div className="mb-3 border-b border-white/[0.07] pb-2.5">
												<span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#fae19c]">
													REPAIR
												</span>
											</div>
											<ul className="space-y-1.5">
												{repairServicesList.map((item) => (
													<li key={item.title}>
														<a
															href={item.href}
															className="block text-[12.5px] font-normal text-slate-300 hover:text-[#fae19c] transition-colors py-0.5 whitespace-nowrap"
														>
															{item.title}
														</a>
													</li>
												))}
											</ul>
										</div>

										{/* Column 2: CARE & RESTORATION */}
										<div className="border-l border-white/[0.06] pl-5">
											<div className="mb-3 border-b border-white/[0.07] pb-2.5">
												<span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#fae19c]">
													CARE & RESTORATION
												</span>
											</div>
											<ul className="space-y-1.5">
												{careRestorationList.map((item) => (
													<li key={item.title}>
														<a
															href={item.href}
															className="block text-[12.5px] font-normal text-slate-300 hover:text-[#fae19c] transition-colors py-0.5 whitespace-nowrap"
														>
															{item.title}
														</a>
													</li>
												))}
											</ul>
										</div>

										{/* Column 3: RESIZING & MODIFICATION */}
										<div className="border-l border-white/[0.06] pl-5">
											<div className="mb-3 border-b border-white/[0.07] pb-2.5">
												<span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#fae19c]">
													RESIZING & MODIFICATION
												</span>
											</div>
											<ul className="space-y-1.5">
												{resizingModificationList.map((item) => (
													<li key={item.title}>
														<a
															href={item.href}
															className="block text-[12.5px] font-normal text-slate-300 hover:text-[#fae19c] transition-colors py-0.5 whitespace-nowrap"
														>
															{item.title}
														</a>
													</li>
												))}
											</ul>
										</div>

										{/* Column 4: STONE SERVICES */}
										<div className="border-l border-white/[0.06] pl-5">
											<div className="mb-3 border-b border-white/[0.07] pb-2.5">
												<span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#fae19c]">
													STONE SERVICES
												</span>
											</div>
											<ul className="space-y-1.5">
												{stoneServicesList.map((item) => (
													<li key={item.title}>
														<a
															href={item.href}
															className="block text-[12.5px] font-normal text-slate-300 hover:text-[#fae19c] transition-colors py-0.5 whitespace-nowrap"
														>
															{item.title}
														</a>
													</li>
												))}
											</ul>
										</div>

										{/* Column 5: INSPECTION */}
										<div className="border-l border-white/[0.06] pl-5">
											<div className="mb-3 border-b border-white/[0.07] pb-2.5">
												<span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#fae19c]">
													INSPECTION
												</span>
											</div>
											<ul className="space-y-1.5">
												{inspectionServicesList.map((item) => (
													<li key={item.title}>
														<a
															href={item.href}
															className="block text-[12.5px] font-normal text-slate-300 hover:text-[#fae19c] transition-colors py-0.5 whitespace-nowrap"
														>
															{item.title}
														</a>
													</li>
												))}
											</ul>
										</div>
									</div>

									{/* Bottom Bar: → View All Jewellery Services */}
									<div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
										<span className="text-[11px] text-slate-400 font-light">
											Calibrated assay diagnostics & master goldsmith bench repairs
										</span>
										<a
											href="/services"
											className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#fae19c] hover:underline"
										>
											<span>&rarr; View All Jewellery Services</span>
										</a>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* ITEM 3: CUSTOM JEWELLERY (Link only) */}
					<a
						href="#custom-jewellery"
						className="group relative flex-shrink-0 py-2.5 text-[12px] xl:text-[12.5px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap text-slate-300 hover:text-white transition-colors"
					>
						<span>CUSTOM JEWELLERY</span>
						<span className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-[#fae19c] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-200" />
					</a>

					{/* ITEM 4: CONSULTATION (Dropdown - Clean Centered) */}
					<div
						className="relative flex-shrink-0"
						onMouseEnter={() => handleMouseEnter('consultation')}
						onMouseLeave={handleMouseLeave}
					>
						<button
							className={cn(
								'group flex items-center gap-1.5 py-2.5 text-[12px] xl:text-[12.5px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap transition-colors cursor-pointer',
								activeDropdown === 'consultation'
									? 'text-white'
									: 'text-slate-300 hover:text-white'
							)}
							aria-expanded={activeDropdown === 'consultation'}
						>
							<span className="relative">
								CONSULTATION
								<span
									className={cn(
										'absolute -bottom-1 left-0 h-[1.5px] w-full bg-[#fae19c] transition-all duration-200',
										activeDropdown === 'consultation' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
									)}
								/>
							</span>
							<ChevronDown
								className={cn(
									'size-3 text-slate-400 transition-transform duration-250',
									activeDropdown === 'consultation' && 'rotate-180 text-white'
								)}
							/>
						</button>

						{/* CONSULTATION Dropdown: Dual-Card Prominent Layout */}
						{activeDropdown === 'consultation' && (
							<div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-in fade-in-50 zoom-in-98 duration-150">
								<div className="w-[460px] rounded-2xl border border-white/[0.09] bg-[#0c0d14]/98 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
									{/* Top: 2 Prominent Cards (ONLINE & IN-PERSON) */}
									<div className="grid grid-cols-2 gap-3.5">
										{/* Card 1: ONLINE */}
										<a
											href="#consultation-online"
											className="group flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-200 hover:border-[#fae19c]/40 hover:bg-white/[0.05]"
										>
											<div>
												<span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#fae19c] block mb-1.5">
													ONLINE
												</span>
												<p className="text-[12px] text-slate-300 font-light leading-relaxed">
													Talk to a jewellery expert from anywhere.
												</p>
											</div>
											<div className="mt-4 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white group-hover:text-[#fae19c] transition-colors">
												<span>Book Online</span>
												<span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
											</div>
										</a>

										{/* Card 2: IN-PERSON */}
										<a
											href="#consultation-in-person"
											className="group flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-200 hover:border-[#fae19c]/40 hover:bg-white/[0.05]"
										>
											<div>
												<span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#fae19c] block mb-1.5">
													IN-PERSON
												</span>
												<p className="text-[12px] text-slate-300 font-light leading-relaxed">
													Meet a verified goldsmith in person.
												</p>
											</div>
											<div className="mt-4 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white group-hover:text-[#fae19c] transition-colors">
												<span>Find &amp; Book</span>
												<span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
											</div>
										</a>
									</div>

									{/* Bottom Utility Row: My Appointments & Find a Specialist */}
									<div className="mt-3.5 flex items-center justify-between border-t border-white/[0.07] pt-3 px-1 text-[11px]">
										<a
											href="#my-appointments"
											className="text-slate-400 hover:text-white transition-colors"
										>
											My Appointments
										</a>
										<span className="text-slate-600">&bull;</span>
										<a
											href="#consultation-history"
											className="text-slate-400 hover:text-white transition-colors"
										>
											Consultation History
										</a>
										<span className="text-slate-600">&bull;</span>
										<a
											href="#find-specialist"
											className="text-slate-400 hover:text-white transition-colors"
										>
											Find a Specialist
										</a>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* ITEM 5: TRACK (Link only) */}
					<a
						href="#track"
						className="group relative flex-shrink-0 py-2.5 text-[12px] xl:text-[12.5px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap text-slate-300 hover:text-white transition-colors"
					>
						<span>TRACK</span>
						<span className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-[#fae19c] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-200" />
					</a>
				</div>

				{/* ---------------- 3. RIGHT ACTION: ONLY SIGN IN ---------------- */}
				<div className="hidden lg:flex items-center flex-shrink-0">
					<button
						onClick={() => setIsAuthOpen(true)}
						className="h-10 rounded-full border border-white/15 px-6 text-[11px] font-semibold tracking-[0.14em] uppercase text-white transition-all hover:border-white/40 hover:bg-white/[0.04] cursor-pointer"
					>
						Sign In
					</button>
				</div>

				{/* ---------------- MOBILE MENU TRIGGER ---------------- */}
				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="lg:hidden border-white/15 bg-transparent text-white"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>

			{/* ---------------- MOBILE MENU DRAWER ---------------- */}
			<MobileMenu open={open} className="flex flex-col justify-between gap-6 overflow-y-auto">
				<div className="flex w-full flex-col gap-y-6">
					{/* SHOP Mobile */}
					<div>
						<div className="mb-3 border-b border-white/[0.08] pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#fae19c]">
							SHOP
						</div>
						<div className="mb-2 pl-2">
							<span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-400 block mb-1">
								JEWELLERY
							</span>
							<div className="grid grid-cols-2 gap-1">
								{jewelleryCol1.concat(jewelleryCol2).map((link) => (
									<a
										key={link.title}
										href={link.href}
										onClick={() => setOpen(false)}
										className="text-[12px] text-slate-300 py-1 hover:text-white"
									>
										{link.title}
									</a>
								))}
							</div>
						</div>
						<div className="mb-2 pl-2 border-t border-white/[0.04] pt-2">
							<span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-400 block mb-1">
								COLLECTIONS
							</span>
							<div className="grid grid-cols-2 gap-1">
								{collectionsList.map((link) => (
									<a
										key={link.title}
										href={link.href}
										onClick={() => setOpen(false)}
										className="text-[12px] text-slate-300 py-1 hover:text-white"
									>
										{link.title}
									</a>
								))}
							</div>
						</div>
						<div className="pl-2 border-t border-white/[0.04] pt-2">
							<span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-400 block mb-1">
								SHOP BY
							</span>
							<div className="grid grid-cols-2 gap-1">
								{shopByList.map((link) => (
									<a
										key={link.title}
										href={link.href}
										onClick={() => setOpen(false)}
										className="text-[12px] text-slate-300 py-1 hover:text-white"
									>
										{link.title}
									</a>
								))}
							</div>
						</div>
					</div>

					{/* JEWELLERY SERVICES Mobile */}
					<div>
						<div className="mb-3 border-b border-white/[0.08] pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#fae19c]">
							JEWELLERY SERVICES
						</div>
						<div className="space-y-3 pl-2">
							<div>
								<span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-400 block mb-1">
									REPAIR
								</span>
								<div className="grid grid-cols-2 gap-1">
									{repairServicesList.map((link) => (
										<a
											key={link.title}
											href={link.href}
											onClick={() => setOpen(false)}
											className="text-[12px] text-slate-300 py-0.5 hover:text-white"
										>
											{link.title}
										</a>
									))}
								</div>
							</div>
							<div className="border-t border-white/[0.04] pt-2">
								<span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-400 block mb-1">
									CARE & RESTORATION
								</span>
								<div className="grid grid-cols-2 gap-1">
									{careRestorationList.map((link) => (
										<a
											key={link.title}
											href={link.href}
											onClick={() => setOpen(false)}
											className="text-[12px] text-slate-300 py-0.5 hover:text-white"
										>
											{link.title}
										</a>
									))}
								</div>
							</div>
							<div className="border-t border-white/[0.04] pt-2">
								<span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-400 block mb-1">
									RESIZING & MODIFICATION
								</span>
								<div className="grid grid-cols-2 gap-1">
									{resizingModificationList.map((link) => (
										<a
											key={link.title}
											href={link.href}
											onClick={() => setOpen(false)}
											className="text-[12px] text-slate-300 py-0.5 hover:text-white"
										>
											{link.title}
										</a>
									))}
								</div>
							</div>
							<div className="border-t border-white/[0.04] pt-2">
								<span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-400 block mb-1">
									STONE SERVICES
								</span>
								<div className="grid grid-cols-2 gap-1">
									{stoneServicesList.map((link) => (
										<a
											key={link.title}
											href={link.href}
											onClick={() => setOpen(false)}
											className="text-[12px] text-slate-300 py-0.5 hover:text-white"
										>
											{link.title}
										</a>
									))}
								</div>
							</div>
							<div className="border-t border-white/[0.04] pt-2">
								<span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-400 block mb-1">
									INSPECTION
								</span>
								<div className="grid grid-cols-2 gap-1">
									{inspectionServicesList.map((link) => (
										<a
											key={link.title}
											href={link.href}
											onClick={() => setOpen(false)}
											className="text-[12px] text-slate-300 py-0.5 hover:text-white"
										>
											{link.title}
										</a>
									))}
								</div>
							</div>
						</div>
						<div className="mt-3 border-t border-white/[0.08] pt-2 pl-2">
							<a
								href="/services"
								onClick={() => setOpen(false)}
								className="text-xs font-semibold tracking-[0.14em] uppercase text-[#fae19c]"
							>
								&rarr; View All Jewellery Services
							</a>
						</div>
					</div>

					{/* CUSTOM JEWELLERY Mobile */}
					<a
						href="#custom-jewellery"
						onClick={() => setOpen(false)}
						className="flex items-center justify-between rounded-lg border border-white/10 p-3.5 text-[12px] font-semibold tracking-[0.14em] uppercase text-white transition-colors hover:bg-white/[0.04]"
					>
						<span>CUSTOM JEWELLERY</span>
						<span>&rarr;</span>
					</a>

					{/* CONSULTATION Mobile */}
					<div>
						<div className="mb-2.5 border-b border-white/[0.08] pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#fae19c]">
							CONSULTATION
						</div>
						<div className="grid grid-cols-2 gap-2 mb-2">
							<a
								href="#consultation-online"
								onClick={() => setOpen(false)}
								className="rounded-xl border border-white/10 p-3 bg-white/[0.02]"
							>
								<span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#fae19c] block mb-1">
									ONLINE
								</span>
								<span className="text-[11px] text-slate-300 block mb-2 leading-snug">
									Talk to an expert from anywhere.
								</span>
								<span className="text-[10px] font-semibold text-white uppercase">&rarr; Book Online</span>
							</a>
							<a
								href="#consultation-in-person"
								onClick={() => setOpen(false)}
								className="rounded-xl border border-white/10 p-3 bg-white/[0.02]"
							>
								<span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#fae19c] block mb-1">
									IN-PERSON
								</span>
								<span className="text-[11px] text-slate-300 block mb-2 leading-snug">
									Meet a verified goldsmith in person.
								</span>
								<span className="text-[10px] font-semibold text-white uppercase">&rarr; Find &amp; Book</span>
							</a>
						</div>
						<div className="flex items-center justify-between text-[11px] text-slate-400 px-1 py-1">
							<a href="#my-appointments" onClick={() => setOpen(false)} className="hover:text-white">
								My Appointments
							</a>
							<span className="text-slate-600">&bull;</span>
							<a href="#consultation-history" onClick={() => setOpen(false)} className="hover:text-white">
								Consultation History
							</a>
							<span className="text-slate-600">&bull;</span>
							<a href="#find-specialist" onClick={() => setOpen(false)} className="hover:text-white">
								Find a Specialist
							</a>
						</div>
					</div>

					{/* TRACK Mobile */}
					<a
						href="#track"
						onClick={() => setOpen(false)}
						className="flex items-center justify-between rounded-lg border border-white/10 p-3.5 text-[12px] font-semibold tracking-[0.14em] uppercase text-white transition-colors hover:bg-white/[0.04]"
					>
						<span>TRACK</span>
						<span>&rarr;</span>
					</a>
				</div>

				{/* Mobile Action: Only Sign In */}
				<div className="mt-4 border-t border-white/[0.08] pt-4">
					<button
						onClick={() => {
							setOpen(false);
							setIsAuthOpen(true);
						}}
						className="h-11 w-full rounded-full border border-white/20 text-[11px] font-semibold tracking-[0.14em] uppercase text-white cursor-pointer hover:bg-white/[0.04]"
					>
						Sign In
					</button>
				</div>
			</MobileMenu>

			{/* Auth Modal */}
			<AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-[#08090d]/98 supports-[backdrop-filter]:bg-[#08090d]/92 backdrop-blur-2xl',
				'fixed top-[84px] right-0 bottom-0 left-0 z-40 flex flex-col overflow-y-auto border-t border-white/10 lg:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-98 ease-out',
					'size-full p-6 sm:p-8',
					className
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body
	);
}

/* ========================================================
   DATA SPECIFICATIONS FOR SHOP & JEWELLERY SERVICES
   ======================================================== */

// SHOP DATA
const jewelleryCol1 = [
	{ title: 'Rings', href: '/shop?category=rings' },
	{ title: 'Necklaces', href: '/shop?category=necklaces' },
	{ title: 'Chains', href: '/shop?category=chains' },
	{ title: 'Bangles', href: '/shop?category=bangles' },
	{ title: 'Bracelets', href: '/shop?category=bangles' },
	{ title: 'Earrings', href: '/shop?category=earrings' },
	{ title: 'Pendants', href: '/shop?category=pendants' },
];

const jewelleryCol2 = [
	{ title: 'Mangalsutra', href: '/shop?category=mangalsutra' },
	{ title: 'Nose Jewellery', href: '/shop?category=rings' },
	{ title: 'Anklets', href: '/shop?category=chains' },
	{ title: 'Toe Rings', href: '/shop?category=rings' },
	{ title: 'Hair Jewellery', href: '/shop?category=pendants' },
	{ title: 'Jewellery Sets', href: '/shop?category=necklaces' },
];

const collectionsList = [
	{ title: 'New Arrivals', href: '/shop?category=all' },
	{ title: 'Trending', href: '/shop?collection=bridal' },
	{ title: 'The Bridal Treasury', href: '/shop?collection=bridal' },
	{ title: 'Daily Wear', href: '/shop?collection=daily' },
	{ title: 'Temple & Heritage', href: '/shop?collection=temple' },
	{ title: 'Contemporary Fine', href: '/shop?collection=contemporary' },
	{ title: 'All Archives', href: '/shop' },
];

const shopByList = [
	{ title: 'All Collections', href: '/shop?craft=all' },
	{ title: 'Handcrafted (100% Karigar)', href: '/shop?craft=handcrafted' },
	{ title: 'Semi Handmade (Precision Cast)', href: '/shop?craft=semi-handmade' },
	{ title: 'All Jewellery Pieces', href: '/shop' },
];

// JEWELLERY SERVICES DATA
const repairServicesList = [
	{ title: 'Ring Repair', href: '/services?category=repair&service=ring-repair' },
	{ title: 'Chain Repair', href: '/services?category=repair&service=chain-repair' },
	{ title: 'Necklace Repair', href: '/services?category=repair&service=necklace-repair' },
	{ title: 'Bangle Repair', href: '/services?category=repair&service=bangle-repair' },
	{ title: 'Bracelet Repair', href: '/services?category=repair&service=bracelet-repair' },
	{ title: 'Earring Repair', href: '/services?category=repair&service=earring-repair' },
	{ title: 'Other Jewellery Repair', href: '/services?category=repair&service=other-jewellery-repair' },
];

const careRestorationList = [
	{ title: 'Cleaning', href: '/services?category=care&service=cleaning' },
	{ title: 'Polishing', href: '/services?category=care&service=polishing' },
	{ title: 'Restoration', href: '/services?category=care&service=restoration' },
	{ title: 'Antique Restoration', href: '/services?category=care&service=antique-restoration' },
	{ title: 'Jewellery Maintenance', href: '/services?category=care&service=jewellery-maintenance' },
];

const resizingModificationList = [
	{ title: 'Ring Resizing', href: '/services?category=resizing&service=ring-resizing' },
	{ title: 'Bangle Size Adjustment', href: '/services?category=resizing&service=bangle-size-adjustment' },
	{ title: 'Chain Length Adjustment', href: '/services?category=resizing&service=chain-length-adjustment' },
	{ title: 'Necklace Length Adjustment', href: '/services?category=resizing&service=necklace-length-adjustment' },
	{ title: 'Design Modification', href: '/services?category=resizing&service=design-modification' },
	{ title: 'Jewellery Conversion', href: '/services?category=resizing&service=jewellery-conversion' },
];

const stoneServicesList = [
	{ title: 'Stone Replacement', href: '/services?category=stones&service=stone-replacement' },
	{ title: 'Stone Setting', href: '/services?category=stones&service=stone-setting' },
	{ title: 'Stone Resetting', href: '/services?category=stones&service=stone-resetting' },
	{ title: 'Loose Stone Repair', href: '/services?category=stones&service=loose-stone-repair' },
	{ title: 'Missing Stone Replacement', href: '/services?category=stones&service=missing-stone-replacement' },
	{ title: 'Stone Inspection', href: '/services?category=stones&service=stone-inspection' },
];

const inspectionServicesList = [
	{ title: 'Jewellery Inspection', href: '/services?category=inspection&service=jewellery-inspection' },
	{ title: 'Damage Assessment', href: '/services?category=inspection&service=damage-assessment' },
	{ title: 'Repair Assessment', href: '/services?category=inspection&service=repair-assessment' },
	{ title: "I Don't Know What's Wrong", href: '/services?category=inspection&service=diagnostic-intake' },
];

// CONSULTATION DATA
const consultationOptions = [
	{
		title: 'Private VIP Salon Visit',
		href: '#consultation-salon',
		description: 'Exclusive trousseau viewing suite with styling concierge',
	},
	{
		title: 'Virtual Gemologist Video Call',
		href: '#consultation-video',
		description: 'Live 1-on-1 inspection under 10x HD microscope',
	},
	{
		title: 'Master Goldsmith Session',
		href: '#consultation-artisan',
		description: 'Custom motif drafting & family heirloom restyling',
	},
	{
		title: 'Armored Doorstep Trousseau',
		href: '#consultation-doorstep',
		description: 'Curated selection brought by private security escort',
	},
];

function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}
