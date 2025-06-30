import { storage } from "$lib/utils/storage";
import { cubicOut } from "svelte/easing";
import { Tween } from "svelte/motion";
import { get, writable } from "svelte/store";
import type { Item } from "./constants";

export const GAME_STATE = writable<"idle" | "drawing" | "prize">("idle");

type GameData = {
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

export const CHA_CHING_AUDIO = writable<HTMLAudioElement>();

export const GUMBALL_DISPENSE_AUDIO = writable<HTMLAudioElement>();

export const TWEENED_PIGGYBANK_BALANCE = new Tween(
	get(GAME_DATA).piggybank.balance,
	{
		duration: 800,
		easing: cubicOut,
	},
);

export const PRIZE_ITEM = writable<Item | null>(null);

export const IS_GUMBALL_LOADED = writable(false);
