'use client';

import React, { useState, useRef } from 'react';
import {
	Sparkles,
	Mic,
	Video,
	Image as ImageIcon,
	Link2,
	Type,
	Check,
	Upload,
	ArrowRight,
	Play,
	Square,
	RefreshCw,
	Share2,
	ShieldCheck,
	SlidersHorizontal,
} from 'lucide-react';
import { JewellerySpecConfigurator, JewellerySpecs } from './JewellerySpecConfigurator';
import { PriceBreakdown } from './pricingEngine';

interface AiIdeologyStudioProps {
	onCompleteSubmission?: (data: any) => void;
}

export function AiIdeologyStudio({ onCompleteSubmission }: AiIdeologyStudioProps) {
	// Mode Tabs: text, audio, video, image, links
	const [activeTab, setActiveTab] = useState<'text' | 'audio' | 'video' | 'image' | 'links'>('text');

	// Inputs
	const [selectedCategory, setSelectedCategory] = useState<string>('rings');
	const [promptText, setPromptText] = useState<string>('');
	const [socialLinks, setSocialLinks] = useState<string>('');
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);
	const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);

	// Audio Recording State
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [audioDuration, setAudioDuration] = useState<number>(0);
	const [hasRecordedAudio, setHasRecordedAudio] = useState<boolean>(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	// AI Analysis & Unlocking
	const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
	const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
	const [aiDetectedNotes, setAiDetectedNotes] = useState<string | null>(null);

	// Configured Specs from JewellerySpecConfigurator
	const [configuredSpecs, setConfiguredSpecs] = useState<JewellerySpecs | null>(null);
	const [configuredPrice, setConfiguredPrice] = useState<PriceBreakdown | null>(null);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	// Recording mock timer
	const startRecording = () => {
		setIsRecording(true);
		setAudioDuration(0);
		timerRef.current = setInterval(() => {
			setAudioDuration((prev) => prev + 1);
		}, 1000);
	};

	const stopRecording = () => {
		setIsRecording(false);
		if (timerRef.current) clearInterval(timerRef.current);
		setHasRecordedAudio(true);
	};

	// Mock file upload handlers
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const files = Array.from(e.target.files);
			const newPreviews = files.map((file) => URL.createObjectURL(file));
			setUploadedImages((prev) => [...prev, ...newPreviews]);
		}
	};

	const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setUploadedVideo(e.target.files[0].name);
		}
	};

	// Analyze Ideology Simulation
	const handleAnalyzeIdeology = () => {
		setIsAnalyzing(true);
		setTimeout(() => {
			setIsAnalyzing(false);
			setAnalysisComplete(true);

			let detected = 'Design Ideology: Balanced symmetry with fine organic curvature.';
			if (selectedCategory === 'rings') {
				detected = 'AI Detected: Elevated solitaire crown with hand-burnished knife-edge shank. Recommend 18K Rose/White Gold or 22K Traditional.';
			} else if (selectedCategory === 'chains') {
				detected = 'AI Detected: High-tensile solid rope weave with integrated concealed locking mechanism. Recommend 22K 916 Bullion.';
			} else if (selectedCategory === 'necklaces') {
				detected = 'AI Detected: Grand temple heirloom choker with cascade floral drops and prong-set gemstones.';
			}
			setAiDetectedNotes(detected);
		}, 1200);
	};

	const handleFinalSubmit = () => {
		setIsSubmitted(true);
		onCompleteSubmission?.({
			category: selectedCategory,
			promptText,
			hasAudio: hasRecordedAudio,
			uploadedVideo,
			uploadedImagesCount: uploadedImages.length,
			socialLinks,
			configuredSpecs,
			configuredPrice,
		});
	};

	const promptSuggestions = [
		'Art-deco solitaire ring with knife-edge band and hidden diamond halo',
		'Vedic rope chain in 22K pure gold with hand-braided links and barrel clasp',
		'Heritage peacock temple necklace with Colombian emerald teardrop drops',
		'Modern architectural geometric bangles with satin matte brushed finish',
	];

	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			{/* Studio Introduction Card */}
			<div className="rounded-3xl border border-white/10 bg-[#0c0d14]/95 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
				<div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#fae19c]/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

				<div className="space-y-2 relative z-10">
					<div className="flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.24em] text-[#fae19c]">
						<Sparkles className="size-3.5" />
						<span>Atelier Ideology Studio &bull; Multi-Modal Input</span>
					</div>
					<h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
						Tell Us Your Vision in Any Format
					</h2>
					<p className="text-xs sm:text-sm text-neutral-300 font-light max-w-3xl leading-relaxed">
						When ideology meets craftsmanship, it becomes an unmatched legacy. Share your thoughts via text description, spoken voice note, video, reference images, or social media links from Instagram and Pinterest.
					</p>
				</div>

				{/* Category Picker Bar */}
				<div className="mt-6 pt-5 border-t border-white/[0.08] space-y-2">
					<label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
						Select Ornament Category:
					</label>
					<div className="flex items-center gap-2 flex-wrap">
						{[
							{ id: 'rings', label: 'Rings' },
							{ id: 'chains', label: 'Chains' },
							{ id: 'necklaces', label: 'Necklaces' },
							{ id: 'bangles', label: 'Bangles' },
							{ id: 'earrings', label: 'Earrings' },
							{ id: 'mangalsutra', label: 'Mangalsutra' },
							{ id: 'pendants', label: 'Pendants' },
						].map((cat) => (
							<button
								key={cat.id}
								type="button"
								onClick={() => {
									setSelectedCategory(cat.id);
									setAnalysisComplete(false);
								}}
								className={`rounded-xl px-3.5 py-1.5 text-xs font-mono transition-all cursor-pointer ${
									selectedCategory === cat.id
										? 'bg-gradient-to-r from-[#fae19c] to-[#d4af37] text-black font-bold shadow-md'
										: 'border border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:border-white/25'
								}`}
							>
								{cat.label}
							</button>
						))}
					</div>
				</div>

				{/* Multi-Modal Tab Navigation */}
				<div className="mt-6 border-b border-white/10 flex items-center gap-2 overflow-x-auto pb-1">
					{[
						{ id: 'text', label: '1. Text Prompt', icon: <Type className="size-3.5" /> },
						{ id: 'audio', label: '2. Voice Note', icon: <Mic className="size-3.5" /> },
						{ id: 'video', label: '3. Video Upload', icon: <Video className="size-3.5" /> },
						{ id: 'image', label: '4. Image / Sketches', icon: <ImageIcon className="size-3.5" /> },
						{ id: 'links', label: '5. Social Links', icon: <Link2 className="size-3.5" /> },
					].map((tab) => {
						const isActive = activeTab === tab.id;
						return (
							<button
								key={tab.id}
								type="button"
								onClick={() => setActiveTab(tab.id as any)}
								className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-wide transition-all border-b-2 -mb-[1px] whitespace-nowrap cursor-pointer ${
									isActive
										? 'border-[#fae19c] text-white font-semibold bg-white/[0.04]'
										: 'border-transparent text-neutral-400 hover:text-neutral-200'
								}`}
							>
								{tab.icon}
								<span>{tab.label}</span>
							</button>
						);
					})}
				</div>

				{/* TAB 1: TEXT PROMPT */}
				{activeTab === 'text' && (
					<div className="mt-5 space-y-4">
						<textarea
							rows={4}
							value={promptText}
							onChange={(e) => setPromptText(e.target.value)}
							placeholder="Describe your bespoke jewel... (e.g. Modern knife-edge band with a four-prong crowned diamond basket and lotus petal engraving on the inner shank...)"
							className="w-full rounded-2xl border border-white/15 bg-[#141520] p-4 text-sm text-neutral-200 placeholder:text-neutral-500 outline-none focus:border-[#fae19c] transition-colors resize-none shadow-inner"
						/>

						{/* Quick Suggestions */}
						<div className="space-y-1.5">
							<span className="text-[10.5px] font-mono text-neutral-400 uppercase tracking-wider block">
								Or click a sample prompt to try:
							</span>
							<div className="flex flex-wrap gap-2">
								{promptSuggestions.map((sug, idx) => (
									<button
										key={idx}
										type="button"
										onClick={() => setPromptText(sug)}
										className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-neutral-300 hover:text-[#fae19c] hover:border-[#fae19c]/40 transition-colors text-left"
									>
										&ldquo;{sug}&rdquo;
									</button>
								))}
							</div>
						</div>
					</div>
				)}

				{/* TAB 2: AUDIO NOTE */}
				{activeTab === 'audio' && (
					<div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-6 text-center space-y-4">
						<div className="size-16 rounded-full mx-auto flex items-center justify-center bg-white/5 border border-white/15">
							<Mic className={`size-8 ${isRecording ? 'text-red-400 animate-pulse' : 'text-[#fae19c]'}`} />
						</div>

						<div className="space-y-1">
							<h4 className="font-serif text-lg text-white">Record Audio Voice Note</h4>
							<p className="text-xs text-neutral-400 font-light max-w-md mx-auto">
								Explain your heirloom thoughts in English, Kannada, Hindi, or Telugu. Our master karigars listen directly to your voice note.
							</p>
						</div>

						{isRecording ? (
							<div className="space-y-3">
								<div className="flex items-center justify-center gap-2 text-sm font-mono text-red-400">
									<span className="size-2.5 rounded-full bg-red-500 animate-ping" />
									<span>Recording: 00:{audioDuration < 10 ? `0${audioDuration}` : audioDuration}</span>
								</div>
								<button
									type="button"
									onClick={stopRecording}
									className="rounded-full bg-red-500 hover:bg-red-600 px-6 py-2.5 text-xs font-semibold text-white cursor-pointer shadow-lg inline-flex items-center gap-2"
								>
									<Square className="size-3.5 fill-white" />
									<span>Stop Recording</span>
								</button>
							</div>
						) : hasRecordedAudio ? (
							<div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 max-w-sm mx-auto flex items-center justify-between text-xs text-emerald-400">
								<div className="flex items-center gap-2 font-mono">
									<Check className="size-4" />
									<span>Voice note captured (00:{audioDuration < 10 ? `0${audioDuration}` : audioDuration})</span>
								</div>
								<button
									type="button"
									onClick={startRecording}
									className="text-[11px] underline text-neutral-300 hover:text-white"
								>
									Re-record
								</button>
							</div>
						) : (
							<button
								type="button"
								onClick={startRecording}
								className="rounded-full bg-gradient-to-r from-[#fae19c] to-[#d4af37] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black cursor-pointer shadow-md inline-flex items-center gap-2 hover:brightness-105"
							>
								<Play className="size-3.5 fill-black" />
								<span>Start Voice Recording</span>
							</button>
						)}
					</div>
				)}

				{/* TAB 3: VIDEO UPLOAD */}
				{activeTab === 'video' && (
					<div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-6 text-center space-y-4">
						<div className="size-16 rounded-full mx-auto flex items-center justify-center bg-white/5 border border-white/15">
							<Video className="size-8 text-[#fae19c]" />
						</div>

						<div className="space-y-1">
							<h4 className="font-serif text-lg text-white">Upload Reference Video</h4>
							<p className="text-xs text-neutral-400 font-light max-w-md mx-auto">
								Upload a short 360-degree video of an existing ornament, gemstone luminescence under light, or hand movement.
							</p>
						</div>

						{uploadedVideo ? (
							<div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 max-w-sm mx-auto flex items-center justify-between text-xs text-emerald-400">
								<div className="flex items-center gap-2 font-mono">
									<Check className="size-4" />
									<span className="truncate">{uploadedVideo}</span>
								</div>
								<button
									type="button"
									onClick={() => setUploadedVideo(null)}
									className="text-[11px] underline text-neutral-300 hover:text-white"
								>
									Remove
								</button>
							</div>
						) : (
							<label className="rounded-full bg-white/10 hover:bg-white/15 border border-white/20 px-6 py-2.5 text-xs font-semibold text-white cursor-pointer shadow-md inline-flex items-center gap-2 transition-colors">
								<Upload className="size-3.5" />
								<span>Select Video File (.mp4, .mov)</span>
								<input
									type="file"
									accept="video/*"
									className="hidden"
									onChange={handleVideoUpload}
								/>
							</label>
						)}
					</div>
				)}

				{/* TAB 4: IMAGE / SKETCH DIRECT UPLOAD */}
				{activeTab === 'image' && (
					<div className="mt-5 space-y-4">
						<label className="border-2 border-dashed border-white/20 hover:border-[#fae19c]/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-white/[0.01]">
							<Upload className="size-8 text-[#fae19c] mb-2" />
							<span className="text-xs font-semibold text-white">
								Drop sketches, photos, or CAD renders here
							</span>
							<span className="text-[11px] text-neutral-400 font-light mt-1">
								Supports JPG, PNG, WEBP, HEIC up to 25MB
							</span>
							<input
								type="file"
								multiple
								accept="image/*"
								className="hidden"
								onChange={handleImageUpload}
							/>
						</label>

						{/* Previews Grid */}
						{uploadedImages.length > 0 && (
							<div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-2">
								{uploadedImages.map((src, i) => (
									<div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/15 bg-black">
										<img src={src} alt="Uploaded reference" className="size-full object-cover" />
										<button
											type="button"
											onClick={() => setUploadedImages((prev) => prev.filter((_, idx) => idx !== i))}
											className="absolute top-1 right-1 rounded-full bg-black/80 text-white p-1 text-[9px] hover:bg-red-600"
										>
											&times;
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{/* TAB 5: SOCIAL MEDIA REFERENCE LINKS */}
				{activeTab === 'links' && (
					<div className="mt-5 space-y-3">
						<label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
							Paste Social Media Reference Links (Instagram, Pinterest, Facebook, Behance):
						</label>
						<div className="relative">
							<input
								type="url"
								value={socialLinks}
								onChange={(e) => setSocialLinks(e.target.value)}
								placeholder="https://www.instagram.com/p/... or https://pin.it/..."
								className="w-full rounded-2xl border border-white/15 bg-[#141520] p-4 pr-10 text-sm text-neutral-200 placeholder:text-neutral-500 outline-none focus:border-[#fae19c] transition-colors"
							/>
							<Link2 className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
						</div>
						<p className="text-[11px] text-neutral-400 font-light">
							Our atelier scraper inspects the geometry, shank thickness, and stone count from the public post automatically.
						</p>
					</div>
				)}

				{/* Primary Analysis Trigger Button */}
				<div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="text-xs text-neutral-400 font-light">
						Step 1: Provide reference &rarr; Step 2: Configure Metals, Stones, Weights & Live Bullion Price.
					</div>

					<button
						type="button"
						onClick={handleAnalyzeIdeology}
						disabled={isAnalyzing}
						className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105 shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-50"
					>
						{isAnalyzing ? (
							<>
								<RefreshCw className="size-4 animate-spin text-black" />
								<span>AI Atelier Scanning Geometry...</span>
							</>
						) : (
							<>
								<Sparkles className="size-4 text-black" />
								<span>Analyze & Unlock Metallurgy Settings</span>
							</>
						)}
					</button>
				</div>
			</div>

			{/* ================= STEP 2: METALLURGY, STONES & WEIGHT CONFIGURATOR ================= */}
			{analysisComplete && (
				<div className="space-y-6 animate-in fade-in-50 zoom-in-98 duration-300">
					{/* AI Detected Insight Banner */}
					{aiDetectedNotes && (
						<div className="rounded-2xl border border-[#fae19c]/40 bg-[#fae19c]/10 p-4 flex items-start gap-3 text-xs text-neutral-200">
							<Sparkles className="size-4 text-[#fae19c] shrink-0 mt-0.5" />
							<div>
								<span className="font-semibold text-[#fae19c] block font-mono text-[11px] uppercase tracking-wider">
									AI Karigar Synthesis:
								</span>
								<p className="font-light mt-0.5 leading-relaxed">{aiDetectedNotes}</p>
							</div>
						</div>
					)}

					{/* Reusable Standalone Configurator Component */}
					<JewellerySpecConfigurator
						category={selectedCategory}
						initialMetalId={selectedCategory === 'chains' ? '22k-yellow' : '18k-rose'}
						onChange={(specs, price) => {
							setConfiguredSpecs(specs);
							setConfiguredPrice(price);
						}}
						showLiveBreakdown={true}
						title={`Customize Metallurgy, Stones & Weights for Your Custom ${selectedCategory.toUpperCase()}`}
					/>

					{/* Final Bespoke Submission Block */}
					<div className="rounded-3xl border border-[#fae19c]/30 bg-gradient-to-r from-[#12131e] via-[#0d0e14] to-[#12131e] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
						<div className="space-y-1.5 text-left max-w-xl">
							<div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#fae19c]">
								<ShieldCheck className="size-4" />
								<span>24-Hour CAD Feasibility Guarantee</span>
							</div>
							<h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
								Submit Bespoke Ideology to Master Karigar
							</h3>
							<p className="text-xs text-neutral-300 font-light leading-relaxed">
								Our chief goldsmith will generate 4K photorealistic 3D CAD renders and confirm structural feasibility against BIS 916 hallmarks.
							</p>
						</div>

						{isSubmitted ? (
							<div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-4 text-center text-emerald-400 space-y-1 font-mono text-xs">
								<Check className="size-6 mx-auto" />
								<p className="font-bold">Bespoke Inquiry Logged!</p>
								<p className="text-[10.5px] text-neutral-300">
									Concierge reference: VK-BESPOKE-{Math.floor(1000 + Math.random() * 9000)}
								</p>
							</div>
						) : (
							<button
								type="button"
								onClick={handleFinalSubmit}
								className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#fae19c] via-[#e5c378] to-[#d4af37] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black hover:brightness-105 shadow-xl cursor-pointer flex items-center justify-center gap-2 shrink-0"
							>
								<span>Request CAD & Lock Price</span>
								<ArrowRight className="size-4 text-black" />
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
