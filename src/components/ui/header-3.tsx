'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

type SimpleLinkItem = {
	title: string;
	href: string;
	description?: string;
};

export function Header() {
	const [open, setOpen] = useState(false);
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
						href="#"
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

				{/* ---------------- 2. MAIN NAVIGATION (Spaced Apart, Not Attached to Logo) ---------------- */}
				<div className="hidden lg:flex items-center gap-8 xl:gap-10 2xl:gap-12">
					{/* ITEM 1: SHOP (Mega menu) */}
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

						{/* Dropdown Box: Anchored right below SHOP */}
						{activeDropdown === 'shop' && (
							<div className="absolute top-full left-0 pt-3 z-50 animate-in fade-in-50 zoom-in-98 duration-150">
								<div className="w-[680px] rounded-xl border border-white/[0.1] bg-[#0c0d14]/98 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
									<div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-3">
										<span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fae19c]">
											Signature Haute Joaillerie & Bridal Suites
										</span>
										<span className="text-[10px] text-slate-400 tracking-wider">
											100% BIS Hallmarked 22K & 18K
										</span>
									</div>

									<div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
										<ul className="space-y-1">
											{shopCategoriesCol1.map((item, i) => (
												<li key={i}>
													<TextListItem {...item} />
												</li>
											))}
										</ul>
										<ul className="space-y-1">
											{shopCategoriesCol2.map((item, i) => (
												<li key={i}>
													<TextListItem {...item} />
												</li>
											))}
										</ul>
									</div>

									<div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-3 text-[11px]">
										<span className="text-slate-400">
											Solitaires, temple nakshi & uncut syndicate Polki diamonds
										</span>
										<a
											href="#catalog"
											className="font-semibold tracking-[0.1em] uppercase text-[#fae19c] hover:underline"
										>
											View All Collections &rarr;
										</a>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* ITEM 2: JEWELLERY SERVICES (Mega menu) */}
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

						{/* Dropdown Box: Anchored right below JEWELLERY SERVICES */}
						{activeDropdown === 'services' && (
							<div className="absolute top-full left-0 pt-3 z-50 animate-in fade-in-50 zoom-in-98 duration-150">
								<div className="w-[620px] rounded-xl border border-white/[0.1] bg-[#0c0d14]/98 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
									<div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-3">
										<span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fae19c]">
											Atelier Care & Jewellery Hospital
										</span>
										<span className="text-[10px] text-slate-400 tracking-wider">
											Master Goldsmith Certified
										</span>
									</div>

									<div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
										<ul className="space-y-1">
											{jewelleryServicesCol1.map((item, i) => (
												<li key={i}>
													<TextListItem {...item} />
												</li>
											))}
										</ul>
										<ul className="space-y-1">
											{jewelleryServicesCol2.map((item, i) => (
												<li key={i}>
													<TextListItem {...item} />
												</li>
											))}
										</ul>
									</div>

									<div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-3 text-[11px]">
										<span className="text-slate-400">
											Armored doorstep intake & 4K video weighing verification
										</span>
										<a
											href="#services"
											className="font-semibold tracking-[0.1em] uppercase text-[#fae19c] hover:underline"
										>
											Book Repair Service &rarr;
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

					{/* ITEM 4: CONSULTATION (Dropdown) */}
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
										activeDropdown === 'consultation'
											? 'opacity-100 scale-x-100'
											: 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
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

						{/* Dropdown Box: Anchored right below CONSULTATION */}
						{activeDropdown === 'consultation' && (
							<div className="absolute top-full left-0 pt-3 z-50 animate-in fade-in-50 zoom-in-98 duration-150">
								<div className="w-[340px] rounded-xl border border-white/[0.1] bg-[#0c0d14]/98 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
									<div className="mb-3 border-b border-white/[0.08] pb-2">
										<span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fae19c]">
											Private Concierge Appointments
										</span>
									</div>

									<ul className="space-y-1">
										{consultationOptions.map((item, i) => (
											<li key={i}>
												<TextListItem {...item} />
											</li>
										))}
									</ul>

									<div className="mt-4 border-t border-white/[0.08] pt-3 text-center">
										<span className="text-[11px] text-slate-400">
											Private Line:{' '}
											<a href="tel:+918041234567" className="font-semibold text-[#fae19c] hover:underline">
												+91 80 4123 4567
											</a>
										</span>
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

				{/* ---------------- 3. RIGHT ACTION: ONLY SIGN IN (Book Appointment Removed) ---------------- */}
				<div className="hidden lg:flex items-center flex-shrink-0">
					<button className="h-10 rounded-full border border-white/15 px-6 text-[11px] font-semibold tracking-[0.14em] uppercase text-white transition-all hover:border-white/40 hover:bg-white/[0.04] cursor-pointer">
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
						<div className="mb-2 border-b border-white/[0.08] pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fae19c]">
							SHOP
						</div>
						<div className="space-y-1">
							{shopCategoriesCol1.concat(shopCategoriesCol2).map((link) => (
								<TextListItem key={link.title} {...link} onClick={() => setOpen(false)} />
							))}
						</div>
					</div>

					{/* JEWELLERY SERVICES Mobile */}
					<div>
						<div className="mb-2 border-b border-white/[0.08] pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fae19c]">
							JEWELLERY SERVICES
						</div>
						<div className="space-y-1">
							{jewelleryServicesCol1.concat(jewelleryServicesCol2).map((link) => (
								<TextListItem key={link.title} {...link} onClick={() => setOpen(false)} />
							))}
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
						<div className="mb-2 border-b border-white/[0.08] pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fae19c]">
							CONSULTATION
						</div>
						<div className="space-y-1">
							{consultationOptions.map((link) => (
								<TextListItem key={link.title} {...link} onClick={() => setOpen(false)} />
							))}
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
					<button className="h-11 w-full rounded-full border border-white/20 text-[11px] font-semibold tracking-[0.14em] uppercase text-white">
						Sign In
					</button>
				</div>
			</MobileMenu>
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

/* ---------------- Text-Only List Item (Clean Luxury Typography) ---------------- */
function TextListItem({
	title,
	description,
	className,
	href,
	onClick,
}: SimpleLinkItem & { className?: string; onClick?: () => void }) {
	return (
		<a
			href={href}
			onClick={onClick}
			className={cn(
				'group flex flex-col gap-0.5 rounded-lg p-2.5 transition-colors hover:bg-white/[0.04]',
				className
			)}
		>
			<span className="text-[13px] font-medium text-slate-100 group-hover:text-[#fae19c] transition-colors tracking-wide">
				{title}
			</span>
			{description && (
				<span className="text-[11px] text-slate-400 font-light leading-relaxed">
					{description}
				</span>
			)}
		</a>
	);
}

/* ========================================================
   CURATED SPECIFICATIONS (CLEAN, PRECISE & REFINED)
   ======================================================== */

// 1. SHOP Mega Menu Collections
const shopCategoriesCol1: SimpleLinkItem[] = [
	{
		title: 'Necklaces & Chokers',
		href: '#necklaces',
		description: 'Antique temple chokers, bridal haars & kasu malas',
	},
	{
		title: 'Earrings & Jhumkas',
		href: '#earrings',
		description: 'Handcrafted Chandbalis, studs & traditional drops',
	},
	{
		title: 'Rings & Solitaires',
		href: '#rings',
		description: 'IGI certified diamond solitaires & royal signets',
	},
	{
		title: 'Bangles & Kadas',
		href: '#bangles',
		description: 'Solid gold temple nakshi & filigree bangles',
	},
];

const shopCategoriesCol2: SimpleLinkItem[] = [
	{
		title: 'Polki Diamond Suites',
		href: '#polki',
		description: 'Uncut syndicate diamonds with pure 24K Jadau setting',
	},
	{
		title: 'Mangalsutras',
		href: '#mangalsutras',
		description: 'Sacred heirloom black-bead motifs in 22K gold',
	},
	{
		title: 'Solid Gold Chains',
		href: '#chains',
		description: 'Rope, box, cuban & traditional artisan link styles',
	},
	{
		title: 'Bullion & Fine Silver',
		href: '#bullion',
		description: '999 fine silver artifacts & 24K gold investment coins',
	},
];

// 2. JEWELLERY SERVICES Mega Menu
const jewelleryServicesCol1: SimpleLinkItem[] = [
	{
		title: 'Jewellery Hospital & Repairs',
		href: '#repairs',
		description: '18 services: Precision ring resizing, laser soldering & resets',
	},
	{
		title: 'Gold Exchange & Karatmeter',
		href: '#gold-exchange',
		description: 'Live spot rate valuation & zero-deduction purity exchange',
	},
];

const jewelleryServicesCol2: SimpleLinkItem[] = [
	{
		title: 'Ultrasonic Spa & Polish',
		href: '#spa',
		description: 'Ultrasonic steam cleaning, rhodium flash & claw audit',
	},
	{
		title: 'BIS Hallmark & HUID Provenance',
		href: '#hallmark',
		description: 'Government 6-digit laser assay certification lookup',
	},
];

// 4. CONSULTATION Dropdown Options
const consultationOptions: SimpleLinkItem[] = [
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
