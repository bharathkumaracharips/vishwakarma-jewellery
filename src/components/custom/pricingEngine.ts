export interface MetalOption {
	id: string;
	name: string;
	purity: string;
	color: string;
	ratePerGram: number;
	badge: string;
}

export interface StoneOption {
	id: string;
	name: string;
	type: string;
	color: string;
	basePrice: number;
	description: string;
}

export interface FinishOption {
	id: string;
	name: string;
	description: string;
}

export const LIVE_RATES = {
	'22K': 6980,
	'18K': 5740,
	'PT950': 4200,
};

export const METAL_OPTIONS: MetalOption[] = [
	{
		id: '22k-yellow',
		name: '22K Traditional Yellow Gold',
		purity: '22K (916 BIS)',
		color: '#E5C378',
		ratePerGram: LIVE_RATES['22K'],
		badge: 'Most Popular',
	},
	{
		id: '18k-rose',
		name: '18K Contemporary Rose Gold',
		purity: '18K (750 BIS)',
		color: '#E0A899',
		ratePerGram: LIVE_RATES['18K'],
		badge: 'Warm Lustre',
	},
	{
		id: '18k-white',
		name: '18K Architectural White Gold',
		purity: '18K (750 BIS)',
		color: '#E2E8F0',
		ratePerGram: LIVE_RATES['18K'],
		badge: 'Rhodium Mirror',
	},
	{
		id: '22k-antique',
		name: '22K Antique / Temple Patina',
		purity: '22K (916 BIS)',
		color: '#D4AF37',
		ratePerGram: LIVE_RATES['22K'],
		badge: 'Vedic Heritage',
	},
	{
		id: '18k-champagne',
		name: '18K Champagne Gold',
		purity: '18K (750 BIS)',
		color: '#C5A059',
		ratePerGram: LIVE_RATES['18K'],
		badge: 'Subtle Modern',
	},
	{
		id: 'pt950-platinum',
		name: 'Platinum 950 Fine Alloy',
		purity: 'PT950 Certified',
		color: '#E5E4E2',
		ratePerGram: LIVE_RATES['PT950'],
		badge: 'Ultra Dense',
	},
];

export const STONE_OPTIONS: StoneOption[] = [
	{
		id: 'none',
		name: 'Plain Pure Metal',
		type: 'None',
		color: '#D4AF37',
		basePrice: 0,
		description: 'Pure sculpted metal without embedded gemstones',
	},
	{
		id: 'solitaire-diamond',
		name: 'GIA Solitaire Diamond (1.0ct)',
		type: 'Diamond',
		color: '#E0F2FE',
		basePrice: 58000,
		description: 'GIA Triple Excellent, VVS1 clarity, F-color radiant cut',
	},
	{
		id: 'pave-accents',
		name: 'Micro-Pavé Diamond Halo',
		type: 'Diamond',
		color: '#F0F9FF',
		basePrice: 22000,
		description: 'French-set natural brilliant diamonds (VVS-EF grade)',
	},
	{
		id: 'colombian-emerald',
		name: 'Colombian AAA Emerald',
		type: 'Emerald',
		color: '#10B981',
		basePrice: 32000,
		description: 'Vivid green Muzo origin with natural jardin inclusions',
	},
	{
		id: 'burmese-ruby',
		name: 'Burmese Pigeon-Blood Ruby',
		type: 'Ruby',
		color: '#EF4444',
		basePrice: 36000,
		description: 'Deep crimson unheated ruby with exceptional luminescence',
	},
	{
		id: 'ceylon-sapphire',
		name: 'Ceylon Royal Blue Sapphire',
		type: 'Sapphire',
		color: '#3B82F6',
		basePrice: 29000,
		description: 'Velvety royal blue stone from Ratnapura deposits',
	},
	{
		id: 'heritage-polki',
		name: 'Heritage Jadau Polki',
		type: 'Polki',
		color: '#FDE68A',
		basePrice: 42000,
		description: 'Natural flat-cut uncut diamonds set with 24K pure gold foil',
	},
];

export const FINISH_OPTIONS: FinishOption[] = [
	{
		id: 'mirror-polish',
		name: 'High-Gloss Mirror Polish',
		description: 'Diamond-wheel buffed for pristine liquid reflections',
	},
	{
		id: 'satin-brushed',
		name: 'Matte Satin Brushed',
		description: 'Directional micro-texture with contemporary understatement',
	},
	{
		id: 'hand-hammered',
		name: 'Artisan Hand-Hammered Facets',
		description: 'Hand-peened with custom karigar ball hammers',
	},
	{
		id: 'dual-tone',
		name: 'Contrast Dual Tone',
		description: 'Selective rhodium accenting over warm yellow gold body',
	},
];

export interface CategoryWeightConfig {
	min: number;
	max: number;
	default: number;
	step: number;
	presets: number[];
}

export const CATEGORY_WEIGHTS: Record<string, CategoryWeightConfig> = {
	rings: { min: 3, max: 18, default: 6.5, step: 0.5, presets: [4, 6.5, 9, 12] },
	chains: { min: 10, max: 80, default: 24, step: 1, presets: [14, 24, 38, 55] },
	bangles: { min: 16, max: 90, default: 32, step: 1, presets: [20, 32, 48, 65] },
	necklaces: { min: 20, max: 120, default: 42, step: 1, presets: [25, 42, 60, 85] },
	earrings: { min: 3, max: 24, default: 7.5, step: 0.5, presets: [4.5, 7.5, 12, 16] },
	mangalsutra: { min: 10, max: 50, default: 20, step: 1, presets: [12, 20, 30, 42] },
	pendants: { min: 2, max: 20, default: 5, step: 0.5, presets: [3, 5, 8.5, 12] },
	other: { min: 4, max: 60, default: 15, step: 0.5, presets: [8, 15, 25, 40] },
};

export interface PriceBreakdown {
	bullionCost: number;
	stoneCost: number;
	makingCharges: number;
	makingChargeRate: number; // percentage, e.g. 12%
	assayHallmarkFee: number; // ₹0 (Free included)
	subtotal: number;
	gst: number; // 3%
	totalEstimate: number;
}

export function calculateJewelleryPrice(
	metalId: string,
	weightGrams: number,
	stoneId: string
): PriceBreakdown {
	const metal = METAL_OPTIONS.find((m) => m.id === metalId) || METAL_OPTIONS[0];
	const stone = STONE_OPTIONS.find((s) => s.id === stoneId) || STONE_OPTIONS[0];

	const bullionCost = Math.round(weightGrams * metal.ratePerGram);
	const stoneCost = stone.basePrice;

	// Artisanal making charges: 12% benchmark
	const makingChargeRate = 12;
	const makingCharges = Math.round((bullionCost * makingChargeRate) / 100);
	const assayHallmarkFee = 0; // Vishwakarma provides free BIS hallmarking

	const subtotal = bullionCost + stoneCost + makingCharges + assayHallmarkFee;
	const gst = Math.round(subtotal * 0.03); // 3% Indian GST on fine jewellery
	const totalEstimate = subtotal + gst;

	return {
		bullionCost,
		stoneCost,
		makingCharges,
		makingChargeRate,
		assayHallmarkFee,
		subtotal,
		gst,
		totalEstimate,
	};
}
