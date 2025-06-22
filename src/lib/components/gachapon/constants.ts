import type { Component } from "svelte";
import {
	AliensFillUserFaces,
	CircleFillDesign,
	HexagonFillDesign,
	PentagonFillDesign,
	SquareFillDesign,
	TriangleFillDesign,
	VipDiamondFillFinance,
} from "svelte-remix";
import Mp3Player from "./models/mp3-player.svelte";
import Nds from "./models/nds.svelte";
import Cd from "./models/cd.svelte";
import DebugNds from "./models/debug-nds.svelte";

export const RARITIES = [
	{
		id: "common",
		label: "Common",
		odds: 0.5,
		textColor: "text-slate-500",
		bgColor: "bg-slate-500!",
		badgeColor: "bg-slate-500/20",
		borderColor: "border-slate-500",
		icon: CircleFillDesign,
	},
	{
		id: "uncommon",
		label: "Uncommon",
		odds: 0.25,
		textColor: "text-emerald-500",
		bgColor: "bg-emerald-500!",
		badgeColor: "bg-emerald-500/20",
		borderColor: "border-emerald-500",
		icon: TriangleFillDesign,
	},
	{
		id: "rare",
		label: "Rare",
		odds: 0.12,
		textColor: "text-blue-500",
		bgColor: "bg-blue-500!",
		badgeColor: "bg-blue-500/20",
		borderColor: "border-blue-500",
		icon: SquareFillDesign,
	},
	{
		id: "epic",
		label: "Epic",
		odds: 0.07,
		textColor: "text-violet-500",
		bgColor: "bg-violet-500!",
		badgeColor: "bg-violet-500/20",
		borderColor: "border-violet-500",
		icon: PentagonFillDesign,
	},
	{
		id: "legendary",
		label: "Legendary",
		odds: 0.04,
		textColor: "text-amber-400",
		bgColor: "bg-amber-400!",
		badgeColor: "bg-amber-400/20",
		borderColor: "border-amber-400",
		icon: VipDiamondFillFinance,
	},
	{
		id: "exotic",
		label: "Exotic",
		odds: 0.02,
		textColor: "text-sky-300",
		bgColor: "bg-sky-300!",
		badgeColor: "bg-sky-300/20",
		borderColor: "border-sky-300",
		icon: HexagonFillDesign,
	},
] as const;

export type RarityId = (typeof RARITIES)[number]["id"];

export const COLLECTIONS = [
	{
		id: "y2k",
		label: "Y2K Collection",
		icon: AliensFillUserFaces,
	},
] as const;

export type CollectionId = (typeof COLLECTIONS)[number]["id"];

export type Item = {
	id: string;
	label: string;
	mesh: Component;
	collection: CollectionId;
	rarity: RarityId;
};

export const ITEMS: Item[] = [
	{
		id: "cd",
		label: "CD",
		mesh: Cd as Component,
		collection: "y2k",
		rarity: "common",
	},
	{
		id: "mp3-player",
		label: "MP3 Player",
		mesh: Mp3Player as Component,
		collection: "y2k",
		rarity: "uncommon",
	},
	{
		id: "nds",
		label: "Handheld Console",
		mesh: Nds as Component,
		collection: "y2k",
		rarity: "uncommon",
	},
	{
		id: "placeholder-rare",
		label: "Debug",
		mesh: DebugNds as Component,
		collection: "y2k",
		rarity: "rare",
	},
	{
		id: "placeholder-epic",
		label: "Debug",
		mesh: DebugNds as Component,
		collection: "y2k",
		rarity: "epic",
	},
	{
		id: "placeholder-legendary",
		label: "Debug",
		mesh: DebugNds as Component,
		collection: "y2k",
		rarity: "legendary",
	},
	{
		id: "placeholder-exotic",
		label: "Debug",
		mesh: DebugNds as Component,
		collection: "y2k",
		rarity: "exotic",
	},
];
