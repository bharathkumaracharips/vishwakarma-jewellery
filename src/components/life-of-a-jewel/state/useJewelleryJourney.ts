'use client';

import { useState, useCallback, useMemo } from 'react';
import {
	JewelleryConfiguration,
	JourneyMilestone,
	ChapterMeta,
	MetalConfig,
	StoneConfig,
} from '../types';

export const CHAPTERS: ChapterMeta[] = [
	{
		id: '01-raw-gold',
		number: '01',
		title: 'Raw Gold',
		subtitle: 'Every ornament begins with something precious',
		range: [0.0, 0.08],
	},
	{
		id: '02-the-karigar',
		number: '02',
		title: 'The Karigar',
		subtitle: 'Craftsmanship gives gold its character',
		range: [0.08, 0.16],
	},
	{
		id: '03-gold-to-ornament',
		number: '03',
		title: 'From Gold to Ornament',
		subtitle: 'The finished jewel takes form',
		range: [0.16, 0.25],
	},
	{
		id: '04-make-it-yours',
		number: '04',
		title: 'Make It Yours',
		subtitle: 'Found something you love? Make it your jewellery',
		range: [0.25, 0.42],
	},
	{
		id: '05-your-version',
		number: '05',
		title: 'Your Configuration',
		subtitle: 'Ready to co-create with the atelier',
		range: [0.42, 0.50],
	},
	{
		id: '06-what-you-own',
		number: '06',
		title: 'What You Already Own',
		subtitle: 'Your jewellery does not have to be new to matter',
		range: [0.50, 0.58],
	},
	{
		id: '07-precision-custody',
		number: '07',
		title: 'Precision & Custody',
		subtitle: 'Dual micro-balance intake & honest weight variance',
		range: [0.58, 0.67],
	},
	{
		id: '08-golden-trace',
		number: '08',
		title: 'The Golden Trace',
		subtitle: 'The documented lifeline of your heirloom',
		range: [0.67, 0.75],
	},
	{
		id: '09-verifiable-ledger',
		number: '09',
		title: 'The Invisible Ledger',
		subtitle: 'Important milestones cryptographically anchored',
		range: [0.75, 0.83],
	},
	{
		id: '10-real-time-tracking',
		number: '10',
		title: 'Real-Time Journey',
		subtitle: 'Follow the active progress of your ornament',
		range: [0.83, 0.90],
	},
	{
		id: '11-consultation',
		number: '11',
		title: 'Atelier Consultation',
		subtitle: 'Online 4K macro video stream or in-person specialist',
		range: [0.90, 0.96],
	},
	{
		id: '12-your-choice',
		number: '12',
		title: 'Your Choice',
		subtitle: 'Your Jewellery. Your Journey. Your Trust.',
		range: [0.96, 1.0],
	},
];

export const DEFAULT_CONFIGURATION: JewelleryConfiguration = {
	baseDesignId: 'DEMO-ASSET-VK-2041',
	baseDesignName: 'Royal Heritage Choker',
	metal: {
		purity: '22K',
		tone: 'Yellow Gold',
		colorCode: '#e8c35a',
		specularHighlight: '#fff2c8',
	},
	approxWeight: 18.4,
	stone: {
		type: 'Diamond',
		carat: 1.2,
		cut: 'Oval',
		clarity: 'VVS1',
		color: 'D-F Colorless',
		colorHex: '#f0f5ff',
	},
	budget: {
		min: 95000,
		max: 125000,
	},
};

export const DEMO_MILESTONES: JourneyMilestone[] = [
	{
		id: 'MS-01',
		title: 'Received at Atelier',
		timestamp: '03 Oct 2026 • 10:14 AM',
		status: 'completed',
		role: 'Intake Custodian',
		note: 'Initial intake completed. Macro photographic provenance recorded from 6 angles.',
		weightRecorded: '14.280 g',
		isVerified: true,
		hash: '0x8f2d...91c4',
	},
	{
		id: 'MS-02',
		title: 'Gemological Inspection',
		timestamp: '03 Oct 2026 • 11:30 AM',
		status: 'completed',
		role: 'Master Gemologist',
		note: 'Prongs and stone seats audited. Loosened center setting noted for laser micro-tightening.',
		weightRecorded: '14.280 g',
		isVerified: true,
		hash: '0x3a4b...e8f2',
	},
	{
		id: 'MS-03',
		title: 'Artisan Bench Work',
		timestamp: '03 Oct 2026 • 02:45 PM',
		status: 'completed',
		role: 'Karigar Specialist',
		note: 'Broken link rebuilt with 22K pure alloy solder. Surface filigree refined.',
		weightRecorded: '14.280 g',
		isVerified: true,
		hash: '0x7e1c...4d0a',
	},
	{
		id: 'MS-04',
		title: 'Sonic Purification & Polish',
		timestamp: '03 Oct 2026 • 04:15 PM',
		status: 'active',
		role: 'Finishing Specialist',
		note: 'Ultrasonic cleanse & high-luster polish. 0.040 g surface patina & oxide safely removed.',
		weightRecorded: '14.240 g',
		isVerified: true,
		hash: '0x5b9f...2a71',
	},
	{
		id: 'MS-05',
		title: 'Final Hallmark & Vault Ready',
		timestamp: 'Estimated: 04 Oct 2026',
		status: 'upcoming',
		role: 'Chief Quality Officer',
		note: 'BIS 916 laser hallmark verification & final vault packaging for customer handover.',
		weightRecorded: 'Pending final scale',
		isVerified: false,
	},
];

export function useJewelleryJourney() {
	const [configuration, setConfiguration] = useState<JewelleryConfiguration>(
		DEFAULT_CONFIGURATION
	);
	const [selectedMilestone, setSelectedMilestone] = useState<JourneyMilestone | null>(null);
	const [activeModal, setActiveModal] = useState<string | null>(null);

	const updateMetal = useCallback((tone: MetalConfig['tone'], purity: MetalConfig['purity']) => {
		let colorCode = '#e8c35a';
		let specularHighlight = '#fff2c8';

		if (tone === 'Rose Gold') {
			colorCode = '#e59a84';
			specularHighlight = '#ffe0d6';
		} else if (tone === 'White Gold') {
			colorCode = '#dcdde2';
			specularHighlight = '#ffffff';
		} else if (purity === '18K') {
			colorCode = '#deb950';
			specularHighlight = '#fdedba';
		}

		setConfiguration((prev) => {
			// Recalculate estimated budget on metal purity
			const factor = purity === '22K' ? 1.0 : 0.85;
			return {
				...prev,
				metal: { purity, tone, colorCode, specularHighlight },
				budget: {
					min: Math.round(90000 * factor * (prev.approxWeight / 18)),
					max: Math.round(120000 * factor * (prev.approxWeight / 18)),
				},
			};
		});
	}, []);

	const updateApproxWeight = useCallback((weight: number) => {
		setConfiguration((prev) => {
			const ratio = weight / 18.4;
			return {
				...prev,
				approxWeight: weight,
				budget: {
					min: Math.round(prev.budget.min * ratio),
					max: Math.round(prev.budget.max * ratio),
				},
			};
		});
	}, []);

	const updateStone = useCallback((stoneUpdate: Partial<StoneConfig>) => {
		setConfiguration((prev) => {
			const nextStone: StoneConfig = { ...prev.stone, ...stoneUpdate };
			// Set stone colorHex based on type
			if (stoneUpdate.type) {
				switch (stoneUpdate.type) {
					case 'Ruby':
						nextStone.colorHex = '#c41e3a';
						nextStone.color = 'Pigeon Blood Red';
						break;
					case 'Emerald':
						nextStone.colorHex = '#097969';
						nextStone.color = 'Deep Forest Green';
						break;
					case 'Sapphire':
						nextStone.colorHex = '#0f52ba';
						nextStone.color = 'Royal Cornflower';
						break;
					case 'Polki':
						nextStone.colorHex = '#fff8e7';
						nextStone.color = 'Raw Uncut Diamond';
						break;
					case 'Diamond':
						nextStone.colorHex = '#f0f5ff';
						nextStone.color = 'D-F Colorless';
						break;
					case 'None':
						nextStone.colorHex = 'transparent';
						nextStone.color = 'Solid Gold Setting';
						break;
				}
			}
			return { ...prev, stone: nextStone };
		});
	}, []);

	return {
		configuration,
		updateMetal,
		updateApproxWeight,
		updateStone,
		selectedMilestone,
		setSelectedMilestone,
		activeModal,
		setActiveModal,
	};
}
