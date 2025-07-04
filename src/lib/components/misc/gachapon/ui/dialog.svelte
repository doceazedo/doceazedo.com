<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { elasticScale } from "$lib/utils/transitions";
	import { elasticOut } from "svelte/easing";
	import Tabs from "./tabs.svelte";
	import Balance from "./balance.svelte";
	import { ACTIVE_TAB } from "../stores";
	import { initializeGame } from "../game";
	import { onMount } from "svelte";
	import { TABS } from "../constants";

	onMount(initializeGame);
</script>

<Dialog.Body
	class="relative flex flex-col items-center justify-center gap-3 overflow-hidden"
>
	<Balance />

	{#key $ACTIVE_TAB}
		{@const view = TABS.find((x) => x.id === $ACTIVE_TAB)}
		{#if view}
			<div
				class="absolute top-0 left-0 flex size-full items-center justify-center"
				in:elasticScale|global={{
					easing: elasticOut,
					start: 0.9,
					duration: 8000,
				}}
			>
				<view.content />
			</div>
		{/if}
	{/key}
</Dialog.Body>

<Dialog.Footer
	class="grid grid-cols-3 p-0 md:absolute md:right-12 md:flex md:h-[101px] md:flex-row md:justify-center md:gap-0 md:border-t-0 md:p-0"
>
	<Tabs />
</Dialog.Footer>
