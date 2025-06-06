<script lang="ts">
	import { cn } from "$lib/utils";
	import {
		siSvelte,
		siKotlin,
		siFfmpeg,
		siPocketbase,
		siRust,
		siGodotengine,
		siFlutter,
		siSupabase,
		siBackblaze,
	} from "simple-icons";

	const WORK_PROJECTS = [
		{
			pretitle: "SaaS",
			title: "Afterparty",
			description:
				"Event photo management platform, with 4K storage, multiplayer, and built-in engagement features.",
			thumbnail: "/img/afterparty-lp.webp",
			stack: [siSvelte.svg, siPocketbase.svg, siFfmpeg.svg, siBackblaze.svg],
		},
		{
			pretitle: "Extension",
			title: "Godot WRY",
			description:
				"Rust-based extension that integrates platform-specific webviews into Godot games (without extra dependencies).",
			thumbnail: "/img/godot-wry-cas.webp",
			stack: [siRust.svg, siGodotengine.svg],
		},
		{
			pretitle: "Mobile",
			title: "Powershift",
			description:
				"Field service management mobile app for utility workers with a web dashboard.",
			thumbnail: "/img/powershift-mockup.webp",
			stack: [siFlutter.svg, siSvelte.svg, siSupabase.svg],
		},
		{
			pretitle: "Minecraft Server",
			title: "SSN.gg",
			description:
				"A Minecraft server with no rules, an infinite map, and open-source plugins and configs.",
			thumbnail: "/img/ssn-bee.webp",
			stack: [siKotlin.svg, siPocketbase.svg],
		},
		{
			pretitle: "Mystery Box",
			title: "What's inside...?",
			description:
				"It makes tiny happy noises when you're not paying attention...",
			thumbnail: "",
			stack: ["✨", "💫", "🔮"],
		},
	];
</script>

<section class="flex flex-col gap-14 py-24">
	<h2 class="text-3xl">
		Select work
		<span class="text-primary">/</span>
		Case studies
	</h2>
	<div class="grid grid-cols-6 gap-x-6 gap-y-14">
		{#each WORK_PROJECTS as project, i}
			<button
				class={cn(
					"hover:bg-muted group flex w-full cursor-pointer flex-col rounded-xs text-left transition-all hover:shadow-[0_0_0_8px_var(--muted)]",
					i <= 1 ? "col-span-3" : "col-span-2",
				)}
			>
				<figure
					class={cn(
						"bg-muted after:border-foreground/10 relative mb-3 flex w-full items-center justify-center overflow-hidden rounded after:absolute after:top-0 after:left-0 after:block after:size-full after:rounded after:border",
						i <= 1 ? "aspect-[16/9]" : "aspect-[5/4]",
					)}
				>
					{#if project.thumbnail}
						<img
							src={project.thumbnail}
							alt=""
							class="size-full rounded object-cover"
						/>
					{/if}
					{#if i === WORK_PROJECTS.length - 1}
						<div
							class="animate animation-duration-[10s] size-full scale-200 animate-spin bg-linear-to-r from-[#a6c0fe] to-[#f68084]"
						></div>
					{/if}
				</figure>
				<hgroup class="mb-0.5">
					<p class="text-primary -mb-0.5 text-sm font-semibold uppercase">
						{project.pretitle}
					</p>
					<h3 class="text-xl">{project.title}</h3>
				</hgroup>
				<ul class="mb-1.5 flex gap-1.5">
					{#each project.stack as icon}
						<li
							class="[&>svg]:fill-body group-hover:bg-border bg-muted flex size-6 items-center justify-center rounded border text-sm transition-all [&>svg]:size-3.5"
						>
							{@html icon}
						</li>
					{/each}
				</ul>
				<p class="text-body leading-5">
					{project.description}
				</p>
			</button>
		{/each}
	</div>
</section>
