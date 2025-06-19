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
		type SimpleIcon,
	} from "simple-icons";
	import { m } from "$lib/paraglide/messages";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import { elasticFly } from "$lib/utils/transitions";
	import { onVisible } from "$lib/utils/actions";
	import { IS_DESKTOP } from "$lib/stores";

	type Project = {
		pretitle: string;
		title: string;
		description: string;
		thumbnail: string;
		stack: (SimpleIcon | string)[];
		role: string;
		details: string;
		links: { label: string; url: string }[];
		media: {
			url: string;
			label: string;
		}[];
		visible?: boolean;
	};

	let workProjects = $state<Project[]>([
		{
			pretitle: m.portfolio_afterparty_pretitle(),
			title: m.portfolio_afterparty_title(),
			description: m.portfolio_afterparty_description(),
			thumbnail: "/img/afterparty-lp-mockup.webp",
			stack: [siSvelte, siPocketbase, siFfmpeg, siBackblaze],
			role: m.portfolio_afterparty_role(),
			details: m.portfolio_afterparty_details(),
			links: [{ label: m.website(), url: "https://afterparty.fm" }],
			media: [
				{
					url: "/img/afterparty-dashboard.webp",
					label: m.portfolio_afterparty_media_dashboard(),
				},
				{
					url: "/img/afterparty-lp-mockup.webp",
					label: m.portfolio_afterparty_media_lp(),
				},
				{
					url: "/img/afterparty-mobile.webp",
					label: m.portfolio_afterparty_media_mobile(),
				},
				{
					url: "https://www.youtube-nocookie.com/embed/AxXJ--N4OJE?si=dZpl0j1tBN8sVPnH&loop=1&playlist=AxXJ--N4OJE",
					label: m.portfolio_afterparty_media_demo(),
				},
			],
		},
		{
			pretitle: m.portfolio_godot_wry_pretitle(),
			title: m.portfolio_godot_wry_title(),
			description: m.portfolio_godot_wry_description(),
			thumbnail: "/img/godot-wry-cas.webp",
			stack: [siRust, siGodotengine],
			role: m.portfolio_godot_wry_role(),
			details: m.portfolio_godot_wry_details(),
			links: [
				{ label: m.website(), url: "https://godot-wry.doceazedo.com" },
				{
					label: m.source_code(),
					url: "https://github.com/doceazedo/godot_wry",
				},
			],
			media: [
				{
					url: "/img/godot-wry-docs.webp",
					label: m.portfolio_godot_wry_media_docs(),
				},
				{
					url: "/img/godot-wry-transparent-webview.webp",
					label: m.portfolio_godot_wry_media_simple_demo(),
				},
				{
					url: "https://www.youtube-nocookie.com/embed/cqKBvl5a1-o?si=PM7I2T4YPH4q6Fvv&loop=1&playlist=cqKBvl5a1-o",
					label: m.portfolio_godot_wry_media_cas(),
				},
			],
		},
		{
			pretitle: m.portfolio_powershift_pretitle(),
			title: m.portfolio_powershift_title(),
			description: m.portfolio_powershift_description(),
			thumbnail: "/img/powershift-mockup.webp",
			stack: [siFlutter, siSvelte, siSupabase],
			role: m.portfolio_powershift_role(),
			details: m.portfolio_powershift_details(),
			links: [],
			media: [
				{
					url: "/img/powershift-mobile-shift.webp",
					label: m.portfolio_powershift_media_mobile(),
				},
				{
					url: "/img/powershift-mobile-data.webp",
					label: m.portfolio_powershift_media_mobile_data(),
				},
				{
					url: "/img/powershift-dashboard.webp",
					label: m.portfolio_powershift_media_dashboard(),
				},
				{
					url: "https://www.youtube-nocookie.com/embed/7JoObeG6SKo?si=BY3KKMNDSMfIP8Kw&loop=1&playlist=7JoObeG6SKo",
					label: m.portfolio_powershift_media_devlog(),
				},
			],
			visible: false,
		},
		{
			pretitle: m.portfolio_ssn_pretitle(),
			title: m.portfolio_ssn_title(),
			description: m.portfolio_ssn_description(),
			thumbnail: "/img/ssn-bee.webp",
			stack: [siKotlin, siPocketbase],
			role: m.portfolio_ssn_role(),
			details: m.portfolio_ssn_details(),
			links: [
				{ label: m.website(), url: "https://ssn.gg" },
				{ label: m.source_code(), url: "https://github.com/doceazedo/ssn" },
			],
			media: [
				{ url: "/img/ssn-trans-bee.webp", label: "" },
				{ url: "/img/ssn-deep-dark.webp", label: "" },
				{ url: "/img/ssn-withers.webp", label: "" },
				{ url: "/img/ssn-halloween-jack.webp", label: "" },
				{ url: "/img/ssn-coffofin-bees.webp", label: "" },
			],
			visible: false,
		},
		{
			pretitle: m.portfolio_gachapon_pretitle(),
			title: m.portfolio_gachapon_title(),
			description: m.portfolio_gachapon_description(),
			thumbnail: "",
			stack: ["✨", "💫", "🔮"],
			role: "",
			details: "",
			links: [],
			media: [],
			visible: false,
		},
	]);

	let mounted = $state(!browser);
	onMount(() => (mounted = true));
</script>

<section class="relative z-0 flex flex-col gap-12 py-12 md:py-24">
	<h2 class="text-3xl">
		{m.select_work()}
		<span class="text-primary">/</span>
		{m.case_studies()}
	</h2>
	{#if mounted}
		<div class="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-6 md:gap-y-14">
			{#each workProjects as project, i}
				{@const isGachapon = i === workProjects.length - 1}
				<Dialog.Root>
					<Dialog.Trigger
						class={cn(
							"w-full cursor-pointer rounded-xs text-left transition-all",
							i <= 1 ? "md:col-span-3" : "md:col-span-2",
							isGachapon && "cursor-not-allowed",
							!isGachapon &&
								"group hover:bg-muted hover:shadow-[0_0_0_8px_var(--muted)]",
						)}
						disabled={isGachapon}
					>
						<div use:onVisible={() => (project.visible = true)}>
							{#if project.visible !== false}
								<div
									class="flex w-full flex-col"
									in:elasticFly|global={{
										opacity: 0,
										y: 24,
										duration: 800,
										delay: $IS_DESKTOP ? 100 * (i + 1) : 100,
									}}
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
												class="ease-elastic size-full rounded object-cover transition-all group-hover:scale-105"
											/>
										{/if}
										{#if isGachapon}
											<div
												class="animate animation-duration-[10s] size-full scale-200 animate-spin bg-linear-to-r from-[#a6c0fe] to-[#f68084]"
											></div>
										{/if}
									</figure>
									<hgroup class="mb-0.5">
										<p
											class="text-primary -mb-0.5 text-sm font-semibold uppercase"
										>
											{project.pretitle}
										</p>
										<h3 class="text-xl">{project.title}</h3>
									</hgroup>
									<ul class="mb-1.5 flex gap-1.5">
										{#each project.stack as icon}
											<li
												class="[&>svg]:fill-body group-hover:bg-border bg-muted flex size-6 items-center justify-center rounded border text-sm transition-all [&>svg]:size-3.5"
											>
												{@html typeof icon === "object" ? icon.svg : icon}
											</li>
										{/each}
									</ul>
									<p class="text-body leading-5">
										{project.description}
									</p>
								</div>
							{/if}
						</div>
					</Dialog.Trigger>
					<Dialog.Content
						class="h-[calc(100%-3rem)] max-w-[calc(100%-3rem)] sm:h-[calc(100%-6rem)] sm:max-w-[calc(100%-3rem)] 2xl:max-w-[96rem]"
					>
						<Dialog.Header>
							<Dialog.Description class="-mb-1.5 text-sm uppercase"
								>{project.pretitle}</Dialog.Description
							>
							<Dialog.Title>{project.title}</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body class="gap-6 overflow-y-scroll lg:flex-row">
							<aside
								class="flex w-full shrink-0 flex-col gap-6 lg:sticky lg:top-0 lg:max-w-lg"
							>
								<div>
									<h2 class="mb-px font-medium">{m.my_role()}</h2>
									<p class="text-body">{project.role}</p>
								</div>
								<div>
									<h2 class="mb-px font-medium">{m.project_description()}</h2>
									<p class="text-body">
										{@html project.details.replaceAll("\n", "<br />")}
									</p>
								</div>
								{#if project.stack.every((x) => typeof x === "object")}
									<div>
										<h2 class="mb-1 font-medium">{m.tech_stack()}</h2>
										<ul class="flex flex-wrap gap-1.5">
											{#each project.stack as icon}
												<li
													class="[&>svg]:fill-body text-body bg-muted flex cursor-default items-center justify-center gap-1.5 rounded border px-1.5 py-1 text-sm transition-all [&>svg]:size-3.5"
												>
													{@html icon.svg}
													{icon.title}
												</li>
											{/each}
										</ul>
									</div>
								{/if}
								{#if project.links.length > 0}
									<div>
										<h2 class="mb-1 font-medium">{m.links()}</h2>
										<ul class="flex gap-1.5">
											{#each project.links as link, i}
												<Button
													href={link.url}
													target="_blank"
													variant={i === 0 ? "default" : "secondary"}
												>
													{link.label}
												</Button>
											{/each}
										</ul>
									</div>
								{/if}
							</aside>
							<main class="flex w-full flex-col gap-6">
								{#if project.media.length > 0}
									{#each project.media as media}
										<div class="text-body flex flex-col gap-1.5 text-center">
											<div
												class="bg-muted aspect-video w-full overflow-hidden rounded border"
											>
												{#if media.url.includes("youtube")}
													<iframe
														class="size-full"
														src={media.url}
														title="YouTube video player"
														frameborder="0"
														allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
														referrerpolicy="strict-origin-when-cross-origin"
													></iframe>
												{:else}
													<img
														src={media.url}
														alt=""
														class="size-full object-cover"
													/>
												{/if}
											</div>
											<p>{media.label}</p>
										</div>
									{/each}
								{/if}
							</main>
						</Dialog.Body>
					</Dialog.Content>
				</Dialog.Root>
			{/each}
		</div>
	{/if}
</section>
