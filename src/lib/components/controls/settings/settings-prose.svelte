<script lang="ts">
	import {
		SubtractLineSystem,
		AddLineSystem,
		FontSizeEditor,
	} from "svelte-remix";
	import { Button } from "$lib/components/ui/button";
	import SettingsItem from "./settings-item.svelte";
	import { PROSE_SIZE } from "$lib/settings";
	import { IS_XL } from "$lib/stores";
	import { m } from "$lib/paraglide/messages";

	const PROSE_SIZES = ["14px", "16px", "18px", "20px", "24px"];

	let screenSize = $derived<"xl" | "base">($IS_XL ? "xl" : "base");
	let proseSize = $derived($IS_XL ? $PROSE_SIZE.xl : $PROSE_SIZE.base);
	let proseSizeIdx = $derived(PROSE_SIZES.findIndex((x) => x === proseSize));
</script>

<SettingsItem
	icon={FontSizeEditor}
	label={m.settings_text_size()}
	description={m.settings_text_size_description()}
>
	<div class="text-body flex">
		<Button
			variant="outline"
			size="icon"
			class="rounded-r-none"
			disabled={proseSizeIdx <= 0}
			onclick={() => ($PROSE_SIZE[screenSize] = PROSE_SIZES[proseSizeIdx - 1])}
		>
			<SubtractLineSystem class="size-4" />
		</Button>
		<p
			class="dark:border-input text-foreground flex h-9 w-14 cursor-default items-center justify-center border-y text-sm transition-all select-none"
		>
			{proseSize}
		</p>
		<Button
			variant="outline"
			size="icon"
			class="rounded-l-none"
			disabled={proseSizeIdx >= PROSE_SIZES.length - 1}
			onclick={() => ($PROSE_SIZE[screenSize] = PROSE_SIZES[proseSizeIdx + 1])}
		>
			<AddLineSystem class="size-4" />
		</Button>
	</div>
</SettingsItem>
