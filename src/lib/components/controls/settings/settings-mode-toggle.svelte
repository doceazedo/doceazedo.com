<script lang="ts">
	import { cn } from "$lib/utils";
	import {
		MoonLineWeather,
		SunLineWeather,
		PaletteLineDesign,
	} from "svelte-remix";
	import { setMode, userPrefersMode } from "mode-watcher";
	import SettingsItem from "./settings-item.svelte";

	const MODE_OPTIONS = [
		{
			value: "system" as const,
			label: "Auto",
		},
		{
			value: "light" as const,
			label: SunLineWeather,
		},
		{
			value: "dark" as const,
			label: MoonLineWeather,
		},
	];

	let selectedModeIdx = $derived(
		MODE_OPTIONS.findIndex((x) => x.value === userPrefersMode.current),
	);

	const MODE_SELECTOR_BUTTON_WIDTH = 45.55;
	const MODE_SELECTOR_PADDING = 4;
	const getSelectedThemePosition = (idx: number) =>
		(MODE_SELECTOR_BUTTON_WIDTH + MODE_SELECTOR_PADDING) * idx +
		MODE_SELECTOR_PADDING;
</script>

<SettingsItem icon={PaletteLineDesign} label="Theme">
	<div
		class="text-body relative grid grid-cols-3 gap-1 rounded border p-1 transition-all"
	>
		<span
			class="ease-elastic bg-primary absolute top-1 left-1 h-7 w-[45.55px] rounded-xs transition-all duration-300"
			style="left:{getSelectedThemePosition(selectedModeIdx)}px"
		></span>
		{#each MODE_OPTIONS as option, i}
			{@const isActive = selectedModeIdx === i}
			<button
				class={cn(
					"z-10 flex cursor-pointer items-center justify-center rounded-xs px-2 py-1 text-sm transition-all",
					isActive
						? "text-primary-foreground"
						: "hover:bg-muted hover:text-foreground",
				)}
				onclick={() => setMode(option.value)}
			>
				{#if typeof option.label === "string"}
					{option.label}
				{:else}
					<option.label class="size-5 transition-all" />
				{/if}
			</button>
		{/each}
	</div>
</SettingsItem>
