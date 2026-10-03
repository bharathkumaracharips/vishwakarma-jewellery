'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Eye, EyeOff } from 'lucide-react';
import { CircularImageGallery } from '@/components/ui/carousel-circular-image-gallery';
import { AIGradientBorder } from '@/components/ui/ai-gradient-border';

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
	const [mode, setMode] = useState<'signin' | 'signup'>('signin');
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [fullName, setFullName] = useState('');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Close on Escape key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		if (isOpen) {
			window.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		};
	}, [isOpen, onClose]);

	if (!isOpen || !mounted || typeof window === 'undefined') return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert(`${mode === 'signin' ? 'Signed in' : 'Account created'} successfully!`);
		onClose();
	};

	return createPortal(
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
			{/* Backdrop Overlay */}
			<div
				className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
				onClick={onClose}
			/>

			{/* Modal Container with AI Glowing Animated Gradient Border */}
			<div className="relative w-full max-w-[960px] my-auto">
				{/* Dedicated Clean Close Button (Floated outside to never overlap the card/image) */}
				<button
					onClick={onClose}
					className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-50 flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/20 bg-[#12131a] text-neutral-300 shadow-[0_6px_25px_rgba(0,0,0,0.8)] transition-all hover:scale-105 hover:border-[#fae19c]/60 hover:text-white cursor-pointer"
					aria-label="Close modal"
				>
					<X className="size-4" />
				</button>

				<AIGradientBorder
					duration={3.5}
					className="w-full rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] animate-in fade-in-50 zoom-in-95 duration-200"
				>
					<div className="relative w-full rounded-3xl bg-[#0c0d12] overflow-hidden">
						<div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
							{/* ---------------- LEFT COLUMN: FORM ---------------- */}
							<div className="md:col-span-7 flex flex-col justify-between p-6 sm:p-9 lg:p-11">
								<div>
									{/* Vishwakarma Jewellers Luxury Monogram Brand Header */}
									<div className="mb-6 flex items-center justify-between">
										<div className="flex flex-col">
											<div className="flex items-center gap-2">
												<span className="font-serif text-lg sm:text-xl font-bold tracking-[0.24em] uppercase text-white">
													Vishwakarma
												</span>
												<span className="rounded-full border border-[#fae19c]/35 bg-[#fae19c]/10 px-2 py-0.5 text-[9px] font-semibold tracking-[0.2em] uppercase text-[#fae19c]">
													Atelier
												</span>
											</div>
											<p className="text-[10px] font-medium tracking-[0.32em] uppercase text-neutral-400 mt-1">
												Jewellers • Estd 1984
											</p>
										</div>
									</div>

									{/* Title */}
									<h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-white">
										{mode === 'signin' ? 'Welcome back' : 'Create an Account'}
									</h2>

									{/* Subtitle */}
									<p className="mt-2.5 text-xs sm:text-[13px] text-neutral-400 font-light leading-relaxed max-w-md">
										{mode === 'signin'
											? 'Sign in to access your certified hallmark passports, bespoke atelier commissions, and private concierge.'
											: 'Join the Vishwakarma Guild to curate your heirloom vault, request 3D CAD commissions, and book master specialists.'}
									</p>

									{/* Form */}
									<form onSubmit={handleSubmit} className="mt-7 space-y-4">
										{mode === 'signup' && (
											<div>
												<label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-300 mb-1.5">
													Full Name
												</label>
												<input
													type="text"
													required
													value={fullName}
													onChange={(e) => setFullName(e.target.value)}
													placeholder="Your full name"
													className="w-full rounded-xl border border-neutral-800 bg-[#16171c] px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-all focus:border-[#fae19c]/60 focus:ring-1 focus:ring-[#fae19c]/20"
												/>
											</div>
										)}

										<div>
											<label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-300 mb-1.5">
												Email Address
											</label>
											<input
												type="email"
												required
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="youremail@yourdomain.com"
												className="w-full rounded-xl border border-neutral-800 bg-[#16171c] px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-all focus:border-[#fae19c]/60 focus:ring-1 focus:ring-[#fae19c]/20"
											/>
										</div>

										<div>
											<div className="flex items-center justify-between mb-1.5">
												<label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-300">
													Password
												</label>
												{mode === 'signin' && (
													<button
														type="button"
														onClick={() => alert('Password reset link sent to your email.')}
														className="text-xs text-[#fae19c] hover:underline transition-colors cursor-pointer"
													>
														Forgot?
													</button>
												)}
											</div>
											<div className="relative">
												<input
													type={showPassword ? 'text' : 'password'}
													required
													value={password}
													onChange={(e) => setPassword(e.target.value)}
													placeholder="Enter your password"
													className="w-full rounded-xl border border-neutral-800 bg-[#16171c] px-4 py-3 pr-10 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-all focus:border-[#fae19c]/60 focus:ring-1 focus:ring-[#fae19c]/20"
												/>
												<button
													type="button"
													onClick={() => setShowPassword(!showPassword)}
													className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
													aria-label={showPassword ? 'Hide password' : 'Show password'}
												>
													{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
												</button>
											</div>
										</div>

										{/* Primary Action Button */}
										<button
											type="submit"
											className="mt-2 w-full rounded-xl bg-[#23242c] hover:bg-[#2d2e38] border border-white/10 hover:border-[#fae19c]/50 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-200 shadow-md cursor-pointer hover:shadow-[0_4px_20px_rgba(250,225,156,0.12)]"
										>
											{mode === 'signin' ? 'Sign in' : 'Create Account'}
										</button>
									</form>

							{/* "or" Divider */}
							<div className="relative my-7 flex items-center justify-center">
								<div className="w-full border-t border-neutral-800/80" />
								<span className="absolute bg-[#0d0d10] px-3 text-xs text-neutral-500 font-normal">
									or
								</span>
							</div>

							{/* Social Sign-in Buttons */}
							<div className="grid grid-cols-3 gap-3">
								{/* Google */}
								<button
									type="button"
									onClick={() => alert('Google authentication')}
									className="flex h-12 items-center justify-center rounded-xl border border-neutral-800 bg-[#1c1c1f] transition-all hover:border-neutral-700 hover:bg-[#252529] cursor-pointer"
									title="Sign in with Google"
								>
									<svg className="size-5" viewBox="0 0 24 24">
										<path
											fill="#4285F4"
											d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
										/>
										<path
											fill="#34A853"
											d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.41 7.34 24 12 24z"
										/>
										<path
											fill="#FBBC05"
											d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
										/>
										<path
											fill="#EA4335"
											d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.59 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
										/>
									</svg>
								</button>

								{/* Facebook */}
								<button
									type="button"
									onClick={() => alert('Facebook authentication')}
									className="flex h-12 items-center justify-center rounded-xl border border-neutral-800 bg-[#1c1c1f] transition-all hover:border-neutral-700 hover:bg-[#252529] cursor-pointer"
									title="Sign in with Facebook"
								>
									<svg className="size-5" viewBox="0 0 24 24">
										<path
											fill="#1877F2"
											d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
										/>
										<path
											fill="#ffffff"
											d="M16.364 15.543l.532-3.47h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.534V4.996s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.673H7.078v3.47h3.047v8.385a12.09 12.09 0 003.582 0v-8.385h2.657z"
										/>
									</svg>
								</button>

								{/* Apple */}
								<button
									type="button"
									onClick={() => alert('Apple authentication')}
									className="flex h-12 items-center justify-center rounded-xl border border-neutral-800 bg-[#1c1c1f] transition-all hover:border-neutral-700 hover:bg-[#252529] cursor-pointer"
									title="Sign in with Apple"
								>
									<svg className="size-5 fill-white" viewBox="0 0 24 24">
										<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.65-2.8 1.45-.59.69-1.12 1.84-1 2.96 1.07.08 2.16-.49 2.81-1.31z" />
									</svg>
								</button>
							</div>
						</div>

						{/* Bottom Switch Link */}
						<div className="mt-8 text-center text-xs text-neutral-400">
							{mode === 'signin' ? (
								<>
									Already have an account?{' '}
									<button
										type="button"
										onClick={() => setMode('signup')}
										className="font-medium text-[#ea9428] hover:underline cursor-pointer"
									>
										Sign up
									</button>
								</>
							) : (
								<>
									Already have an account?{' '}
									<button
										type="button"
										onClick={() => setMode('signin')}
										className="font-medium text-[#ea9428] hover:underline cursor-pointer"
									>
										Sign in
									</button>
								</>
							)}
						</div>
					</div>

					{/* ---------------- RIGHT COLUMN: CIRCULAR CAROUSEL IMAGE GALLERY ---------------- */}
					<div className="hidden md:flex md:col-span-5 relative p-4">
						<CircularImageGallery />
					</div>
				</div>
				</div>
			</AIGradientBorder>
			</div>
		</div>,
		document.body
	);
}
