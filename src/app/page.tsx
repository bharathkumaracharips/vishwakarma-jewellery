'use client';
import React from 'react';
import { Header } from "@/components/ui/header-3";
import { LifeOfAJewel } from "@/components/life-of-a-jewel/LifeOfAJewel";

export default function Home() {
	return (
		<div className="min-h-screen w-full bg-background text-foreground">
			<Header />
			<main>
				<LifeOfAJewel />
			</main>
		</div>
	);
}
