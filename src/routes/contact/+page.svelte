<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import Seo from "$lib/components/seo.svelte";
	import { Button } from "$lib/components/ui/button";
	import { EMAIL, SOCIALS } from "$lib/constants";
	import {
		CalendarScheduleLineBusiness,
		CheckLineSystem,
		FileCopyLineDocument,
		MailLineBusiness,
	} from "svelte-remix";
	import { toast } from "svelte-sonner";
	import { getLocale } from "$lib/paraglide/runtime";

	const CALL_URLS = {
		en: "https://cal.com/docef/chat",
		pt: "https://cal.com/docef/bate-papo",
	};

	let copied = $state(false);
	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(EMAIL);
			toast.success(m.copy_success());

			if (copied) return;
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch (err) {
			toast.error(m.copy_error());
		}
	};
</script>

<Seo title={m.contact_seo_title()} />

<hgroup class="py-3 md:py-12 md:text-center">
	<p class="text-primary mb-1.5 text-lg">
		{m.contact()}
	</p>
	<h1 class="flex flex-col gap-1.5 text-3xl md:items-center md:gap-0">
		<span>{m.contact_in_person_title()}</span>
		<span class="text-body text-2xl">{m.contact_email_title()}</span>
	</h1>
</hgroup>

<div class="mx-auto flex max-w-lg flex-col gap-12">
	<div class="flex gap-3 md:mb-12">
		<Button href="mailto:{EMAIL}" variant="outline" size="lg" class="grow">
			<MailLineBusiness class="size-5" />
			{EMAIL}
		</Button>
		<Button variant="secondary" size="lg" onclick={copyEmail}>
			{#if copied}
				<CheckLineSystem class="size-5" />
			{:else}
				<FileCopyLineDocument class="size-5" />
			{/if}
			{m.copy()}
		</Button>
	</div>

	<hr />

	<div class="flex flex-col gap-3">
		<h2 class="text-2xl">{m.contact_call_title()}</h2>
		<Button
			href={CALL_URLS[getLocale()]}
			target="_blank"
			variant="outline"
			size="lg"
		>
			<CalendarScheduleLineBusiness class="size-5" />
			{m.book_a_call()}
		</Button>
	</div>

	<hr />

	<div class="flex flex-col gap-6">
		<hgroup>
			<h2 class="text-2xl">{m.contact_socials_title()}</h2>
			<p class="text-body">
				{m.contact_socials_subtitle()}
			</p>
		</hgroup>
		<div class="grid grid-cols-2 gap-3">
			{#each Object.values(SOCIALS) as social}
				<Button
					href={social.url}
					variant="outline"
					size="lg"
					class="[&_svg]:fill-accent-foreground [&_svg]:size-5"
				>
					{#if typeof social.icon === "string"}
						{@html social.icon}
					{:else}
						<social.icon class="size-5" />
					{/if}
					{social.label}
				</Button>
			{/each}
		</div>
	</div>
</div>
