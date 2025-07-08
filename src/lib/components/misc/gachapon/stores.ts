import { storage } from "$lib/utils/storage";
import { cubicOut } from "svelte/easing";
import { Tween } from "svelte/motion";
import { get, writable } from "svelte/store";
import type { GameData, Gift, Item } from "./types";

export const GAME_STATE = writable<
	"idle" | "drawing" | "gift-idle" | "gift-unwrapping" | "prize"
>("idle");

export const ACTIVE_TAB = writable<"rewards" | "play" | "inventory">("play");

const EMPTY_GAME_DATA: GameData = {
	balance: 500,
	piggybank: {
		balance: 0,
		updatedAt: new Date().toString(),
	},
	inventory: [],
	dailyRewards: {
		startedAt: (() => {
			const now = new Date();
			now.setHours(0, 0, 0, 0);
			return `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
		})(),
		streak: -1,
	},
};

export const GAME_DATA = storage(
	writable<GameData>({ ...EMPTY_GAME_DATA }),
	"gachapon_data",
	true,
	{ ...EMPTY_GAME_DATA },
);

export const TWEENED_BALANCE = new Tween(get(GAME_DATA).balance, {
	easing: cubicOut,
	duration: 800,
});

export const ORDER_BY = storage(writable("collection"), "gachapon_order_by");

export const TWEENED_PIGGYBANK_BALANCE = new Tween(
	get(GAME_DATA).piggybank.balance,
	{
		duration: 800,
		easing: cubicOut,
	},
);

export const PRIZE_ITEM = writable<Item | null>(null);

export const LAST_PRIZE_ID = writable<string | null>(null);

export const GIFT_ITEM = writable<Gift | null>(null);

export const IS_GUMBALL_LOADED = writable(false);

export const IS_INVENTORY_BALANCE_VISIBLE = writable(true);
