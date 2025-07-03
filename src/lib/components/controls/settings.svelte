<script lang="ts">
	import Accessibility from "$lib/components/icons/accessibility.svg?component";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { m } from "$lib/paraglide/messages";
	import { IS_DESKTOP } from "$lib/stores";
	import { cn } from "$lib/utils";
	import {
		Settings4LineSystem,
		MoonLineWeather,
		SunLineWeather,
		SubtractLineSystem,
		AddLineSystem,
		PaletteLineDesign,
		FontSizeEditor,
		BrainLineHealthMedical,
		VolumeUpLineMedia,
		StackLineBusiness,
		SpeedLineMedia,
		LightbulbFlashLineOthers,
	} from "svelte-remix";
	import { Switch } from "$lib/components/ui/switch";
	import * as Select from "$lib/components/ui/select";
	import { Button } from "$lib/components/ui/button";

	let { class: className }: { class?: string } = $props();

	let proseSize = $state(1);
	const PROSE_SIZES = ["14px", "16px", "18px", "20px", "24px"];
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
			<div class="flex items-center justify-between p-2">
				<p class="flex items-center gap-4">
					<PaletteLineDesign class="text-body size-5" />
					Theme
				</p>
				<div class="text-body grid grid-cols-3 gap-1 rounded border p-1">
					<button
						class="hover:bg-muted hover:text-foreground flex cursor-pointer items-center justify-center rounded-xs px-2 py-1 text-sm transition-all"
					>
						Auto
					</button>
					<button
						class="hover:bg-muted hover:text-foreground flex cursor-pointer items-center justify-center rounded-xs px-2 py-1 transition-all"
					>
						<SunLineWeather class="size-5" />
					</button>
					<button
						class="bg-primary text-primary-foreground flex cursor-pointer items-center justify-center rounded-xs px-2 py-1 transition-all"
					>
						<MoonLineWeather class="size-5" />
					</button>
				</div>
			</div>
			<div class="flex items-center justify-between p-2">
				<div class="flex items-center gap-4">
					<FontSizeEditor class="text-body size-5" />
					<div>
						<p class="-mb-px">Text size</p>
						<p class="text-body text-xs">For blog posts & text-heavy pages</p>
					</div>
				</div>
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
						class="dark:border-input text-foreground flex h-9 w-14 cursor-default items-center justify-center border-y text-sm select-none"
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
			</div>
			<div class="flex items-center justify-between p-2">
				<p class="flex items-center gap-4">
					<BrainLineHealthMedical class="text-body size-5" />
					Use font for dyslexia
				</p>
				<Switch />
			</div>
			<div class="flex items-center justify-between p-2">
				<p class="flex items-center gap-4">
					<VolumeUpLineMedia class="text-body size-5" />
					Sound effects
				</p>
				<Switch checked />
			</div>
			<div class="flex items-center justify-between p-2">
				<p class="flex items-center gap-4">
					<StackLineBusiness class="text-body size-5" />
					Noise overlay
				</p>
				<Select.Root type="single" value="animated">
					<Select.Trigger class="w-36">Animated</Select.Trigger>
					<Select.Content>
						<Select.Item value="animated">Animated</Select.Item>
						<Select.Item value="static">Static</Select.Item>
						<Select.Item value="off">Off</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex items-center justify-between p-2">
				<p class="flex items-center gap-4">
					<SpeedLineMedia class="text-body size-4.5 translate-x-px" />
					Make elevator faster
				</p>
				<Switch />
			</div>
			<div class="flex items-center justify-between p-2">
				<p class="flex items-center gap-4">
					<LightbulbFlashLineOthers class="text-body size-5" />
					Low attention span mode
				</p>
				<Switch />
			</div>
			<DropdownMenu.Separator class="mt-1.5" />
			<div class="flex justify-end px-2 py-1.5">
				<Button variant="primary-ghost" size="sm">
					Reset default settings
				</Button>
			</div>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
