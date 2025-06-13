<script lang="ts">
	type Item = {
		image?: string;
		label?: string;
		product: string;
	};

	let { label, items } = $props<{ label: string; items: Item[] }>();
</script>

<div class="flex flex-col gap-6 md:flex-row md:gap-12">
	<h2 class="text-body flex w-36 shrink-0 text-sm font-medium">
		{label}
	</h2>
	<ul
		class="grid w-full grid-cols-2 gap-x-12 gap-y-12 md:gap-y-8 lg:grid-cols-3"
	>
		{#each items as item}
			<li class="flex flex-col">
				{#if item.image}
					<img
						src={item.image}
						alt=""
						class="mb-3 aspect-video w-full rounded border object-cover"
					/>
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
