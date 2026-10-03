'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/ui/header-3';
import { ServicesHero } from '@/components/services/ServicesHero';
import { ServicesCategoryBar } from '@/components/services/ServicesCategoryBar';
import { ServiceCard } from '@/components/services/ServiceCard';
import { DiagnosticWizardModal } from '@/components/services/DiagnosticWizardModal';
import { ServiceBookingDrawer } from '@/components/services/ServiceBookingDrawer';
import { BeforeAfterShowcase } from '@/components/services/BeforeAfterShowcase';
import { ServicesTrustFAQ } from '@/components/services/ServicesTrustFAQ';
import { SERVICES_LIST, ServiceItem, ServiceCategory } from '@/components/services/servicesData';
import { CheckCircle2, X, Phone, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

function ServicesContent() {
	const searchParams = useSearchParams();

	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [activeBookingService, setActiveBookingService] = useState<ServiceItem | null>(null);
	const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
	const [bookingNotes, setBookingNotes] = useState<string>('');
	const [confirmedTicket, setConfirmedTicket] = useState<string | null>(null);

	// Read query parameters from URL (e.g., /services?category=repair&service=ring-repair)
	useEffect(() => {
		const catParam = searchParams.get('category');
		const serviceParam = searchParams.get('service');

		if (catParam) {
			setSelectedCategory(catParam);
		}

		if (serviceParam) {
			const matched = SERVICES_LIST.find((s) => s.id === serviceParam);
			if (matched) {
				setActiveBookingService(matched);
			}
		}
	}, [searchParams]);

	// Filter Services
	const filteredServices = useMemo(() => {
		if (selectedCategory === 'all') return SERVICES_LIST;
		return SERVICES_LIST.filter((s) => s.category === selectedCategory);
	}, [selectedCategory]);

	// Calculate counts
	const categoryCounts = useMemo(() => {
		const counts: Record<string, number> = {
			all: SERVICES_LIST.length,
			repair: 0,
			care: 0,
			resizing: 0,
			stones: 0,
			inspection: 0,
		};
		SERVICES_LIST.forEach((s) => {
			if (counts[s.category] !== undefined) {
				counts[s.category]++;
			}
		});
		return counts;
	}, []);

	return (
		<div className="min-h-screen w-full bg-[#07080b] text-[#f8fafc] selection:bg-[#fae19c]/25 selection:text-[#fae19c]">
			{/* Top Navbar */}
			<Header />

			{/* Hero Section */}
			<ServicesHero
				onOpenBooking={() => {
					// Open booking with default first service
					setActiveBookingService(SERVICES_LIST[0]);
				}}
				onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
			/>

			{/* Sticky Category Switcher Bar */}
			<ServicesCategoryBar
				selectedCategory={selectedCategory}
				onSelectCategory={(catId) => setSelectedCategory(catId)}
				counts={categoryCounts}
			/>

			{/* Main Catalog Viewport */}
			<main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
				{/* Section Heading & Result count */}
				<div className="space-y-1 text-left">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
						<div>
							<h2 className="font-serif text-2xl sm:text-3xl font-bold text-white capitalize">
								{selectedCategory === 'all'
									? 'All Atelier Jewellery Services'
									: selectedCategory === 'care'
									? 'Care & Restoration Services'
									: selectedCategory === 'resizing'
									? 'Resizing & Modification Services'
									: selectedCategory === 'stones'
									? 'Stone & Setting Services'
									: selectedCategory === 'inspection'
									? 'Inspection & Diagnostics'
									: `${selectedCategory} Services`}
							</h2>
							<p className="text-xs text-neutral-400 font-light mt-0.5">
								Showing {filteredServices.length} master goldsmith bench procedures • Estd 1984
							</p>
						</div>

						{/* Quick Diagnostic Triage Button */}
						<button
							onClick={() => setIsDiagnosticOpen(true)}
							className="rounded-full border border-[#fae19c]/40 bg-[#fae19c]/10 px-4 py-2 text-xs font-semibold text-[#fae19c] hover:bg-[#fae19c]/20 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
						>
							<span>Unsure what you need? Run Diagnostic Triage</span>
							<ArrowRight className="size-3.5" />
						</button>
					</div>
				</div>

				{/* Services Grid (4 items per row on large displays) */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
					{filteredServices.map((service) => (
						<ServiceCard
							key={service.id}
							service={service}
							onBook={(selected) => {
								setBookingNotes('');
								setActiveBookingService(selected);
							}}
						/>
					))}
				</div>

				{/* Before & After Case Studies */}
				<BeforeAfterShowcase />

				{/* High Trust FAQ */}
				<ServicesTrustFAQ />
			</main>

			{/* ================= MODALS & DRAWERS ================= */}

			{/* Interactive Diagnostic Triage Modal */}
			<DiagnosticWizardModal
				isOpen={isDiagnosticOpen}
				onClose={() => setIsDiagnosticOpen(false)}
				onSelectRecommendedService={(service, notes) => {
					setBookingNotes(notes);
					setActiveBookingService(service);
				}}
			/>

			{/* Service Booking Drawer */}
			<ServiceBookingDrawer
				service={activeBookingService}
				isOpen={!!activeBookingService}
				initialNotes={bookingNotes}
				onClose={() => {
					setActiveBookingService(null);
					setBookingNotes('');
				}}
				onConfirmed={(ticketCode) => {
					setActiveBookingService(null);
					setConfirmedTicket(ticketCode);
				}}
			/>

			{/* Ticket Confirmation Modal */}
			{confirmedTicket && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
					<div className="relative w-full max-w-md rounded-3xl border border-[#fae19c]/40 bg-[#0d0e14] p-6 sm:p-8 text-center space-y-5 shadow-2xl">
						<button
							onClick={() => setConfirmedTicket(null)}
							className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
						>
							<X className="size-5" />
						</button>

						<div className="size-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
							<CheckCircle2 className="size-8" />
						</div>

						<div className="space-y-1.5">
							<span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#fae19c]">
								Bench Booking Confirmed
							</span>
							<h3 className="font-serif text-2xl font-bold text-white">
								Digital Intake Pass Issued
							</h3>
							<div className="rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 font-mono text-sm text-[#fae19c] font-bold mt-2">
								{confirmedTicket}
							</div>
						</div>

						<p className="text-xs text-neutral-300 font-light leading-relaxed">
							Our atelier bench manager will reach out via WhatsApp/Phone within 2 hours to confirm your intake schedule and secure delivery manifest.
						</p>

						<div className="pt-2">
							<button
								onClick={() => setConfirmedTicket(null)}
								className="w-full rounded-2xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] py-3 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105 transition-all cursor-pointer"
							>
								Back to Services
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default function ServicesPage() {
	return (
		<Suspense fallback={<div className="min-h-screen bg-[#07080b] flex items-center justify-center text-white">Loading Atelier Services...</div>}>
			<ServicesContent />
		</Suspense>
	);
}
