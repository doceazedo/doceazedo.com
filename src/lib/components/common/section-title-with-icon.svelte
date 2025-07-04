<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import type { Component } from "svelte";
	import { CalendarCheckLineBusiness } from "svelte-remix";

	let {
		icon: Icon,
		title,
		subtitle,
		updatedAt,
	}: {
		icon: Component;
		title: string;
		subtitle?: string;
		updatedAt?: Date;
	} = $props();
</script>

<div class="flex gap-3 xl:-ml-[2.75rem]">
	<div
		class="bg-primary/20 border-primary flex size-8 shrink-0 items-center justify-center rounded border"
	>
		<Icon class="text-primary size-5" />
	</div>
	<hgroup>
		<h2 class="-mt-0.5 text-2xl md:text-3xl">{title}</h2>
		{#if subtitle}
			<p class="text-body">{subtitle}</p>
		{/if}
		{#if updatedAt}
			<p class="text-body mt-1.5 flex items-center gap-1.5 xl:text-lg">
				<CalendarCheckLineBusiness class="text-foreground size-4" />
				<span class="[&>span]:text-foreground">
					{@html m.updated_at({
						date: updatedAt.toLocaleDateString(getLocale()),
					})}
				</span>
			</p>
		{/if}
	</hgroup>
</div>
