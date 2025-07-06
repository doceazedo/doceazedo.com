import { get, writable } from "svelte/store";
import { storage } from "./utils/storage";

const AUDIO_URLS = new Map([
	["hotel", "/audio/toby-fox-hotel.ogg"],
	[
		"can-you-really-call-this-a-hotel",
		"/audio/toby-fox-can-you-really-call-this-a-hotel-i-didn-t-receive-a-mint-on-my-pillow-or-anything.ogg",
	],
	["chime", "/audio/chime.ogg"],
	["fidget-spinner", "/audio/fidget-spinner.ogg"],
	["cha-ching", "/audio/cha-ching.ogg"],
	["gumball-dispense", "/audio/gumball-dispense.ogg"],
	["gift-open", "/audio/gift-open.ogg"],
	["minecraft-xp", "/audio/minecraft-xp.ogg"],
	["bus-horn", "/audio/fortnite-bus-horn.ogg"],
] as const);

type AudioId =
	typeof AUDIO_URLS extends ReadonlyMap<infer K, unknown> ? K : never;

export const AUDIO_ELEMENTS = new Map<AudioId, HTMLAudioElement>();

export const SOUND_ENABLED = storage(writable(true), "sound_enabled");

export const DEFAULT_VOLUME = 0.4;

export const createAndPreloadAudio = () => {
	[...AUDIO_URLS].forEach(([id, url]) => {
		const audio = document.createElement("audio");
		audio.src = url;
		audio.volume = DEFAULT_VOLUME;
		audio.preload = "auto";
		audio.load();

		AUDIO_ELEMENTS.set(id, audio);
	});
};

export const playAudio = (audioId: AudioId) => {
	if (!get(SOUND_ENABLED)) return;

	const audio = AUDIO_ELEMENTS.get(audioId);
	if (!audio) {
		console.warn(`Audio not found for ID: "${audioId}"`);
		return;
	}

	audio.currentTime = 0;
	audio.play();
};

export const pauseAudio = (audioId: AudioId) => {
	const audio = AUDIO_ELEMENTS.get(audioId);
	if (!audio) {
		console.warn(`Audio not found for ID: "${audioId}"`);
		return;
	}
	audio.pause();
	audio.currentTime = 0;
};
