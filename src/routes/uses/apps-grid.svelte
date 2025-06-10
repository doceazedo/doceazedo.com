<script lang="ts">
	type Item = {
		icon: string;
		name: string;
		label: string;
	};

	let { label, items } = $props<{ label: string; items: Item[] }>();
</script>

<div class="flex flex-col gap-6 md:flex-row md:gap-12">
	<h2 class="text-body flex w-36 shrink-0 text-sm font-medium">
		{label}
	</h2>
	<ul
		class="grid w-full grid-cols-3 gap-x-8 gap-y-8 md:gap-x-12 lg:grid-cols-6"
	>
		{#each items as item}
			<li class="flex flex-col items-center text-center">
				<img
					src={item.icon}
					alt=""
					class="mb-1.5 size-14 rounded object-cover"
				/>
				<p class="-mb-px leading-5">{item.name}</p>
				<p class="text-body flex shrink-0 text-xs">
					{item.label}
				</p>
			</li>
		{/each}
	</ul>
</div>
