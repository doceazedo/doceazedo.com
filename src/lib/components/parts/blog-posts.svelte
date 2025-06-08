<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		ArrowRightLineArrows,
		PushpinFillMap,
		StarFillSystem,
	} from "svelte-remix";
	import { m } from "$lib/paraglide/messages";
	import { page } from "$app/state";
	import { getLocale } from "$lib/paraglide/runtime";

	const wasPostedThisWeek = (date: Date) => {
		const now = new Date();
		const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
		return date >= oneWeekAgo;
	};

	const postedAt = (date: Date) => {
		if (wasPostedThisWeek(date)) return m.published_this_week();

		const now = new Date();
		if (date.getFullYear() === now.getFullYear()) {
			return date.toLocaleDateString(getLocale(), { month: "long" });
		}

		return date.toLocaleDateString(getLocale(), {
			month: "long",
			year: "numeric",
		});
	};
</script>

<section class="mb-12 flex flex-col gap-12 border-t pt-12 md:mb-24 md:pt-24">
	<header
		class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
	>
		<hgroup>
			<h2 class="text-3xl">{m.articles()}</h2>
			<p class="text-body">{m.articles_subtitle()}</p>
		</hgroup>
		<Button variant="link" class="w-fit">
			{m.see_all_articles()}
			<ArrowRightLineArrows class="size-5" />
		</Button>
	</header>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each page.data.posts as post}
			{@const publishDate = new Date(`${post.date} GMT-3`)}
			<a
				href="/blog/{post.slug}"
				class="hover:bg-muted/70 ease-elastic flex items-center gap-3 rounded border p-6 transition-all hover:-translate-y-1.5"
			>
				<img src={post.icon} alt="" class="size-12" />
				<hgroup class="flex flex-col gap-0.5">
					<p
						class="text-primary flex items-center gap-1.5 text-xs font-semibold uppercase"
					>
						{#if post.pinned}
							<PushpinFillMap class="size-3.5" />
							{m.pinned()}
						{:else}
							{#if wasPostedThisWeek(publishDate)}
								<StarFillSystem class="size-3.5" />
							{/if}
							{postedAt(publishDate)}
						{/if}
					</p>
					<h3 class="leading-5">
						{post.title}
					</h3>
				</hgroup>
			</a>
		{/each}
	</div>
</section>
