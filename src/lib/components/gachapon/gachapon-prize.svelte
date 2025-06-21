<script lang="ts">
	import { T, useTask } from "@threlte/core";
	import Mp3Player from "./models/mp3-player.svelte";

	let { scale, rotationY } = $props();

	const Prize = Mp3Player;

	let orbitRotation = $state(0);
	useTask((delta) => {
		orbitRotation += delta;
	});
</script>

<T.Group rotation.y={orbitRotation}>
	<Prize {scale} rotation.y={rotationY} />
</T.Group>
