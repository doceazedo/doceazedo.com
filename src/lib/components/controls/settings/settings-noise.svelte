<script lang="ts">
	import { StackLineBusiness } from "svelte-remix";
	import * as Select from "$lib/components/ui/select";
	import SettingsItem from "./settings-item.svelte";
	import { storage } from "$lib/utils/storage";
	import { writable } from "svelte/store";

	const OPTIONS = [
		{ value: "animated", label: "Animated" },
		{ value: "static", label: "Static" },
		{ value: "off", label: "Off" },
	];

	const NOISE_SETTING = storage(writable("animated"), "noise");
	NOISE_SETTING.subscribe((setting) => {
		document.body.dataset.noise = setting;
	});
</script>

<SettingsItem icon={StackLineBusiness} label="Noise overlay">
	<Select.Root type="single" bind:value={$NOISE_SETTING}>
		<Select.Trigger class="w-36">
			{OPTIONS.find((x) => x.value === $NOISE_SETTING)?.label}
		</Select.Trigger>
		<Select.Content>
			{#each OPTIONS as option}
				<Select.Item value={option.value}>{option.label}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</SettingsItem>
