<script lang="ts">
	import {
		SubtractLineSystem,
		AddLineSystem,
		FontSizeEditor,
	} from "svelte-remix";
	import { Button } from "$lib/components/ui/button";
	import SettingsItem from "./settings-item.svelte";

	let proseSize = $state(1);
	const PROSE_SIZES = ["14px", "16px", "18px", "20px", "24px"];
</script>

<SettingsItem
	icon={FontSizeEditor}
	label="Text size"
	description="For blog posts & text-heavy pages"
>
	<div class="text-body flex">
		<Button
			variant="outline"
			size="icon"
			class="rounded-r-none"
			disabled={proseSize <= 0}
			onclick={() => (proseSize -= 1)}
		>
			<SubtractLineSystem class="size-4" />
		</Button>
		<p
			class="dark:border-input text-foreground flex h-9 w-14 cursor-default items-center justify-center border-y text-sm transition-all select-none"
		>
			{PROSE_SIZES[proseSize]}
		</p>
		<Button
			variant="outline"
			size="icon"
			class="rounded-l-none"
			disabled={proseSize >= PROSE_SIZES.length - 1}
			onclick={() => (proseSize += 1)}
		>
			<AddLineSystem class="size-4" />
		</Button>
	</div>
</SettingsItem>
