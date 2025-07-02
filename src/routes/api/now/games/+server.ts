import { FORTNITE_API_KEY, STEAM_API_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";
import SteamUser from "steam-user";

const GAME_COVER_OVERRIDES = {
	fortnite: "/img/games/fortnite.webp",
	480: "/img/games/spacewar.webp",
} as { [appid: number | string]: string };
const STEAM_BASE_URL = "http://api.steampowered.com";
const STEAM_ID = "76561198111145117";
const STEAM_BLOCKLIST = [
	404790, // Godot
];
const FORTNITE_API_BASE_URL = "https://fortnite-api.com/v2";
const FORTNITE_USERNAME = "DoceAzedo911";

let steam: SteamUser | null = null;

export const GET = async () => {
	if (!steam) {
		steam = new SteamUser();
		steam.logOn({ anonymous: true });
		await new Promise<void>((resolve, reject) => {
			if (!steam) return reject();
			steam.on("loggedOn", () => resolve());
		});
	}

	const [steamGames, lastPlayedFortniteAt] = await Promise.all([
		getSteamGames(),
		getFortniteLastPlayedAt(),
	]);
	const nonSteamGames = [
		{
			name: "Fortnite",
			cover: await getGameCover("fortnite"),
			url: "https://www.fortnite.com",
			lastPlayedAt: lastPlayedFortniteAt,
		},
	];

	return json([...steamGames.slice(0, 4), ...nonSteamGames]);
};

const getSteamGames = async () => {
	try {
		const resp = await fetch(
			`${STEAM_BASE_URL}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`,
		);
		const data = await resp.json();
		if (!data?.response?.games) return [];

		return await Promise.all(
			data.response.games
				.filter((x: { appid: number }) => !STEAM_BLOCKLIST.includes(x.appid))
				.map(
					async (x: {
						name: string;
						appid: number;
						playtime_2weeks: string;
					}) => ({
						name: x.name,
						cover: await getGameCover(x.appid),
						url: `https://store.steampowered.com/app/${x.appid}`,
						playtime: x.playtime_2weeks,
					}),
				),
		);
	} catch (_error) {
		return [];
	}
};

const _gameSteamAppCover = async (appid: number) => {
	if (!steam) return null;

	const app = await steam.getProductInfo([appid], [], true);
	const appInfo = app.apps[appid].appinfo;
	const libraryCapsule = appInfo?.common?.library_assets_full?.library_capsule;
	const cover =
		libraryCapsule?.image2x?.english || libraryCapsule?.image?.english;
	return cover
		? `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/${cover}`
		: `https://placehold.co/600x900?text=${encodeURIComponent(appInfo.common.name)}`;
};

const getGameCover = async (appid: number | string) => {
	const overrideCover = GAME_COVER_OVERRIDES?.[appid];
	if (overrideCover) return overrideCover;
	if (typeof appid !== "number") return null;
	return await _gameSteamAppCover(appid);
};

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
