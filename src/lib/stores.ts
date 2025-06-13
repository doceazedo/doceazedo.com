import { writable } from "svelte/store";
import type { NowPlayingTrack } from "./types";

export const LAST_PLAYED_TRACKS = writable<NowPlayingTrack[] | null>(null);
