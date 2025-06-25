<script lang="ts">
	import { cubicOut } from "svelte/easing";
	import { cn } from "$lib/utils";
	import { CopperCoinLineFinance, Swap2LineFinance } from "svelte-remix";
	import Button from "$lib/components/ui/button/button.svelte";
	import { scale } from "svelte/transition";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import {
		GAME_DATA,
		GAME_STATE,
		IS_GUMBALL_LOADED,
		PRIZE_ITEM,
	} from "./stores";
	import { RARITIES } from "./constants";
	import GumballSkeleton from "$lib/components/icons/gumball.svg?component";
	import { m } from "$lib/paraglide/messages";
	import { Canvas } from "@threlte/core";
	import { WebGLRenderer } from "three";
	import PlayScene from "./scenes/play-scene.svelte";
	import Sunburst from "$lib/components/icons/sunburst.svg?component";

	let playScene = $state<PlayScene>();

	let prizeRarity = $derived(
		RARITIES.find((x) => x.id === $PRIZE_ITEM?.rarity) || RARITIES[0],
	);

	const claimReward = () => ($GAME_STATE = "idle");
</script>

<div class="relative z-10 flex size-full items-center justify-center">
	<Canvas
		createRenderer={(canvas) => {
			return new WebGLRenderer({
				canvas,
				alpha: true,
				preserveDrawingBuffer: true,
			});
		}}
		shadows
	>
		<PlayScene bind:this={playScene} />
	</Canvas>

	{#if $GAME_STATE === "idle"}
		<div
			transition:scale={{
				easing: cubicOut,
				opacity: 0,
				start: 0.9,
				duration: 200,
			}}
			class="absolute bottom-6 flex gap-3"
		>
			<Button
				size="lg"
				class="h-12"
				onclick={() => playScene?.dispense()}
				disabled={$GAME_DATA.balance < 100}
			>
				<div class="flex items-center gap-1">
					<CopperCoinLineFinance class="size-5" />
					<span class={cn($GAME_DATA.balance < 100 && "text-red-800")}>100</span
					>
				</div>
				<hr class="bg-primary-foreground/20 h-1/2 w-px" />
				{m.dispense_now()}
			</Button>
		</div>
	{/if}

	{#if $GAME_STATE === "prize"}
		<div
			transition:scale={{
				easing: cubicOut,
				opacity: 0,
				start: 0.9,
				duration: 200,
			}}
			class="absolute bottom-6"
		>
			<Button variant="outline" onclick={claimReward}>{m.claim()}</Button>
		</div>
	{/if}

	{#if !$IS_GUMBALL_LOADED}
		<GumballSkeleton class="absolute h-[22rem] animate-pulse" />
	{/if}
</div>

<div
	class={cn(
		"absolute flex size-[24rem] scale-200 items-center justify-center opacity-15 transition-all lg:scale-400",
		$GAME_STATE !== "prize" && "scale-50 opacity-0",
	)}
>
	<div class="size-[24rem] overflow-hidden">
		<Sunburst
			class={cn("animation-duration-10000 animate-spin", prizeRarity.textColor)}
		/>
	</div>
	<div
		class="from-background/80 to-background absolute size-full bg-radial to-50%"
	></div>
</div>
<div
	class={cn(
		"absolute h-96 w-2xl rounded-full opacity-15 blur-3xl transition-all dark:opacity-5",
		$GAME_STATE === "prize" ? prizeRarity.bgColor : "bg-primary",
	)}
></div>

<hgroup
	class={cn(
		"ease-elastic absolute top-6 text-center transition-all",
		$GAME_STATE !== "prize" && "scale-50 opacity-0",
	)}
>
	<span
		class={cn(
			"rounded px-1 text-sm font-medium",
			prizeRarity.textColor,
			prizeRarity.badgeColor,
		)}
	>
		{prizeRarity.label}
	</span>
	<h1 class="text-xl md:text-2xl">
		{$PRIZE_ITEM?.label}
	</h1>
</hgroup>
