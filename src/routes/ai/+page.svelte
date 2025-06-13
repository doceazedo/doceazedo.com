<script lang="ts">
	import Seo from "$lib/components/seo.svelte";
	import { m } from "$lib/paraglide/messages";
</script>

<Seo title="{m.ai_usage()} • Doce Fernandes" />

<hgroup class="mb-3 py-3 md:mb-6 md:py-6">
	<h1 class="text-3xl md:text-4xl">{m.ai_usage()}</h1>
	<p
		class="text-body [&>a]:text-foreground [&>a]:hover:text-primary [&>a]:underline [&>a]:transition-all"
	>
		{@html m.ai_usage_subtitle()}
	</p>
</hgroup>

<div class="prose prose-neutral dark:prose-invert w-full max-w-none">
	{@html m.ai_usage_description()}
</div>
