<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { m } from "$lib/paraglide/messages";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";

	const onSubscribe = () => {
		window.open("https://buttondown.com/doce", "popupwindow");
	};
</script>

<section
	class="flex flex-col items-center gap-6 border-t pt-12 md:flex-row md:justify-between md:pt-24 md:pb-12"
>
	<hgroup>
		<h2 class="mb-1.5 text-4xl">{m.newsletter()}</h2>
		<p class="text-body max-w-[48ch]">
			{m.newsletter_subtitle()}
		</p>
	</hgroup>
	<form
		action="https://buttondown.com/api/emails/embed-subscribe/doce"
		method="post"
		target="popupwindow"
		onsubmit={onSubscribe}
		class="flex w-full flex-col gap-1.5 md:w-fit"
	>
		<Label for="bd-email">{m.your_email()}</Label>
		<div class="flex">
			<Input
				type="email"
				name="email"
				id="bd-email"
				placeholder={m.email_placeholder()}
				class="w-full rounded-r-none md:w-64"
			/>
			<Button class="rounded-l-none">{m.subscribe()}</Button>
		</div>
	</form>
</section>
