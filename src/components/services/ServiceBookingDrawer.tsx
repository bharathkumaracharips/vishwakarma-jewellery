'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Clock, MapPin, Truck, Video, CheckCircle2, ArrowRight, Scale, Calendar } from 'lucide-react';
import { ServiceItem } from './servicesData';

interface ServiceBookingDrawerProps {
	service: ServiceItem | null;
	isOpen: boolean;
	initialNotes?: string;
	onClose: () => void;
	onConfirmed: (ticketCode: string) => void;
}

export function ServiceBookingDrawer({
	service,
	isOpen,
	initialNotes = '',
	onClose,
	onConfirmed,
}: ServiceBookingDrawerProps) {
	const [intakeMode, setIntakeMode] = useState<'in-store' | 'doorstep' | 'video'>('in-store');
	const [metalPurity, setMetalPurity] = useState<string>('22K');
	const [approxWeight, setApproxWeight] = useState<string>('15');
	const [notes, setNotes] = useState<string>(initialNotes);
	const [customerName, setCustomerName] = useState<string>('');
	const [customerPhone, setCustomerPhone] = useState<string>('');
	const [preferredDate, setPreferredDate] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (!isOpen || !service) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		setTimeout(() => {
			const ticket = `VK-SVC-${Math.floor(1000 + Math.random() * 9000)}`;
			setIsSubmitting(false);
			onConfirmed(ticket);
		}, 800);
	};

	return (
		<div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
			<div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
				<div className="w-screen max-w-xl bg-[#0c0d14] border-l border-white/10 shadow-2xl flex flex-col justify-between">
					{/* Drawer Header */}
					<div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#08090d]">
						<div>
							<span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#fae19c]">
								Atelier Bench Booking
							</span>
							<h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
								{service.name}
							</h2>
						</div>

						<button
							onClick={onClose}
							className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
						>
							<X className="size-5" />
						</button>
					</div>

					{/* Drawer Form Body */}
					<form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
						{/* Service Quick Recap Box */}
						<div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
							<div className="flex items-center justify-between text-xs">
								<span className="text-neutral-400 font-mono">Turnaround Time</span>
								<span className="text-[#fae19c] font-semibold flex items-center gap-1">
									<Clock className="size-3" />
									<span>{service.turnaroundTime}</span>
								</span>
							</div>
							<div className="flex items-center justify-between text-xs border-t border-white/5 pt-2">
								<span className="text-neutral-400 font-mono">Starting Bench Fee</span>
								<span className="text-white font-bold font-serif text-sm">
									{service.startingPrice === 0 ? 'Complimentary' : `₹${service.startingPrice.toLocaleString('en-IN')}`}
								</span>
							</div>
							<div className="text-[11px] text-neutral-400 font-light border-t border-white/5 pt-2">
								<span className="font-mono text-neutral-500">Method: </span>
								<span>{service.benchMethod}</span>
							</div>
						</div>

						{/* 1. Intake Mode Selection */}
						<div className="space-y-2.5">
							<label className="block text-[11px] font-mono uppercase tracking-wider text-[#fae19c]">
								1. Select Intake Delivery Mode
							</label>
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
								<button
									type="button"
									onClick={() => setIntakeMode('in-store')}
									className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
										intakeMode === 'in-store'
											? 'border-[#fae19c] bg-[#fae19c]/15 text-white'
											: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
									}`}
								>
									<MapPin className="size-4 text-[#fae19c] mb-1.5" />
									<span className="block text-xs font-semibold">Salon Drop-off</span>
									<span className="text-[10px] text-neutral-400 block mt-0.5">Bangalore Salon</span>
								</button>

								<button
									type="button"
									onClick={() => setIntakeMode('doorstep')}
									className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
										intakeMode === 'doorstep'
											? 'border-[#fae19c] bg-[#fae19c]/15 text-white'
											: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
									}`}
								>
									<Truck className="size-4 text-[#fae19c] mb-1.5" />
									<span className="block text-xs font-semibold">Vault Pickup</span>
									<span className="text-[10px] text-neutral-400 block mt-0.5">Insured Courier</span>
								</button>

								<button
									type="button"
									onClick={() => setIntakeMode('video')}
									className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
										intakeMode === 'video'
											? 'border-[#fae19c] bg-[#fae19c]/15 text-white'
											: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
									}`}
								>
									<Video className="size-4 text-[#fae19c] mb-1.5" />
									<span className="block text-xs font-semibold">Video Consult</span>
									<span className="text-[10px] text-neutral-400 block mt-0.5">Live Microscope</span>
								</button>
							</div>
						</div>

						{/* 2. Metal Purity & Weight */}
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1.5">
								<label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
									Metal Purity
								</label>
								<select
									value={metalPurity}
									onChange={(e) => setMetalPurity(e.target.value)}
									className="w-full rounded-xl border border-white/10 bg-[#14151c] px-3.5 py-2 text-xs text-neutral-200 outline-none focus:border-[#fae19c]"
								>
									<option value="22K">22K Gold (BIS 916)</option>
									<option value="18K">18K Gold</option>
									<option value="14K">14K Fine Gold</option>
									<option value="Platinum">Platinum 950</option>
									<option value="Silver">Sterling Silver (925)</option>
								</select>
							</div>

							<div className="space-y-1.5">
								<label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
									Approx. Weight (g)
								</label>
								<input
									type="number"
									value={approxWeight}
									onChange={(e) => setApproxWeight(e.target.value)}
									placeholder="e.g. 18.5"
									className="w-full rounded-xl border border-white/10 bg-[#14151c] px-3.5 py-2 text-xs text-neutral-200 outline-none focus:border-[#fae19c]"
								/>
							</div>
						</div>

						{/* 3. Issue Notes */}
						<div className="space-y-1.5">
							<label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
								Notes or Instructions for the Karigar
							</label>
							<textarea
								rows={3}
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
								placeholder="Describe what needs repair, resizing, or custom adjustment..."
								className="w-full rounded-xl border border-white/10 bg-[#14151c] p-3 text-xs text-neutral-200 outline-none focus:border-[#fae19c] resize-none"
							/>
						</div>

						{/* 4. Customer Contact */}
						<div className="space-y-3 border-t border-white/[0.08] pt-4">
							<label className="block text-[11px] font-mono uppercase tracking-wider text-[#fae19c]">
								Customer Details & Appointment
							</label>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<input
									type="text"
									required
									value={customerName}
									onChange={(e) => setCustomerName(e.target.value)}
									placeholder="Your Full Name"
									className="rounded-xl border border-white/10 bg-[#14151c] px-3.5 py-2 text-xs text-neutral-200 outline-none focus:border-[#fae19c]"
								/>
								<input
									type="tel"
									required
									value={customerPhone}
									onChange={(e) => setCustomerPhone(e.target.value)}
									placeholder="Phone / WhatsApp (+91)"
									className="rounded-xl border border-white/10 bg-[#14151c] px-3.5 py-2 text-xs text-neutral-200 outline-none focus:border-[#fae19c]"
								/>
							</div>

							<div className="space-y-1">
								<label className="block text-[10px] font-mono uppercase text-neutral-400">
									Preferred Drop-off / Video Date
								</label>
								<input
									type="date"
									value={preferredDate}
									onChange={(e) => setPreferredDate(e.target.value)}
									className="w-full rounded-xl border border-white/10 bg-[#14151c] px-3.5 py-2 text-xs text-neutral-200 outline-none focus:border-[#fae19c]"
								/>
							</div>
						</div>

						{/* Zero Loss Assurance Strip */}
						<div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 flex items-center gap-2.5">
							<ShieldCheck className="size-4 text-emerald-400 shrink-0" />
							<p className="text-[10.5px] text-emerald-200/90 font-light leading-snug">
								Your piece is weighed on dual 0.001g Sartorius balances at drop-off with a photographic vault receipt.
							</p>
						</div>

						{/* Submit Button */}
						<div className="pt-2">
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full rounded-2xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] py-3.5 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
							>
								{isSubmitting ? (
									<span>Generating Digital Intake Pass...</span>
								) : (
									<>
										<span>Confirm Bench Booking</span>
										<ArrowRight className="size-4" />
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
