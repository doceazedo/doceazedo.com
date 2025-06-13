import { m } from "$lib/paraglide/messages";
import { getLocale } from "$lib/paraglide/runtime";

export const wasPostedThisWeek = (date: Date) => {
	const now = new Date();
	const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	return date >= oneWeekAgo;
};

export const postedAt = (date: Date) => {
	if (wasPostedThisWeek(date)) return m.published_this_week();

	const now = new Date();
	if (date.getFullYear() === now.getFullYear()) {
		return date.toLocaleDateString(getLocale(), { month: "long" });
	}

	return date.toLocaleDateString(getLocale(), {
		month: "long",
		year: "numeric",
	});
};

export const daysAgo = (date: Date) => {
	const today = new Date();
	return Math.round((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
};
