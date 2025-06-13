<script lang="ts">
	import Seo from "$lib/components/seo.svelte";
	import { m } from "$lib/paraglide/messages";
</script>

<Seo title={m.colophon_seo_title()} />

<hgroup class="mb-3 py-3 md:mb-6 md:py-6">
	<h1 class="text-3xl md:text-4xl">{m.colophon()}</h1>
	<p
		class="text-body [&>a]:text-foreground [&>a]:hover:text-primary [&>a]:underline [&>a]:transition-all"
	>
		How this site is made.
	</p>
</hgroup>
