import { storage } from "$lib/utils/storage";
import { cubicOut } from "svelte/easing";
import { Tween } from "svelte/motion";
import { get, writable } from "svelte/store";

export const GAME_STATE = writable<"idle" | "drawing" | "prize">("idle");

export const BALANCE = storage(writable(500), "gachapon_balance");

export const TWEENED_BALANCE = new Tween(get(BALANCE), {
	easing: cubicOut,
	duration: 800,
});
