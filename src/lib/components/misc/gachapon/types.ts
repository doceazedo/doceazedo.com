import type { Component } from "svelte";
import type { RARITIES, COLLECTIONS, AUTHORS } from "./constants";
import type { RigidBody } from "@dimforge/rapier3d-compat";

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

export type Vector3 = [number, number, number];

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

export type DispenseOptions = {
	capsules: RigidBody[];
	gravity: [number, number, number];
	setRestitution: (value: number) => void;
	scatterCapsules: () => void;
	updateCapsuleColor: () => void;
	resetScene: () => void;
};
