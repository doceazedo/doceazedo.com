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
	import { CopperCoinLineFinance } from "svelte-remix";
	import Button from "$lib/components/ui/button/button.svelte";
	import { fly, scale } from "svelte/transition";

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
	const prizePosition = new Tween<[number, number, number]>(
		[...INITIAL_PRIZE_POSITION],
		{
			easing: bounceOut,
			duration: 1600,
		},
	);
	const prizeUpPosition = new Tween<[number, number, number]>(
		[...INITIAL_PRIZE_UP_POSITION],
		{
			easing: expoOut,
			duration: 600,
		},
	);
	const prizeDownPosition = new Tween<[number, number, number]>(
		[...INITIAL_PRIZE_DOWN_POSITION],
		{
			easing: expoOut,
			duration: 600,
		},
	);
	const prizeScale = new Tween<[number, number, number]>([1, 1, 1], {
		easing: cubicOut,
		duration: 800,
	});
	let prizeColor = $state("#000000");

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

	let isPrizeOpen = $state(false);
	let isGumballLoaded = $state(false);
	let isRedeeming = $state(false);

	const resetPositions = () => {
		isPrizeOpen = false;
		gravity = [0, 0, 0];
		prizePosition.set([...INITIAL_PRIZE_POSITION], { duration: 0 });
		prizeUpPosition.set([...INITIAL_PRIZE_UP_POSITION], {
			duration: 0,
		});
		prizeDownPosition.set([...INITIAL_PRIZE_DOWN_POSITION], {
			duration: 0,
		});
		prizeScale.set([1, 1, 1], { duration: 0 });
		gumballPosition.set([0, 2.5, 0], { duration: 0 });
		coinMeshRotation.set(0, { duration: 0 });
	};

	const dispense = async () => {
		if (isRedeeming) return;
		isRedeeming = true;

		resetPositions();
		await sleep(50);

		coinMeshRotation.target = coinMeshRotation.current - degToRad(360 * 2);
		gumballPosition.target = [0, 2.5, 0];
		prizeColor =
			CAPSULE_COLORS[Math.floor(Math.random() * CAPSULE_COLORS.length)];

		capsules.forEach((body) => {
			body.setLinvel(
				{
					x: (Math.random() - 0.5) * 25,
					y: (Math.random() - 0.5) * 25,
					z: (Math.random() - 0.5) * 25,
				},
				true,
			);
		});

		await sleep(1500);
		gravity = [0, -9.81, 0];

		await sleep(1500);
		prizePosition.target = [0.9, 0.7, 0];

		await sleep(2000);
		prizeScale.target = [5, 5, 5];
		prizePosition.set([1.1, 2.15, 1.1], {
			easing: cubicOut,
			duration: 800,
		});

		await sleep(50);
		gumballScale.target = [0.01, 0.01, 0.01];

		await sleep(950);
		prizePosition.set([0.9, 2.15, 1.1], {
			duration: 0,
		});
		await tick();
		prizePosition.set([1.1, 2.15, 1.1], {
			easing: elasticOut,
			duration: 600,
		});

		await sleep(1500);
		prizePosition.set([1.1, 2.15, 0.9], {
			duration: 0,
		});
		await tick();
		prizePosition.set([1.1, 2.15, 1.1], {
			easing: elasticOut,
			duration: 600,
		});

		await sleep(1500);
		isPrizeOpen = true;
		prizeUpPosition.target = [0, prizeUpPosition.current[1] + 0.2, 0];
		prizeDownPosition.target = [0, prizeDownPosition.current[1] - 0.2, 0];
	};

	const redeem = () => {
		resetPositions();
		gumballScale.target = [1, 1, 1];
		isRedeeming = false;
		isPrizeOpen = false;
	};
</script>

<div class="relative z-10 flex size-full justify-center">
	{#if browser}
		{#await import('@threlte/rapier') then rapier}
			<Canvas
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
						{isRedeeming}
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
							position={prizePosition.current}
							positionUp={prizeUpPosition.current}
							positionDown={prizeDownPosition.current}
							scale={prizeScale.current}
							color={prizeColor}
						/>
					{/if}
				</rapier.World>
			</Canvas>
		{/await}
	{/if}

	{#if !isRedeeming}
		<div
			transition:fly={{
				easing: cubicOut,
				opacity: 0,
				y: -12,
				duration: 200,
			}}
			class="absolute top-6 flex items-center gap-1.5 rounded border px-3 py-1.5"
		>
			<CopperCoinLineFinance class="text-body size-5" />
			100
		</div>
	{/if}

	{#if !isRedeeming}
		<div
			transition:scale={{
				easing: cubicOut,
				opacity: 0,
				start: 0.9,
				duration: 200,
			}}
			class="absolute bottom-6"
		>
			<Button size="lg" class="h-12" onclick={dispense}>
				<div class="flex items-center gap-1">
					<CopperCoinLineFinance class="size-5" />
					100
				</div>
				<hr class="bg-primary-foreground/20 h-1/2 w-px" />
				Dispense now
			</Button>
		</div>
	{/if}

	{#if isPrizeOpen}
		<div
			transition:scale={{
				easing: cubicOut,
				opacity: 0,
				start: 0.9,
				duration: 200,
			}}
			class="absolute bottom-6"
		>
			<Button variant="outline" onclick={redeem}>Redeem</Button>
		</div>
	{/if}
</div>

<div class="bg-primary/10 absolute h-56 w-96 rounded-full blur-3xl"></div>
<img
	src="/img/sunray.webp"
	alt=""
	class={cn(
		"animation-duration-10000 absolute size-[32rem] animate-spin opacity-3 transition-all",
		!isPrizeOpen && "scale-50 opacity-0",
	)}
/>
<p
	class={cn(
		"ease-elastic absolute transition-all",
		!isPrizeOpen && "scale-50 opacity-0",
	)}
>
	WIP :3
</p>
