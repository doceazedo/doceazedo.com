<script lang="ts">
	import { browser } from "$app/environment";
	import { onVisible } from "$lib/utils/actions";
	import { elasticScale } from "$lib/utils/transitions";

	type Item = {
		image?: string;
		label?: string;
		product: string;
	};

	let { label, items } = $props<{ label: string; items: Item[] }>();

	let visible = $state(!browser);
</script>

<div class="flex flex-col gap-6 md:flex-row md:gap-12">
	<h2
		class="text-body flex h-fit w-36 shrink-0 text-sm font-medium"
		use:onVisible={() => (visible = true)}
	>
		{label}
	</h2>
	<ul
		class="grid w-full grid-cols-2 gap-x-12 gap-y-12 md:gap-y-8 lg:grid-cols-3"
	>
		{#each items as item, i (i)}
			<li class="flex flex-col">
				{#if item.image}
					{#if visible}
						<img
							src={item.image}
							alt=""
							class="mb-3 aspect-video w-full rounded border object-cover"
							in:elasticScale|global={{
								start: 0.9,
								duration: 800,
								delay: 100 * (i + 1),
							}}
						/>
					{:else}
						<div class="mb-3 aspect-video w-full"></div>
					{/if}
				{/if}
				{#if item.label}
					<p class="text-body flex shrink-0 text-xs uppercase">
						{item.label}
					</p>
				{/if}
				<p class="leading-5">{item.product}</p>
			</li>
		{/each}
	</ul>
</div>
