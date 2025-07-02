<script lang="ts">
	import { toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button/index.js";
	import { MoonLineWeather, SunLineWeather } from "svelte-remix";
	import { cn } from "$lib/utils";

	let { class: className }: { class?: string } = $props();
</script>

<Button
	onclick={toggleMode}
	variant="ghost"
	class={cn(
		"relative size-10 hover:bg-transparent dark:hover:bg-transparent",
		className,
	)}
>
	<SunLineWeather
		class="ease-elastic absolute size-5 transition-all dark:scale-50 dark:opacity-0"
	/>
	<MoonLineWeather
		class="ease-elastic absolute size-5 scale-50 opacity-0 transition-all dark:scale-100 dark:opacity-100 "
	/>
</Button>
