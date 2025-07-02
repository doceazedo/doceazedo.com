import type { Component } from "svelte";
import type { RARITIES, COLLECTIONS, AUTHORS } from "./constants";

export type GameData = {
	balance: number;
	piggybank: {
		balance: number;
		updatedAt: string;
	};
	inventory: {
		item: string;
		quantity: number;
		firstAt: string;
		lastAt: string;
	}[];
	dailyRewards: {
		startedAt: string;
		streak: number;
	};
};

export type RarityId = (typeof RARITIES)[number]["id"];

export type CollectionId = (typeof COLLECTIONS)[number]["id"];

export type Item = {
	id: string;
	label: string;
	description: string;
	mesh: Component;
	collection: CollectionId;
	rarity: RarityId;
	author: AuthorId;
};

export type AuthorId = keyof typeof AUTHORS;
