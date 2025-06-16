<script lang="ts">
	import Prose from "$lib/components/parts/prose.svelte";
	import Seo from "$lib/components/seo.svelte";
	import { m } from "$lib/paraglide/messages.js";
	import { getLocale } from "$lib/paraglide/runtime.js";
	import { cn } from "$lib/utils.js";
	import { onMount } from "svelte";
	import {
		CalendarLineBusiness,
		VerifiedBadgeFillBusiness,
	} from "svelte-remix";

	type Heading = {
		label: string;
		id: string;
		tag: string;
	};

	let { children, data } = $props();

	let headings = $state<Heading[]>([]);
	let activeHeading = $state("");
	let activeHeadingIdx = $derived(
		headings.findIndex((x) => x.id === activeHeading),
	);

	onMount(() => {
		const headingEls = document.querySelectorAll<HTMLHeadingElement>(
			".prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6",
		);

		headings = [...headingEls].map((x) => ({
			label: x.innerText,
			id: x.id,
			tag: x.tagName.toLowerCase(),
		}));

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const id = entry.target.getAttribute("id") || "";
				if (entry.intersectionRatio > 0) {
					activeHeading = id;
				}
			});
		});

		headingEls.forEach((section) => {
			observer.observe(section);
		});
	});
</script>

<Seo title="{data.metadata.title} • Doce Fernandes" />

<div class="flex w-full gap-12 py-12">
	<main class="mx-auto flex w-full max-w-2xl shrink-0 flex-col gap-12">
		<header class="flex gap-3">
			<img src={data.metadata.icon} alt="" class="size-12" />
			<hgroup>
				<h1 class="mb-3 text-3xl font-semibold lg:text-4xl">
					{data.metadata.title}
				</h1>
				<p class="text-body flex items-center gap-1.5">
					<CalendarLineBusiness class="size-4" />
					{m.published_at({
						date: new Date(`${data.metadata.date} GMT-3`).toLocaleDateString(
							getLocale(),
						),
					})}
				</p>
			</hgroup>
		</header>
		<Prose class="xl:prose-lg">
			{@render children()}
		</Prose>
		<footer class="flex justify-center">
			<a
				href="/ai"
				class="ease-elastic hover:bg-muted hover:text-foreground text-body flex w-fit items-center gap-1.5 rounded border px-2 py-1.5 text-sm transition-all hover:scale-105"
			>
				<VerifiedBadgeFillBusiness class="text-primary size-5" />
				<p>{@html m.blog_footnote()}</p>
			</a>
		</footer>
	</main>
	<aside
		class="sticky top-32 hidden h-fit w-full flex-col gap-3 border-l lg:flex"
	>
		<h1 class="ml-6 font-medium">{m.toc()}</h1>
		<div class="relative flex flex-col gap-1.5">
			{#each headings as heading}
				<a
					href="#{heading.id}"
					class={cn(
						"text-body hover:text-foreground relative flex h-6 items-center transition-all",
						activeHeading === heading.id && "text-foreground",
						heading.tag === "h2" && "pl-6",
						heading.tag === "h3" && "pl-10",
						heading.tag === "h4" && "pl-14",
						heading.tag === "h5" && "pl-18",
					)}
				>
					{heading.label}
				</a>
			{/each}
			<span
				class="bg-primary ease-elastic absolute top-0 -left-px h-6 w-px transition-all duration-300"
				style="top:{activeHeadingIdx >= 0 ? activeHeadingIdx * 30 : 0}px"
			></span>
		</div>
	</aside>
</div>
