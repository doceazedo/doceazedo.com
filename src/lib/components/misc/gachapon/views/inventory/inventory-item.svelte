<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Canvas } from "@threlte/core";
	import {
		AUTHORS,
		COLLECTIONS,
		PRICE_MULTIPLIER,
		RARITIES,
		type Item,
	} from "../../constants";
	import ItemViewerScene from "../../scenes/item-viewer-scene.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import {
		CalendarLineBusiness,
		CopperCoinLineFinance,
		Dice6LineOthers,
		FileCopyLineDocument,
	} from "svelte-remix";
	import { cn } from "$lib/utils";
	import { GAME_DATA } from "../../stores";
	import { getLocale } from "$lib/paraglide/runtime";
	import { m } from "$lib/paraglide/messages";
	import { Slider } from "$lib/components/ui/slider";
	import { giveCoins } from "../../game";
	import { WebGLRenderer } from "three";
	import { dev } from "$app/environment";

	let { item = $bindable() }: { item: Item | null } = $props();

	let open = $derived(!!item);
	let rarity = $derived(
		RARITIES.find((x) => x.id === item?.rarity) || RARITIES[0],
	);
	let collection = $derived(
		COLLECTIONS.find((x) => x.id === item?.collection) || COLLECTIONS[0],
	);
	let author = $derived(item ? AUTHORS[item.author] : AUTHORS.unknown);
	let price = $derived(
		item
			? (RARITIES.findIndex((x) => x.id === item.rarity) + 1) * PRICE_MULTIPLIER
			: 0,
	);
	let invItem = $derived(
		item ? $GAME_DATA.inventory.find((x) => x.item === item.id) : null,
	);
	let details = $derived(
		invItem
			? [
					{
						icon: FileCopyLineDocument,
						label: m.quantity(),
						value: invItem.quantity,
					},
					{
						icon: CalendarLineBusiness,
						label: m.first_acquired(),
						value: new Date(invItem.firstAt || invItem.lastAt).toLocaleString(
							getLocale(),
							{
								dateStyle: "short",
							},
						),
					},
					{
						icon: collection.iconLine,
						label: m.collection(),
						value: collection.label,
					},
					{
						isAuthor: true,
						icon: author.license.icon,
						label: m.attribution(),
						value: author.name,
						url: author.url,
						license: {
							label: author.license.label,
							url: author.license.url,
						},
					},
				]
			: [],
	);

	let openSellDialog = $state(false);
	let sellQuantity = $state(1);

	const sell = () => {
		if (!item || !invItem) return;

		giveCoins(price * sellQuantity);

		if (sellQuantity >= invItem.quantity) {
			$GAME_DATA.inventory = $GAME_DATA.inventory.filter(
				(x) => x.item !== item.id,
			);
		} else {
			$GAME_DATA.inventory = $GAME_DATA.inventory.map((x) => {
				if (x.item !== item.id) return x;
				return {
					...x,
					quantity: x.quantity - sellQuantity,
				};
			});
		}

		openSellDialog = false;
		open = false;
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[calc(100%-3rem)]">
		{#if item && invItem}
			<Dialog.Header class="items-center sm:text-center">
				<Dialog.Title>{item.label}</Dialog.Title>
				<Dialog.Description>{item.description}</Dialog.Description>
				<span
					class={cn(
						"w-fit rounded px-1.5 text-sm font-medium md:px-2 md:text-base",
						rarity.textColor,
						rarity.badgeColor,
					)}
				>
					{rarity.label}
				</span>
			</Dialog.Header>
			<Dialog.Body class="overflow-y-auto">
				<div
					class="relative -mt-12 flex aspect-square w-full shrink-0 items-center justify-center"
				>
					<Canvas
						createRenderer={(canvas) => {
							return new WebGLRenderer({
								canvas,
								alpha: true,
								preserveDrawingBuffer: true,
							});
						}}
					>
						<ItemViewerScene {item} />
					</Canvas>
					{#if dev}
						<div
							class="pointer-events-none absolute size-48 border border-purple-500/20"
						></div>
						<div
							class="pointer-events-none absolute h-px w-full border border-purple-500/20"
						></div>
						<div
							class="pointer-events-none absolute h-full w-px border border-purple-500/20"
						></div>
					{/if}
				</div>
				<ul class="flex w-full flex-col gap-2 lg:gap-3">
					{#each details as detail, i}
						<li class={cn("flex gap-1.5", !detail.isAuthor && "items-center")}>
							<detail.icon class="text-primary size-5 lg:size-6" />
							<p class={cn(detail.isAuthor && "-mt-0.5 md:mt-0")}>
								{detail.label}
							</p>
							{#if detail.isAuthor}
								<div
									class="-mt-0.5 ml-auto flex flex-col items-end text-right leading-5 md:mt-0"
								>
									<a
										href={detail.url}
										target="_blank"
										rel="noopener noreferrer"
										class="text-body hover:text-primary -mb-px w-fit transition-all hover:underline"
									>
										{detail.value}
									</a>
									<a
										href={detail.license.url}
										target="_blank"
										rel="noopener noreferrer"
										class="text-muted-foreground w-fit text-xs hover:underline"
									>
										{detail.license.label}
									</a>
								</div>
							{:else}
								<p class="text-body ml-auto">{detail.value}</p>
							{/if}
						</li>
						{#if i !== details.length - 1}
							<hr />
						{/if}
					{/each}
				</ul>
			</Dialog.Body>
			<Dialog.Footer>
				<Button class="gap-1.5" variant="outline">
					<Dice6LineOthers class="size-5" />
					{m.reroll()}
				</Button>
				<Dialog.Root
					bind:open={openSellDialog}
					onOpenChange={() =>
						(sellQuantity = invItem.quantity > 1 ? invItem.quantity - 1 : 1)}
				>
					<Dialog.Trigger class="w-full md:w-fit">
						<Button class="w-full gap-1.5 bg-amber-500 hover:bg-amber-500/90">
							{m.sell_for()}
							<div class="flex items-center gap-1">
								<CopperCoinLineFinance class="size-5" />
								{price}
							</div>
						</Button>
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header class="border-0">
							<Dialog.Title
								>{m.sell_item_title({ item: item.label })}</Dialog.Title
							>
							<Dialog.Description>
								{#if invItem.quantity > 1}
									{m.sell_item_description_many({ quantity: invItem.quantity })}
								{:else}
									{m.sell_item_description_single()}
								{/if}
							</Dialog.Description>
						</Dialog.Header>
						{#if invItem.quantity > 1}
							<Dialog.Body>
								<div class="text-body/70 flex w-full items-center gap-3">
									0
									<Slider
										type="single"
										bind:value={sellQuantity}
										min={0}
										max={invItem.quantity}
										step={1}
									/>
									{invItem.quantity}
								</div>
							</Dialog.Body>
						{/if}
						<Dialog.Footer>
							<Button
								variant="outline"
								class="gap-1.5"
								onclick={() => (openSellDialog = false)}
							>
								{m.nevermind()}
							</Button>
							<Button
								disabled={invItem.quantity > 1 && sellQuantity <= 0}
								class="gap-1.5"
								onclick={sell}
							>
								{#if invItem.quantity === 1 || sellQuantity === 0}
									{m.sell_for()}
								{:else if sellQuantity === 1}
									{m.sell_one_for()}
								{:else if sellQuantity === invItem.quantity}
									{m.sell_all_for()}
								{:else}
									{m.sell_x_for({ quantity: sellQuantity })}
								{/if}
								<div class="flex items-center gap-1">
									<CopperCoinLineFinance class="size-5" />
									{price * sellQuantity}
								</div>
							</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</Dialog.Footer>
		{/if}
	</Dialog.Content>
</Dialog.Root>
