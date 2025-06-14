import { FORTNITE_API_KEY, STEAM_API_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";

export const GET = async () => {
	const [steamGames, lastPlayedFortniteAt] = await Promise.all([
		getSteamGames(),
		getFortniteLastPlayedAt(),
	]);
	const nonSteamGames = [
		{
			name: "Fortnite",
			cover: await getGridDbGameCover(36136, "age_desc"),
			url: "https://www.fortnite.com",
			lastPlayedAt: lastPlayedFortniteAt,
			// updatedAt: "2025/06/12 GMT-3",
		},
	];

	return json([...steamGames.slice(0, 4), ...nonSteamGames]);
};

const STEAM_BASE_URL = "http://api.steampowered.com";
const STEAM_ID = "76561198111145117";
const STEAM_BLOCKLIST = [
	404790, // Godot
];

const getSteamGames = async () => {
	try {
		const resp = await fetch(
			`${STEAM_BASE_URL}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`,
		);
		const data = await resp.json();
		return (
			data?.response?.games
				?.filter((x) => !STEAM_BLOCKLIST.includes(x.appid))
				?.map((x) => ({
					name: x.name,
					cover: getGameCover(x.appid),
					url: `https://store.steampowered.com/app/${x.appid}`,
					playtime: x.playtime_2weeks,
				})) || []
		);
	} catch (_error) {
		return [];
	}
};

const _gameCoverByAppId = (appid: number) =>
	`https://steamcdn-a.akamaihd.net/steam/apps/${appid}/library_600x900_2x.jpg`;

const GAME_COVER_OVERRIDES = {
	480: "/img/spacewar.webp",
	3589100: _gameCoverByAppId(2456420),
	3670000: _gameCoverByAppId(2350790),
} as { [appid: number]: string };

const getGameCover = (appid: number) => {
	return GAME_COVER_OVERRIDES?.[appid] || _gameCoverByAppId(appid);
};

const getGridDbGameCover = async (
	id: number,
	order: "age_desc" | "score_desc",
) => {
	try {
		const resp = await fetch(
			"https://www.steamgriddb.com/api/public/search/assets",
			{
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					styles: ["all"],
					languages: ["all"],
					dimensions: ["600x900"],
					formats: ["all"],
					order,
					game_id: [id],
					static: true,
					animated: true,
					nsfw: false,
					epilepsy: true,
					humor: false,
					untagged: true,
					asset_type: "grid",
					page: 0,
					limit: 1,
					user_steam64: null,
					user_steam64_likes: null,
				}),
				method: "POST",
			},
		);
		const data = await resp.json();
		return data?.data?.assets?.[0]?.thumb;
	} catch (error) {
		return "";
	}
};

const FORTNITE_API_BASE_URL = "https://fortnite-api.com/v2";
const FORTNITE_USERNAME = "DoceAzedo911";

const getFortniteLastPlayedAt = async (): Promise<string | null> => {
	try {
		const resp = await fetch(
			`${FORTNITE_API_BASE_URL}/stats/br/v2?name=${FORTNITE_USERNAME}`,
			{
				headers: {
					Authorization: FORTNITE_API_KEY,
				},
			},
		);
		const data = await resp.json();
		return data?.data?.stats?.all?.overall?.lastModified || null;
	} catch (_error) {
		return null;
	}
};
