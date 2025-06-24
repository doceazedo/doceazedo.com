<script lang="ts">
	import {
		CheckLineSystem,
		CopperCoinLineFinance,
		GiftLineFinance,
	} from "svelte-remix";
	import { Button } from "$lib/components/ui/button";
	import { PIGGYBANK, RARITIES } from "./constants";
	import { cn } from "$lib/utils";
	import { storage } from "$lib/utils/storage";
	import { writable } from "svelte/store";
	import { readyInDays } from "$lib/utils/date";
	import { m } from "$lib/paraglide/messages";
	import { giveCoins } from "./utils";
	import { Progress } from "$lib/components/ui/progress";
	import { PiggyBank } from "@lucide/svelte";
	import { PIGGYBANK_BALANCE } from "./stores";

	const DAILY_REWARDS = [
		{
			type: "coins",
			quantity: 100,
		},
		{
			type: "coins",
			quantity: 200,
		},
		{
			type: "gift",
			rarity: RARITIES[1],
		},
		{
			type: "coins",
			quantity: 300,
		},
		{
			type: "coins",
			quantity: 600,
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
			giveCoins(reward.quantity);
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

	const cashOutPiggyBank = () => {
		giveCoins(PIGGYBANK_BALANCE.target);
		PIGGYBANK_BALANCE.target = 0;
	};
</script>

<div
	class="mt-auto flex size-full h-[calc(100%-2.25rem)] flex-col gap-6 overflow-y-auto p-6 md:border-t-0 lg:h-[calc(100%-86px)]"
>
	<div class="mx-auto flex w-full max-w-3xl flex-col gap-6">
		<h2 class="text-center text-lg font-semibold md:text-xl">
			{m.rewards_title()}
		</h2>
		<div class="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 xl:gap-3">
			{#each DAILY_REWARDS as reward, i}
				{@const readyDate = getRewardReadyDate(i)}
				{@const status = getRewardStatus(i)}
				{@const isLastReward = i === DAILY_REWARDS.length - 1}
				{@const lastRewardRarity = RARITIES[3]}

				<div
					class={cn(
						"ease-elastic flex h-fit items-center justify-between rounded border p-3 pr-4 transition-all hover:-translate-y-1.5 lg:h-36 lg:flex-col lg:items-center lg:justify-center lg:pr-3 lg:text-center",
						isLastReward &&
							`${lastRewardRarity.borderColor} ${lastRewardRarity.badgeColor} lg:col-span-3`,
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
							{m.day_x({ day: i + 1 })}
						</p>
						<div
							class="flex items-center gap-1.5 lg:my-auto lg:flex-col lg:items-center lg:gap-0"
						>
							{#if reward.type === "coins"}
								<CopperCoinLineFinance
									class="size-6 text-amber-500 lg:size-7"
								/>
								{m.x_coins({
									quantity: reward.quantity,
								})}
							{:else if reward.type === "gift"}
								<GiftLineFinance
									class={cn(
										"size-6 opacity-80 lg:size-7",
										reward.rarity.textColor,
									)}
								/>
								<p>
									{m.rarity_gift_before()}
									<span
										class={cn(
											"mr-px rounded px-1 font-medium",
											reward.rarity.textColor,
											reward.rarity.badgeColor,
										)}
									>
										{reward.rarity.label}
									</span>
									{m.rarity_gift_after()}
								</p>
							{/if}
						</div>
					</div>
					{#if status === "ready"}
						<Button onclick={() => claimReward(i)}>{m.claim()}</Button>
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

		<hr />

		<h2 class="text-center text-lg font-semibold md:text-xl">
			{#if PIGGYBANK_BALANCE.target >= PIGGYBANK.max}
				{m.piggybank_title_full()}
			{:else}
				{m.piggybank_title()}
			{/if}
		</h2>
		<div class="flex flex-col gap-3 rounded border p-3 lg:gap-6 lg:p-12">
			<div class="text-body flex flex-col gap-1.5">
				<h3
					class="text-foreground flex items-center gap-2 text-lg md:font-semibold"
				>
					<PiggyBank class="size-5" />
					{m.piggybank()}
				</h3>
				<p class="[&>span]:text-foreground text-sm md:text-base">
					{@html m.piggybank_description({
						quantity: PIGGYBANK.quantity * 10,
						interval: PIGGYBANK.interval * 10,
						max: PIGGYBANK.max,
					})}
				</p>
			</div>
			<div class="flex flex-col gap-1.5">
				<p
					class={cn(
						"text-body [&>span]:text-foreground [&>span]:transition-all",
						PIGGYBANK_BALANCE.current >= PIGGYBANK.max &&
							"[&>span]:text-primary",
					)}
				>
					<span class="text-foreground"
						>{Math.floor(PIGGYBANK_BALANCE.current)}</span
					>
					/
					<span class="text-foreground">{PIGGYBANK.max}</span>
					{m.coins()}
				</p>
				<Progress value={PIGGYBANK_BALANCE.current} max={PIGGYBANK.max} />
			</div>
			<Button
				variant="outline"
				disabled={PIGGYBANK_BALANCE.current < PIGGYBANK.quantity ||
					PIGGYBANK_BALANCE.target < PIGGYBANK.quantity}
				onclick={cashOutPiggyBank}
			>
				<CopperCoinLineFinance class="size-5" />
				{m.cash_out()}
			</Button>
		</div>
	</div>
</div>
