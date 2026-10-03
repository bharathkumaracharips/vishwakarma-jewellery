'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useJewelleryJourney, CHAPTERS, DEMO_MILESTONES } from './state/useJewelleryJourney';
import { GoldenTrace } from './components/GoldenTrace';
import { JewelleryAsset } from './components/JewelleryAsset';
import { MakeItYoursPanel } from './components/MakeItYoursPanel';
import { EventNode, MilestoneDrawer } from './components/EventNode';
import { ActionRouter } from './components/ActionRouter';
import { BespokeIdeaPortal } from './components/BespokeIdeaPortal';
import { ChevronDown, Sparkles, Scale, ShieldCheck, Video, MapPin, Check } from 'lucide-react';

// Continuous smooth cross-fade interpolation for buttery cinematic chapter transitions
function getChapterTransitionStyle(progress: number, range: [number, number]) {
	const [start, end] = range;
	const duration = end - start;
	// 25% smooth dissolve margin
	const buffer = duration * 0.22;
	const fadeInStart = start - buffer;
	const fadeInEnd = start + buffer;
	const fadeOutStart = end - buffer;
	const fadeOutEnd = end + buffer;

	if (progress < fadeInStart || progress > fadeOutEnd) {
		return {
			opacity: 0,
			transform: progress < fadeInStart ? 'translateY(24px) scale(0.98)' : 'translateY(-24px) scale(0.98)',
			pointerEvents: 'none' as const,
			visibility: 'hidden' as const,
		};
	}

	let opacity = 1;
	let translateY = 0;
	let scale = 1;

	if (progress < fadeInEnd) {
		const t = Math.max(0, Math.min(1, (progress - fadeInStart) / (fadeInEnd - fadeInStart)));
		// Smooth cubic ease-in-out curve
		const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		opacity = ease;
		translateY = (1 - ease) * 24;
		scale = 0.98 + ease * 0.02;
	} else if (progress > fadeOutStart) {
		const t = Math.max(0, Math.min(1, (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart)));
		const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		opacity = 1 - ease;
		translateY = -ease * 24;
		scale = 1 - ease * 0.02;
	}

	return {
		opacity,
		transform: `translateY(${translateY}px) scale(${scale})`,
		pointerEvents: opacity > 0.4 ? ('auto' as const) : ('none' as const),
		visibility: 'visible' as const,
		transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
	};
}

export function LifeOfAJewel() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);

	const {
		configuration,
		updateMetal,
		updateApproxWeight,
		updateStone,
		selectedMilestone,
		setSelectedMilestone,
		activeModal,
		setActiveModal,
	} = useJewelleryJourney();

	// Calculate scroll progress non-destructively without locking native scroll
	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			const totalHeight = rect.height - window.innerHeight;
			if (totalHeight <= 0) return;
			const current = -rect.top;
			const rawProgress = Math.min(Math.max(current / totalHeight, 0), 1);
			setProgress(rawProgress);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Action router handler
	const handleSelectAction = (actionKey: string) => {
		if (actionKey === 'customize') {
			if (containerRef.current) {
				const top = containerRef.current.offsetTop + containerRef.current.scrollHeight * 0.32;
				window.scrollTo({ top, behavior: 'smooth' });
			}
		} else {
			setActiveModal(actionKey);
		}
	};

	// Determine if exploded view is active around Chapter 02 (0.08 -> 0.16)
	const isExploded = progress >= 0.08 && progress <= 0.18;

	return (
		<section
			ref={containerRef}
			className="relative w-full bg-[#08090d] text-white selection:bg-[#fae19c]/20 selection:text-[#fae19c]"
			style={{ height: '750vh' }}
		>
			{/* Sticky Viewport Stage with pure, unobstructed view */}
			<div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8 lg:p-12 z-20">
				{/* ---------------- 1. ELEGANT SIDE GOLDEN TRACE RAIL ---------------- */}
				<GoldenTrace progress={progress} />

				{/* ---------------- 2. CONTINUOUS MAIN CINEMATIC STAGE ---------------- */}
				<div className="relative z-20 size-full flex items-center justify-center my-auto">
					{/* ================= CHAPTER 01: RAW GOLD ================= */}
					<div
						className="absolute inset-0 size-full flex items-center justify-center"
						style={getChapterTransitionStyle(progress, CHAPTERS[0].range)}
					>
						<div className="text-center space-y-4 max-w-xl mx-auto px-4">
							<div className="inline-flex items-center gap-2 rounded-full border border-[#fae19c]/30 bg-[#fae19c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fae19c]">
								<Sparkles className="size-3" />
								<span>Material Genesis</span>
							</div>
							<h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-white leading-tight">
								Every ornament begins with something precious.
							</h1>
							<p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-md mx-auto">
								22K gold, shaped by generations of craftsmanship. Scroll down to follow the journey of an heirloom.
							</p>
							<div className="pt-6 flex flex-col items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[#fae19c] animate-bounce">
								<span>Scroll to follow ↓</span>
							</div>
						</div>
					</div>

					{/* ================= CHAPTER 02: THE KARIGAR ================= */}
					<div
						className="absolute inset-0 size-full flex items-center justify-center"
						style={getChapterTransitionStyle(progress, CHAPTERS[1].range)}
					>
						<div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-5xl items-center gap-8 px-4">
							<div className="md:col-span-5 space-y-3">
								<span className="text-[10px] font-mono uppercase tracking-widest text-[#fae19c]">
									02 • The Artisan Workbench
								</span>
								<h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
									Craftsmanship gives gold its character.
								</h2>
								<p className="text-xs text-neutral-300 font-light leading-relaxed">
									Technology records the journey. Craftsmanship creates the jewellery. Master goldsmiths shape every articulation by hand.
								</p>
								<div className="flex flex-wrap gap-1.5 pt-2">
									{['CUT', 'SHAPE', 'SOLDER', 'FILE', 'POLISH', 'INSPECT'].map((tech) => (
										<span
											key={tech}
											className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono text-neutral-300"
										>
											{tech}
										</span>
									))}
								</div>
							</div>

							<div className="md:col-span-7 flex justify-center">
								<JewelleryAsset
									configuration={configuration}
									progress={progress}
									isExploded={isExploded}
								/>
							</div>
						</div>
					</div>

					{/* ================= CHAPTER 03: GOLD TO ORNAMENT ================= */}
					<div
						className="absolute inset-0 size-full flex items-center justify-center"
						style={getChapterTransitionStyle(progress, CHAPTERS[2].range)}
					>
						<div className="text-center space-y-4 max-w-lg mx-auto px-4">
							<JewelleryAsset
								configuration={configuration}
								progress={progress}
								isExploded={false}
							/>
							<div className="pt-4">
								<h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
									Found something you love?
								</h2>
								<p className="text-xs text-neutral-400 font-light mt-1">
									Make it yours. Customize metal, weight, center gemstone, and budget.
								</p>
							</div>
						</div>
					</div>

					{/* ================= CHAPTER 04: MAKE IT YOURS (CONFIGURATOR) ================= */}
					<div
						className="absolute inset-0 size-full flex items-center justify-center"
						style={getChapterTransitionStyle(progress, CHAPTERS[3].range)}
					>
						<div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-5xl items-center gap-6 lg:gap-12 px-4">
							{/* Left: The Central Responsive Jewel */}
							<div className="lg:col-span-6 flex flex-col items-center justify-center">
								<JewelleryAsset
									configuration={configuration}
									progress={progress}
									isExploded={false}
								/>
								<div className="mt-4 text-center">
									<h4 className="font-serif text-base font-semibold text-white">
										{configuration.baseDesignName}
									</h4>
									<p className="text-xs text-[#fae19c] font-mono mt-0.5">
										{configuration.metal.purity} {configuration.metal.tone} • ~{configuration.approxWeight}g
									</p>
								</div>
							</div>

							{/* Right: The Interactive Configurator Panel */}
							<div className="lg:col-span-6 flex justify-center">
								<MakeItYoursPanel
									configuration={configuration}
									onUpdateMetal={updateMetal}
									onUpdateWeight={updateApproxWeight}
									onUpdateStone={updateStone}
									onRequestQuote={() => setActiveModal('quote')}
									onSaveDesign={() => setActiveModal('saved')}
									onBookConsultation={() => setActiveModal('consultation')}
								/>
							</div>
						</div>
					</div>

					{/* ================= CHAPTER 05: HAVE AN IDEA? YOUR IDEOLOGY, OUR CRAFT ================= */}
					<div
						className="absolute inset-0 size-full flex items-center justify-center"
						style={getChapterTransitionStyle(progress, CHAPTERS[4].range)}
					>
						<div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-5xl items-center gap-6 lg:gap-8 px-4">
							{/* Left: Photorealistic Visual Inspiration */}
							<div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center text-center space-y-3">
								<div className="scale-90">
									<JewelleryAsset
										configuration={configuration}
										progress={progress}
										isExploded={false}
									/>
								</div>
								<div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-center backdrop-blur-md">
									<span className="text-[10px] font-mono uppercase tracking-widest text-[#fae19c] block">
										Ideology Meets Craft
									</span>
									<span className="text-xs text-neutral-300 font-serif">
										&ldquo;Every custom ornament carries a soul.&rdquo;
									</span>
								</div>
							</div>

							{/* Right: Bespoke Multi-Format Submission Portal */}
							<div className="lg:col-span-7 flex justify-center w-full">
								<BespokeIdeaPortal
									onSubmitIdea={() => setActiveModal('bespoke')}
								/>
							</div>
						</div>
					</div>

					{/* ================= CHAPTER 06: WHAT YOU ALREADY OWN ================= */}
					<div
						className="absolute inset-0 size-full flex items-center justify-center"
						style={getChapterTransitionStyle(progress, CHAPTERS[5].range)}
					>
						<div className="text-center space-y-5 max-w-2xl mx-auto px-4">
							<span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#fae19c]">
								06 • Heirloom Care & Restoration
							</span>
							<h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight">
								&ldquo;But your jewellery doesn’t have to be new to matter.&rdquo;
							</h2>
							<p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-lg mx-auto">
								We care for what you already own. Decades-old family heirlooms repaired, restored, resized, and returned with verifiable digital provenance.
							</p>
							<div className="flex flex-wrap justify-center gap-2 pt-2">
								{['Repair', 'Restore', 'Resize', 'Modify', 'Reset Stones', 'Ultrasonic Polish', 'Inspection'].map(
									(srv) => (
										<span
											key={srv}
											className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs text-neutral-300"
										>
											{srv}
										</span>
									)
								)}
							</div>
						</div>
					</div>

					{/* ================= CHAPTER 07: PRECISION & CUSTODY ================= */}
					<div
						className="absolute inset-0 size-full flex items-center justify-center"
						style={getChapterTransitionStyle(progress, CHAPTERS[6].range)}
					>
						<div className="w-full max-w-3xl mx-auto space-y-6 px-4">
							<div className="text-center space-y-1">
								<span className="text-[10px] font-mono uppercase tracking-widest text-[#fae19c]">
									07 • Honest Precision & Custody
								</span>
								<h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
									Dual Micro-Balance Intake
								</h3>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-2">
									<span className="text-[10px] font-mono text-neutral-500 uppercase">
										01 • Intake Recorded
									</span>
									<div className="flex items-center justify-between">
										<span className="font-serif text-2xl font-bold text-white">14.280 g</span>
										<Scale className="size-5 text-[#fae19c]" />
									</div>
									<p className="text-xs text-neutral-400 font-light">
										Multi-angle macro photography logged. Digital custody certificate generated upon receipt.
									</p>
								</div>

								<div className="rounded-2xl border border-[#fae19c]/30 bg-[#fae19c]/[0.03] p-5 space-y-2">
									<span className="text-[10px] font-mono text-[#fae19c] uppercase">
										02 • After Service & Purification
									</span>
									<div className="flex items-center justify-between">
										<span className="font-serif text-2xl font-bold text-[#fae19c]">14.240 g</span>
										<ShieldCheck className="size-5 text-[#fae19c]" />
									</div>
									<p className="text-xs text-neutral-300 font-light">
										0.040 g surface patina & oxide safely removed during sonic cleanse. Inspection completed & verified.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* ================= CHAPTER 08: THE GOLDEN TRACE ================= */}
					<div
						className="absolute inset-0 size-full flex items-center justify-center"
						style={getChapterTransitionStyle(progress, CHAPTERS[7].range)}
					>
						<div className="text-center space-y-4 max-w-lg mx-auto px-4">
							<span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#fae19c]">
								08 • The Unbroken Lifeline
							</span>
							<h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
								The Golden Trace
							</h3>
							<p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
								A continuous line that follows your jewellery from drop-off, through the master goldsmith bench, quality inspection, and back into your hands.
							</p>
						</div>
					</div>

					{/* ================= CHAPTER 09: VERIFIABLE LEDGER ================= */}
					<div
						className="absolute inset-0 size-full flex items-center justify-center"
						style={getChapterTransitionStyle(progress, CHAPTERS[8].range)}
					>
						<div className="w-full max-w-xl mx-auto space-y-4 px-4">
							<div className="text-center space-y-1">
								<span className="text-[10px] font-mono uppercase tracking-widest text-[#fae19c]">
									09 • The Invisible Ledger
								</span>
								<h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
									Important milestones cryptographically anchored.
								</h3>
								<p className="text-xs text-neutral-400 font-light">
									A history designed to be verifiable. Not marketing buzzwords—tamper-evident evidence.
								</p>
							</div>

							<div className="space-y-2">
								{['EVENT #01: Intake Registered (14.280g)', 'EVENT #02: Goldsmith Assigned & Solder', 'EVENT #03: Sonic Polish & Stone Setting', 'EVENT #04: Final Hallmark Audit Verified'].map((ev) => (
									<div
										key={ev}
										className="flex items-center justify-between rounded-xl border border-white/10 bg-black/50 p-3 text-xs"
									>
										<span className="text-neutral-200 font-mono">{ev}</span>
										<span className="rounded bg-[#fae19c]/10 text-[#fae19c] font-mono text-[10px] px-2 py-0.5">
											Anchor ✓
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* ================= CHAPTER 10: REAL-TIME TRACKING ================= */}
					<div
						className="absolute inset-0 size-full flex items-center justify-center"
						style={getChapterTransitionStyle(progress, CHAPTERS[9].range)}
					>
						<div className="w-full max-w-2xl mx-auto space-y-4 px-4">
							<div className="text-center space-y-1">
								<span className="text-[10px] font-mono uppercase tracking-widest text-[#fae19c]">
									10 • Live Journey
								</span>
								<h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
									Follow Every Milestone in Real Time
								</h3>
								<p className="text-xs text-neutral-400 font-light">
									Click any completed node to view technician logs, scale recordings, and verified receipts.
								</p>
							</div>

							<div className="space-y-2 w-full">
								{DEMO_MILESTONES.slice(1, 4).map((m) => (
									<EventNode
										key={m.id}
										milestone={m}
										onClick={() => setSelectedMilestone(m)}
										isActive={m.status === 'active'}
									/>
								))}
							</div>

							<div className="flex justify-center pt-1">
								<button
									onClick={() => setSelectedMilestone(DEMO_MILESTONES[3])}
									className="text-[11px] font-mono text-[#fae19c] hover:underline cursor-pointer flex items-center gap-1.5 transition-colors"
								>
									<span>View Complete 5-Stage Ledger & Cryptographic Hashes →</span>
								</button>
							</div>
						</div>
					</div>

					{/* ================= CHAPTER 11: CONSULTATION ================= */}
					<div
						className="absolute inset-0 size-full flex items-center justify-center"
						style={getChapterTransitionStyle(progress, CHAPTERS[10].range)}
					>
						<div className="w-full max-w-3xl mx-auto space-y-6 text-center px-4">
							<div className="space-y-1">
								<span className="text-[10px] font-mono uppercase tracking-widest text-[#fae19c]">
									11 • Human Expertise
								</span>
								<h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
									Atelier Consultation
								</h3>
								<p className="text-xs text-neutral-400 font-light max-w-md mx-auto">
									Technology never replaces the artisan. It connects you directly to them.
								</p>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-3 text-left">
									<Video className="size-6 text-[#fae19c]" />
									<h4 className="font-serif text-base font-semibold text-white">Online 4K Consultation</h4>
									<p className="text-xs text-neutral-400 font-light leading-relaxed">
										Private video consultation with macro cameras showcasing loose diamonds and custom CAD models live.
									</p>
									<button
										onClick={() => setActiveModal('consultation')}
										className="text-xs font-semibold text-[#fae19c] hover:underline cursor-pointer"
									>
										Schedule Online Call →
									</button>
								</div>

								<div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-3 text-left">
									<MapPin className="size-6 text-[#fae19c]" />
									<h4 className="font-serif text-base font-semibold text-white">In-Person Flagship Lounge</h4>
									<p className="text-xs text-neutral-400 font-light leading-relaxed">
										Visit our flagship atelier lounge. Experience tactile fitting and consult face-to-face with master karigars.
									</p>
									<button
										onClick={() => setActiveModal('consultation')}
										className="text-xs font-semibold text-[#fae19c] hover:underline cursor-pointer"
									>
										Book In-Person Visit →
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* ================= CHAPTER 12: YOUR CHOICE ================= */}
					<div
						className="absolute inset-0 size-full flex items-center justify-center"
						style={getChapterTransitionStyle(progress, CHAPTERS[11].range)}
					>
						<div className="w-full max-w-4xl mx-auto space-y-6 text-center px-4">
							<div className="space-y-2">
								<div className="flex items-center justify-center gap-2 text-xs font-serif tracking-[0.25em] text-[#fae19c] uppercase">
									<span>Your Jewellery</span>
									<span className="text-neutral-500">•</span>
									<span>Your Journey</span>
									<span className="text-neutral-500">•</span>
									<span>Your Trust</span>
								</div>
								<h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">
									Where would you like to begin?
								</h2>
							</div>

							<ActionRouter onSelectAction={handleSelectAction} />
						</div>
					</div>
				</div>

				{/* ---------------- 3. SUBTLE BOTTOM STATUS & SKIP ---------------- */}
				<div className="relative z-30 flex items-center justify-between border-t border-white/[0.08] pt-3 text-[11px] text-neutral-400 font-mono">
					<div>
						<span>VISHWAKARMA VAULT</span>
						<span className="mx-2 text-neutral-700">|</span>
						<span className="text-neutral-500">ESTD 1984</span>
					</div>

					<div className="flex items-center gap-4">
						<button
							onClick={() => {
								if (containerRef.current) {
									const top = containerRef.current.offsetTop + containerRef.current.scrollHeight;
									window.scrollTo({ top, behavior: 'smooth' });
								}
							}}
							className="text-[#fae19c] hover:underline cursor-pointer flex items-center gap-1"
						>
							<span>Explore All</span>
							<ChevronDown className="size-3.5" />
						</button>
					</div>
				</div>
			</div>

			{/* Interactive Milestone Detail Drawer */}
			<MilestoneDrawer
				milestone={selectedMilestone}
				onClose={() => setSelectedMilestone(null)}
			/>

			{/* Interactive Action Modals */}
			{activeModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-black/85 backdrop-blur-md"
						onClick={() => setActiveModal(null)}
					/>
					<div className="relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-[#0e0f17] p-6 shadow-2xl space-y-4 animate-in fade-in-50 zoom-in-95">
						<div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#fae19c]">
							<Check className="size-4" />
							<span>Atelier Workflow</span>
						</div>
						<h3 className="font-serif text-xl font-semibold text-white">
							{activeModal === 'bespoke' && 'Your Ideology Has Been Entrusted to the Karigar'}
							{activeModal === 'quote' && 'Request Atelier Quote'}
							{activeModal === 'saved' && 'Design Saved to Vault'}
							{activeModal === 'consultation' && 'Book Private Consultation'}
							{activeModal === 'track' && 'Track Existing Jewellery'}
							{activeModal === 'shop' && 'Explore Jewellery Collections'}
							{activeModal === 'create' && 'Bespoke Custom Commission'}
							{activeModal === 'repair' && 'Heirloom Care & Restoration'}
						</h3>
						<p className="text-xs text-neutral-300 font-light leading-relaxed">
							{activeModal === 'bespoke' &&
								`Your idea and custom specifications have been received by Vishwakarma Master Karigars. When your ideology meets our master craftsmanship, a 1-of-1 heirloom is born. Our CAD specialist will reach out within 24 hours with an initial render and metallurgical feasibility breakdown.`}
							{activeModal === 'quote' &&
								`Your customized configuration (${configuration.metal.purity} ${configuration.metal.tone}, ~${configuration.approxWeight}g, ${configuration.stone.type}) has been logged. Our master jeweler will review CAD feasibility and connect with you.`}
							{activeModal === 'saved' &&
								`Design VK-CFG-2041 has been securely saved to your Vishwakarma Vault account.`}
							{activeModal === 'consultation' &&
								`Select your preferred date & specialist for an online 4K video consultation or in-person flagship visit.`}
							{activeModal === 'track' &&
								`Enter your Passport ID or Order Serial to track the real-time custody and milestone trace of your ornament.`}
							{activeModal === 'shop' &&
								`Opening the curated Vishwakarma catalog with over 500 handcrafted BIS Hallmarked designs.`}
							{activeModal === 'create' &&
								`Upload your hand-drawn sketch or reference photo to start a 1-of-1 bespoke commission with our CAD atelier.`}
							{activeModal === 'repair' &&
								`Schedule a secure insured pick-up or atelier drop-off for chain repair, resizing, or gemstone resetting.`}
						</p>
						<button
							onClick={() => setActiveModal(null)}
							className="w-full rounded-xl bg-gradient-to-r from-[#fae19c] to-[#d4af37] py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105"
						>
							Proceed
						</button>
					</div>
				</div>
			)}
		</section>
	);
}
