<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { m } from "$lib/paraglide/messages";
	import { IS_DESKTOP } from "$lib/stores";
	import { cn } from "$lib/utils";
	import {
		Settings4LineSystem,
		BrainLineHealthMedical,
		VolumeUpLineMedia,
		StackLineBusiness,
		SpeedLineMedia,
		LightbulbFlashLineOthers,
	} from "svelte-remix";
	import { Switch } from "$lib/components/ui/switch";
	import * as Select from "$lib/components/ui/select";
	import { Button } from "$lib/components/ui/button";
	import SettingsItem from "./settings-item.svelte";
	import SettingsModeToggle from "./settings-mode-toggle.svelte";
	import SettingsProse from "./settings-prose.svelte";
	import { SOUND_ENABLED } from "$lib/audio";

	let { class: className }: { class?: string } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={cn(
			"hover:text-accent-foreground flex size-10 cursor-pointer items-center justify-center gap-4.5 rounded transition-all",
			className,
		)}
	>
		<Settings4LineSystem class="size-5" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content
		class="w-[calc(100dvw-3rem)] md:w-md"
		align={$IS_DESKTOP ? "end" : "start"}
		alignOffset={!$IS_DESKTOP ? -30 : 0}
	>
		<DropdownMenu.Group>
			<DropdownMenu.Label class="text-lg">Preferences</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<SettingsModeToggle />
			<SettingsProse />
			<SettingsItem icon={BrainLineHealthMedical} label="Use font for dyslexia">
				<Switch />
			</SettingsItem>
			<SettingsItem icon={VolumeUpLineMedia} label="Sound effects">
				<Switch bind:checked={$SOUND_ENABLED} />
			</SettingsItem>
			<SettingsItem icon={StackLineBusiness} label="Noise overlay">
				<Select.Root type="single" value="animated">
					<Select.Trigger class="w-36">Animated</Select.Trigger>
					<Select.Content>
						<Select.Item value="animated">Animated</Select.Item>
						<Select.Item value="static">Static</Select.Item>
						<Select.Item value="off">Off</Select.Item>
					</Select.Content>
				</Select.Root>
			</SettingsItem>
			<SettingsItem icon={SpeedLineMedia} label="Make elevator faster">
				<Switch />
			</SettingsItem>
			<SettingsItem
				icon={LightbulbFlashLineOthers}
				label="Low attention span mode"
			>
				<Switch />
			</SettingsItem>
			<DropdownMenu.Separator class="mt-1.5" />
			<div class="flex justify-end px-2 py-1.5">
				<Button variant="primary-ghost" size="sm">
					Reset default settings
				</Button>
			</div>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
