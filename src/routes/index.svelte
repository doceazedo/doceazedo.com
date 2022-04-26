<script lang="ts" context="module">
  import { getArticles } from '$lib/modules/articles';

  export async function load({ fetch }) {
    const posts = await getArticles(3);

    return {
      props: {
        posts
      }
    };
  }
</script>

<script lang="ts">
  import { Articles, Blurb, Portfolio, SEO, Skills } from '$lib/modules';
  import { POSTS } from '$lib/stores';

  export let posts = [];

  $POSTS = posts;
</script>

<svelte:head>
  <SEO />
</svelte:head>

<Blurb />
<Skills />
<Portfolio />
<Articles />
