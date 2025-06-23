<script lang="ts">
	import { T } from "@threlte/core";
	import { Canvas } from "@threlte/core";
	import Gumball from "./models/gumball.svelte";
	import { degToRad } from "three/src/math/MathUtils.js";
	import Capsule from "./models/capsule.svelte";
	import { browser } from "$app/environment";
	import type { RigidBody } from "@dimforge/rapier3d-compat";
	import { Tween } from "svelte/motion";
	import { bounceOut, cubicOut, elasticOut, expoOut } from "svelte/easing";
	import { cn, sleep } from "$lib/utils";
	import { tick } from "svelte";
	import { CopperCoinLineFinance, Swap2LineFinance } from "svelte-remix";
	import Button from "$lib/components/ui/button/button.svelte";
	import { scale } from "svelte/transition";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { GAME_DATA, GAME_STATE } from "./stores";
	import { ITEMS, RARITIES, type Item } from "./constants";
	import GachaponPrize from "./gachapon-prize.svelte";
	import { IS_DESKTOP } from "$lib/stores";
	import { WebGLRenderer } from "three";

	const getGridPosition = (
		index: number,
		columns: number,
	): [number, number, number] => [
		(index % columns) * 0.1,
		parseFloat((Math.random() * (2.2 - 3) + 3).toFixed(2)),
		Math.floor(index / columns) * 0.1,
	];

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

	const CAPSULE_COLORS = [
		"#6DE1D2",
		"#FFD63A",
		"#FFA955",
		"#F75A5A",
		"#8E7DBE",
		"#1DCD9F",
	];

	let isGumballLoaded = $state(false);
	let prizeItem = $state<Item | null>(ITEMS[0]);
	let prizeRarity = $derived(
		RARITIES.find((x) => x.id === prizeItem?.rarity) || RARITIES[0],
	);

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
		$GAME_DATA.balance -= 100;

		if ($GAME_STATE !== "idle") return;
		$GAME_STATE = "drawing";

		resetPositions();
		await sleep(50);

		coinMeshRotation.target = coinMeshRotation.current - degToRad(360 * 2);
		gumballPosition.target = [0, 2.5, 0];
		capsuleColor =
			CAPSULE_COLORS[Math.floor(Math.random() * CAPSULE_COLORS.length)];

		gravity = [0, 0, 0];
		const force = $IS_DESKTOP ? 25 : 10;
		capsules.forEach((body) => {
			body.setLinvel(
				{
					x: (Math.random() - 0.5) * force,
					y: (Math.random() - 0.5) * force,
					z: (Math.random() - 0.5) * force,
				},
				true,
			);
		});

		await sleep(1500);
		gravity = [0, -9.81, 0];

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

		prizeItem = getRandomItem();
		if (!prizeItem) return;

		await sleep(1500);
		$GAME_STATE = "prize";
		capUpPosition.target = [0, capUpPosition.current[1] + 1, 0];
		capDownPosition.target = [0, capDownPosition.current[1] - 1, 0];

		prizeScale.target = [1, 1, 1];
		prizeRotation.target = degToRad(360 * 2);

		const existingItemIdx = $GAME_DATA.inventory.findIndex(
			(x) => x.item === prizeItem?.id,
		);
		if (existingItemIdx >= 0) {
			$GAME_DATA.inventory[existingItemIdx].quantity += 1;
			$GAME_DATA.inventory[existingItemIdx].lastAt = new Date().toString();
			return;
		}

		$GAME_DATA.inventory = [
			...$GAME_DATA.inventory,
			{
				item: prizeItem.id,
				quantity: 1,
				lastAt: new Date().toString(),
			},
		];
	};

	const claim = () => {
		resetPositions();
		gumballScale.target = [1, 1, 1];
		$GAME_STATE = "idle";
	};
</script>

<div class="relative z-10 flex size-full justify-center">
	{#if browser}
		{#await import('@threlte/rapier') then rapier}
			<Canvas
				createRenderer={(canvas) => {
					return new WebGLRenderer({
						canvas,
						alpha: true,
						preserveDrawingBuffer: true,
					});
				}}
				shadows
				toneMapping="ACESFilmicToneMapping"
				toneMappingExposure={1.2}
			>
				<rapier.World {gravity}>
					<!-- <rapier.Debug /> -->

					<T.OrthographicCamera
						makeDefault
						zoom={100}
						position={[10, 10, 10]}
						oncreate={(ref) => {
							ref.lookAt(0, 1.75, 0);
						}}
					/>

					{#if prizeItem}
						<GachaponPrize
							item={prizeItem}
							scale={prizeScale.current}
							rotationY={prizeRotation.current}
						/>
					{/if}

					<T.HemisphereLight
						skyColor="#f5f5f5"
						groundColor="#dddddd"
						intensity={0.6}
					/>

					<T.DirectionalLight
						position={[5, 8, 5]}
						intensity={1.2}
						castShadow
						shadow-mapSize-width={1024}
						shadow-mapSize-height={1024}
					/>

					<T.DirectionalLight position={[-5, 6, 4]} intensity={0.5} />

					<Gumball
						scale={gumballScale.current}
						position={gumballPosition.current}
						coinMeshRotation={coinMeshRotation.current}
						rotation.y={degToRad(90)}
						oncreate={() => {
							isGumballLoaded = true;
						}}
						onclick={dispense}
					/>

					{#if isGumballLoaded}
						{#each Array(3).fill(CAPSULE_COLORS).flat() as color, i}
							<T.Group position={getGridPosition(i, 4)}>
								<rapier.RigidBody
									linearDamping={0}
									angularDamping={0}
									oncreate={(x) => {
										capsules.push(x);
									}}
								>
									<rapier.Collider
										shape="capsule"
										args={[0.1, 0.15]}
										restitution={1}
									>
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
			</Canvas>
		{/await}
	{/if}

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
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button variant="outline" size="lg" class="h-12" aria-readonly>
						<Swap2LineFinance class="size-5" />
						Mode
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content side="top">
					<DropdownMenu.Group>
						<DropdownMenu.CheckboxItem checked>
							Standard
						</DropdownMenu.CheckboxItem>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>

			<Button
				size="lg"
				class="h-12"
				onclick={dispense}
				disabled={$GAME_DATA.balance < 100}
			>
				<div class="flex items-center gap-1">
					<CopperCoinLineFinance class="size-5" />
					<span class={cn($GAME_DATA.balance < 100 && "text-red-800")}>100</span
					>
				</div>
				<hr class="bg-primary-foreground/20 h-1/2 w-px" />
				Dispense now
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
			<Button variant="outline" onclick={claim}>Claim</Button>
		</div>
	{/if}
</div>

<div
	class="bg-primary absolute h-56 w-96 rounded-full opacity-20 blur-3xl dark:opacity-10"
></div>
<img
	src="/img/sunray.webp"
	alt=""
	class={cn(
		"animation-duration-10000 absolute size-[32rem] animate-spin opacity-3 invert-50 transition-all dark:invert-0",
		$GAME_STATE !== "prize" && "scale-50 opacity-0",
	)}
/>
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
		{prizeItem?.label}
	</h1>
</hgroup>
