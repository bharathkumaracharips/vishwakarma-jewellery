'use client';

import React, { useState } from 'react';
import { HelpCircle, X, Check, ArrowRight, Upload, Sparkles, AlertCircle } from 'lucide-react';
import { SERVICES_LIST, ServiceItem } from './servicesData';

interface DiagnosticWizardModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSelectRecommendedService: (service: ServiceItem, notes: string) => void;
}

export function DiagnosticWizardModal({
	isOpen,
	onClose,
	onSelectRecommendedService,
}: DiagnosticWizardModalProps) {
	const [selectedType, setSelectedType] = useState<string>('ring');
	const [selectedSymptom, setSelectedSymptom] = useState<string>('loose-stone');
	const [description, setDescription] = useState<string>('');
	const [fileName, setFileName] = useState<string | null>(null);

	if (!isOpen) return null;

	const JEWELLERY_TYPES = [
		{ id: 'ring', label: 'Ring / Solitaire' },
		{ id: 'chain', label: 'Chain / Mangalsutra' },
		{ id: 'necklace', label: 'Necklace / Haram' },
		{ id: 'bangle', label: 'Bangle / Kada' },
		{ id: 'bracelet', label: 'Bracelet' },
		{ id: 'earring', label: 'Earring / Jhumka' },
		{ id: 'other', label: 'Heirloom / Other' },
	];

	const SYMPTOMS = [
		{ id: 'loose-stone', label: 'Stone is rattling or has fallen out' },
		{ id: 'broken-metal', label: 'Metal has snapped, cracked, or fractured' },
		{ id: 'clasp-broken', label: 'Clasp / lock doesn’t click or keeps opening' },
		{ id: 'sizing-issue', label: 'Too tight / loose / doesn’t fit over knuckle' },
		{ id: 'dull-tarnished', label: 'Lost shine / tarnished / black oxidation' },
		{ id: 'crushed-impact', label: 'Accidentally crushed or bent out of shape' },
	];

	// Determine recommended service based on symptom
	const getRecommendedService = (): ServiceItem => {
		switch (selectedSymptom) {
			case 'loose-stone':
				return SERVICES_LIST.find((s) => s.id === 'loose-stone-repair') || SERVICES_LIST[0];
			case 'broken-metal':
				if (selectedType === 'chain') return SERVICES_LIST.find((s) => s.id === 'chain-repair') || SERVICES_LIST[0];
				if (selectedType === 'bangle') return SERVICES_LIST.find((s) => s.id === 'bangle-repair') || SERVICES_LIST[0];
				if (selectedType === 'necklace') return SERVICES_LIST.find((s) => s.id === 'necklace-repair') || SERVICES_LIST[0];
				return SERVICES_LIST.find((s) => s.id === 'ring-repair') || SERVICES_LIST[0];
			case 'clasp-broken':
				if (selectedType === 'chain') return SERVICES_LIST.find((s) => s.id === 'chain-repair') || SERVICES_LIST[0];
				return SERVICES_LIST.find((s) => s.id === 'bracelet-repair') || SERVICES_LIST[0];
			case 'sizing-issue':
				if (selectedType === 'bangle') return SERVICES_LIST.find((s) => s.id === 'bangle-size-adjustment') || SERVICES_LIST[0];
				return SERVICES_LIST.find((s) => s.id === 'ring-resizing') || SERVICES_LIST[0];
			case 'dull-tarnished':
				return SERVICES_LIST.find((s) => s.id === 'polishing') || SERVICES_LIST[0];
			case 'crushed-impact':
				return SERVICES_LIST.find((s) => s.id === 'damage-assessment') || SERVICES_LIST[0];
			default:
				return SERVICES_LIST.find((s) => s.id === 'diagnostic-intake') || SERVICES_LIST[0];
		}
	};

	const recommended = getRecommendedService();

	const handleProceed = () => {
		const combinedNotes = `[Diagnostic Triage] Item: ${selectedType.toUpperCase()}, Symptom: ${selectedSymptom}${description ? ` | Notes: ${description}` : ''}${fileName ? ` | File: ${fileName}` : ''}`;
		onSelectRecommendedService(recommended, combinedNotes);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
			<div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0d0e14] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
				>
					<X className="size-5" />
				</button>

				{/* Header */}
				<div className="space-y-1.5 mb-6 text-left">
					<div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fae19c]">
						<HelpCircle className="size-3.5" />
						<span>Atelier Bench Triage</span>
					</div>
					<h2 className="font-serif text-2xl font-bold text-white">
						Tell Us What Feels Wrong
					</h2>
					<p className="text-xs text-neutral-400 font-light leading-relaxed">
						You don’t need technical terminology. Answer 2 simple questions and our diagnostic system will match the exact goldsmith protocol.
					</p>
				</div>

				<div className="space-y-6 text-left">
					{/* 1. Select Jewellery Type */}
					<div className="space-y-2">
						<label className="text-[11px] font-mono uppercase tracking-wider text-neutral-300">
							1. What type of jewellery is it?
						</label>
						<div className="flex flex-wrap gap-2">
							{JEWELLERY_TYPES.map((type) => (
								<button
									key={type.id}
									onClick={() => setSelectedType(type.id)}
									className={`rounded-xl px-3.5 py-2 text-xs transition-all cursor-pointer ${
										selectedType === type.id
											? 'border border-[#fae19c] bg-[#fae19c]/15 text-[#fae19c] font-semibold'
											: 'border border-white/10 bg-white/[0.02] text-neutral-400 hover:text-neutral-200'
									}`}
								>
									{type.label}
								</button>
							))}
						</div>
					</div>

					{/* 2. Select Symptom */}
					<div className="space-y-2">
						<label className="text-[11px] font-mono uppercase tracking-wider text-neutral-300">
							2. What issue are you experiencing?
						</label>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							{SYMPTOMS.map((symptom) => (
								<button
									key={symptom.id}
									onClick={() => setSelectedSymptom(symptom.id)}
									className={`flex items-center justify-between rounded-xl border p-3 text-xs text-left transition-all cursor-pointer ${
										selectedSymptom === symptom.id
											? 'border-[#fae19c] bg-[#fae19c]/15 text-[#fae19c] font-semibold'
											: 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-neutral-200 hover:border-white/20'
									}`}
								>
									<span>{symptom.label}</span>
									{selectedSymptom === symptom.id && <Check className="size-4 shrink-0" />}
								</button>
							))}
						</div>
					</div>

					{/* Optional Photo Drop */}
					<div className="space-y-2">
						<label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
							3. Optional: Upload photo or video of damage
						</label>
						<label className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-4 text-center cursor-pointer hover:border-[#fae19c]/50 transition-colors">
							<Upload className="size-5 text-neutral-400 mb-1" />
							<span className="text-xs text-neutral-300">
								{fileName || 'Drop image / video or click to browse'}
							</span>
							<span className="text-[10px] text-neutral-500 mt-0.5">
								PNG, JPG, MP4 up to 50MB
							</span>
							<input
								type="file"
								className="hidden"
								onChange={(e) => {
									if (e.target.files && e.target.files[0]) {
										setFileName(e.target.files[0].name);
									}
								}}
							/>
						</label>
					</div>

					{/* Recommendation Box */}
					<div className="rounded-2xl border border-[#fae19c]/30 bg-[#fae19c]/5 p-4.5 space-y-2">
						<div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#fae19c]">
							<Sparkles className="size-3" />
							<span>Recommended Bench Protocol:</span>
						</div>
						<div className="flex items-center justify-between">
							<h3 className="font-serif text-base font-bold text-white">
								{recommended.name}
							</h3>
							<span className="text-xs font-mono text-[#fae19c]">
								{recommended.startingPrice === 0 ? 'Complimentary' : `Starting at ₹${recommended.startingPrice.toLocaleString('en-IN')}`}
							</span>
						</div>
						<p className="text-[11.5px] text-neutral-300 font-light">
							{recommended.tagline}
						</p>
					</div>

					{/* Proceed Button */}
					<button
						onClick={handleProceed}
						className="w-full rounded-2xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] py-3.5 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
					>
						<span>Proceed to Book This Service</span>
						<ArrowRight className="size-4" />
					</button>
				</div>
			</div>
		</div>
	);
}
