import { get } from "svelte/store";
import { CHA_CHING_AUDIO, GAME_DATA } from "./stores";
import type { Item } from "./constants";

export const giveCoins = (quantity: number) => {
	get(GAME_DATA).balance += quantity;
	get(CHA_CHING_AUDIO).play();
};

export const giveItem = (item: Item, quantity = 1) => {
	const $GAME_DATA = get(GAME_DATA);
	const existingItemIdx = $GAME_DATA.inventory.findIndex(
		(x) => x.item === item?.id,
	);
	if (existingItemIdx >= 0) {
		$GAME_DATA.inventory[existingItemIdx].quantity += quantity;
		$GAME_DATA.inventory[existingItemIdx].lastAt = new Date().toString();
		return;
	}
	$GAME_DATA.inventory = [
		...$GAME_DATA.inventory,
		{
			item: item.id,
			quantity,
			firstAt: new Date().toString(),
			lastAt: new Date().toString(),
		},
	];
};
