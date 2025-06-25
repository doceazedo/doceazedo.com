import type { Component } from "svelte";
import {
	AliensFillUserFaces,
	AliensLineUserFaces,
	CircleFillDesign,
	CreativeCommonsByLineBusiness,
	CreativeCommonsZeroLineBusiness,
	HexagonFillDesign,
	PentagonFillDesign,
	SquareFillDesign,
	SwordFillOthers,
	SwordLineOthers,
	TriangleFillDesign,
	VipDiamondFillFinance,
	WalletFillFinance,
	WalletLineFinance,
} from "svelte-remix";
import Mp3Player from "./models/mp3-player.svelte";
import Nds from "./models/nds.svelte";
import Cd from "./models/cd.svelte";
import Potion from "./models/potion.svelte";
import Spellbook from "./models/spellbook.svelte";
import Sword from "./models/sword.svelte";
import Crystal from "./models/crystal.svelte";
import BloodRing from "./models/blood-ring.svelte";
import CoinBag from "./models/coin-bag.svelte";
import { m } from "$lib/paraglide/messages";
import Receipt from "./models/receipt.svelte";

export const RARITIES = [
	{
		id: "common",
		label: m.common(),
		odds: 0.5,
		textColor: "text-slate-500",
		bgColor: "bg-slate-500!",
		badgeColor: "bg-slate-500/20",
		borderColor: "border-slate-500",
		icon: CircleFillDesign,
	},
	{
		id: "uncommon",
		label: m.uncommon(),
		odds: 0.25,
		textColor: "text-emerald-500",
		bgColor: "bg-emerald-500!",
		badgeColor: "bg-emerald-500/20",
		borderColor: "border-emerald-500",
		icon: TriangleFillDesign,
	},
	{
		id: "rare",
		label: m.rare(),
		odds: 0.12,
		textColor: "text-blue-500",
		bgColor: "bg-blue-500!",
		badgeColor: "bg-blue-500/20",
		borderColor: "border-blue-500",
		icon: SquareFillDesign,
	},
	{
		id: "epic",
		label: m.epic(),
		odds: 0.07,
		textColor: "text-violet-500",
		bgColor: "bg-violet-500!",
		badgeColor: "bg-violet-500/20",
		borderColor: "border-violet-500",
		icon: PentagonFillDesign,
	},
	{
		id: "legendary",
		label: m.legendary(),
		odds: 0.04,
		textColor: "text-amber-400",
		bgColor: "bg-amber-400!",
		badgeColor: "bg-amber-400/20",
		borderColor: "border-amber-400",
		icon: VipDiamondFillFinance,
	},
	{
		id: "exotic",
		label: m.exotic(),
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
		id: "pocket",
		label: m.gachapon_collection_pocket(),
		icon: WalletFillFinance,
		iconLine: WalletLineFinance,
	},
	{
		id: "y2k",
		label: m.gachapon_collection_y2k(),
		icon: AliensFillUserFaces,
		iconLine: AliensLineUserFaces,
	},
	{
		id: "loot",
		label: m.gachapon_collection_loot(),
		icon: SwordFillOthers,
		iconLine: SwordLineOthers,
	},
] as const;

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

export const ITEMS: Item[] = [
	// pocket
	{
		id: "receipt",
		label: m.gachapon_item_receipt(),
		description: m.gachapon_item_description_receipt(),
		mesh: Receipt as Component,
		collection: "pocket",
		rarity: "common",
		author: "doce",
	},

	// y2k
	{
		id: "cd",
		label: m.gachapon_item_cd(),
		description: m.gachapon_item_description_cd(),
		mesh: Cd as Component,
		collection: "y2k",
		rarity: "common",
		author: "poly",
	},
	{
		id: "mp3-player",
		label: m.gachapon_item_mp3_player(),
		description: m.gachapon_item_description_mp3_player(),
		mesh: Mp3Player as Component,
		collection: "y2k",
		rarity: "uncommon",
		author: "poly",
	},
	{
		id: "nds",
		label: m.gachapon_item_nds(),
		description: m.gachapon_item_description_nds(),
		mesh: Nds as Component,
		collection: "y2k",
		rarity: "uncommon",
		author: "poly",
	},

	// loot
	{
		id: "coin-bag",
		label: m.gachapon_item_coin_bag(),
		description: m.gachapon_item_description_coin_bag(),
		mesh: CoinBag as Component,
		collection: "loot",
		rarity: "uncommon",
		author: "quaternius",
	},
	{
		id: "potion",
		label: m.gachapon_item_potion(),
		description: m.gachapon_item_description_potion(),
		mesh: Potion as Component,
		collection: "loot",
		rarity: "uncommon",
		author: "doncarson",
	},
	{
		id: "sword",
		label: m.gachapon_item_sword(),
		description: m.gachapon_item_description_sword(),
		mesh: Sword as Component,
		collection: "loot",
		rarity: "rare",
		author: "quaternius",
	},
	{
		id: "spellbook",
		label: m.gachapon_item_spellbook(),
		description: m.gachapon_item_description_spellbook(),
		mesh: Spellbook as Component,
		collection: "loot",
		rarity: "epic",
		author: "georgbossenz",
	},
	{
		id: "crystal",
		label: m.gachapon_item_blue_crystal(),
		description: m.gachapon_item_description_blue_crystal(),
		mesh: Crystal as Component,
		collection: "loot",
		rarity: "legendary",
		author: "quaternius",
	},
	{
		id: "blood-ring",
		label: m.gachapon_item_blood_ring(),
		description: m.gachapon_item_description_blood_ring(),
		mesh: BloodRing as Component,
		collection: "loot",
		rarity: "exotic",
		author: "quaternius",
	},
];

export const PRICE_MULTIPLIER = 25;

const LICENSES = {
	ccby: {
		icon: CreativeCommonsByLineBusiness,
		label: "CC-BY",
		url: "https://creativecommons.org/licenses/by/3.0",
	},
	cc0: {
		icon: CreativeCommonsZeroLineBusiness,
		label: "CC0",
		url: "https://creativecommons.org/public-domain/cc0",
	},
};

export const AUTHORS = {
	// should be used ONLY as fallback
	unknown: {
		license: LICENSES.cc0,
		name: "Unknown",
		url: "",
	},
	poly: {
		license: LICENSES.ccby,
		name: "Poly by Google",
		url: "https://poly.pizza/u/Poly%20by%20Google",
	},
	quaternius: {
		license: LICENSES.cc0,
		name: "Quaternius",
		url: "https://quaternius.com",
	},
	doncarson: {
		license: LICENSES.ccby,
		name: "Don Carson",
		url: "https://poly.pizza/u/Don%20Carson",
	},
	georgbossenz: {
		license: LICENSES.ccby,
		name: "Georg Bossenz",
		url: "https://poly.pizza/u/Georg%20Bossenz",
	},
	doce: {
		license: LICENSES.cc0,
		name: "Doce Fernandes",
		url: "/",
	},
} as const;

type AuthorId = keyof typeof AUTHORS;

export const PIGGYBANK = {
	quantity: 2,
	interval: 3,
	max: 500,
};
