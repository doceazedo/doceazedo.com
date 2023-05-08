<script lang="ts">
  import { page } from '$app/stores';
  import { IS_SLEEPING } from '$lib/stores';

  export let title = '',
    description = "I'm DoceAzedo, a curiosity-driven developer, Svelte evangelist and live coder.",
    thumbnail = '/img/thumbnail.jpg';

  const baseURL = 'https://doceazedo.com';
  $: pageTitle = !!title ? `${title} » DoceAzedo` : 'DoceAzedo';

  $: titlePrefix = $IS_SLEEPING ? '😴 | ' : '';
</script>

<svelte:head>
  <title>{titlePrefix}{pageTitle}</title>
  <meta name="title" content={pageTitle} />
  <meta name="description" content={description} />
  <meta name="theme-color" content="#6930c3" />

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
