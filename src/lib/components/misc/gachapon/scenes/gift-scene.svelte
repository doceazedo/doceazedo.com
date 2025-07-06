<script lang="ts">
	import { Tween } from "svelte/motion";
	import Present from "../models/present.svelte";
	import { GAME_STATE, GIFT_ITEM } from "../stores";
	import World from "./world.svelte";
	import { cubicOut, expoOut } from "svelte/easing";
	import { degToRad } from "three/src/math/MathUtils.js";
	import Prize from "./prize.svelte";
	import { giveCoins, giveItem } from "../game";
	import { sleep } from "$lib/utils";
	import { T, useTask } from "@threlte/core";
	import { tick } from "svelte";
	import { playAudio } from "$lib/audio";

	let { flashTweener }: { flashTweener: Tween<number> } = $props();

	const presentTweener = {
		lidY: new Tween(0, {
			easing: expoOut,
			duration: 2500,
		}),
		boxY: new Tween(0, {
			easing: expoOut,
			duration: 2500,
		}),
		scale: new Tween(1, {
			easing: cubicOut,
			duration: 100,
		}),
	};

	const prizeTweener = {
		scale: new Tween(0, {
			easing: cubicOut,
			duration: 400,
		}),
		rotation: new Tween(0, {
			easing: cubicOut,
			duration: 1600,
		}),
	};

	let isShaking = $state(false);

	export const unwrap = async () => {
		if (!$GIFT_ITEM) return;
		$GAME_STATE = "gift-unwrapping";

		playAudio("gift-open");

		presentTweener.scale.set(0.9, { duration: 300 });
		await sleep(200);
		isShaking = true;
		await sleep(1500);
		isShaking = false;
		presentTweener.scale.set(0.9, { duration: 0 });

		presentTweener.lidY.target = 1.25;
		presentTweener.boxY.target = -1.25;

		await tick();
		flashTweener.set(1, { duration: 0 });

		$GAME_STATE = "prize";

		await tick();
		flashTweener.target = 0;

		if ($GIFT_ITEM.type === "item") {
			prizeTweener.scale.target = 1;
			prizeTweener.rotation.target = degToRad(360 * 2);
			giveItem($GIFT_ITEM.item);
			return;
		}

		giveCoins($GIFT_ITEM.amount);
	};

	useTask((delta) => {
		if (!isShaking) return;
		presentTweener.scale.target = 1 + Math.random() * 0.1;
	});
</script>

<World>
	<Present
		boxY={presentTweener.boxY.current}
		lidY={presentTweener.lidY.current}
		scale={presentTweener.scale.current}
	/>

	{#if $GIFT_ITEM && $GIFT_ITEM.type === "item"}
		<Prize
			item={$GIFT_ITEM.item}
			scale={prizeTweener.scale.current}
			rotationY={prizeTweener.rotation.current}
		/>
	{/if}

	{#if $GAME_STATE !== "prize"}
		<T.AmbientLight intensity={0.5} />
	{/if}
</World>
