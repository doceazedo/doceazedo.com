<script lang="ts">
	import { ArrowRightUpLineArrows } from "svelte-remix";
	import { m } from "$lib/paraglide/messages";
</script>

<section
	class="relative flex w-full flex-col justify-between py-6 md:flex-row md:py-24"
>
	<div
		class="pointer-none absolute -top-52 -right-96 hidden opacity-80 lg:block"
	>
		<div class="relative -z-20 grid grid-cols-12">
			{#each Array(12 * 9).fill(null) as _uwu}
				<div class="size-24 border-t border-r"></div>
			{/each}
		</div>
		<div
			class="from-background/0 to-background absolute top-0 -z-10 h-full w-48 bg-linear-to-l"
		></div>
		<div
			class="from-background/0 to-background absolute top-0 right-0 -z-10 h-full w-48 bg-linear-to-r"
		></div>
		<div
			class="from-background/0 to-background absolute bottom-0 -z-10 h-48 w-full bg-linear-to-b"
		></div>
	</div>

	<div class="relative z-0 flex flex-col">
		<h1 class="max-w-[12ch] text-6xl/18 md:text-4xl lg:text-6xl/18">
			{m.greetings()}
		</h1>
		<a
			href="/"
			class="border-b-primary text-primary hover:text-foreground hover:border-b-foreground group my-6 ml-auto flex w-fit gap-1.5 border-b pb-1 leading-5 font-medium transition-all md:mt-11 md:mr-24 md:mb-0"
		>
			<span class="whitespace-pre">{m.lets_work_together()}</span>
			<ArrowRightUpLineArrows
				class="ease-elastic size-5 transition-all group-hover:translate-x-0.75 group-hover:-translate-y-0.75"
			/>
		</a>
	</div>
	<figure
		class="group relative z-0 mb-12 aspect-[4/5] w-full md:mb-0 md:w-60 md:scale-90 lg:scale-100"
	>
		<img
			src="/img/selfie.webp"
			alt=""
			class="ease-elastic relative z-20 rounded object-cover transition-all group-hover:-translate-x-3 group-hover:translate-y-3"
		/>
		<span
			class="border-foreground/10 ease-elastic absolute top-0 left-0 z-30 size-full rounded border transition-all group-hover:-translate-x-3 group-hover:translate-y-3"
		></span>
		<span
			class="border-primary absolute top-4 left-3 z-10 h-full w-[calc(100%-1.5rem)] rounded border md:top-11 md:-left-11 md:w-full"
		></span>
		<span
			class="border-primary/50 ease-elastic absolute top-8 left-6 z-10 h-full w-[calc(100%-3rem)] rounded border transition-all group-hover:top-[76px] group-hover:left-[-76px] md:top-[88px] md:left-[-88px] md:w-full"
		></span>
	</figure>
	<p
		class="text-body [&>span]:text-foreground [&>a]:text-foreground [&>a]:hover:text-primary relative z-0 mt-auto max-w-[27ch] translate-y-6 [&>a]:underline [&>a]:transition-all"
	>
		{@html m.mini_bio({
			companyName: "Rail Europe",
			companyUrl: "https://www.linkedin.com/company/1528184",
		})}
	</p>
</section>
