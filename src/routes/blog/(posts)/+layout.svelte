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
			class="prose xl:prose-lg prose-neutral dark:prose-invert prose-headings:font-semibold max-w-full"
		>
			{@render children()}
		</article>
	</main>
	<aside class="hidden h-fit w-full flex-col gap-3 border-l lg:flex">
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
