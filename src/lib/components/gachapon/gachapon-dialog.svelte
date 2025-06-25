<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import {
		ArchiveStackFillBusiness,
		ArchiveStackLineBusiness,
		CopperCoinLineFinance,
		GiftFillFinance,
		GiftLineFinance,
		SparklingFillWeather,
		SparklingLineWeather,
	} from "svelte-remix";
	import { cn } from "$lib/utils";
	import { IS_DESKTOP } from "$lib/stores";
	import { fade, fly } from "svelte/transition";
	import { elasticScale } from "$lib/utils/transitions";
	import GachaponPlay from "./gachapon-play.svelte";
	import GachaponRewards from "./gachapon-rewards.svelte";
	import GachaponInventory from "./gachapon-inventory.svelte";
	import { cubicOut, elasticOut } from "svelte/easing";
	import {
		CHA_CHING_AUDIO,
		GAME_DATA,
		GAME_STATE,
		GUMBALL_DISPENSE_AUDIO,
		TWEENED_BALANCE,
		TWEENED_PIGGYBANK_BALANCE,
	} from "./stores";
	import { onMount } from "svelte";
	import { getLocale } from "$lib/paraglide/runtime";
	import { m } from "$lib/paraglide/messages";
	import { giveCoins, giveItem } from "./utils";
	import { ITEMS, PIGGYBANK } from "./constants";
	import { dev } from "$app/environment";

	const TABS = [
		{
			id: "rewards",
			label: m.rewards(),
			icon: GiftLineFinance,
			iconActive: GiftFillFinance,
			content: GachaponRewards,
		},
		{
			id: "play",
			label: m.play_tab(),
			icon: SparklingLineWeather,
			iconActive: SparklingFillWeather,
			content: GachaponPlay,
		},
		{
			id: "inventory",
			label: m.inventory(),
			icon: ArchiveStackLineBusiness,
			iconActive: ArchiveStackFillBusiness,
			content: GachaponInventory,
		},
	] as const;

	let activeTab = $state<(typeof TABS)[number]["id"]>("play");

	onMount(() => {
		GAME_DATA.subscribe(({ balance, piggybank }) => {
			if (!TWEENED_BALANCE) return;
			TWEENED_BALANCE.target = balance;

			if (!TWEENED_PIGGYBANK_BALANCE) return;
			TWEENED_PIGGYBANK_BALANCE.target = piggybank.balance;
		});

		// cheats >:3
		if (dev) {
			window.rosebud = () => giveCoins(1000);
			window.kaching = () => giveCoins(1000);
			window.motherlode = () => giveCoins(50000);
			window.giveAll = () => {
				ITEMS.forEach((item) => giveItem(item));
			};
		}

		const piggybankAfk =
			parseInt(
				(
					(new Date().getTime() -
						new Date($GAME_DATA.piggybank.updatedAt).getTime()) /
					1000 /
					6
				).toString(),
			) & PIGGYBANK.quantityEvery6Seconds;
		if (piggybankAfk > 0) {
			const balanceTarget = $GAME_DATA.piggybank.balance + piggybankAfk;
			$GAME_DATA.piggybank.balance =
				balanceTarget >= PIGGYBANK.max ? PIGGYBANK.max : balanceTarget;
		}

		const piggybankInterval = setInterval(() => {
			if ($GAME_DATA.piggybank.balance >= PIGGYBANK.max) return;
			const balanceTarget =
				$GAME_DATA.piggybank.balance + PIGGYBANK.quantityEvery6Seconds;
			$GAME_DATA.piggybank.balance =
				balanceTarget >= PIGGYBANK.max ? PIGGYBANK.max : balanceTarget;
			$GAME_DATA.piggybank.updatedAt = new Date().toString();
		}, 6000);
		return () => clearInterval(piggybankInterval);
	});
</script>

<Dialog.Body
	class="relative flex flex-col items-center justify-center gap-3 overflow-hidden"
>
	{#if $GAME_STATE === "idle" && activeTab !== "inventory"}
		<div
			transition:fly={{
				easing: cubicOut,
				opacity: 0,
				y: -12,
				duration: 200,
			}}
			class={cn(
				"absolute top-6 flex items-center gap-1.5 rounded border px-3 py-1.5",
				activeTab === "rewards" &&
					"top-0 w-full justify-center rounded-none border-0 border-b lg:top-6 lg:w-fit lg:rounded lg:border",
			)}
		>
			<CopperCoinLineFinance class="size-5 text-amber-500" />
			{Math.floor(TWEENED_BALANCE.current).toLocaleString(getLocale())}
		</div>
	{/if}

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
				"h-auto flex-col gap-0.5 rounded-none py-4 text-sm transition-all md:size-[99px] md:border-b md:border-b-transparent",
				isActive &&
					"text-primary! hover:bg-primary/10! md:border-b-primary md:bg-primary/10! md:border-primary/40!",
			)}
			onclick={() => (activeTab = tab.id)}
			disabled={$GAME_STATE !== "idle"}
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

<audio
	src="/audio/cha-ching.ogg"
	preload="auto"
	controls={false}
	volume={0.5}
	bind:this={$CHA_CHING_AUDIO}
	class="hidden"
></audio>

<audio
	src="/audio/gumball-dispense.ogg"
	preload="auto"
	controls={false}
	volume={0.5}
	bind:this={$GUMBALL_DISPENSE_AUDIO}
	class="hidden"
></audio>
