export type GameData = {
	balance: number;
	piggybank: {
		balance: number;
		updatedAt: string;
	};
	inventory: {
		item: string;
		quantity: number;
		firstAt: string;
		lastAt: string;
	}[];
	dailyRewards: {
		startedAt: string;
		streak: number;
	};
};
