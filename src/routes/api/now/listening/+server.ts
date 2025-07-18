import { LAST_FM_API_KEY } from "$env/static/private";
import type { NowPlayingTrack } from "$lib/types";
import { json } from "@sveltejs/kit";

const LAST_FM_BASE_URL = "http://ws.audioscrobbler.com/2.0";
const LAST_FM_USERNAME = "doceazedo911";

export const GET = async ({ url }) => {
	try {
		const resp = await fetch(
			`${LAST_FM_BASE_URL}/?method=user.getrecenttracks&user=${LAST_FM_USERNAME}&api_key=${LAST_FM_API_KEY}&format=json`,
		);
		const data = await resp.json();

		const tracks: NowPlayingTrack[] = data?.recenttracks?.track?.map(
			(track) => ({
				artist: track.artist["#text"],
				track: track.name,
				cover: track?.image?.[2]?.["#text"] || null,
				nowPlaying: track?.["@attr"]?.nowplaying === "true",
				playedAt: track?.date?.uts ? parseInt(track?.date?.uts) * 1000 : null,
			}),
		);
		if (!tracks.length) return json(null);

		const limit = parseInt(url.searchParams.get("limit") || "0");
		if (!limit) return json(tracks[0]);

		return json(tracks.slice(0, limit));
	} catch (_error) {
		return json(null);
	}
};
