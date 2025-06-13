<script lang="ts">
	import { DOMAIN, WORK } from "$lib/constants";
	import { m } from "$lib/paraglide/messages";

	let {
		title = "Doce Fernandes",
		description = m.excerpt_clean({ company: WORK.company }),
	}: { title?: string; description?: string } = $props();

	const BASE_URL = `https://${DOMAIN}`;
	const THUMBNAIL = `${BASE_URL}/img/thumbnail.jpg`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={BASE_URL} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={THUMBNAIL} />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={BASE_URL} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={THUMBNAIL} />
</svelte:head>
