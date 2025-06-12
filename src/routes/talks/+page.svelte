<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import {
		CalendarScheduleLineBusiness,
		PlayLineMedia,
		PresentationFillBusiness,
	} from "svelte-remix";

	const PAST_TALKS = [
		{
			title: "Aprenda a programar em Kotlin fazendo plugins para Minecraft",
			organizer: "Kotlinautas",
			date: new Date("2022/07/09"),
			watch: "https://twitch.tv/videos/1537950001",
			slides: "/slides/plugin-minecraft-futebol-kotlin.pdf",
		},
		{
			title: "Mensageria e tarefas assíncronas com Node.js e BullMQ",
			organizer: "NodeBR",
			date: new Date("2023/10/02"),
			watch: "https://www.youtube.com/watch?v=CxTTt0zuXuU",
			slides: "/slides/nodebr-bullmq.pdf",
		},
	];

	const INFORMATION = [
		{ key: m.name(), value: "Doce Fernandes" },
		{ key: m.pronouns(), value: m.my_pronouns() },
		{
			key: m.avatar(),
			value: "doceazedo.com/img/avatar.jpg",
			href: "/img/avatar.jpg",
		},
		{
			key: m.minibio(),
			value: m.my_minibio(),
		},
		{ key: m.location(), value: m.my_location() },
		{
			key: m.company(),
			value: "Rail Europe",
			href: "https://www.linkedin.com/company/1528184",
		},
		{
			key: m.speaker_info_website(),
			value: "doceazedo.com",
			href: "https://doceazedo.com",
		},
		{
			key: "GitHub",
			value: "@doceazedo",
			href: "https://github.com/doceazedo",
		},
	];
</script>

<div class="flex flex-col gap-6 py-3 md:gap-12 md:py-6">
	<h1 class="text-3xl md:text-4xl">{m.upcoming_talks()}</h1>
	<div
		class="flex w-full justify-center gap-6 rounded border border-dashed p-6 md:flex-col md:items-center md:gap-3 md:py-12 md:text-center"
	>
		<CalendarScheduleLineBusiness class="text-body/70 size-8 shrink-0" />
		<div>
			<p class="text-body">
				{m.upcoming_talks_empty()}
			</p>
			<a
				class="hover:text-primary underline transition-all"
				href="#giving-talks"
			>
				{m.upcoming_talks_cta()}
			</a>
		</div>
	</div>
	<hr />
	<h1 class="text-3xl md:text-4xl">{m.past_talks()}</h1>
	<ul class="flex flex-col gap-12 md:gap-6">
		{#each PAST_TALKS as talk}
			<li class="flex flex-col justify-between gap-3 md:flex-row">
				<hgroup>
					<h2>{talk.title}</h2>
					<p class="text-body">
						{talk.organizer} &bull; {talk.date.toLocaleDateString(getLocale(), {
							month: "long",
							year: "numeric",
						})}
					</p>
				</hgroup>
				<div class="flex gap-6">
					<a
						class="text-body hover:text-foreground flex items-center gap-1.5 transition-all"
						href={talk.watch}
						target="_blank"
					>
						<PlayLineMedia class="size-5" />
						{m.watch()}
					</a>

					<a
						class="text-body hover:text-foreground flex items-center gap-1.5 transition-all"
						href={talk.slides}
						target="_blank"
					>
						<PresentationFillBusiness class="size-5" />
						{m.slides()}
					</a>
				</div>
			</li>
		{/each}
	</ul>
	<hr id="giving-talks" />
	<div class="text-body flex flex-col gap-6">
		<h1 class="text-foreground text-3xl md:text-4xl">{m.giving_talks()}</h1>
		<p>
			{m.giving_talks_subtitle()}
		</p>
		<p>{m.giving_talks_subjects()}</p>
		<ul class="marker:text-foreground list-inside list-disc pl-3">
			<li>{m.giving_talks_subject_svelte()}</li>
			<li>{m.giving_talks_subject_design()}</li>
			<li>{m.giving_talks_subject_rust()}</li>
		</ul>
		<p class="[&>span]:text-foreground">
			{@html m.giving_talks_languages()}
		</p>
		<p class="[&>span]:text-foreground">
			{@html m.giving_talks_in_person_availability()}
		</p>
		<p>
			{m.giving_talks_in_person_expectations()}
		</p>
		<p>
			{m.giving_talks_international_expectations()}
		</p>
		<p
			class="[&>a]:text-foreground [&>a]:hover:text-primary [&>a]:underline [&>a]:transition-all"
		>
			{@html m.giving_talks_cta()}
		</p>
	</div>
	<div class="text-body flex flex-col gap-6">
		<h2 class="text-foreground text-2xl md:text-3xl">{m.speaker_info()}</h2>
		<p>{m.speaker_info_subtitle()}</p>
		<div class="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1.5">
			{#each INFORMATION as info}
				<p class="text-body/70 text-right font-medium">{info.key}</p>
				{#if info.href}
					<a
						href={info.href}
						target="_blank"
						class="text-foreground hover:text-primary w-fit underline transition-all"
					>
						{info.value}
					</a>
				{:else}
					<p class="max-w-[48ch]">{info.value}</p>
				{/if}
			{/each}
		</div>
	</div>
</div>
