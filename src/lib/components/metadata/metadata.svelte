<script lang="ts">
  import { page } from '$app/stores';

  export let title = '',
    description = "I'm DoceAzedo, a curiosity-driven developer, Svelte evangelist and live coder.",
    thumbnail = '/img/thumbnail.jpg';

  const baseURL = 'https://doceazedo.com';
  $: pageTitle = !!title ? `${title} » DoceAzedo` : 'DoceAzedo';
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="title" content={pageTitle} />
  <meta name="description" content={description} />

  <meta prefix="og: http://ogp.me/ns#" property="og:type" content="website" />
  <meta prefix="og: http://ogp.me/ns#" property="og:url" content="{baseURL}{$page.url.pathname}" />
  <meta prefix="og: http://ogp.me/ns#" property="og:title" content={pageTitle} />
  <meta prefix="og: http://ogp.me/ns#" property="og:description" content={description} />
  <meta prefix="og: http://ogp.me/ns#" property="og:image" content="{baseURL}{thumbnail}" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{baseURL}{$page.url.pathname}" />
  <meta property="twitter:title" content={pageTitle} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content="{baseURL}{thumbnail}" />
</svelte:head>
