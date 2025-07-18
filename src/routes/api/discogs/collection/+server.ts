import { json } from "@sveltejs/kit";

const DISCOGS_BASE_URL = "https://api.discogs.com";
const DISCOGS_USERNAME = "doceazedo";

export const GET = async () => {
	try {
		const resp = await fetch(
			`${DISCOGS_BASE_URL}/users/${DISCOGS_USERNAME}/collection/folders/0/releases`,
		);
		const data = await resp.json();
		return json(
			data?.releases?.map((x) => {
				let artist = x.basic_information.artists[0].name;
				if (artist.endsWith(")")) {
					artist = artist.slice(0, -4);
				}

				return {
					cover: x.basic_information.cover_image,
					artist,
					title: x.basic_information.title,
				};
			}) || [],
		);
	} catch (_error) {
		return json([]);
	}
};
