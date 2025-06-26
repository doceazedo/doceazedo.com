<script lang="ts">
	import { pushState } from "$app/navigation";
	import Prose from "$lib/components/parts/prose.svelte";
	import Seo from "$lib/components/seo.svelte";
	import { m } from "$lib/paraglide/messages.js";
	import { getLocale } from "$lib/paraglide/runtime.js";
	import { cn } from "$lib/utils.js";
	import { onMount } from "svelte";
	import {
		BookReadLineDocument,
		CalendarLineBusiness,
		VerifiedBadgeFillBusiness,
	} from "svelte-remix";

	type Heading = {
		label: string;
		id: string;
		tag: string;
	};

	const NAVBAR_OFFSET = 80;
	const WPM = 250;

	let { children, data } = $props();

	let headingEls = $state<HTMLHeadingElement[]>([]);
	let headings = $derived<Heading[]>(
		headingEls.map((x) => ({
			label: x.innerText,
			id: x.id,
			tag: x.tagName.toLowerCase(),
		})),
	);
	let activeHeading = $state("");
	let activeHeadingIdx = $derived(
		headings.findIndex((x) => x.id === activeHeading),
	);
	let readTime = $state(1);
	let scrollY = $state(0);
	let innerHeight = $state(0);

	const onscroll = () => {
		const topVisibleTitle = headingEls.find(
			(x) => x.getBoundingClientRect().top >= NAVBAR_OFFSET,
		);
		if (!topVisibleTitle) return;
		activeHeading = topVisibleTitle.id;
	};

	onMount(() => {
		headingEls = [
			...document.querySelectorAll<HTMLHeadingElement>(
				".prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6",
			),
		];

		const prose = document.querySelector(".prose") as HTMLElement;
		const words = prose.innerText.split(" ").length;
		readTime = Math.round(words / WPM);
	});
</script>

<svelte:window bind:scrollY bind:innerHeight {onscroll} />

<Seo
	title="{data.metadata.title} • Doce Fernandes"
	thumbnail="/blog/{data.slug}.png"
/>

<div class="flex w-full gap-12 py-12">
	<main class="mx-auto flex w-full max-w-2xl shrink-0 flex-col gap-12">
		<header class="flex gap-3">
			<img src={data.metadata.icon} alt="" class="size-12" />
			<div class="flex flex-col gap-3">
				<h1 class="text-3xl font-semibold lg:text-4xl">
					{data.metadata.title}
				</h1>
				<div class="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-3">
					<div class="text-body flex items-center gap-1.5">
						<CalendarLineBusiness class="size-4" />
						<p class="[&>span]:text-foreground">
							{@html m.published_at({
								date: new Date(
									`${data.metadata.date} GMT-3`,
								).toLocaleDateString(getLocale()),
							})}
						</p>
					</div>
					<span class="text-body/70 hidden md:block">&bull;</span>
					<div class="text-body flex items-center gap-1.5">
						<BookReadLineDocument class="size-4" />
						<p class="[&>span]:text-foreground">
							{@html m.read_time({
								min: readTime,
							})}
						</p>
					</div>
				</div>
			</div>
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
		class="sticky top-32 hidden h-fit w-full max-w-[19rem] flex-col gap-3 border-l lg:flex"
	>
		<h1 class="ml-6 font-medium">{m.toc()}</h1>
		<div class="relative flex flex-col gap-1.5">
			{#each headings as heading, i}
				{@const isActive =
					activeHeading === heading.id || (activeHeading === "" && i === 0)}
				<a
					href="#{heading.id}"
					onclick={(e) => {
						e.preventDefault();
						const top =
							headingEls[i].getBoundingClientRect().top +
							scrollY -
							NAVBAR_OFFSET -
							24;
						pushState(`/blog/${data.slug}#${heading.id}`, {});
						window.scrollTo({
							top,
							left: 0,
							behavior: "smooth",
						});
					}}
					class={cn(
						"text-body hover:text-foreground relative flex h-6 items-center transition-all",
						isActive && "text-foreground",
						heading.tag === "h2" && "pl-6",
						heading.tag === "h3" && "pl-10",
						heading.tag === "h4" && "pl-14",
						heading.tag === "h5" && "pl-18",
					)}
				>
					<p class="truncate">{heading.label}</p>
				</a>
			{/each}
			<span
				class="bg-primary ease-elastic absolute top-0 -left-px h-6 w-px transition-all duration-300"
				style="top:{activeHeadingIdx >= 0 ? activeHeadingIdx * 30 : 0}px"
			></span>
		</div>
	</aside>
</div>
