export const load = async ({ request }) => {
	try {
		const ip = request.headers.get("CF-Connecting-IP");
		if (!ip) return { location: null };

		const resp = await fetch(`http://ip-api.com/json/${ip}`);
		const data = await resp.json();
		if (!data?.lon || !data?.lat) return { location: null };

		return { location: [data.lon, data.lat] } as { location: [number, number] };
	} catch (_error) {
		return { location: null };
	}
};
