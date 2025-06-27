import type { ParamMatcher } from "@sveltejs/kit";

export const match = ((param: string) => {
	const code = parseInt(param);
	return code >= 100 && code <= 999;
}) satisfies ParamMatcher;
