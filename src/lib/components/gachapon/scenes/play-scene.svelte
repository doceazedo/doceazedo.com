<script lang="ts">
	import { T, useTask } from "@threlte/core";
	import Gumball from "../models/gumball.svelte";
	import { degToRad } from "three/src/math/MathUtils.js";
	import Capsule from "../models/capsule.svelte";
	import { browser } from "$app/environment";
	import type { RigidBody } from "@dimforge/rapier3d-compat";
	import { Tween } from "svelte/motion";
	import { bounceOut, cubicOut, elasticOut, expoOut } from "svelte/easing";
	import { shuffleArray, sleep } from "$lib/utils";
	import { onMount, tick } from "svelte";
	import {
		GAME_DATA,
		GAME_STATE,
		GUMBALL_DISPENSE_AUDIO,
		IS_GUMBALL_LOADED,
		PRIZE_ITEM,
	} from "../stores";
	import { ITEMS, RARITIES, type Item } from "../constants";
	import GachaponPrize from "../gachapon-prize.svelte";
	import World from "./world.svelte";
	import { giveItem } from "../utils";
	import type { Group, Object3DEventMap } from "three";

	const getSpherePosition = (
		index: number,
		radius: number,
	): [number, number, number] => {
		const center: [number, number, number] = [-0.1, 2.4, 0.2];
		if (index === 0) return center;

		const phi = Math.acos(1 - (2 * index) / (radius + 1)); // vertical angle
		const theta = Math.PI * (1 + Math.sqrt(5)) * index; // golden angle

		const r = (index / radius) * radius * 0.025;

		const x = r * Math.sin(phi) * Math.cos(theta) + center[0];
		const y = r * Math.sin(phi) * Math.sin(theta) + center[1];
		const z = r * Math.cos(phi) + center[2];

		return [x, y, z];
	};

	let capsules: RigidBody[] = [];
	let gravity = $state<[number, number, number]>([0, -9.81, 0]);

	const INITIAL_PRIZE_POSITION = [0.4, 0.7, 0] as const;
	const INITIAL_PRIZE_UP_POSITION = [0, 0, 0] as const;
	const INITIAL_PRIZE_DOWN_POSITION = [0, 0.2, 0] as const;
	const capsulePosition = new Tween<[number, number, number]>(
		[...INITIAL_PRIZE_POSITION],
		{
			easing: bounceOut,
			duration: 1600,
		},
	);
	const capUpPosition = new Tween<[number, number, number]>(
		[...INITIAL_PRIZE_UP_POSITION],
		{
			easing: expoOut,
			duration: 600,
		},
	);
	const capDownPosition = new Tween<[number, number, number]>(
		[...INITIAL_PRIZE_DOWN_POSITION],
		{
			easing: expoOut,
			duration: 600,
		},
	);
	const capsuleScale = new Tween<[number, number, number]>([1, 1, 1], {
		easing: cubicOut,
		duration: 800,
	});
	let capsuleColor = $state("#000000");

	const prizeScale = new Tween<[number, number, number]>([0, 0, 0], {
		easing: cubicOut,
		duration: 800,
	});
	const prizeRotation = new Tween(0, {
		easing: cubicOut,
		duration: 1600,
	});

	const gumballPosition = new Tween<[number, number, number]>([0, 2.5, 0], {
		easing: elasticOut,
		duration: 800,
	});
	const gumballScale = new Tween<[number, number, number]>([1, 1, 1], {
		easing: cubicOut,
		duration: 300,
	});

	const coinMeshRotation = new Tween(0, {
		easing: elasticOut,
		duration: 5000,
	});

	const CAPSULE_COLORS = shuffleArray([
		"#ef4444",
		"#f97316",
		"#f59e0b",
		"#eab308",
		"#84cc16",
		"#22c55e",
		"#10b981",
		"#14b8a6",
		"#06b6d4",
		"#0ea5e9",
		"#3b82f6",
		"#6366f1",
		"#8b5cf6",
		"#a855f7",
		"#d946ef",
		"#ec4899",
		"#f43f5e",
	]);
	const CAPSULES_MULTIPLIER = 2;

	const resetPositions = () => {
		capsulePosition.set([...INITIAL_PRIZE_POSITION], { duration: 0 });
		capUpPosition.set([...INITIAL_PRIZE_UP_POSITION], {
			duration: 0,
		});
		capDownPosition.set([...INITIAL_PRIZE_DOWN_POSITION], {
			duration: 0,
		});
		capsuleScale.set([1, 1, 1], { duration: 0 });
		gumballPosition.set([0, 2.5, 0], { duration: 0 });
		coinMeshRotation.set(0, { duration: 0 });
		prizeScale.target = [0, 0, 0];
		prizeRotation.target = 0;
		gumballScale.target = [1, 1, 1];
	};

	const getRandomRarity = () => {
		const rand = Math.random();
		let sum = 0;
		return (
			RARITIES.find((rarity) => {
				sum += rarity.odds;
				return rand < sum;
			})?.id || RARITIES[RARITIES.length - 1].id
		);
	};

	const getRandomItem = () => {
		const rarity = getRandomRarity();
		const filteredItems = ITEMS.filter((x) => x.rarity === rarity);
		return filteredItems[Math.floor(Math.random() * filteredItems.length)];
	};

	const dispense = async () => {
		if ($GAME_DATA.balance < 100) return;
		if ($GAME_STATE !== "idle") return;

		$GAME_DATA.balance -= 100;
		$GAME_STATE = "drawing";

		$PRIZE_ITEM = getRandomItem();

		if (!$GUMBALL_DISPENSE_AUDIO.paused) {
			$GUMBALL_DISPENSE_AUDIO.currentTime = 0;
		}
		$GUMBALL_DISPENSE_AUDIO.play();

		await tick();
		if (!$PRIZE_ITEM) return;

		resetPositions();
		await sleep(100);

		coinMeshRotation.target = coinMeshRotation.current - degToRad(360 * 2);
		gumballPosition.target = [0, 2.5, 0];
		capsuleColor =
			CAPSULE_COLORS[Math.floor(Math.random() * CAPSULE_COLORS.length)];

		gravity = [0, 0, 0];
		isShakingGumball = true;
		capsules.forEach((body, i) => {
			body.collider(0).setRestitution(0.7);
		});

		await sleep(1500);
		gravity = [0, -9.81, 0];
		isShakingGumball = false;
		capsules.forEach((body, i) => {
			body.collider(0).setRestitution(0);
		});

		await sleep(1500);
		capsulePosition.target = [0.9, 0.7, 0];

		await sleep(2000);
		capsuleScale.target = [5, 5, 5];
		capsulePosition.set([1.1, 2.15, 1.1], {
			easing: cubicOut,
			duration: 800,
		});

		await sleep(50);
		gumballScale.target = [0.001, 0.001, 0.001];
		capsules.forEach((body, i) => {
			const [x, y, z] = getSpherePosition(
				i,
				CAPSULE_COLORS.length * CAPSULES_MULTIPLIER,
			);
			body.setRotation(
				{
					x: 0,
					y: 0,
					z: 0,
					w: 0,
				},
				true,
			);
			body.setTranslation({ x, y, z }, true);
		});

		await sleep(950);
		capsulePosition.set([0.9, 2.15, 1.1], {
			duration: 0,
		});
		await tick();
		capsulePosition.set([1.1, 2.15, 1.1], {
			easing: elasticOut,
			duration: 600,
		});

		await sleep(1500);
		capsulePosition.set([1.1, 2.15, 0.9], {
			duration: 0,
		});
		await tick();
		capsulePosition.set([1.1, 2.15, 1.1], {
			easing: elasticOut,
			duration: 600,
		});

		await sleep(1500);
		$GAME_STATE = "prize";
		capUpPosition.target = [0, capUpPosition.current[1] + 1.5, 0];
		capDownPosition.target = [0, capDownPosition.current[1] - 1.5, 0];

		prizeScale.target = [1, 1, 1];
		prizeRotation.target = degToRad(360 * 2);

		giveItem($PRIZE_ITEM);
	};

	let isShakingGumball = $state(false);
	useTask((delta) => {
		if (!isShakingGumball) return;
		const shakeStrength = Math.sin(delta * 8) * 0.2;
		for (const body of capsules) {
			const impulse = {
				x: (Math.random() - 0.5) * shakeStrength,
				y: (Math.random() - 0.5) * shakeStrength,
				z: (Math.random() - 0.5) * shakeStrength,
			};
			body.applyImpulse(impulse, true);
		}
	});

	onMount(() => ($IS_GUMBALL_LOADED = false));

	GAME_STATE.subscribe(async (state) => {
		if (state === "idle") {
			resetPositions();
			return;
		}

		if (state === "play_request") {
			$GAME_STATE = "idle";
			await tick();
			dispense();
			return;
		}
	});
</script>

<World>
	{#if browser}
		{#await import('@threlte/rapier') then rapier}
			<rapier.World {gravity}>
				{#if $PRIZE_ITEM}
					<GachaponPrize
						item={$PRIZE_ITEM}
						scale={prizeScale.current}
						rotationY={prizeRotation.current}
					/>
				{/if}

				<Gumball
					scale={gumballScale.current}
					position={gumballPosition.current}
					coinMeshRotation={coinMeshRotation.current}
					rotation.y={degToRad(90)}
					oncreate={() => {
						$IS_GUMBALL_LOADED = true;
					}}
					onclick={dispense}
				/>

				{#if $IS_GUMBALL_LOADED}
					{#each Array(2).fill(CAPSULE_COLORS).flat() as color, i}
						<T.Group
							position={getSpherePosition(
								i,
								CAPSULE_COLORS.length * CAPSULES_MULTIPLIER,
							)}
						>
							<rapier.RigidBody bind:rigidBody={capsules[i]}>
								<rapier.Collider shape="capsule" args={[0.1, 0.15]}>
									<Capsule
										scale={gumballScale.current}
										position.y={-0.1}
										{color}
									/>
								</rapier.Collider>
							</rapier.RigidBody>
						</T.Group>
					{/each}

					<Capsule
						position={capsulePosition.current}
						positionUp={capUpPosition.current}
						positionDown={capDownPosition.current}
						scale={capsuleScale.current}
						color={capsuleColor}
					/>
				{/if}
			</rapier.World>
		{/await}
	{/if}
</World>
