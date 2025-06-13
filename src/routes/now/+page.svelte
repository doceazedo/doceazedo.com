<script lang="ts">
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { m } from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { toFixedIfNecessary } from "$lib/utils/numbers";
	import {
		ArrowRightLineArrows,
		BookMarkedFillDocument,
		CalendarCheckLineBusiness,
		CalendarLineBusiness,
		GamepadFillDevice,
		GamepadLineDevice,
		HeadphoneFillMedia,
		UserLineUserFaces,
	} from "svelte-remix";
	import NowSectionTitle from "./now-section-title.svelte";
	import { Button } from "$lib/components/ui/button";
	import { LAST_PLAYED_TRACKS } from "$lib/stores";
	import { Progress } from "$lib/components/ui/progress";

	const BOOK = {
		title: {
			en: "The Name of the Wind",
			pt: "O Nome do Vento",
		},
		subtitle: {
			en: "The Kingkiller Chronicle: Day One",
			pt: "A Crônica do Matador do Rei: Primeiro Dia",
		},
		author: "Patrick Rothfuss",
		cover: "/img/o-nome-do-vento.webp",
		url: "https://www.goodreads.com/book/show/8480575-o-nome-do-vento",
		pages: {
			read: 0,
			total: 656,
			updatedAt: new Date("2025/06/13 GMT-3"),
		},
		startedAt: new Date("2025/06/13 GMT-3"),
	};

	const getLastPlayedGames = async () => {
		try {
			const resp = await fetch("/api/now/games");
			return await resp.json();
		} catch (_error) {
			return [];
		}
	};

	const handleMissingGameCover = (event: Event) => {
		const img = event.target as HTMLImageElement;
		const placeholder = `https://placehold.co/600x900?text=${encodeURIComponent(img.alt)}`;
		if (img.src === placeholder) return;
		img.src = placeholder;
	};

	let innerWidth = $state(0);
	let isDesktop = $derived(innerWidth >= 768);
</script>

<svelte:window bind:innerWidth />

<div class="flex flex-col gap-12">
	<hgroup class="py-3 md:py-6">
		<h1 class="text-3xl md:text-4xl">{m.now()}</h1>
		<p class="text-body">{m.now_subtitle()}</p>
	</hgroup>

	<NowSectionTitle
		icon={BookMarkedFillDocument}
		title={m.reading()}
		subtitle={m.reading_subtitle()}
	/>
	<a
		href={BOOK.url}
		target="_blank"
		rel="noopener noreferrer"
		class="ease-elastic hover:bg-muted flex grid-cols-6 gap-6 rounded border p-3 transition-all hover:scale-105 md:grid"
	>
		<figure
			class="relative h-fit w-1/4 shrink-0 before:absolute before:top-0 before:left-0 before:size-full before:rounded before:border before:border-white/20 md:w-auto"
		>
			<img src={BOOK.cover} alt="" class="w-full rounded" />
		</figure>
		<div class="col-span-5 flex w-full flex-col gap-1.5 md:gap-3">
			<hgroup>
				<h3 class="-mb-0.5 text-xl md:-mb-px md:text-2xl">
					{BOOK.title[getLocale()]}
				</h3>
				<p class="text-body text-xs leading-4 md:text-sm">
					{BOOK.subtitle[getLocale()]}
				</p>
			</hgroup>
			<div
				class="text-body flex flex-col gap-1.5 text-sm md:flex-row md:gap-3 md:text-base"
			>
				<p class="hidden items-center gap-1 md:flex">
					<UserLineUserFaces class="text-foreground size-3.5 md:size-4.5" />
					{BOOK.author}
				</p>
				<span class="hidden opacity-80 md:block">&bull;</span>
				<div class="flex items-center gap-1">
					<CalendarLineBusiness class="text-foreground size-3.5 md:size-4.5" />
					<p class="[&>span]:text-foreground">
						{@html m.started_at({
							date: BOOK.startedAt.toLocaleDateString(getLocale()),
						})}
					</p>
				</div>
			</div>
			<div class="mt-auto flex flex-col gap-1.5">
				<div class="flex items-center justify-between text-sm md:text-base">
					<p class="text-body [&>span]:text-foreground">
						{@html m.pages_read({
							current: BOOK.pages.read,
							total: BOOK.pages.total,
						})}
					</p>
					<div class="text-body flex items-center gap-1 text-sm md:text-base">
						<CalendarCheckLineBusiness
							class="text-foreground size-3.5 md:size-4.5"
						/>
						<p class="[&>span]:text-foreground">
							{#if isDesktop}
								{@html m.updated_at({
									date: BOOK.pages.updatedAt.toLocaleDateString(getLocale()),
								})}
							{:else}
								{BOOK.pages.updatedAt.toLocaleDateString(getLocale())}
							{/if}
						</p>
					</div>
				</div>
				<Progress value={BOOK.pages.read} max={BOOK.pages.total} />
			</div>
		</div>
	</a>

	<hr />

	<NowSectionTitle
		icon={HeadphoneFillMedia}
		title={m.listening()}
		subtitle={m.listening_subtitle()}
	/>
	<div class="grid gap-6 md:grid-cols-2">
		<div class="flex flex-col gap-3">
			<h3 class="text-xl md:text-2xl">{m.last_played_tracks()}</h3>
			<div class="flex flex-col gap-3 rounded border p-3">
				{#if !$LAST_PLAYED_TRACKS}
					{#each Array(5).fill(null) as _uwu}
						<Skeleton class="h-[54px] w-full rounded" />
					{/each}
				{:else}
					{#each $LAST_PLAYED_TRACKS as track}
						<a
							href="https://www.last.fm/music/{track.artist.replaceAll(
								' ',
								'+',
							)}/_/{track.track.replaceAll(' ', '+')}"
							target="_blank"
							rel="noopener noreferrer"
							class="ease-elastic hover:bg-muted flex items-center gap-1.5 rounded border p-1.5 pr-3 transition-all hover:-translate-y-1"
						>
							<img
								src={track.cover}
								alt=""
								class="size-10 rounded object-cover"
							/>
							<div class="flex flex-col justify-center">
								<p class="text-body -mb-1 text-sm">{track.artist}</p>
								<p>{track.track}</p>
							</div>
							<div class="ml-auto flex items-center gap-1.5 text-xs">
								{#if track.nowPlaying}
									<p class="hidden lg:block">{m.now_playing()}</p>
									<span
										class="before:animation-duration-[2s] relative flex size-1.5 items-center justify-center rounded-full bg-red-500 before:absolute before:flex before:size-2 before:animate-ping before:rounded-full before:bg-red-500/70"
									></span>
								{:else if track.playedAt}
									{@const playedAt = new Date(track.playedAt)}
									{@const isToday =
										new Date().toDateString() === playedAt.toDateString()}
									{@const formattedDate = playedAt.toLocaleDateString(
										getLocale(),
										{
											day: "numeric",
											month: "numeric",
										},
									)}
									{@const formattedTime = playedAt.toLocaleTimeString(
										getLocale(),
										{
											hour: "2-digit",
											minute: "2-digit",
										},
									)}

									<p class="text-body">
										{#if !isToday}
											{m.date_time({
												date: formattedDate,
												time: formattedTime,
											})}
										{:else}
											{formattedTime}
										{/if}
									</p>
								{/if}
							</div>
						</a>
					{/each}
				{/if}
				<Button
					href="https://www.last.fm/user/doceazedo911"
					target="_blank"
					variant="link"
					class="ml-auto"
				>
					{m.see_on_lastfm()}
					<ArrowRightLineArrows class="size-5" />
				</Button>
			</div>
		</div>

		<div class="flex flex-col gap-3">
			<h3 class="text-xl md:text-2xl">{m.discover_weekly()}</h3>
			<iframe
				class="aspect-square size-full rounded border md:aspect-auto"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2036041653%3Fsecret_token%3Ds-0gxDfMC07SI&color=%23ff5500&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true"
				title="SoundCloud"
			></iframe>
		</div>
	</div>

	<hr />

	<NowSectionTitle
		icon={GamepadFillDevice}
		title={m.playing_games()}
		subtitle={m.playing_games_subtitle()}
	/>
	<div class="flex flex-col gap-3 md:gap-6">
		<div class="grid grid-cols-3 gap-3 md:grid-cols-5 lg:gap-6">
			{#await getLastPlayedGames()}
				{#each Array(5).fill(null) as _uwu}
					<Skeleton class="aspect-[6/9] rounded" />
				{/each}
			{:then games}
				{#each games as game}
					<Tooltip.Provider delayDuration={300}>
						<Tooltip.Root>
							<Tooltip.Trigger>
								<a
									href={game.url}
									target="_blank"
									rel="noopener noreferrer"
									class="bg-muted ease-elastic relative flex aspect-[6/9] rounded transition-all before:absolute before:top-0 before:left-0 before:size-full before:rounded before:border before:border-white/15 hover:scale-105 lg:hover:scale-115"
								>
									<img
										src={game.cover}
										alt={game.name}
										class="size-full rounded object-cover"
										data-appid={game.appid}
										onerror={handleMissingGameCover}
									/>
								</a></Tooltip.Trigger
							>
							<Tooltip.Content
								side="bottom"
								class="justify-center"
								sideOffset={24}
							>
								<p class="mx-auto mb-px max-w-[20ch] text-center leading-5">
									{game.name}
								</p>
								<div class="flex items-center justify-center gap-1">
									{#if game.updatedAt}
										<CalendarCheckLineBusiness class="text-body size-4" />
									{:else}
										<GamepadLineDevice class="text-body size-4" />
									{/if}
									<p
										class="text-body [&>span]:text-secondary-foreground text-center text-sm"
									>
										{#if game.updatedAt}
											{@html m.updated_at({
												date: new Date(game.updatedAt).toLocaleDateString(
													getLocale(),
												),
											})}
										{:else if game.playtime}
											{@html m.played_last_two_weeks({
												time:
													game.playtime >= 60
														? `${toFixedIfNecessary(game.playtime / 60)}h`
														: `${game.playtime}min`,
											})}
										{/if}
									</p>
								</div>
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				{/each}
			{/await}
		</div>
		<Button
			href="https://steamcommunity.com/id/doceazedo911"
			target="_blank"
			variant="link"
			class="w-fit md:ml-auto"
		>
			{m.add_me_on_steam()}
			<ArrowRightLineArrows class="size-5" />
		</Button>
	</div>
</div>
