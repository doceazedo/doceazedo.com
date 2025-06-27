<script lang="ts">
	import { page } from "$app/state";
	import ErrorPage from "$lib/components/parts/error-page.svelte";
	import Seo from "$lib/components/seo.svelte";
</script>

<Seo />
<ErrorPage status={page.status} />
