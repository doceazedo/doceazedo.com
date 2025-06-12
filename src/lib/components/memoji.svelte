<script lang="ts">
	import { cn } from "$lib/utils";

	let { class: className = "" } = $props();

	let video = $state<HTMLVideoElement>();
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<video
	bind:this={video}
	src="/video/memoji.webm"
	class={cn("-ml-1.5 size-10", className)}
	controls={false}
	muted
	playsinline
	autoplay
	onmouseover={() => video?.play()}
></video>
