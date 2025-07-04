<script lang="ts">
	import { createAndPreloadAudio } from "$lib/audio";
	import { IS_DESKTOP, LAST_PLAYED_TRACKS } from "$lib/stores";
	import { onMount } from "svelte";

	const updateLastPlayedTracks = async () => {
		try {
			const resp = await fetch("/api/now/listening?limit=5");
			const data = await resp.json();
			$LAST_PLAYED_TRACKS = data;
		} catch (_error) {
			// uwu
		}
	};

	onMount(() => {
		createAndPreloadAudio();
		updateLastPlayedTracks();
		const lastPlayedInterval = setInterval(updateLastPlayedTracks, 10000);
		return () => clearInterval(lastPlayedInterval);
	});

	let innerWidth = $state(0);
	$effect(() => {
		$IS_DESKTOP = innerWidth >= 768;
	});
</script>

<svelte:window bind:innerWidth />
