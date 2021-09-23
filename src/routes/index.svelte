<script context="module">
  export const prerender = true;

  export async function load({ page, fetch }) {
    const posts = await (await fetch(`/api/posts`)).json();

    return {
      props: {
        posts
      }
    };
  }
</script>

<script>
  import { Blurb, Skills, Portfolio, Articles } from '../parts';

  export let posts = [];
</script>

<svelte:head>
  <title>Lucas Fernandes</title>
</svelte:head>

<Blurb />
<Skills />
<Portfolio />
<Articles posts={posts.posts.slice(0, 3)} />