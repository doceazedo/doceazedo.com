<script lang="ts">
	import { cn } from "$lib/utils";
	import { onMount } from "svelte";

	let { class: className = "" } = $props();

	let video = $state<HTMLVideoElement>();

	onMount(() => {
		video?.play();
	});
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<video
	bind:this={video}
	class={cn("-ml-1.5 size-10", className)}
	controls={false}
	muted
	playsinline
	onmouseover={() => video?.play()}
>
	<source src="/video/memoji.webm" type="video/webm" />
</video>
