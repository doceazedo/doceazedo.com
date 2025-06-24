<script lang="ts">
	import GachaponPrize from "../gachapon-prize.svelte";
	import type { Item } from "../constants";
	import World from "./world.svelte";

	let { item }: { item: Item } = $props();
</script>

<World>
	<GachaponPrize {item} />
</World>
