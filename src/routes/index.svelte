<script lang="ts" context="module">
  export async function load({ fetch }) {
    const posts = await (
      await fetch('https://wp.lucasfernandes.com.br/wp-json/wp/v2/posts?per_page=3')
    ).json();

    return {
      props: {
        posts
      }
    };
  }
</script>

<script lang="ts">
  import SEO from '../components/seo.svelte';
  import { Articles, Blurb, Portfolio, Skills } from '$lib/modules';
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
