<script lang="ts">
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
		<article
			class="prose xl:prose-lg prose-neutral dark:prose-invert prose-headings:font-semibold prose-code:before:hidden prose-blockquote:[&>p]:before:hidden prose-code:after:hidden prose-blockquote:not-italic prose-blockquote:bg-primary/20 [&>p>code]:bg-primary/20 prose-blockquote:border-primary prose-blockquote:rounded prose-blockquote:p-3 prose-blockquote:[&>p]:m-0 prose-blockquote:font-normal [&>p>code]:text-primary dark:[&_[data-remark-code-title]]:bg-muted/50 prose-img:rounded prose-strong:text-foreground prose-a:hover:text-primary prose-a:transition-all prose-li:my-0 max-w-full [&_[data-remark-code-title]]:-mb-2 [&_[data-remark-code-title]]:rounded-t [&_[data-remark-code-title]]:bg-neutral-200 [&_[data-remark-code-title]]:px-3 [&_[data-remark-code-title]]:py-1.5 [&_[data-remark-code-title]+pre]:rounded-t-none [&>p>code]:rounded [&>p>code]:px-1 [&>p>code]:py-0.5 [&>p>code]:font-normal"
		>
			{@render children()}
		</article>
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
		class="sticky top-26 hidden h-fit w-full flex-col gap-3 border-l lg:flex"
	>
		<h1 class="ml-6 font-medium">{m.toc()}</h1>
		<div class="flex flex-col gap-1.5">
			{#each headings as heading}
				<a
					href="#{heading.id}"
					class={cn(
						"text-body hover:text-foreground relative flex h-6 items-center transition-all before:absolute before:top-0 before:-left-px before:h-full before:w-px",
						activeHeading === heading.id && "text-foreground before:bg-primary",
						heading.tag === "h2" && "pl-6",
						heading.tag === "h3" && "pl-10",
						heading.tag === "h4" && "pl-14",
						heading.tag === "h5" && "pl-18",
					)}
				>
					{heading.label}
				</a>
			{/each}
		</div>
	</aside>
</div>
