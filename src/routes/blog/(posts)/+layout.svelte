<script lang="ts">
	import { pushState } from "$app/navigation";
	import Prose from "$lib/components/common/prose.svelte";
	import Seo from "$lib/components/common/seo.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { SOCIALS } from "$lib/constants.js";
	import { m } from "$lib/paraglide/messages.js";
	import { getLocale } from "$lib/paraglide/runtime.js";
	import type { PostActivity } from "$lib/types.js";
	import { cn } from "$lib/utils.js";
	import { onMount } from "svelte";
	import {
		BlueskyLineLogos,
		BookReadLineDocument,
		CalendarLineBusiness,
		Chat3LineCommunication,
		EyeLineSystem,
		Heart3LineHealthMedical,
		MastodonLineLogos,
		PlayFillMedia,
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

	let activity = $state<PostActivity>();
	const fetchSocialActivity = async () => {
		try {
			const resp = await fetch(`/blog/${data.slug}/activity.json`);
			activity = await resp.json();
		} catch (_error) {
			activity = {
				likesCount: 0,
				viewsCount: 0,
				comments: [],
			};
		}
	};

	const getCommentsSectionTitle = (count: number) => {
		return count === 1 ? m["1_comment"]() : m.x_comments({ count });
	};

	const isEmojiOnly = (str: string) =>
		str.split(" ").every((x) => /\p{Extended_Pictographic}/u.test(x));

	onMount(() => {
		headingEls = [
			...document.querySelectorAll<HTMLHeadingElement>(
				".prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6",
			),
		];

		const prose = document.querySelector(".prose") as HTMLElement;
		const words = prose.innerText.split(" ").length;
		readTime = Math.round(words / WPM);

		fetchSocialActivity();
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
			<a
				href="/ai"
				class="ease-elastic hover:bg-primary/10 hover:border-primary hover:text-foreground text-body [&_u]:text-foreground hover:[&_u]:text-primary mx-auto flex w-fit items-center gap-1.5 rounded border px-2 py-1.5 text-sm transition-all hover:scale-105 [&_u]:transition-all"
			>
				<VerifiedBadgeFillBusiness class="text-primary size-5" />
				<p>{@html m.blog_footnote()}</p>
			</a>
			<div class="flex items-center gap-6">
				<hr class="w-full" />
				<div class="text-body flex items-center gap-1.5">
					<Heart3LineHealthMedical class="size-5" />
					{activity ? activity.likesCount : "—"}
				</div>
				<div class="text-body flex items-center gap-1.5">
					<Chat3LineCommunication class="size-5" />
					{activity ? activity.comments.length : "—"}
				</div>
				<div class="text-body flex items-center gap-1.5">
					<EyeLineSystem class="size-5" />
					{activity ? activity.viewsCount : "—"}
				</div>
				<hr class="w-full" />
			</div>
			<div class="flex flex-col gap-3">
				<h1 class="text-3xl font-semibold lg:text-4xl">
					{getCommentsSectionTitle(activity?.comments?.length || 0)}
				</h1>
				<div class="text-body flex items-center gap-1.5">
					{m.comment_on()}
					<Button
						href="https://bsky.app/profile/{SOCIALS.bluesky.handle}/post/{data
							.metadata.blueskyPostId}"
						target="_blank"
						rel="noopener noreferrer"
						variant="outline"
						size="sm"
					>
						<BlueskyLineLogos class="size-5" />
						Bluesky
					</Button>
					<!--
							{m.or()}
							<Button variant="outline" size="sm">
								<MastodonLineLogos class="size-5" />
								Mastodon
							</Button>
						-->
				</div>
			</div>
			<ul class="flex flex-col gap-6 md:gap-12">
				{#if activity}
					{#each activity.comments as comment}
						<li
							class="ease-elastic hover:before:bg-muted/50 before:border-border relative flex gap-4 p-4 transition-all before:absolute before:top-0 before:left-0 before:-z-10 before:size-full before:rounded before:border before:transition-all hover:scale-105 md:gap-6 md:p-6"
						>
							<a
								href={comment.author.url}
								target="_blank"
								rel="noopener noreferrer"
								class="relative size-12 shrink-0 rounded-full before:absolute before:size-12 before:rounded-full before:border before:border-white/15 md:size-14 md:before:size-14"
							>
								<img
									src={comment.author.avatar}
									alt=""
									class="size-full rounded-full"
								/>
							</a>
							<div class="flex w-full flex-col">
								<p
									class="text-foreground flex items-center gap-1.5 font-medium"
								>
									<a
										href={comment.author.url}
										target="_blank"
										rel="noopener noreferrer"
										class="hover:text-primary text-lg transition-all"
									>
										{comment.author.displayName}
									</a>
									{#if comment.author.id === SOCIALS.bluesky.id}
										<VerifiedBadgeFillBusiness class="text-primary size-4" />
									{/if}
									<span class="dark:text-muted text-border scale-90">
										&bull;
									</span>
									<a
										href={comment.url}
										target="_blank"
										rel="noopener noreferrer"
										class="text-body text-sm hover:underline"
									>
										{new Date(comment.postedAt).toLocaleDateString(
											getLocale(),
											{
												month: "short",
												day: "numeric",
											},
										)}
									</a>
								</p>
								{#if !comment.embed && isEmojiOnly(comment.content) && !comment.content.includes("\n")}
									{@const emojiCount = comment.content.split("").length}
									<p class={emojiCount <= 3 ? "text-6xl" : "text-3xl"}>
										{comment.content}
									</p>
								{:else}
									<Prose class="w-full whitespace-pre-line">
										{@html comment.content}
									</Prose>
								{/if}
								{#if comment.embed}
									<div class="mt-3 w-full">
										{#if comment.embed.type === "image"}
											{@const qty = comment.embed.images.length}
											{#if qty === 1}
												{@const img = comment.embed.images[0]}
												<img
													src={img.thumbnail}
													alt={img.alt || "Image"}
													class="size-full max-h-[48rem] w-full rounded md:w-[calc(50%-6px)]"
												/>
											{:else}
												<div class="grid grid-cols-2 gap-1.5">
													{#each comment.embed.images as img, i}
														<figure
															class={cn(
																"relative overflow-hidden rounded before:absolute before:size-full before:rounded before:border before:border-white/15",
																qty === 1 && "aspect-square",
																qty === 3 &&
																	i === 0 &&
																	"row-span-2 aspect-auto! h-full",
																qty >= 3 && "aspect-video",
															)}
														>
															<img
																src={img.thumbnail}
																alt={img.alt || "Image"}
																class="size-full rounded object-cover"
															/>
														</figure>
													{/each}
												</div>
											{/if}
										{:else if comment.embed.type === "video" && comment.embed.thumbnail}
											<a
												href={comment.url}
												target="_blank"
												rel="noopener noreferrer"
												class="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded before:absolute before:size-full before:rounded before:border before:border-white/15"
											>
												<img
													src={comment.embed.thumbnail}
													alt="Video thumbnail"
													class="size-full object-cover"
												/>
												<div
													class="bg-primary/20 hover:bg-primary/40 border-primary absolute flex size-12 items-center justify-center rounded-full border transition-all"
												>
													<PlayFillMedia class="text-primary size-6" />
												</div>
											</a>
										{:else if comment.embed.type === "link"}
											<a
												href={comment.embed.url}
												target="_blank"
												rel="noopener noreferrer"
												class="hover:bg-primary/15 hover:border-primary flex flex-col rounded border transition-all"
											>
												{#if comment.embed.thumbnail}
													<img
														src={comment.embed.thumbnail}
														alt="Link preview"
														class="aspect-[120/63] w-full rounded-t object-cover"
													/>
												{/if}
												<hgroup class="p-3">
													<p class="line-clamp-1 font-medium">
														{comment.embed.title}
													</p>
													{#if comment.embed.description}
														<p class="text-body line-clamp-2 text-sm">
															{comment.embed.description}
														</p>
													{/if}
												</hgroup>
											</a>
										{/if}
									</div>
								{/if}
								{#if comment.likesCount > 0}
									<div class="text-body mt-3 flex items-center gap-1.5">
										<Heart3LineHealthMedical class="size-5" />
										{comment.likesCount}
									</div>
								{/if}
							</div>
						</li>
					{/each}
				{:else}
					<Skeleton class="h-24 w-full" />
					<Skeleton class="h-24 w-full" />
					<Skeleton class="h-24 w-full" />
				{/if}
			</ul>
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
</div>
