<script lang="ts" context="module">
  export const prerender = true;

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
  import { Articles } from '../parts';
  import SEO from '../components/seo.svelte';
  import { Blurb, Portfolio, Skills } from '$lib/modules';

  export let posts = [];
</script>

<svelte:head>
  <SEO />
</svelte:head>

<Blurb />
<Skills />
<Portfolio />
<Articles {posts} />
