<script lang="ts">
  import { page } from '$app/stores';

  export let title = '',
    description = "I'm DoceAzedo, a curiosity-driven developer, Svelte evangelist and live coder.",
    thumbnail = '/img/thumbnail.jpg';

  const pageTitle = !!title ? `${title} » DoceAzedo` : 'DoceAzedo';
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="title" content={pageTitle} />
  <meta name="description" content={description} />

  <meta prefix="og: http://ogp.me/ns#" property="og:type" content="website" />
  <meta prefix="og: http://ogp.me/ns#" property="og:url" content={$page.url.href} />
  <meta prefix="og: http://ogp.me/ns#" property="og:title" content={pageTitle} />
  <meta prefix="og: http://ogp.me/ns#" property="og:description" content={description} />
  <meta
    prefix="og: http://ogp.me/ns#"
    property="og:image"
    content="{$page.url.origin}{thumbnail}"
  />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={$page.url.href} />
  <meta property="twitter:title" content={pageTitle} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content="{$page.url.origin}{thumbnail}" />
</svelte:head>
