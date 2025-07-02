<script lang="ts">
	import { page } from "$app/state";
	import ErrorPage from "$lib/components/views/error-page.svelte";
	import Seo from "$lib/components/common/seo.svelte";
</script>

<Seo />
<ErrorPage status={page.status} />
