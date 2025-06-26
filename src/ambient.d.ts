declare module "*.svg?component" {
	import type { Component } from "svelte";

	const content: Component & { class?: string };
	export default content;
}

declare module "*.ttf?arraybuffer" {
	const content: ArrayBuffer;
	export default content;
}
