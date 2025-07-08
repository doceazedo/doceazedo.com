import { get } from "svelte/store";
import {
	GAME_DATA,
	LAST_PRIZE_ID,
	TWEENED_BALANCE,
	TWEENED_PIGGYBANK_BALANCE,
} from "./stores";
import { ITEMS, PIGGYBANK, RARITIES } from "./constants";
import { dev } from "$app/environment";
import type { Item, RarityId } from "./types";
import { playAudio } from "$lib/audio";

export const giveCoins = (amount: number) => {
	const $GAME_DATA = get(GAME_DATA);
	GAME_DATA.set({
		...$GAME_DATA,
		balance: $GAME_DATA.balance + amount,
	});

	playAudio("cha-ching");
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
	GAME_DATA.set($GAME_DATA);
};

export const initializeGame = () => {
	const unsubscribeGameData = GAME_DATA.subscribe(({ balance, piggybank }) => {
		if (TWEENED_BALANCE) TWEENED_BALANCE.target = balance;
		if (TWEENED_PIGGYBANK_BALANCE)
			TWEENED_PIGGYBANK_BALANCE.target = piggybank.balance;
	});

	if (dev) setupDevCheats();

	handlePiggybankAfk();
	const piggybankInterval = setInterval(updatePiggybank, 6000);

	// cleanup function
	return () => {
		unsubscribeGameData();
		clearInterval(piggybankInterval);
	};
};

const setupDevCheats = () => {
	window.rosebud = () => giveCoins(1000);
	window.kaching = () => giveCoins(1000);
	window.motherlode = () => giveCoins(50000);
	window.giveItem = (id: string, quantity = 1) => {
		const item = ITEMS.find((x) => x.id === id);
		if (!item) {
			console.error(`No such item: "${id}"`);
			return;
		}
		giveItem(item, quantity);
	};
	window.giveAll = () => {
		ITEMS.forEach((item) => giveItem(item));
	};
};

const handlePiggybankAfk = () => {
	const $GAME_DATA = get(GAME_DATA);
	const piggybankAfk =
		parseInt(
			(
				(new Date().getTime() -
					new Date($GAME_DATA.piggybank.updatedAt).getTime()) /
				1000 /
				6
			).toString(),
		) * PIGGYBANK.quantityEvery6Seconds;

	if (piggybankAfk > 0) {
		const balanceTarget = $GAME_DATA.piggybank.balance + piggybankAfk;
		$GAME_DATA.piggybank.balance =
			balanceTarget >= PIGGYBANK.max ? PIGGYBANK.max : balanceTarget;
		$GAME_DATA.piggybank.updatedAt = new Date().toString();
		GAME_DATA.set($GAME_DATA);
	}
};

const updatePiggybank = () => {
	const $GAME_DATA = get(GAME_DATA);
	if ($GAME_DATA.piggybank.balance >= PIGGYBANK.max) return;

	const balanceTarget =
		$GAME_DATA.piggybank.balance + PIGGYBANK.quantityEvery6Seconds;
	$GAME_DATA.piggybank.balance =
		balanceTarget >= PIGGYBANK.max ? PIGGYBANK.max : balanceTarget;
	$GAME_DATA.piggybank.updatedAt = new Date().toString();
	GAME_DATA.set($GAME_DATA);
};

export const getRandomRarity = (): RarityId => {
	const roll = Math.random();
	let cumulativeOdds = 0;

	const selectedRarity = RARITIES.find((rarity) => {
		cumulativeOdds += rarity.odds;
		return roll < cumulativeOdds;
	});

	return selectedRarity?.id ?? RARITIES[RARITIES.length - 1].id;
};

export const getRandomPrize = (rarityId?: RarityId) => {
	const rarity = rarityId || getRandomRarity();
	const $LAST_PRIZE_ID = get(LAST_PRIZE_ID);
	const lootPool = ITEMS.filter((item) => item.rarity === rarity).filter(
		(item) => item.id !== $LAST_PRIZE_ID,
	);
	return lootPool[Math.floor(Math.random() * lootPool.length)];
};
