<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="dialog-header"
	class={cn(
		"flex h-fit flex-col gap-2 border-b p-3 text-center sm:text-left md:p-6",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
