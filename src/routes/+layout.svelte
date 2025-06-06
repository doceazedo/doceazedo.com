<script lang="ts">
	import "../app.css";
	import { cn } from "$lib/utils";
	import LanguagePicker from "$lib/components/settings/language-picker.svelte";

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
		"fixed top-0 left-0 z-40 h-20 w-full border-b border-b-transparent bg-transparent pr-[var(--scrollbar-width)] transition-colors",
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

		<div class="text-body -mr-3 ml-auto flex h-full items-center">
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
	</div>
</nav>

<div class="mx-auto max-w-5xl pt-20">
	{@render children()}
</div>
