export const load = async ({ request }) => {
	const ip = request.headers.get("CF-Connecting-IP");
	const [location, vinylCollection] = await Promise.all([
		getGeolocation(ip),
		getVinylCollection(),
	]);
	return {
		location,
		vinylCollection,
	};
};

const getGeolocation = async (
	ip: string | null,
): Promise<[number, number] | null> => {
	try {
		if (!ip) return null;

		const resp = await fetch(`http://ip-api.com/json/${ip}`);
		const data = await resp.json();
		if (!data?.lon || !data?.lat) return null;

		return [data.lon, data.lat];
	} catch (_error) {
		return null;
	}
};

const DISCOGS_BASE_URL = "https://api.discogs.com";
const DISCOGS_USERNAME = "doceazedo";

const getVinylCollection = async () => {
	try {
		const resp = await fetch(
			`${DISCOGS_BASE_URL}/users/${DISCOGS_USERNAME}/collection/folders/0/releases`,
		);
		const data = await resp.json();
		return (
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
			}) || []
		);
	} catch (_error) {
		return [];
	}
};
