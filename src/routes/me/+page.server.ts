export const load = async ({ request }) => {
	const lon = request.headers.get("x-vercel-ip-longitude");
	const lat = request.headers.get("x-vercel-ip-latitude");
	const location: [number, number] | null =
		lon && lat ? [parseFloat(lon), parseFloat(lat)] : null;
	return {
		location,
	};
};
