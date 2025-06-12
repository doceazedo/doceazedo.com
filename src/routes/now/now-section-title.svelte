<script lang="ts">
	import type { Component } from "svelte";

	let {
		icon: Icon,
		title,
		subtitle,
	}: { icon: Component; title: string; subtitle: string } = $props();
</script>

<div class="flex gap-3 xl:-ml-[2.75rem]">
	<div
		class="bg-primary/20 border-primary flex size-8 shrink-0 items-center justify-center rounded border"
	>
		<Icon class="text-primary size-5" />
	</div>
	<hgroup>
		<h2 class="-mt-0.5 text-2xl md:text-3xl">{title}</h2>
		<p class="text-body">{subtitle}</p>
	</hgroup>
</div>
