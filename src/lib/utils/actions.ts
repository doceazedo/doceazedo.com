import type { ActionReturn } from "svelte/action";

export const onVisible = (
	node: HTMLElement,
	callback: () => void,
): ActionReturn => {
	let observer: IntersectionObserver;
	new IntersectionObserver(
		(entries, _observer) => {
			observer = _observer;
			entries.forEach((entry) => {
				if (entry.intersectionRatio >= 0.5) {
					callback();
					observer.disconnect();
				}
			});
		},
		{ threshold: 0.5 },
	).observe(node);

	return {
		update: () => {},
		destroy: () => observer?.disconnect(),
	};
};
