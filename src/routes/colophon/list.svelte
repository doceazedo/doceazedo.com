<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Component } from "svelte";

	let {
		items,
	}: {
		items: {
			label: string;
			description: string;
			url: string;
			icon?: Component | string;
		}[];
	} = $props();
</script>

<ul>
	{#each items as item}
		<li>
			<a
				class={cn(
					"inline-flex items-center gap-1",
					item.icon && "group translate-y-px",
				)}
				href={item.url}
				target="_blank"
				rel="noopener noreferrer"
			>
				{#if item.icon}
					{#if typeof item.icon === "string"}
						<span
							class="[&>svg]:fill-body [&>svg]:group-hover:fill-primary [&>svg]:size-4 [&>svg]:transition-all"
						>
							{@html item.icon}
						</span>
					{:else}
						<item.icon
							class="text-body group-hover:text-primary size-4 transition-all"
						/>
					{/if}
				{/if}
				{item.label}
			</a>
			— {@html item.description}
		</li>
	{/each}
</ul>
