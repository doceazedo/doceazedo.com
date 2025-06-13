<script lang="ts">
	import BrazilFlag from "$lib/components/icons/brazil-flag.svg?component";
	import UsaFlag from "$lib/components/icons/usa-flag.svg?component";
	import { ArrowDownSLineArrows, GlobalLineBusiness } from "svelte-remix";
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

	let innerWidth = $state(0);
	let isDesktop = $derived(innerWidth >= 768);
</script>

<svelte:window bind:innerWidth />

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="hover:bg-foreground/5 hover:text-accent-foreground dark:hover:bg-accent/50 flex size-10 cursor-pointer items-center justify-center gap-2.5 rounded transition-all"
	>
		<GlobalLineBusiness class="size-5" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content
		sideOffset={isDesktop ? -12 : 12}
		align={isDesktop ? "end" : "start"}
	>
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
					<lang.flag class="size-4" />
					{lang.label}
				</DropdownMenu.CheckboxItem>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
