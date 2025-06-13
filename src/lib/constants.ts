import {
	BlueskyLineLogos,
	DiscordLineLogos,
	GithubLineLogos,
	InstagramLineLogos,
	LinkedinBoxLineLogos,
	Music2FillMedia,
	SoundcloudLineLogos,
	SteamLineLogos,
} from "svelte-remix";
import { m } from "$lib/paraglide/messages";

export const MY_LOCATION: [number, number] = [-43.938, -19.92]; // Belo Horizonte

export const DEBUG_LOCATION: [number, number] = [-71.077, -8.797]; // Acre

export const SOCIALS = {
	github: { icon: GithubLineLogos, url: "https://github.com/doceazedo" },
	linkedin: {
		icon: LinkedinBoxLineLogos,
		url: "https://www.linkedin.com/in/doceazedo",
	},
	bluesky: {
		icon: BlueskyLineLogos,
		url: "https://bsky.app/profile/doceazedo.com",
	},
	instagram: {
		icon: InstagramLineLogos,
		url: "https://instagram.com/doceazedo911",
	},
	discord: { icon: DiscordLineLogos, url: "https://discord.gg/vEGRe2kq8B" },
	lastfm: {
		icon: Music2FillMedia,
		url: "https://www.last.fm/user/doceazedo911",
	},
	soundcloud: {
		icon: SoundcloudLineLogos,
		url: "https://soundcloud.com/doceazedo",
	},
	steam: { icon: SteamLineLogos, url: "https://soundcloud.com/doceazedo" },
};

export const WORK = {
	company: "Rail Europe",
	url: "https://www.linkedin.com/company/1528184",
	position: m.work_position(),
	description: m.work_description({ since: 2024 }),
};
