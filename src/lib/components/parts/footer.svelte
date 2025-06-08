<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import {
		BlueskyLineLogos,
		DiscordLineLogos,
		GithubLineLogos,
		InstagramLineLogos,
		LinkedinBoxLineLogos,
	} from "svelte-remix";
	import ElevatorUp from "$lib/components/icons/elevator-up.svg?component";
	import { cn } from "$lib/utils";

	const SOCIALS = [
		{ icon: GithubLineLogos, url: "https://github.com/doceazedo" },
		{
			icon: LinkedinBoxLineLogos,
			url: "https://www.linkedin.com/in/doceazedo",
		},
		{ icon: BlueskyLineLogos, url: "https://bsky.app/profile/doceazedo.com" },
		{ icon: InstagramLineLogos, url: "https://instagram.com/doceazedo911" },
		{ icon: DiscordLineLogos, url: "https://discord.gg/vEGRe2kq8B" },
	];

	const LAST_FM_URL = "https://www.last.fm/user/doceazedo911";

	let scrollY = $state(0);
	let innerHeight = $state(0);
	let clientHeight = $state(1080);

	let scrolledTo = $derived(scrollY + innerHeight);
	let scrolledToBottom = $derived(scrolledTo >= clientHeight - 24);

	const scrollToTop = () => {
		if (scrollY > 0) {
			window.requestAnimationFrame(scrollToTop);
			window.scrollTo(0, scrollY - scrollY / 48);
		}
	};
</script>

<svelte:window bind:scrollY bind:innerHeight />
<svelte:body bind:clientHeight />

<footer
	class="mb-6 flex flex-col justify-between gap-6 border-t pt-6 text-center md:flex-row md:text-left"
>
	<div class="text-body flex flex-col items-center text-sm md:items-start">
		<img src="/img/memoji.png" alt="" class="mb-3 size-12" />
		<p class="-mb-1.5">&copy; {new Date().getFullYear()} Doce Fernandes</p>
		<p>{m.licensed_under({ license: "GPLv3" })}</p>
	</div>

	<div class="text-body mx-auto mt-auto flex translate-y-1.5">
		{#each SOCIALS as social, i}
			<a
				href={social.url}
				target="_blank"
				class={cn(
					"hover:text-foreground ease-elastic p-1.5 transition-all hover:scale-115",
					i % 2 ? "hover:rotate-6" : "hover:-rotate-6",
				)}
			>
				<social.icon class="size-6 transition-all" />
			</a>
		{/each}
	</div>

	<a
		href={LAST_FM_URL}
		target="_blank"
		class="hover:bg-muted group relative mx-auto mt-auto flex h-fit flex-row-reverse items-center gap-2 rounded-xs p-1 transition-all hover:shadow-[0_0_0_4px_var(--muted)] md:mx-0 md:translate-1 md:flex-row"
	>
		<hgroup class="text-left md:text-right">
			<p class="text-body -mb-1 text-xs">{m.now_playing()}</p>
			<p class="text-sm font-medium">FBC - Baile de Ladrão</p>
		</hgroup>
		<img
			src="https://i.scdn.co/image/ab67616d0000b2737ce4002911f389a2a4465d6f"
			alt=""
			class="size-10 rounded"
		/>
		<div
			class="absolute top-0 left-10 flex size-2.5 items-center justify-center md:right-0 md:left-auto"
		>
			<span
				class="group-hover:border-muted border-background absolute size-full rounded-full border-2 bg-red-500 transition-all"
			></span>
			<span
				class="border-background animation-duration-[2s] absolute size-2 animate-ping rounded-full bg-red-500 opacity-80 transition-all"
			></span>
		</div>
	</a>
</footer>

<button
	class={cn(
		"text-body hover:text-foreground ease-elastic pointer-events-none fixed right-0 bottom-0 translate-y-3 cursor-pointer p-3 opacity-0 transition-all hover:scale-115 md:p-6",
		scrolledToBottom && "pointer-events-auto translate-y-0 opacity-100",
	)}
	onclick={scrollToTop}
>
	<ElevatorUp class="transition-all" />
</button>
