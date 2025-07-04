<script lang="ts">
	import { StackLineBusiness } from "svelte-remix";
	import * as Select from "$lib/components/ui/select";
	import SettingsItem from "./settings-item.svelte";
	import { m } from "$lib/paraglide/messages";
	import { NOISE_SETTING } from "$lib/settings";

	const OPTIONS = [
		{ value: "animated", label: m.animated() },
		{ value: "static", label: m.static() },
		{ value: "off", label: m.off() },
	];

	NOISE_SETTING.subscribe((setting) => {
		document.body.dataset.noise = setting;
	});
</script>

<SettingsItem icon={StackLineBusiness} label={m.settings_noise()}>
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
