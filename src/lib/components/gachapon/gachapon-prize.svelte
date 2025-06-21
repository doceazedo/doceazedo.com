<script lang="ts">
	import { T, useTask } from "@threlte/core";
	import type { Item } from "./constants";

	let {
		item,
		scale,
		rotationY,
	}: { item: Item; scale: [number, number, number]; rotationY: number } =
		$props();

	let orbitRotation = $state(0);
	useTask((delta) => {
		orbitRotation += delta;
	});
</script>

<T.Group rotation.y={orbitRotation}>
	<item.mesh {scale} rotation.y={rotationY} />
</T.Group>
