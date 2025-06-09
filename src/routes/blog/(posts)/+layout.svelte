<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
	import { getLocale } from "$lib/paraglide/runtime.js";
	import { CalendarLineBusiness } from "svelte-remix";

	let { children, data } = $props();
</script>

<div class="flex w-full gap-12 py-12">
	<main class="mx-auto flex w-full max-w-2xl shrink-0 flex-col">
		<header class="mb-12 flex gap-3">
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
			class="prose xl:prose-lg prose-neutral dark:prose-invert prose-headings:font-semibold prose-code:before:hidden prose-blockquote:[&>p]:before:hidden prose-code:after:hidden prose-blockquote:not-italic prose-blockquote:bg-primary/20 [&>p>code]:bg-primary/20 prose-blockquote:border-primary prose-blockquote:rounded prose-blockquote:p-3 prose-blockquote:[&>p]:m-0 prose-blockquote:font-normal [&>p>code]:text-primary dark:[&_[data-remark-code-title]]:bg-muted/50 max-w-full [&_[data-remark-code-title]]:-mb-2 [&_[data-remark-code-title]]:rounded-t [&_[data-remark-code-title]]:bg-neutral-200 [&_[data-remark-code-title]]:px-3 [&_[data-remark-code-title]]:py-1.5 [&_[data-remark-code-title]+pre]:rounded-t-none [&>p>code]:rounded [&>p>code]:px-1 [&>p>code]:py-0.5 [&>p>code]:font-normal"
		>
			{@render children()}
		</article>
	</main>
	<aside
		class="sticky top-26 hidden h-fit w-full flex-col gap-3 border-l lg:flex"
	>
		<h1 class="ml-6 font-medium">{m.toc()}</h1>
		<div class="flex flex-col gap-1.5">
			<a
				href="#hello-world"
				class="before:bg-primary relative flex h-6 items-center pl-6 transition-all before:absolute before:top-0 before:-left-px before:h-full before:w-px"
			>
				Heading
			</a>
			<a
				href="#hello-world"
				class="text-body hover:text-foreground flex h-6 items-center pl-10 transition-all"
			>
				Sub heading
			</a>
		</div>
	</aside>
</div>
