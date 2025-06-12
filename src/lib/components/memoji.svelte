<script lang="ts">
	import { cn } from "$lib/utils";
	import { onMount } from "svelte";

	let { class: className = "" } = $props();

	let video = $state<HTMLVideoElement>();

	let isSafari = $state(false);

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
	onmouseover={() => video?.play()}
>
</video>
