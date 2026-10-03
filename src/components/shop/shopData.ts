export interface ShopItem {
	id: string;
	name: string;
	category: 'rings' | 'chains' | 'necklaces' | 'bangles' | 'earrings' | 'pendants' | 'mangalsutra';
	categoryLabel: string;
	craftType: 'handcrafted' | 'semi-handmade';
	craftLabel: string;
	craft?: string;
	collection: 'bridal' | 'temple' | 'contemporary' | 'daily' | 'new-arrivals';
	collectionLabel: string;
	metalPurity: '22K' | '18K';
	metalTone: 'Yellow Gold' | 'Rose Gold' | 'White Gold';
	approxWeight: number; // in grams
	basePrice: number; // in INR
	stone: string;
	stoneType: 'Polki' | 'Diamond' | 'Ruby' | 'Emerald' | 'None';
	description: string;
	image: string;
	isNewArrival?: boolean;
	isHandmade?: boolean;
	hallmarkCode: string;
}

export const LIVE_BULLION_RATE_22K = 6980; // INR per gram
export const LIVE_BULLION_RATE_18K = 5740; // INR per gram

export const TOP_CATEGORIES = [
	{ id: 'all', label: 'All Jewellery' },
	{ id: 'rings', label: 'Rings' },
	{ id: 'chains', label: 'Chains' },
	{ id: 'necklaces', label: 'Necklaces' },
	{ id: 'bangles', label: 'Bangles & Kadas' },
	{ id: 'earrings', label: 'Earrings' },
	{ id: 'pendants', label: 'Pendants' },
	{ id: 'mangalsutra', label: 'Mangalsutra' },
] as const;

export const CATEGORIES_LIST = TOP_CATEGORIES;

export const CRAFT_FILTER_LIST = [
	{ id: 'all', label: 'All Crafts' },
	{ id: 'handcrafted', label: 'Handcrafted' },
	{ id: 'semi-handmade', label: 'Semi Handmade' },
] as const;

export const COLLECTION_FILTER_LIST = [
	{ id: 'all', label: 'All Collections' },
	{ id: 'bridal', label: 'The Bridal Treasury' },
	{ id: 'temple', label: 'Temple & Heritage' },
	{ id: 'contemporary', label: 'Contemporary Fine' },
	{ id: 'daily', label: 'Daily Wear' },
] as const;

export const CRAFT_MODES = [
	{ id: 'all', label: 'All Collections', description: 'Explore full hallmarked archives' },
	{ id: 'handcrafted', label: 'Handcrafted', description: '100% Karigar hand-forged & filigree' },
	{ id: 'semi-handmade', label: 'Semi Handmade', description: 'Precision cast with hand-set stones' },
] as const;

export const SHOP_ITEMS: ShopItem[] = [
	{
		id: 'VK-RN-101',
		name: 'Imperial Solitaire Ring',
		category: 'rings',
		categoryLabel: 'Rings',
		craftType: 'semi-handmade',
		craftLabel: 'Semi Handmade',
		collection: 'contemporary',
		collectionLabel: 'Contemporary Fine',
		metalPurity: '18K',
		metalTone: 'Yellow Gold',
		approxWeight: 6.8,
		basePrice: 118000,
		stone: 'GIA Triple Excellent 1.1ct Solitaire',
		stoneType: 'Diamond',
		description: 'Hand-burnished knife-edge band with a four-prong crowned diamond basket for maximal luminescence.',
		image: '/images/solitaire-ring.jpg',
		isNewArrival: true,
		hallmarkCode: 'BIS-750-VK-8801',
	},
	{
		id: 'VK-RN-102',
		name: 'Heritage Padmashri Lotus Band',
		category: 'rings',
		categoryLabel: 'Rings',
		craftType: 'handcrafted',
		craftLabel: 'Handcrafted',
		collection: 'temple',
		collectionLabel: 'Temple & Heritage',
		metalPurity: '22K',
		metalTone: 'Rose Gold',
		approxWeight: 9.4,
		basePrice: 84000,
		stone: 'Fine Rubies & Pave Accents',
		stoneType: 'Ruby',
		description: 'Sculpted lotus petals in rose gold tone with centered bezel-set ruby bud and hand-engraved shanks.',
		image: '/images/solitaire-ring.jpg',
		isNewArrival: false,
		hallmarkCode: 'BIS-916-VK-1109',
	},
	{
		id: 'VK-CH-501',
		name: 'Vedic Hand-Woven Rope Chain',
		category: 'chains',
		categoryLabel: 'Chains',
		craftType: 'handcrafted',
		craftLabel: 'Handcrafted',
		collection: 'daily',
		collectionLabel: 'Daily Wear',
		metalPurity: '22K',
		metalTone: 'Yellow Gold',
		approxWeight: 22.5,
		basePrice: 179000,
		stone: 'Solid 22K Gold Interlink',
		stoneType: 'None',
		description: 'Quad-braided flexible rope weave engineered with custom lock clasp for enduring daily wear.',
		image: '/images/gold-rope-chain.jpg',
		isNewArrival: false,
		hallmarkCode: 'BIS-916-VK-6624',
	},
	{
		id: 'VK-MS-701',
		name: 'Royal Heritage Jadau Mangalsutra',
		category: 'mangalsutra',
		categoryLabel: 'Mangalsutra',
		craftType: 'handcrafted',
		craftLabel: 'Handcrafted',
		collection: 'bridal',
		collectionLabel: 'The Bridal Treasury',
		metalPurity: '22K',
		metalTone: 'Yellow Gold',
		approxWeight: 26.8,
		basePrice: 215000,
		stone: 'Black Onyx Beads & Uncut Polki Center',
		stoneType: 'Polki',
		description: 'Traditional double strand black bead chain with crescent nakashi filigree centerpiece.',
		image: '/images/gold-rope-chain.jpg',
		isNewArrival: true,
		hallmarkCode: 'BIS-916-VK-7832',
	},
	{
		id: 'VK-NK-201',
		name: 'Maharani Polki Bridal Choker',
		category: 'necklaces',
		categoryLabel: 'Necklaces',
		craftType: 'handcrafted',
		craftLabel: 'Handcrafted',
		collection: 'bridal',
		collectionLabel: 'The Bridal Treasury',
		metalPurity: '22K',
		metalTone: 'Yellow Gold',
		approxWeight: 46.5,
		basePrice: 385000,
		stone: 'Syndicate Uncut Polki & Zambian Emeralds',
		stoneType: 'Polki',
		description: 'Traditional Jadau setting lined with south-sea natural seed pearls and hand-enameled meenakari foliage reverse.',
		image: '/images/polki-choker.jpg',
		isNewArrival: true,
		hallmarkCode: 'BIS-916-VK-9941',
	},
	{
		id: 'VK-NK-202',
		name: 'Royal Temple Nakashi Haar',
		category: 'necklaces',
		categoryLabel: 'Necklaces',
		craftType: 'handcrafted',
		craftLabel: 'Handcrafted',
		collection: 'temple',
		collectionLabel: 'Temple & Heritage',
		metalPurity: '22K',
		metalTone: 'Yellow Gold',
		approxWeight: 38.2,
		basePrice: 298000,
		stone: 'Burmese Pigeon Blood Rubies',
		stoneType: 'Ruby',
		description: 'Sacred temple repoussé craftsmanship depicting divine floral motifs with high-relief antique matte polish.',
		image: '/images/hero-necklace.jpg',
		isNewArrival: false,
		hallmarkCode: 'BIS-916-VK-3302',
	},
	{
		id: 'VK-BG-301',
		name: 'Antique Filigree Kadas (Pair)',
		category: 'bangles',
		categoryLabel: 'Bangles & Kadas',
		craftType: 'handcrafted',
		craftLabel: 'Handcrafted',
		collection: 'temple',
		collectionLabel: 'Temple & Heritage',
		metalPurity: '22K',
		metalTone: 'Yellow Gold',
		approxWeight: 32.4,
		basePrice: 265000,
		stone: 'Solid 22K Gold Hand-Carved',
		stoneType: 'None',
		description: 'Interlocking screw-clasp hinged kadas featuring hand-pulled wire filigree and heirloom granulation.',
		image: '/images/antique-bangle.jpg',
		isNewArrival: false,
		hallmarkCode: 'BIS-916-VK-5510',
	},
	{
		id: 'VK-BG-302',
		name: 'Elysian Diamond Cuff Bangle',
		category: 'bangles',
		categoryLabel: 'Bangles & Kadas',
		craftType: 'semi-handmade',
		craftLabel: 'Semi Handmade',
		collection: 'contemporary',
		collectionLabel: 'Contemporary Fine',
		metalPurity: '18K',
		metalTone: 'White Gold',
		approxWeight: 18.5,
		basePrice: 195000,
		stone: 'Clustered VVS Natural Diamonds',
		stoneType: 'Diamond',
		description: 'Precision-engineered flexible cuff cast in 18K white gold with pave-set diamond pave borders.',
		image: '/images/antique-bangle.jpg',
		isNewArrival: true,
		hallmarkCode: 'BIS-750-VK-2290',
	},
	{
		id: 'VK-ER-401',
		name: 'Heritage Chandelier Jhumkas',
		category: 'earrings',
		categoryLabel: 'Earrings',
		craftType: 'handcrafted',
		craftLabel: 'Handcrafted',
		collection: 'bridal',
		collectionLabel: 'The Bridal Treasury',
		metalPurity: '22K',
		metalTone: 'Yellow Gold',
		approxWeight: 19.8,
		basePrice: 168000,
		stone: 'Uncut Diamonds & Natural Pearls',
		stoneType: 'Polki',
		description: 'Tiered bell jhumkas with hanging pearl cluster tassels and hand-pierced filigree dome.',
		image: '/images/antique-jhumkas.jpg',
		isNewArrival: true,
		hallmarkCode: 'BIS-916-VK-4412',
	},
	{
		id: 'VK-PD-601',
		name: 'Celestial Jadau Polki Pendant',
		category: 'pendants',
		categoryLabel: 'Pendants',
		craftType: 'semi-handmade',
		craftLabel: 'Semi Handmade',
		collection: 'contemporary',
		collectionLabel: 'Contemporary Fine',
		metalPurity: '18K',
		metalTone: 'Yellow Gold',
		approxWeight: 14.2,
		basePrice: 135000,
		stone: 'Uncut Polki with Emerald Teardrop',
		stoneType: 'Emerald',
		description: 'Intricate medallion pendant encircled by brilliant micro-pave diamonds and dangling emerald teardrop.',
		image: '/images/diamond-pendant.jpg',
		isNewArrival: true,
		hallmarkCode: 'BIS-750-VK-7719',
	},
];
