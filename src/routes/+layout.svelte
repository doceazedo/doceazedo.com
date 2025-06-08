<script lang="ts">
	import "../app.css";
	import { cn } from "$lib/utils";
	import LanguagePicker from "$lib/components/settings/language-picker.svelte";
	import { Button } from "$lib/components/ui/button";
	import { MenuFillSystem } from "svelte-remix";
	import * as Drawer from "$lib/components/ui/drawer";
	import Footer from "$lib/components/parts/footer.svelte";

	let { children } = $props();

	const PAGES = [
		{ label: "Speaking", href: "/" },
		{ label: "Blog", href: "/" },
		{ label: "Resources", href: "/" },
		{ label: "Stack", href: "/" },
		{ label: "About me", href: "/" },
	];

	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<nav
	class={cn(
		"fixed top-0 left-0 z-40 h-16 w-full border-b border-b-transparent bg-transparent px-3 transition-colors md:h-20 md:pr-[var(--scrollbar-width)]! lg:px-0",
		scrollY > 24 && "bg-background/70 border-b-border backdrop-blur-md",
	)}
>
	<div class="mx-auto flex size-full max-w-5xl items-center">
		<a href="/" class="flex items-center gap-1.5 text-2xl">
			<img src="/img/memoji.png" alt="" class="size-8" />
			<span>
				doce<span class="text-body">.sh</span>
			</span>
		</a>

		<div class="text-body -mr-3 ml-auto hidden h-full items-center md:flex">
			{#each PAGES as page}
				<a
					href={page.href}
					class="hover:text-foreground flex h-full items-center px-3 transition-all"
				>
					{page.label}
				</a>
			{/each}

			<LanguagePicker />
		</div>

		<Drawer.Root>
			<Drawer.Trigger
				class="-mr-1.5 ml-auto flex size-12 items-center justify-center md:hidden"
			>
				<MenuFillSystem class="size-6" />
			</Drawer.Trigger>
			<Drawer.Content>
				<nav class="flex flex-col">
					{#each PAGES as page}
						<Button
							href={page.href}
							variant="ghost"
							class="justify-start text-left"
						>
							{page.label}
						</Button>
					{/each}
				</nav>
				<hr />
				<LanguagePicker />
			</Drawer.Content>
		</Drawer.Root>
	</div>
</nav>

<div class="mx-auto max-w-5xl px-6 pt-20 lg:px-0">
	{@render children()}
	<Footer />
</div>
