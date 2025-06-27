import { writable } from "svelte/store";
import type { NowPlayingTrack } from "./types";

export const LAST_PLAYED_TRACKS = writable<NowPlayingTrack[] | null>(null);

export const IS_DESKTOP = writable(false);

export const MEMOJI_BLINK_COUNT = writable(0);
