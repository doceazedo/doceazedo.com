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
	import { m } from "$lib/paraglide/messages";

	const WORK_PROJECTS = [
		{
			pretitle: m.portfolio_afterparty_pretitle(),
			title: m.portfolio_afterparty_title(),
			description: m.portfolio_afterparty_description(),
			thumbnail: "/img/afterparty-lp.webp",
			stack: [siSvelte.svg, siPocketbase.svg, siFfmpeg.svg, siBackblaze.svg],
		},
		{
			pretitle: m.portfolio_godot_wry_pretitle(),
			title: m.portfolio_godot_wry_title(),
			description: m.portfolio_godot_wry_description(),
			thumbnail: "/img/godot-wry-cas.webp",
			stack: [siRust.svg, siGodotengine.svg],
		},
		{
			pretitle: m.portfolio_powershift_pretitle(),
			title: m.portfolio_powershift_title(),
			description: m.portfolio_powershift_description(),
			thumbnail: "/img/powershift-mockup.webp",
			stack: [siFlutter.svg, siSvelte.svg, siSupabase.svg],
		},
		{
			pretitle: m.portfolio_ssn_pretitle(),
			title: m.portfolio_ssn_title(),
			description: m.portfolio_ssn_description(),
			thumbnail: "/img/ssn-bee.webp",
			stack: [siKotlin.svg, siPocketbase.svg],
		},
		{
			pretitle: m.portfolio_gachapon_pretitle(),
			title: m.portfolio_gachapon_title(),
			description: m.portfolio_gachapon_description(),
			thumbnail: "",
			stack: ["✨", "💫", "🔮"],
		},
	];
</script>

<section class="relative z-0 flex flex-col gap-12 py-12 md:py-24">
	<h2 class="text-3xl">
		{m.select_work()}
		<span class="text-primary">/</span>
		{m.case_studies()}
	</h2>
	<div class="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-6 md:gap-y-14">
		{#each WORK_PROJECTS as project, i}
			<button
				class={cn(
					"hover:bg-muted group flex w-full cursor-pointer flex-col rounded-xs text-left transition-all hover:shadow-[0_0_0_8px_var(--muted)]",
					i <= 1 ? "md:col-span-3" : "md:col-span-2",
				)}
			>
				<figure
					class={cn(
						"bg-muted after:border-foreground/10 relative mb-3 flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded after:absolute after:top-0 after:left-0 after:block after:size-full after:rounded after:border",
						i >= 2 && "md:aspect-[5/4]",
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
