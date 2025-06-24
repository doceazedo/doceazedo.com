import { storage } from "$lib/utils/storage";
import { cubicOut } from "svelte/easing";
import { Tween } from "svelte/motion";
import { get, writable } from "svelte/store";
import type { Item } from "./constants";

export const GAME_STATE = writable<
	"idle" | "drawing" | "prize" | "play_request"
>("idle");

export const GAME_DATA = storage(
	writable<{
		balance: number;
		inventory: {
			item: string;
			quantity: number;
			firstAt: string;
			lastAt: string;
		}[];
	}>({
		balance: 500,
		inventory: [],
	}),
	"gachapon_data",
	true,
);

export const TWEENED_BALANCE = new Tween(get(GAME_DATA).balance, {
	easing: cubicOut,
	duration: 800,
});

export const ORDER_BY = storage(writable("recent"), "gachapon_order_by");

export const CHA_CHING_AUDIO = writable<HTMLAudioElement>();

export const PIGGYBANK_BALANCE = new Tween(0, {
	duration: 300,
	easing: cubicOut,
});

export const PRIZE_ITEM = writable<Item | null>(null);

export const IS_GUMBALL_LOADED = writable(false);
