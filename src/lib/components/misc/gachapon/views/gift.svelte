<script lang="ts">
	import { Canvas } from "@threlte/core";
	import { WebGLRenderer } from "three";
	import GiftScene from "../scenes/gift-scene.svelte";
	import { cn } from "$lib/utils";
	import { GAME_STATE, GIFT_ITEM } from "../stores";
	import Sunburst from "$lib/components/icons/sunburst.svg?component";
	import { Button } from "$lib/components/ui/button";
	import { CopperCoinLineFinance, GiftLineFinance } from "svelte-remix";
	import { scale } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { CAPSULE_PALETTE, RARITIES } from "../constants";
	import { m } from "$lib/paraglide/messages";
	import { Tween } from "svelte/motion";
	import { confetti } from "@neoconfetti/svelte";

	let giftRarity = $derived(
		RARITIES.find(
			(x) => $GIFT_ITEM?.type === "item" && x.id === $GIFT_ITEM.item.rarity,
		) || RARITIES[0],
	);

	let giftScene = $state<GiftScene>();
	let flashTweener = new Tween(0, {
		easing: cubicOut,
		duration: 300,
	});

	const claimGift = () => {
		$GIFT_ITEM = null;
		$GAME_STATE = "idle";
	};
</script>

<div class="absolute z-50 flex size-full items-center justify-center">
	<Canvas
		createRenderer={(canvas) => {
			return new WebGLRenderer({
				canvas,
				alpha: true,
				preserveDrawingBuffer: true,
			});
		}}
	>
		<GiftScene bind:this={giftScene} {flashTweener} />
	</Canvas>
</div>

<div class="bg-background/80 absolute z-40 size-full backdrop-blur-2xl"></div>

<div
	class={cn(
		"absolute z-40 size-96 rounded-full opacity-15 blur-3xl transition-all dark:opacity-10",
		$GAME_STATE === "prize"
			? $GIFT_ITEM?.type === "item"
				? giftRarity.bgColor
				: "bg-amber-500"
			: "scale-50 opacity-0",
	)}
></div>

<div
	class={cn(
		"absolute z-40 flex size-[24rem] scale-200 items-center justify-center opacity-15 transition-all lg:scale-300",
	)}
>
	<div class="size-[24rem] overflow-hidden">
		<Sunburst
			class={cn(
				"animation-duration-10000 animate-spin",
				$GAME_STATE === "prize" &&
					($GIFT_ITEM?.type === "item"
						? giftRarity.textColor
						: "text-amber-500"),
			)}
		/>
	</div>
	<div
		class="from-background/80 to-background absolute size-full bg-radial to-50%"
	></div>
</div>

{#if $GAME_STATE === "gift-idle"}
	<h1
		transition:scale={{
			easing: cubicOut,
			opacity: 0,
			start: 0.9,
			duration: 200,
		}}
		class="absolute top-6 z-50 text-xl md:text-2xl"
	>
		{m.gachapon_gift_title()}
	</h1>
	<div
		class="absolute bottom-6 z-50 flex"
		transition:scale={{
			easing: cubicOut,
			opacity: 0,
			start: 0.9,
			duration: 200,
		}}
	>
		<Button size="lg" class="h-12" onclick={() => giftScene?.unwrap()}>
			<GiftLineFinance class="size-5" />
			{m.gachapon_open_gift()}
		</Button>
	</div>
{/if}

{#if $GIFT_ITEM?.type === "item"}
	<hgroup
		class={cn(
			"ease-elastic absolute top-6 z-50 text-center transition-all",
			$GAME_STATE !== "prize" && "scale-50 opacity-0",
		)}
	>
		<span
			class={cn(
				"rounded px-1 text-sm font-medium",
				giftRarity.textColor,
				giftRarity.badgeColor,
			)}
		>
			{giftRarity.label}
		</span>
		<h1 class="text-xl md:text-2xl">
			{$GIFT_ITEM.item.label}
		</h1>
	</hgroup>
{/if}

{#if $GIFT_ITEM?.type === "coins"}
	<p
		class={cn(
			"ease-elastic absolute z-40 flex items-center gap-3 text-5xl transition-all duration-300",
			$GAME_STATE !== "prize" && "scale-0",
		)}
	>
		<CopperCoinLineFinance class="size-12 text-amber-500" />
		{m.x_coins({
			quantity: $GIFT_ITEM.amount,
		})}
	</p>
{/if}

{#if $GAME_STATE === "prize"}
	<div
		transition:scale={{
			easing: cubicOut,
			opacity: 0,
			start: 0.9,
			duration: 200,
		}}
		class="absolute bottom-6 z-50"
	>
		<Button variant="outline" onclick={claimGift}>{m.claim()}</Button>
	</div>

	<div
		class="pointer-events-none absolute size-full"
		use:confetti={{ force: 1, colors: CAPSULE_PALETTE }}
	></div>
{/if}

<div
	class="pointer-events-none absolute z-50 size-full bg-white/70 blur-3xl"
	style="opacity:{flashTweener.current}"
></div>
