<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { m } from "$lib/paraglide/messages";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
</script>

<section
	class="mb-12 flex flex-col items-center gap-6 border-t pt-12 md:mb-24 md:flex-row md:justify-between md:pt-24"
>
	<hgroup>
		<h2 class="mb-1.5 text-3xl">{m.newsletter()}</h2>
		<p class="text-body max-w-[48ch]">
			{m.newsletter_subtitle()}
		</p>
	</hgroup>
	<div class="flex w-full flex-col gap-1.5 md:w-fit">
		<Label>{m.your_email()}</Label>
		<div class="flex">
			<Input
				type="email"
				placeholder={m.email_placeholder()}
				class="w-full rounded-r-none md:w-64"
			/>
			<Button class="rounded-l-none">{m.subscribe()}</Button>
		</div>
	</div>
</section>
