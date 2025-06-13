<script lang="ts">
	import "../app.css";
	import "../prism-theme-github-light.css";
	import "../prism-theme-github-dark.css";
	import { cn } from "$lib/utils";
	import LanguagePicker from "$lib/components/settings/language-picker.svelte";
	import { Button } from "$lib/components/ui/button";
	import {
		Chat1LineCommunication,
		CodeSSlashLineDevelopment,
		HourglassLineSystem,
		MenuFillSystem,
		MouseLineDevice,
		NewsLineDocument,
		PresentationFillBusiness,
		User5LineUserFaces,
	} from "svelte-remix";
	import * as Drawer from "$lib/components/ui/drawer";
	import Footer from "$lib/components/parts/footer.svelte";
	import Memoji from "$lib/components/memoji.svelte";
	import { page } from "$app/state";
	import { m } from "$lib/paraglide/messages";
	import { ModeWatcher } from "mode-watcher";
	import DarkModeSwitch from "$lib/components/settings/dark-mode-switch.svelte";

	let { children } = $props();

	const PAGES = [
		{ label: m.talks(), href: "/talks", icon: PresentationFillBusiness },
		{ label: m.blog(), href: "/blog", icon: NewsLineDocument },
		{ label: m.about_me(), href: "/me", icon: User5LineUserFaces },
		{ label: m.now_short(), href: "/now", icon: HourglassLineSystem },
		{ label: m.uses_short(), href: "/uses", icon: MouseLineDevice },
		{ label: m.contact(), href: "/contact", icon: Chat1LineCommunication },
		{ label: m.colophon(), href: "/colophon", icon: CodeSSlashLineDevelopment },
	];

	let scrollY = $state(0);
	let isDrawerOpen = $state(false);
</script>

<svelte:window bind:scrollY />

<ModeWatcher defaultMode="dark" disableTransitions={false} />

<nav
	class={cn(
		"bg-background/70 fixed top-0 left-0 z-40 h-16 w-full border-b px-3 backdrop-blur-md transition-colors md:h-20 md:border-b-transparent md:bg-transparent md:pr-[var(--scrollbar-width)]! md:backdrop-blur-none lg:px-0",
		scrollY > 24 &&
			"md:bg-background/70 md:border-b-border md:backdrop-blur-md",
	)}
>
	<div class="mx-auto flex size-full max-w-5xl items-center">
		<a href="/" class="flex items-center gap-1.5 text-2xl">
			<Memoji />
			<span>
				doce<span class="text-body">.sh</span>
			</span>
		</a>

		<div class="text-body -mr-3 ml-auto hidden h-full items-center md:flex">
			{#each PAGES as _page}
				{@const isCurrentPage = page.url.pathname.startsWith(_page.href)}
				<a
					href={_page.href}
					class={cn(
						"hover:text-foreground flex h-full items-center px-3 transition-all",
						isCurrentPage && "text-foreground",
					)}
				>
					{_page.label}
				</a>
			{/each}

			<DarkModeSwitch class="-mr-1.5" />
			<LanguagePicker />
		</div>

		<Drawer.Root bind:open={isDrawerOpen}>
			<Drawer.Trigger
				class="-mr-1.5 ml-auto flex size-12 items-center justify-center md:hidden"
			>
				<MenuFillSystem class="size-6" />
			</Drawer.Trigger>
			<Drawer.Content>
				<nav class="flex flex-col">
					{#each PAGES as _page}
						{@const isCurrentPage = page.url.pathname.startsWith(_page.href)}
						{@const Icon = _page.icon}

						<Button
							href={_page.href}
							onclick={() => (isDrawerOpen = false)}
							variant="ghost"
							size="lg"
							class={cn(
								"justify-start text-left",
								isCurrentPage && "text-primary",
							)}
						>
							<Icon
								class={cn("text-body size-5", isCurrentPage && "text-primary")}
							/>
							{_page.label}
						</Button>
					{/each}
				</nav>
				<hr />
				<div class="flex gap-3">
					<DarkModeSwitch />
					<LanguagePicker />
				</div>
			</Drawer.Content>
		</Drawer.Root>
	</div>
</nav>

<div class="mx-auto max-w-5xl px-6 pt-20 lg:px-0">
	{@render children()}
	<Footer />
</div>
