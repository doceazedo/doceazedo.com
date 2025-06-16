import { elasticOut, expoOut, linear } from "svelte/easing";

export const elasticFly = (
	node: Element,
	{
		delay = 0,
		duration = 400,
		easing = linear,
		x = 0,
		y = 0,
		opacity = 0,
	} = {},
) => {
	const style = getComputedStyle(node);
	const targetOpacity = +style.opacity;
	const transform = style.transform === "none" ? "" : style.transform;

	return {
		delay,
		duration,
		easing,
		css: (t: number, _u: number) => {
			const easedTransform = elasticOut(t);
			const easedOpacity = 1 - expoOut(t);

			return `
        transform: ${transform} translate(${(1 - easedTransform) * x}px, ${(1 - easedTransform) * y}px);
        opacity: ${1 - targetOpacity * easedOpacity}`;
		},
	};
};

export const elasticScale = (
	node: Element,
	{ delay = 0, duration = 400, easing = linear, start = 0, opacity = 0 } = {},
) => {
	const style = getComputedStyle(node);
	const targetOpacity = +style.opacity;
	const transform = style.transform === "none" ? "" : style.transform;
	const sd = 1 - start;
	const od = targetOpacity * (1 - opacity);
	return {
		delay,
		duration,
		easing,
		css: (t: number, _u: number) => {
			const easedTransform = 1 - elasticOut(t);
			const easedOpacity = 1 - expoOut(t);

			return `
				transform: ${transform} scale(${1 - sd * easedTransform});
				opacity: ${targetOpacity - od * easedOpacity}`;
		},
	};
};
