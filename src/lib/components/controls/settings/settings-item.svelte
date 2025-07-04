<script lang="ts">
	import type { Component, Snippet } from "svelte";

	let {
		children,
		icon: Icon,
		label,
		description,
	}: {
		children?: Snippet;
		icon: Component;
		label?: string;
		description?: string;
	} = $props();
</script>

<div class="flex items-center justify-between p-2">
	<div class="flex items-center gap-4">
		<Icon class="text-body size-5 transition-all" />
		<div>
			<p>{label}</p>
			{#if description}
				<p class="text-body -mt-px text-xs transition-all">{description}</p>
			{/if}
		</div>
	</div>
	{@render children?.()}
</div>
