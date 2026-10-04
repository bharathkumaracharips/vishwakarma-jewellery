'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface PopoverContextType {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
}

const PopoverContext = createContext<PopoverContextType | null>(null);

export function usePopover() {
	const context = useContext(PopoverContext);
	if (!context) {
		throw new Error('usePopover must be used within a PopoverRoot');
	}
	return context;
}

interface PopoverRootProps {
	children: React.ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function PopoverRoot({
	children,
	open: controlledOpen,
	defaultOpen = false,
	onOpenChange,
}: PopoverRootProps) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const isControlled = controlledOpen !== undefined;
	const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
	const rootRef = useRef<HTMLDivElement>(null);

	const setOpenState = (next: boolean) => {
		if (!isControlled) {
			setUncontrolledOpen(next);
		}
		onOpenChange?.(next);
	};

	const open = () => setOpenState(true);
	const close = () => setOpenState(false);
	const toggle = () => setOpenState(!isOpen);

	// Dismiss on outside click and Escape key
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
				close();
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		};

		const timer = setTimeout(() => {
			document.addEventListener('click', handleClickOutside);
			document.addEventListener('keydown', handleKeyDown);
		}, 10);

		return () => {
			clearTimeout(timer);
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	return (
		<PopoverContext.Provider value={{ isOpen, open, close, toggle }}>
			<div
				ref={rootRef}
				className={`relative inline-block ${isOpen ? 'z-50' : 'z-20'}`}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</PopoverContext.Provider>
	);
}

interface PopoverTriggerProps {
	children: React.ReactNode;
	className?: string;
	asChild?: boolean;
}

export function PopoverTrigger({ children, className = '', asChild = false }: PopoverTriggerProps) {
	const { toggle, isOpen } = usePopover();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		toggle();
	};

	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<any>, {
			onClick: handleClick,
			'aria-expanded': isOpen,
		});
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-expanded={isOpen}
			className={
				className ||
				'inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#2b2d38] px-3.5 py-2 text-xs font-sans text-neutral-200 hover:text-white hover:bg-[#383a48] transition-all shadow-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#fae19c]'
			}
		>
			{children}
		</button>
	);
}

interface PopoverContentProps {
	children: React.ReactNode;
	className?: string;
	align?: 'left' | 'right' | 'center';
	side?: 'top' | 'bottom' | 'left' | 'right';
}

export function PopoverContent({
	children,
	className = '',
	align = 'left',
	side = 'left',
}: PopoverContentProps) {
	const { isOpen } = usePopover();

	if (!isOpen) return null;

	let positionClasses = '';

	if (side === 'left') {
		positionClasses = 'right-full top-0 mr-2.5 origin-top-right';
	} else if (side === 'right') {
		positionClasses = 'left-full top-0 ml-2.5 origin-top-left';
	} else if (side === 'top') {
		const alignClass =
			align === 'left' ? 'left-0 origin-bottom-left' : align === 'right' ? 'right-0 origin-bottom-right' : 'left-1/2 -translate-x-1/2 origin-bottom';
		positionClasses = `bottom-full mb-2.5 ${alignClass}`;
	} else {
		const alignClass =
			align === 'left' ? 'left-0 origin-top-left' : align === 'right' ? 'right-0 origin-top-right' : 'left-1/2 -translate-x-1/2 origin-top';
		positionClasses = `top-full mt-2.5 ${alignClass}`;
	}

	return (
		<div
			role="dialog"
			aria-modal="true"
			className={`absolute ${positionClasses} z-[100] rounded-2xl border border-white/15 bg-[#252733] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/5 backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-150 ${className}`}
			onClick={(e) => e.stopPropagation()}
		>
			{children}
		</div>
	);
}

export function PopoverHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={`text-sm font-semibold text-white mb-3 flex items-center justify-between ${className}`}>
			{children}
		</div>
	);
}

export function PopoverBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return <div className={`space-y-1 text-xs text-neutral-200 ${className}`}>{children}</div>;
}

export function PopoverFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={`border-t border-white/10 pt-3 mt-3 flex items-center justify-end gap-2 ${className}`}>
			{children}
		</div>
	);
}

export function PopoverCloseButton({ className = '', children }: { className?: string; children?: React.ReactNode }) {
	const { close } = usePopover();

	return (
		<button
			type="button"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				close();
			}}
			className={
				className ||
				'rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer'
			}
		>
			{children || 'Close'}
		</button>
	);
}

export function PopoverButton({
	children,
	onClick,
	className = '',
}: {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
}) {
	const { close } = usePopover();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onClick?.();
		close();
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={
				className ||
				'w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-neutral-200 hover:text-white hover:bg-white/10 transition-colors text-left cursor-pointer'
			}
		>
			{children}
		</button>
	);
}

interface PopoverFormProps {
	children: React.ReactNode;
	onSubmit: (note: string) => void;
	className?: string;
}

export function PopoverForm({ children, onSubmit, className = '' }: PopoverFormProps) {
	const { close } = usePopover();
	const [noteText, setNoteText] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onSubmit(noteText);
		setNoteText('');
		close();
	};

	return (
		<form onSubmit={handleSubmit} className={`space-y-3 ${className}`} onClick={(e) => e.stopPropagation()}>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child) && child.type === PopoverTextarea) {
					return React.cloneElement(child as React.ReactElement<any>, {
						value: noteText,
						onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setNoteText(e.target.value),
					});
				}
				return child;
			})}
		</form>
	);
}

export function PopoverLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return <label className={`block text-xs font-semibold text-white ${className}`}>{children}</label>;
}

export function PopoverTextarea({
	value,
	onChange,
	placeholder = 'Add your note or request...',
	className = '',
}: {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	className?: string;
}) {
	return (
		<textarea
			rows={3}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={`w-full rounded-xl border border-white/15 bg-[#181922] p-2.5 text-xs text-neutral-200 placeholder:text-neutral-500 outline-none focus:border-white/30 resize-none ${className}`}
		/>
	);
}

export function PopoverSubmitButton({
	children = 'Submit',
	className = '',
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<button
			type="submit"
			className={
				className ||
				'rounded-lg bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/25 transition-all cursor-pointer shadow-sm'
			}
		>
			{children}
		</button>
	);
}
