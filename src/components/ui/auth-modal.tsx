'use client';

import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

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

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert(`${mode === 'signin' ? 'Signed in' : 'Account created'} successfully!`);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
			{/* Backdrop Overlay */}
			<div
				className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
				onClick={onClose}
			/>

			{/* Modal Container */}
			<div className="relative z-10 w-full max-w-[960px] overflow-hidden rounded-3xl border border-neutral-800/80 bg-[#0d0d10] shadow-[0_25px_80px_rgba(0,0,0,0.95)] animate-in fade-in-50 zoom-in-95 duration-200">
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute right-5 top-5 z-30 flex size-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-400 transition-colors hover:border-neutral-700 hover:bg-neutral-800 hover:text-white cursor-pointer"
					aria-label="Close modal"
				>
					<X className="size-4" />
				</button>

				<div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
					{/* ---------------- LEFT COLUMN: FORM ---------------- */}
					<div className="md:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-12">
						<div>
							{/* Top Logo Glyph (Offset rounded squares) */}
							<div className="mb-6 flex flex-col gap-1 w-6 h-6">
								<div className="flex gap-1">
									<span className="w-2.5 h-2.5 rounded-[3px] bg-white"></span>
								</div>
								<div className="flex gap-1 ml-2">
									<span className="w-2.5 h-2.5 rounded-[3px] bg-white"></span>
								</div>
							</div>

							{/* Title */}
							<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
								{mode === 'signin' ? 'Welcome back!' : 'Create your account'}
							</h2>

							{/* Subtitle */}
							<p className="mt-3 text-xs sm:text-[13px] text-neutral-400 font-normal leading-relaxed max-w-md">
								{mode === 'signin'
									? 'We empower developers and technical teams to create, simulate, and manage AI-driven workflows visually'
									: 'Join us today to build, customize, and simulate next-generation workflows.'}
							</p>

							{/* Form */}
							<form onSubmit={handleSubmit} className="mt-8 space-y-4">
								{mode === 'signup' && (
									<div>
										<label className="block text-xs font-medium text-neutral-300 mb-2">
											Full Name
										</label>
										<input
											type="text"
											required
											value={fullName}
											onChange={(e) => setFullName(e.target.value)}
											placeholder="Jane Doe"
											className="w-full rounded-xl border border-neutral-800 bg-[#1c1c1f] px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-all focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600"
										/>
									</div>
								)}

								<div>
									<label className="block text-xs font-medium text-neutral-300 mb-2">
										Email
									</label>
									<input
										type="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="youremail@yourdomain.com"
										className="w-full rounded-xl border border-neutral-800 bg-[#1c1c1f] px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-all focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600"
									/>
								</div>

								<div>
									<div className="flex items-center justify-between mb-2">
										<label className="block text-xs font-medium text-neutral-300">
											Password
										</label>
										{mode === 'signin' && (
											<button
												type="button"
												onClick={() => alert('Password reset link sent to your email.')}
												className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
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
											placeholder="Create a password"
											className="w-full rounded-xl border border-neutral-800 bg-[#1c1c1f] px-4 py-3 pr-10 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-all focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600"
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
									className="w-full rounded-xl bg-[#27272a] hover:bg-[#323236] border border-neutral-700/60 py-3 text-sm font-medium text-neutral-100 transition-all duration-200 shadow-sm cursor-pointer"
								>
									{mode === 'signin' ? 'Sign in' : 'Create account'}
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

					{/* ---------------- RIGHT COLUMN: SHOWCASE CARD ---------------- */}
					<div className="hidden md:flex md:col-span-5 relative p-4">
						<div className="relative size-full overflow-hidden rounded-2xl border border-white/[0.08] p-6 flex flex-col justify-end">
							{/* Background Luxury Glowing Mesh Gradient matching screenshot */}
							<div className="absolute inset-0 bg-[#0c0d12]" />
							
							{/* Subtle organic contour lines / backdrop geometry */}
							<div
								className="absolute inset-0 opacity-20 pointer-events-none"
								style={{
									backgroundImage: `radial-gradient(circle at 80% 90%, rgba(204,153,68,0.7) 0%, rgba(130,105,45,0.4) 40%, rgba(35,32,25,0.1) 70%, transparent 100%)`,
								}}
							/>
							<div
								className="absolute inset-0 pointer-events-none"
								style={{
									background: 'linear-gradient(145deg, #0b0c10 0%, #17171d 40%, #453c23 75%, #8f743c 100%)',
									opacity: 0.85,
								}}
							/>

							{/* Abstract curved highlights replicating the screenshot */}
							<svg
								className="absolute -top-10 -right-10 w-[140%] h-[140%] opacity-15 pointer-events-none"
								viewBox="0 0 400 400"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="200" cy="200" r="160" stroke="#ffffff" strokeWidth="1" strokeDasharray="6 6" />
								<circle cx="260" cy="180" r="130" stroke="#ffffff" strokeWidth="1" />
								<circle cx="300" cy="220" r="180" stroke="#ffd280" strokeWidth="2" opacity="0.3" />
							</svg>

							{/* Top Badges */}
							<div className="relative z-10 flex items-center gap-2 mb-3">
								<span className="rounded-md border border-neutral-700/60 bg-[#232328]/80 px-2.5 py-1 text-[11px] font-normal text-neutral-300 backdrop-blur-md">
									Product Company
								</span>
								<span className="rounded-md border border-neutral-700/60 bg-[#232328]/80 px-2.5 py-1 text-[11px] font-normal text-neutral-300 backdrop-blur-md">
									Cloud Management
								</span>
							</div>

							{/* Testimonial Quote Card */}
							<div className="relative z-10 rounded-xl border border-white/[0.1] bg-[#1a1715]/75 p-5 backdrop-blur-xl shadow-2xl">
								<p className="text-[13px] text-neutral-200 font-normal leading-relaxed">
									Aceternity Pro Components have completely changed how we work. What used to take hours every week is now fully automated.
								</p>
								<div className="mt-4">
									<div className="text-xs font-semibold text-white">Gina Clinton</div>
									<div className="text-[11px] text-neutral-400">
										Head of Product, <span className="font-semibold text-neutral-200">Acme Inc.</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
