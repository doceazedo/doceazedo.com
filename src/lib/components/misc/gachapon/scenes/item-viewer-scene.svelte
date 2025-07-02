<script lang="ts">
	import type { Item } from "../types";
	import Prize from "./prize.svelte";
	import World from "./world.svelte";

	let { item }: { item: Item } = $props();
</script>

<World>
	<Prize {item} />
</World>
