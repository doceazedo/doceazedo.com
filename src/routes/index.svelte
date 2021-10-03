<script context="module">
  export const prerender = true;

  export async function load({ page, fetch }) {
    const posts = await (await fetch(`/api/posts`)).json();

    return {
      props: {
        posts: posts.posts
      }
    };
  }
</script>

<script>
  import { Blurb, Skills, Portfolio, Articles } from '../parts';
  import SEO from '../components/seo.svelte';

  export let posts = [];
</script>

<svelte:head>
  <SEO />
</svelte:head>

<Blurb />
<Skills />
<Portfolio />
<Articles posts={posts.slice(0, 3)} />