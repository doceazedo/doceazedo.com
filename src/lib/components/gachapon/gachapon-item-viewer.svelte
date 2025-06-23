<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Canvas } from "@threlte/core";
	import {
		AUTHORS,
		COLLECTIONS,
		PRICE_MULTIPLIER,
		RARITIES,
		type Item,
	} from "./constants";
	import ItemViewer from "./scenes/item-viewer.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import {
		CalendarLineBusiness,
		CopperCoinLineFinance,
		Dice6LineOthers,
		FileCopyLineDocument,
	} from "svelte-remix";
	import { cn } from "$lib/utils";
	import { GAME_DATA } from "./stores";
	import { getLocale } from "$lib/paraglide/runtime";
	import { m } from "$lib/paraglide/messages";

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
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
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
			<Dialog.Body>
				<div class="aspect-square w-full">
					<Canvas>
						<ItemViewer {item} />
					</Canvas>
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
									class="-mt-0.5 ml-auto flex flex-col items-end text-right md:mt-0"
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
				<Button class="gap-1.5 bg-amber-500 hover:bg-amber-500/90">
					{m.sell_for()}
					<div class="flex items-center gap-1">
						<CopperCoinLineFinance class="size-5" />
						{price}
					</div>
				</Button>
			</Dialog.Footer>
		{/if}
	</Dialog.Content>
</Dialog.Root>
