<script lang="ts">
	import Prize from "./prize.svelte";
	import type { Item } from "../constants";
	import World from "./world.svelte";

	let { item }: { item: Item } = $props();
</script>

<World>
	<Prize {item} />
</World>
