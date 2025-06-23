<script lang="ts">
	import { T, useTask } from "@threlte/core";
	import type { Item } from "./constants";
	import { interactivity, type IntersectionEvent } from "@threlte/extras";
	import { Spring } from "svelte/motion";

	interactivity();

	let {
		item,
		scale = [1, 1, 1],
		rotationY = 0,
	}: {
		item: Item;
		scale?: [number, number, number];
		rotationY?: number;
	} = $props();

	const orbitRotation = new Spring(0, {
		stiffness: 0.1,
		damping: 0.5,
	});
	useTask((delta) => {
		if (!dragging) {
			orbitRotation.target += delta;
		}
	});

	let dragging = $state(false);
	let lastX = $state(0);

	const onPointerDown = (e: IntersectionEvent<MouseEvent | TouchEvent>) => {
		dragging = true;
		// @ts-ignore: already handled with `?.`
		lastX = e.nativeEvent?.clientX || e.nativeEvent.touches?.[0]?.clientX || 0;
	};

	const onPointerMove = (e: MouseEvent | TouchEvent) => {
		if (!dragging) return;
		// @ts-ignore: already handled with `?.`
		const x = e?.clientX || e?.touches?.[0]?.clientX || 0;
		const deltaX = x - lastX;
		lastX = x;
		orbitRotation.target += deltaX * 0.01;
	};

	const onPointerUp = () => {
		lastX = 0;
		dragging = false;
	};
</script>

<svelte:window
	onpointermove={onPointerMove}
	ontouchmove={onPointerMove}
	onpointerup={onPointerUp}
	ontouchend={onPointerUp}
/>

<T.Group
	rotation.y={orbitRotation.current}
	onpointerdown={onPointerDown}
	ontouchstart={onPointerDown}
>
	<item.mesh {scale} rotation.y={rotationY} />
	<T.Mesh scale={5} position.y={1.75}>
		<T.BoxGeometry />
		<T.MeshBasicMaterial transparent={true} opacity={0} />
	</T.Mesh>
</T.Group>
