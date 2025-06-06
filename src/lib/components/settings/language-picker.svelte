<script lang="ts">
	import BrazilFlag from "$lib/components/icons/brazil-flag.svg?component";
	import UsaFlag from "$lib/components/icons/usa-flag.svg?component";
	import { ArrowDownSLineArrows } from "svelte-remix";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { getLocale, setLocale } from "$lib/paraglide/runtime";
	import { m } from "$lib/paraglide/messages";

	let selectedLang = $state(getLocale());

	const LANGUAGES = {
		en: {
			code: "en",
			label: m.locale_en(),
			flag: UsaFlag,
		},
		pt: {
			code: "pt",
			label: m.locale_pt(),
			flag: BrazilFlag,
		},
	} as const;

	const FlagIcon = LANGUAGES[getLocale()].flag;

	let innerWidth = $state(0);
</script>

<svelte:window bind:innerWidth />

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="hover:text-foreground flex h-full cursor-pointer items-center gap-2.5 px-3 transition-all"
	>
		<FlagIcon class="size-5 rounded-full" />
		<span class="flex items-center gap-1.5">
			{m.locale_current()}
			<ArrowDownSLineArrows class="size-4" />
		</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content sideOffset={innerWidth >= 768 ? -12 : 12} align="start">
		<DropdownMenu.Group>
			<DropdownMenu.Label>{m.select_language()}</DropdownMenu.Label>
			<DropdownMenu.Separator />
			{#each Object.values(LANGUAGES) as lang}
				<DropdownMenu.CheckboxItem
					checked={selectedLang === lang.code}
					onCheckedChange={() => {
						selectedLang = lang.code;
						setLocale(lang.code);
					}}
					closeOnSelect={false}
				>
					{lang.label}
				</DropdownMenu.CheckboxItem>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
