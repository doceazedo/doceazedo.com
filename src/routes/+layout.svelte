<script lang="ts">
	import "../app.css";
	import BrazilFlag from "$lib/components/icons/brazil-flag.svg?component";
	import { ArrowDownSLineArrows } from "svelte-remix";

	let { children } = $props();

	const PAGES = [
		{ label: "Speaking", href: "/" },
		{ label: "Blog", href: "/" },
		{ label: "Resources", href: "/" },
		{ label: "Stack", href: "/" },
		{ label: "About me", href: "/" },
	];
</script>

<nav class="fixed top-0 left-0 h-20 w-full">
	<div class="mx-auto flex size-full max-w-5xl items-center">
		<a href="/" class="flex items-center gap-1.5 text-2xl">
			<img src="/img/memoji.png" alt="" class="size-8" />
			<span>
				doce<span class="text-foreground/70">.sh</span>
			</span>
		</a>

		<div class="text-foreground/70 -mr-3 ml-auto flex h-full items-center">
			{#each PAGES as page}
				<a
					href={page.href}
					class="hover:text-foreground flex h-full items-center px-3 transition-all"
				>
					{page.label}
				</a>
			{/each}

			<button
				class="hover:text-foreground flex h-full cursor-pointer items-center gap-3 px-3 transition-all"
			>
				<BrazilFlag class="size-6" />
				<span class="flex items-center gap-1.5">
					Português
					<ArrowDownSLineArrows class="size-4" />
				</span>
			</button>
		</div>
	</div>
</nav>

<div class="mx-auto max-w-5xl pt-20">
	{@render children()}
</div>
