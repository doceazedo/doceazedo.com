<script lang="ts">
	import { ArrowRightUpLineArrows } from "svelte-remix";
	import { m } from "$lib/paraglide/messages";
</script>

<section class="relative flex w-full justify-between py-24">
	<div class="flex flex-col">
		<h1 class="max-w-[12ch] text-6xl/18">{m.greetings()}</h1>
		<a
			href="/"
			class="border-b-primary text-primary hover:text-foreground hover:border-b-foreground group mt-11 mr-24 ml-auto flex w-fit gap-1.5 border-b pb-1 leading-5 font-medium transition-all"
		>
			<span class="whitespace-pre">{m.lets_work_together()}</span>
			<ArrowRightUpLineArrows
				class="size-5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
			/>
		</a>
	</div>
	<figure class="group relative aspect-[4/5] w-60">
		<img
			src="/img/selfie.webp"
			alt=""
			class="ease-elastic relative z-20 rounded object-cover transition-all group-hover:-translate-x-3 group-hover:translate-y-3"
		/>
		<span
			class="border-foreground/10 ease-elastic absolute top-0 left-0 z-30 size-full rounded border transition-all group-hover:-translate-x-3 group-hover:translate-y-3"
		></span>
		<span
			class="border-primary absolute top-11 -left-11 z-10 size-full rounded border"
		></span>
		<span
			class="border-primary/20 ease-elastic absolute top-[88px] left-[-88px] z-10 size-full rounded border transition-all group-hover:top-[76px] group-hover:left-[-76px]"
		></span>
	</figure>
	<p
		class="text-body [&>span]:text-foreground [&>a]:text-foreground [&>a]:hover:text-primary mt-auto max-w-[27ch] translate-y-6 [&>a]:underline [&>a]:transition-all"
	>
		{@html m.mini_bio()}
	</p>
</section>
