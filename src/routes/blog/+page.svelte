<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { postedAt, wasPostedThisWeek } from "$lib/utils/date";
	import { StarFillSystem } from "svelte-remix";

	let { data } = $props();
</script>

<hgroup class="mb-3 py-3 md:mb-6 md:py-6">
	<h1 class="text-3xl md:text-4xl">{m.articles()}</h1>
	<p class="text-body">{m.articles_subtitle()}</p>
</hgroup>

<ul class="flex flex-col gap-12">
	{#each data.postsByYear as yearPosts}
		{@const year = new Date(yearPosts[0].date).getFullYear()}
		<li class="flex flex-col gap-3">
			<h3 class="text-body text-2xl md:text-3xl">{year}</h3>
			{#each yearPosts as post}
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
							{#if wasPostedThisWeek(publishDate)}
								<StarFillSystem class="size-3.5" />
							{/if}
							{postedAt(publishDate)}
						</p>
						<h3 class="leading-5">
							{post.title}
						</h3>
					</hgroup>
				</a>
			{/each}
		</li>
	{/each}
</ul>
