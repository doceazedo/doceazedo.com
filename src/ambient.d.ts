declare module "*.svg?component" {
	import type { Component } from "svelte";

	const content: Component & { class?: string };
	export default content;
}
