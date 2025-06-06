<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { ArrowRightLineArrows, PushpinFillMap } from "svelte-remix";
	import { m } from "$lib/paraglide/messages";
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
		{#each Array(6).fill(null) as _uwu}
			<a
				href="/blog/"
				class="hover:bg-muted/70 flex items-center gap-3 rounded border p-6 transition-all"
			>
				<img src="/img/nerd-emoji.webp" alt="" class="size-12" />
				<hgroup class="flex flex-col gap-0.5">
					<p
						class="text-primary flex items-center gap-1.5 text-xs font-semibold uppercase"
					>
						<PushpinFillMap class="size-3.5" />
						Fixado
					</p>
					<h3 class="leading-5">
						Design para devs: um guia de bolso para melhorar seus designs
					</h3>
				</hgroup>
			</a>
		{/each}
	</div>
</section>
