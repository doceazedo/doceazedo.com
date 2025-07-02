<script lang="ts">
	import { MEMOJI_BLINK_COUNT } from "$lib/stores";
	import { cn } from "$lib/utils";
	import { onMount } from "svelte";

	let { class: className = "" } = $props();

	let video = $state<HTMLVideoElement>();
	let isSafari = $state(false);

	const handleHover = () => {
		if (!video) return;

		const isPlaying = !!(
			video.currentTime > 0 &&
			!video.paused &&
			!video.ended &&
			video.readyState > 2
		);
		if (isPlaying) return;

		video.play();
		$MEMOJI_BLINK_COUNT += 1;
	};

	onMount(() => {
		isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	});
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<video
	bind:this={video}
	src="/video/memoji.{isSafari ? 'mov' : 'webm'}"
	class={cn("-ml-1.5 size-10", className)}
	controls={false}
	muted
	autoplay
	playsinline
	onmouseover={handleHover}
>
</video>
