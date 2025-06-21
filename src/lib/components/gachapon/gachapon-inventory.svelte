<script>
	import { CopperCoinLineFinance, VipDiamondFillFinance } from "svelte-remix";
	import { RARITIES } from "./constants";
	import { cn } from "$lib/utils";
	import { TWEENED_BALANCE } from "./stores";
	import { getLocale } from "$lib/paraglide/runtime";
</script>

<div
	class="relative flex size-full flex-col overflow-y-auto lg:flex-row lg:overflow-y-hidden"
>
	<div
		class="pointer-events-none top-0 left-0 flex size-full flex-col gap-6 p-6 pb-0 md:gap-12 md:p-12 md:pb-0 lg:absolute lg:grid lg:grid-cols-12 lg:pb-12"
	>
		<aside class="col-span-3 flex flex-col items-center">
			<div
				class="bg-background z-10 flex aspect-square size-44 flex-col items-center justify-center rounded-full border p-12 text-center lg:size-36 xl:size-44"
			>
				<p class="text-foreground mb-1.5 text-3xl font-semibold xl:text-4xl">
					10
				</p>
				<p class="text-body mb-1.5 leading-4">Collectibles owned</p>
			</div>
			<div class="-mt-22 mb-6 w-full rounded border pt-22">
				<div class="mx-auto grid w-2/3 grid-cols-3 gap-x-3 gap-y-6 py-6">
					<div class="col-span-3 flex items-center justify-center gap-1.5">
						<CopperCoinLineFinance class="size-5 text-amber-500" />
						{Math.floor(TWEENED_BALANCE.current).toLocaleString(getLocale())}
					</div>
					{#each RARITIES as rarity}
						<div class="flex flex-col items-center gap-px">
							<rarity.icon class={cn("size-5", rarity.textColor)} />
							<p>0</p>
						</div>
					{/each}
				</div>
			</div>
		</aside>
		<main class="col-span-6 hidden lg:flex"></main>
		<aside class="col-span-3 hidden size-full flex-col gap-6 lg:flex">
			<h2 class="text-foreground text-xl md:text-2xl">Reroll</h2>
			<div class="size-full rounded border"></div>
		</aside>
	</div>

	<div
		class="text-body grid size-full grid-cols-1 items-center justify-center gap-6 p-6 pt-0 md:gap-12 md:p-12 md:pt-0 lg:grid-cols-12 lg:overflow-y-auto lg:pt-12"
	>
		<aside class="col-span-3"></aside>
		<main
			class="col-span-6 mb-6 flex size-full flex-col gap-6 md:mb-12 lg:mb-0"
		>
			<h2 class="text-foreground text-xl md:text-2xl">Recently acquired</h2>
			<div class="grid grid-cols-2 gap-6 md:grid-cols-3">
				{#each Array(24).fill(null) as _uwu}
					<div
						class="flex aspect-[3/4] flex-col items-center justify-center rounded border p-3"
					>
						<div
							class="bg-muted/50 my-auto aspect-[3/4] w-1/2 rounded-full"
						></div>
						<div class="flex flex-col items-center">
							<p>Title</p>
							<span
								class={cn(
									"rounded px-1 text-sm font-medium",
									RARITIES[1].textColor,
									RARITIES[1].badgeColor,
								)}
							>
								{RARITIES[1].label}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</main>
		<aside class="col-span-3"></aside>
	</div>
</div>
