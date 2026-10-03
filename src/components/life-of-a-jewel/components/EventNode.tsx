'use client';

import React from 'react';
import { JourneyMilestone } from '../types';
import { CheckCircle2, ShieldCheck, Scale, Clock, User, X } from 'lucide-react';

interface EventNodeProps {
	milestone: JourneyMilestone;
	onClick: () => void;
	isActive?: boolean;
}

export function EventNode({ milestone, onClick, isActive = false }: EventNodeProps) {
	const isCompleted = milestone.status === 'completed';
	const isCurrent = milestone.status === 'active';

	return (
		<div
			onClick={onClick}
			className={`group relative flex items-start gap-4 rounded-xl border p-4 transition-all cursor-pointer ${
				isCurrent
					? 'border-[#fae19c]/60 bg-[#fae19c]/[0.06] shadow-[0_0_25px_rgba(250,225,156,0.15)]'
					: isCompleted
					? 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
					: 'border-white/5 bg-transparent opacity-45'
			}`}
		>
			{/* Node Icon Indicator */}
			<div className="relative mt-0.5 flex size-6 shrink-0 items-center justify-center">
				{isCompleted ? (
					<div className="flex size-5 items-center justify-center rounded-full bg-[#fae19c] text-black">
						<CheckCircle2 className="size-3.5 stroke-[2.5]" />
					</div>
				) : isCurrent ? (
					<div className="relative flex size-5 items-center justify-center">
						<span className="absolute size-full animate-ping rounded-full bg-[#fae19c] opacity-75" />
						<span className="size-3.5 rounded-full bg-[#fae19c]" />
					</div>
				) : (
					<div className="size-3 rounded-full border border-neutral-600 bg-neutral-900" />
				)}
			</div>

			{/* Milestone Details */}
			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between gap-2">
					<h4 className="text-xs sm:text-sm font-semibold text-white truncate">
						{milestone.title}
					</h4>
					{milestone.isVerified && (
						<span className="inline-flex items-center gap-1 rounded border border-[#fae19c]/30 bg-[#fae19c]/10 px-1.5 py-0.5 text-[9px] font-mono text-[#fae19c]">
							<ShieldCheck className="size-2.5" />
							<span>Verified</span>
						</span>
					)}
				</div>

				<div className="flex items-center gap-3 text-[10px] text-neutral-400 mt-1 font-mono">
					<span className="flex items-center gap-1">
						<Clock className="size-2.5" />
						<span>{milestone.timestamp}</span>
					</span>
					<span className="flex items-center gap-1">
						<User className="size-2.5" />
						<span>{milestone.role}</span>
					</span>
				</div>

				<p className="mt-1.5 text-xs text-neutral-300 font-light line-clamp-2">
					{milestone.note}
				</p>

				{milestone.weightRecorded && (
					<div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] text-neutral-300 font-mono">
						<Scale className="size-2.5 text-[#fae19c]" />
						<span>Logged: {milestone.weightRecorded}</span>
					</div>
				)}
			</div>
		</div>
	);
}

interface MilestoneDrawerProps {
	milestone: JourneyMilestone | null;
	onClose: () => void;
}

export function MilestoneDrawer({ milestone, onClose }: MilestoneDrawerProps) {
	if (!milestone) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
				onClick={onClose}
			/>

			{/* Modal Dialog */}
			<div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/15 bg-[#0e0f17] p-6 shadow-2xl space-y-4 animate-in fade-in-50 zoom-in-95">
				<div className="flex items-start justify-between border-b border-white/10 pb-3">
					<div>
						<span className="text-[10px] font-mono uppercase tracking-widest text-[#fae19c]">
							Provenance Record • {milestone.id}
						</span>
						<h3 className="font-serif text-lg font-semibold text-white mt-0.5">
							{milestone.title}
						</h3>
					</div>
					<button
						onClick={onClose}
						className="size-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white"
					>
						<X className="size-4" />
					</button>
				</div>

				<div className="space-y-3 text-xs">
					<div className="grid grid-cols-2 gap-3">
						<div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
							<span className="text-neutral-500 block text-[10px] uppercase font-mono">
								Responsible Role
							</span>
							<span className="font-medium text-white">{milestone.role}</span>
						</div>
						<div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
							<span className="text-neutral-500 block text-[10px] uppercase font-mono">
								Timestamp Logged
							</span>
							<span className="font-medium text-white">{milestone.timestamp}</span>
						</div>
					</div>

					<div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
						<span className="text-neutral-500 block text-[10px] uppercase font-mono mb-1">
							Artisan Audit Note
						</span>
						<p className="text-neutral-200 leading-relaxed font-light">
							{milestone.note}
						</p>
					</div>

					{milestone.weightRecorded && (
						<div className="flex items-center justify-between rounded-xl border border-[#fae19c]/20 bg-[#fae19c]/[0.04] p-3">
							<span className="text-neutral-300 text-xs font-medium">Digital Scale Reading</span>
							<span className="font-mono text-sm font-bold text-[#fae19c]">
								{milestone.weightRecorded}
							</span>
						</div>
					)}

					{milestone.hash && (
						<div className="rounded-xl border border-white/5 bg-black/60 p-3 flex items-center justify-between">
							<span className="text-[10px] text-neutral-500 font-mono">
								Cryptographic Anchor
							</span>
							<span className="text-[11px] font-mono text-[#fae19c]">{milestone.hash}</span>
						</div>
					)}
				</div>

				<div className="pt-2">
					<button
						onClick={onClose}
						className="w-full rounded-xl bg-white/10 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/15"
					>
						Close Record
					</button>
				</div>
			</div>
		</div>
	);
}
