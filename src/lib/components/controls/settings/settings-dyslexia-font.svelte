<script lang="ts">
	import { BrainLineHealthMedical } from "svelte-remix";
	import SettingsItem from "./settings-item.svelte";
	import { m } from "$lib/paraglide/messages";
	import { USE_DYSLEXIA_FONT } from "$lib/settings";
	import { Switch } from "$lib/components/ui/switch";

	USE_DYSLEXIA_FONT.subscribe((enabled) => {
		if (!enabled) {
			delete document.body.dataset.dyslexiaFont;
			return;
		}
		document.body.dataset.dyslexiaFont = "";
	});
</script>

<SettingsItem icon={BrainLineHealthMedical} label={m.settings_dyslexia_font()}>
	<Switch bind:checked={$USE_DYSLEXIA_FONT} />
</SettingsItem>
