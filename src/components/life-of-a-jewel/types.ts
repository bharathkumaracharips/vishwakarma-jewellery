// Complete typed definitions for 'The Life of a Jewel — Cinematic Trust Experience'

export type MetalTone = 'Yellow Gold' | 'Rose Gold' | 'White Gold';
export type MetalPurity = '22K' | '18K';

export interface MetalConfig {
	purity: MetalPurity;
	tone: MetalTone;
	colorCode: string;
	specularHighlight: string;
}

export type StoneType = 'Diamond' | 'Ruby' | 'Emerald' | 'Sapphire' | 'Polki' | 'None';

export interface StoneConfig {
	type: StoneType;
	carat?: number;
	cut?: 'Brilliant Round' | 'Oval' | 'Cushion' | 'Emerald Cut';
	clarity?: 'VVS1' | 'VS1' | 'SI1';
	color?: string;
	colorHex?: string;
}

export interface JewelleryConfiguration {
	baseDesignId: string;
	baseDesignName: string;
	metal: MetalConfig;
	approxWeight: number; // e.g. 14.0, 18.4, 24.0
	stone: StoneConfig;
	budget: {
		min: number;
		max: number;
	};
}

export interface JourneyMilestone {
	id: string;
	title: string;
	timestamp: string;
	status: 'completed' | 'active' | 'upcoming';
	role: string;
	note: string;
	photoUrl?: string;
	weightRecorded?: string;
	isVerified: boolean;
	hash?: string;
}

export type ChapterId =
	| '01-raw-gold'
	| '02-the-karigar'
	| '03-gold-to-ornament'
	| '04-make-it-yours'
	| '05-your-version'
	| '06-what-you-own'
	| '07-precision-custody'
	| '08-golden-trace'
	| '09-verifiable-ledger'
	| '10-real-time-tracking'
	| '11-consultation'
	| '12-your-choice';

export interface ChapterMeta {
	id: ChapterId;
	number: string;
	title: string;
	subtitle: string;
	range: [number, number]; // [startProgress, endProgress]
}
