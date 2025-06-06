<script lang="ts">
	import { ArrowRightUpLineArrows } from "svelte-remix";
</script>

<section class="relative flex w-full justify-between py-24">
	<div class="flex flex-col">
		<h1 class="max-w-[12ch] text-6xl/18">I’m Doce Fernandes</h1>
		<a
			href="/"
			class="border-b-primary text-primary hover:text-foreground hover:border-b-foreground group mt-11 mr-24 ml-auto flex w-fit gap-1.5 border-b pb-1 leading-5 font-medium transition-all"
		>
			<span>Let's work<br />together</span>
			<ArrowRightUpLineArrows
				class="size-5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
			/>
		</a>
	</div>
	<figure class="group relative aspect-[4/5] w-60">
		<img
			src="/img/selfie.webp"
			alt=""
			class="relative z-20 rounded object-cover transition-all group-hover:-translate-x-3 group-hover:translate-y-3"
		/>
		<span
			class="border-foreground/10 absolute top-0 left-0 z-30 size-full rounded border transition-all group-hover:-translate-x-3 group-hover:translate-y-3"
		></span>
		<span
			class="border-primary absolute top-11 -left-11 z-10 size-full rounded border"
		></span>
		<span
			class="border-primary/20 absolute top-[88px] left-[-88px] z-10 size-full rounded border transition-all group-hover:top-[76px] group-hover:left-[-76px]"
		></span>
	</figure>
	<p class="text-foreground/70 mt-auto max-w-[27ch] translate-y-6">
		A <span class="text-foreground">🦄</span> developer, designer, and DJ. I
		build tools with Rust & Svelte, maintain FOSS projects, work at
		<a
			href="/"
			class="text-foreground hover:text-primary underline transition-all"
			>RailEurope</a
		>, and spin DJ sets on weekends
		<span class="text-foreground">✌️</span>
	</p>
</section>
