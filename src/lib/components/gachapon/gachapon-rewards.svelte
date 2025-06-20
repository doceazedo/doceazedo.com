<script lang="ts">
	import {
		CheckLineSystem,
		CopperCoinLineFinance,
		GiftLineFinance,
	} from "svelte-remix";
	import { Button } from "$lib/components/ui/button";
	import { RARITIES } from "./constants";
	import { cn } from "$lib/utils";
	import { storage } from "$lib/utils/storage";
	import { writable } from "svelte/store";
	import { readyInDays } from "$lib/utils/date";
	import { BALANCE, TWEENED_BALANCE } from "./stores";

	const CHA_CHING_AUDIO = new Audio("/audio/cha-ching.ogg");

	const DAILY_REWARDS = [
		{
			type: "coins",
			quantity: 100,
		},
		{
			type: "coins",
			quantity: 150,
		},
		{
			type: "gift",
			rarity: RARITIES[1],
		},
		{
			type: "coins",
			quantity: 200,
		},
		{
			type: "coins",
			quantity: 250,
		},
		{
			type: "gift",
			rarity: RARITIES[2],
		},
		{
			type: "gift",
			rarity: RARITIES[3],
		},
	] as const;

	const dailyStreak = storage(
		writable<{ startedAt: string; claimed: number[] }>({
			startedAt: new Date().toString(),
			claimed: [],
		}),
		"gachapon_daily_streak",
	);

	const claimReward = (idx: number) => {
		if ($dailyStreak.claimed.includes(idx)) return;
		$dailyStreak.claimed = [...$dailyStreak.claimed, idx];

		const reward = DAILY_REWARDS[idx];
		if (reward.type === "coins") {
			$BALANCE += reward.quantity;
			CHA_CHING_AUDIO.play();
		}
	};

	const getRewardReadyDate = (idx: number) => {
		const readyDate = new Date($dailyStreak.startedAt);
		readyDate.setDate(readyDate.getDate() + idx);
		return readyDate;
	};

	const getRewardStatus = (idx: number): "claimed" | "soon" | "ready" => {
		if ($dailyStreak.claimed.includes(idx)) {
			return "claimed";
		}

		const readyDate = getRewardReadyDate(idx);
		if (readyDate.getTime() > new Date().getTime()) {
			return "soon";
		}

		return "ready";
	};
</script>

<div
	class="mt-auto flex size-full h-[calc(100%-2.25rem)] flex-col gap-6 overflow-y-auto p-6 md:border-t-0 lg:h-[calc(100%-86px)] lg:p-12 lg:pt-0 xl:h-full xl:justify-center xl:gap-12 xl:py-12"
>
	<p class="text-center text-lg font-semibold md:text-xl">
		Play every day and get bonuses!
	</p>
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-7 xl:gap-3">
		{#each DAILY_REWARDS as reward, i}
			{@const readyDate = getRewardReadyDate(i)}
			{@const status = getRewardStatus(i)}
			{@const isLastReward = i === DAILY_REWARDS.length - 1}
			{@const lastRewardRarity = RARITIES[3]}

			<div
				class={cn(
					"ease-elastic flex h-fit items-center justify-between rounded border p-3 pr-4 transition-all hover:-translate-y-1.5 lg:h-48 lg:flex-col lg:items-center lg:justify-center lg:pr-3 lg:text-center xl:h-56",
					isLastReward &&
						`${lastRewardRarity.borderColor} ${lastRewardRarity.badgeColor} lg:col-span-3 xl:col-span-1`,
				)}
			>
				<div class="flex h-full flex-col gap-1">
					<p
						class={cn(
							"text-body text-sm",
							isLastReward &&
								`${lastRewardRarity.textColor} font-medium uppercase text-shadow-md text-shadow-white/5`,
						)}
					>
						Day {i + 1}
					</p>
					<div
						class="flex items-center gap-1.5 lg:my-auto lg:flex-col lg:items-center xl:gap-3"
					>
						{#if reward.type === "coins"}
							<CopperCoinLineFinance class="size-6 text-amber-500 lg:size-7" />
							{reward.quantity} coins
						{:else if reward.type === "gift"}
							<GiftLineFinance
								class={cn(
									"size-6 opacity-80 lg:size-7",
									reward.rarity.textColor,
								)}
							/>
							<p>
								<span
									class={cn(
										"mr-px rounded px-1 font-medium",
										reward.rarity.textColor,
										reward.rarity.badgeColor,
									)}
								>
									{reward.rarity.label}
								</span>
								gift
							</p>
						{/if}
					</div>
				</div>
				{#if status === "ready"}
					<Button onclick={() => claimReward(i)}>Claim</Button>
				{:else if status === "claimed"}
					<div class="flex size-9 shrink-0 items-center justify-center">
						<CheckLineSystem class="text-primary size-6" />
					</div>
				{:else if status === "soon"}
					<div class="flex h-9 shrink-0 items-center">
						<p
							class={cn(
								"text-muted-foreground bg-muted dark:bg-muted/50 rounded px-1.5 py-0.5 text-xs",
								isLastReward && `${lastRewardRarity.bgColor} text-white`,
							)}
						>
							{readyInDays(readyDate)}
						</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
