import { m } from "$lib/paraglide/messages";
import { getLocale } from "$lib/paraglide/runtime";

export const wasPostedThisWeek = (date: Date) => {
	const now = new Date();
	// straight up lie saying a 2 weeks old post was posted this week idc
	const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
	return date >= twoWeeksAgo;
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
	const days = Math.round(
		(today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
	);
	if (days === 0) return m.today();
	if (days === 1) return m.yesterday();
	return m.days_ago({ days });
};

export const readyInDays = (date: Date) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const days = Math.floor(
		(date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
	);
	if (days === 0)
		return m.ready_at({
			time: date.toLocaleTimeString(getLocale(), {
				hour: "2-digit",
				minute: "2-digit",
			}),
		});
	if (days === 1) return m.tommorow();
	return m.ready_in_x_days({ days });
};
