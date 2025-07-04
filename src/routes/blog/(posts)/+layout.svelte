<script lang="ts">
	import { pushState } from "$app/navigation";
	import Prose from "$lib/components/common/prose.svelte";
	import Seo from "$lib/components/common/seo.svelte";
	import { m } from "$lib/paraglide/messages.js";
	import { getLocale } from "$lib/paraglide/runtime.js";
	import type { PostActivity } from "$lib/types.js";
	import { cn } from "$lib/utils.js";
	import { onMount } from "svelte";
	import {
		BlueskyFillLogos,
		BlueskyLineLogos,
		BookReadLineDocument,
		CalendarLineBusiness,
		Chat1LineCommunication,
		Chat2LineCommunication,
		Heart3LineHealthMedical,
		Loader2LineSystem,
		RepeatLineMedia,
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

	const fetchSocialActivity = async (): Promise<PostActivity | null> => {
		try {
			const resp = await fetch(`/blog/${data.slug}/activity.json`);
			return await resp.json();
		} catch (_error) {
			return null;
		}
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

<div class="flex w-full flex-col gap-12 py-12">
	<div class="flex w-full gap-12 pt-12 md:pb-12">
		<main class="mx-auto flex w-full max-w-2xl shrink-0 flex-col gap-12">
			<header class="flex gap-3">
				<img src={data.metadata.icon} alt="" class="size-12" />
				<div class="flex flex-col gap-3">
					<h1 class="text-3xl font-semibold lg:text-4xl">
						{data.metadata.title}
					</h1>
					<div
						class="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-3"
					>
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
			<Prose>
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
	{#await fetchSocialActivity()}
		<p class="flex items-center justify-center gap-1.5">
			<Loader2LineSystem class="text-primary size-6 animate-spin" />
			Loading social activity...
		</p>
	{:then activity}
		{#if activity?.bluesky}
			{@const postUrl = `https://bsky.app/profile/doceazedo.com/post/${data.metadata.bskyPostId}`}
			{@const replyCount = activity.bluesky.thread.post.replyCount || 0}
			<hr />
			<div class="mx-auto flex w-full max-w-xl flex-col gap-12">
				<div class="mx-auto -my-6 flex gap-3 md:my-0">
					<a
						href={postUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:bg-primary/15 hover:text-primary group flex items-center justify-center gap-1.5 rounded px-3 py-2 transition-all"
					>
						<Chat1LineCommunication
							class="text-body group-hover:text-primary size-6 transition-all"
						/>
						{activity.bluesky.thread.post.replyCount}
					</a>
					<a
						href={postUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:bg-primary/15 hover:text-primary group flex items-center justify-center gap-1.5 rounded px-3 py-2 transition-all"
					>
						<RepeatLineMedia
							class="text-body group-hover:text-primary size-6 transition-all"
						/>
						{(activity.bluesky.thread.post.repostCount || 0) +
							(activity.bluesky.thread.post.quoteCount || 0)}
					</a>
					<a
						href={postUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center justify-center gap-1.5 rounded px-3 py-1.5 transition-all hover:bg-rose-500/15 hover:text-rose-500"
					>
						<Heart3LineHealthMedical
							class="text-body size-6 transition-all group-hover:text-rose-500"
						/>
						{activity.bluesky.thread.post.likeCount}
					</a>
				</div>
				<hgroup>
					<h1 class="mb-1.5 text-3xl font-semibold md:text-center lg:text-4xl">
						{replyCount === 1
							? m["1_comment"]()
							: m.x_comments({
									count: replyCount,
								})}
					</h1>
					<a
						href={postUrl}
						target="_blank"
						class="text-body hover:text-primary flex items-center gap-1.5 underline transition-all md:justify-center"
					>
						<BlueskyLineLogos class="size-5" />
						{m.comment_on_bluesky()}
					</a>
				</hgroup>

				<ul class="flex w-full flex-col gap-6 md:gap-12">
					{#each (activity.bluesky.thread.replies || []).reverse() as reply}
						{#if "post" in reply}
							{@const postedAt = new Date(
								reply.post.record.createdAt as string,
							)}
							<li class="flex gap-6">
								<a
									href="https://bsky.app/profile/{reply.post.author.handle}"
									target="_blank"
									rel="noopener noreferrer"
									class="hover:text-primary ease-elastic size-12 shrink-0 rounded leading-4 font-medium transition-all hover:scale-115"
								>
									<img
										src={reply.post.author.avatar}
										alt=""
										class="size-full rounded border"
									/>
								</a>
								<div class="relative flex w-full flex-col gap-3">
									<span
										class="bg-background absolute top-4.5 -left-1.5 size-3 -rotate-45 rounded-tl-xs border-t border-l"
									></span>
									<div class="flex flex-col gap-1.5 rounded border p-4.5">
										<div class="-my-1.5 flex items-center gap-1.5">
											<a
												href="https://bsky.app/profile/{reply.post.author
													.handle}"
												target="_blank"
												rel="noopener noreferrer"
												class="hover:text-primary leading-4 font-medium transition-all hover:underline"
											>
												{reply.post.author.displayName}
											</a>
											<span class="text-body/70">&bull;</span>
											<a
												href="https://bsky.app/profile/{reply.post.author
													.handle}/post/{reply.post.uri.split(
													'app.bsky.feed.post/',
												)[1]}"
												target="_blank"
												rel="noopener noreferrer"
												class="text-body/70 hover:text-primary text-sm leading-4 transition-all hover:underline"
											>
												{new Date(postedAt).toLocaleDateString(getLocale(), {
													day: "2-digit",
													month: "long",
													year:
														postedAt.getFullYear() !== new Date().getFullYear()
															? "numeric"
															: undefined,
												})}
											</a>
										</div>
										<p class="text-body">{reply.post.record.text}</p>
										{#if reply.post.embed}
											{#if "external" in reply.post.embed}
												<img
													src={reply.post.embed.external.uri}
													alt=""
													class="mt-1.5 rounded border"
												/>
											{/if}
										{/if}
									</div>
								</div>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		{/if}
	{/await}
</div>
