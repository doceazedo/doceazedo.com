import {
	BlueskyLineLogos,
	DiscordLineLogos,
	GithubLineLogos,
	InstagramLineLogos,
	LinkedinBoxLineLogos,
	SoundcloudLineLogos,
	SteamLineLogos,
	TwitchLineLogos,
	YoutubeLineLogos,
} from "svelte-remix";
import { m } from "$lib/paraglide/messages";
import { siBandcamp, siDiscogs, siLastdotfm } from "simple-icons";

export const DOMAIN = "doce.sh";

export const MY_LOCATION: [number, number] = [-43.938, -19.92]; // Belo Horizonte

export const DEBUG_LOCATION: [number, number] = [-71.077, -8.797]; // Acre

export const SOCIALS = {
	github: {
		icon: GithubLineLogos,
		url: "https://github.com/doceazedo",
		label: "GitHub",
	},
	linkedin: {
		icon: LinkedinBoxLineLogos,
		url: "https://www.linkedin.com/in/doceazedo",
		label: "LinkedIn",
	},
	bluesky: {
		icon: BlueskyLineLogos,
		url: "https://bsky.app/profile/doceazedo.com",
		label: "Bluesky",
	},
	instagram: {
		icon: InstagramLineLogos,
		url: "https://instagram.com/doceazedo911",
		label: "Instagram",
	},
	discord: {
		icon: DiscordLineLogos,
		url: "https://discord.gg/vEGRe2kq8B",
		label: "Discord",
	},
	steam: {
		icon: SteamLineLogos,
		url: "https://soundcloud.com/doceazedo",
		label: "Steam",
	},
	youtube: {
		icon: YoutubeLineLogos,
		url: "https://www.youtube.com/@DoceAzedo",
		label: "YouTube",
	},
	twitch: {
		icon: TwitchLineLogos,
		url: "https://www.twitch.tv/doceazedo911",
		label: "Twitch",
	},
	soundcloud: {
		icon: SoundcloudLineLogos,
		url: "https://soundcloud.com/doceazedo",
		label: "SoundCloud",
	},
	bandcamp: {
		icon: siBandcamp.svg,
		url: "https://doceazedo.bandcamp.com",
		label: "Bandcamp",
	},
	lastfm: {
		icon: siLastdotfm.svg,
		url: "https://www.last.fm/user/doceazedo911",
		label: "Last.fm",
	},
	discogs: {
		icon: siDiscogs.svg,
		url: "https://www.discogs.com/user/doceazedo",
		label: "Discogs",
	},
};

export const WORK = {
	company: "Rail Europe",
	url: "https://www.linkedin.com/company/1528184",
	position: m.work_position(),
	description: m.work_description({ since: 2024 }),
};

export const EMAIL = "doce@doceazedo.com";

export const MEMOJI_HOVER_ACHIEVEMENT_THRESHOLD = 5;
