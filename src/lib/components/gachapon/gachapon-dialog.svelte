<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import {
		ArchiveStackFillBusiness,
		ArchiveStackLineBusiness,
		GiftFillFinance,
		GiftLineFinance,
		SparklingFillWeather,
		SparklingLineWeather,
	} from "svelte-remix";
	import { cn } from "$lib/utils";
	import { IS_DESKTOP } from "$lib/stores";
	import { fade } from "svelte/transition";
	import { elasticScale } from "$lib/utils/transitions";
	import GachaponPlay from "./gachapon-play.svelte";
	import GachaponRewards from "./gachapon-rewards.svelte";
	import GachaponInventory from "./gachapon-inventory.svelte";
	import { elasticOut } from "svelte/easing";

	const TABS = [
		{
			id: "rewards",
			label: "Rewards",
			icon: GiftLineFinance,
			iconActive: GiftFillFinance,
			content: GachaponRewards,
		},
		{
			id: "play",
			label: "Play",
			icon: SparklingLineWeather,
			iconActive: SparklingFillWeather,
			content: GachaponPlay,
		},
		{
			id: "inventory",
			label: "Inventory",
			icon: ArchiveStackLineBusiness,
			iconActive: ArchiveStackFillBusiness,
			content: GachaponInventory,
		},
	] as const;

	let activeTab = $state<(typeof TABS)[number]["id"]>("play");
</script>

<Dialog.Body class="relative overflow-hidden">
	{#key activeTab}
		{@const tab = TABS.find((x) => x.id === activeTab)}
		{#if tab}
			<div
				class="absolute top-0 left-0 flex size-full items-center justify-center"
				in:elasticScale|global={{
					easing: elasticOut,
					start: 0.9,
					duration: 8000,
				}}
			>
				<tab.content />
			</div>
		{/if}
	{/key}
</Dialog.Body>
<Dialog.Footer
	class="grid grid-cols-3 p-0 md:absolute md:right-12 md:flex md:h-[101px] md:flex-row md:justify-center md:gap-0 md:border-t-0 md:p-0"
>
	{#each TABS as tab}
		{@const isActive = activeTab === tab.id}
		{@const Icon = isActive ? tab.iconActive : tab.icon}
		<Button
			variant="ghost"
			class={cn(
				"h-auto flex-col gap-0.5 rounded-none py-4 text-sm transition-all md:aspect-square md:border-b md:border-b-transparent",
				isActive &&
					"text-primary! hover:bg-primary/10! md:border-b-primary md:bg-primary/10! md:border-primary/40!",
			)}
			onclick={() => (activeTab = tab.id)}
		>
			<span class="relative size-5">
				{#key isActive}
					<span class="absolute flex" transition:fade={{ duration: 100 }}>
						<Icon class={cn("text-body size-5", isActive && "text-primary")} />
					</span>
				{/key}
			</span>
			{tab.label}
		</Button>
	{/each}
</Dialog.Footer>
