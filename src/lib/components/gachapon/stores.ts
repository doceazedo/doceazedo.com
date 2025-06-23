import { storage } from "$lib/utils/storage";
import { cubicOut } from "svelte/easing";
import { Tween } from "svelte/motion";
import { get, writable } from "svelte/store";

export const GAME_STATE = writable<"idle" | "drawing" | "prize">("idle");

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

export const ORDER_BY = writable("recent");
