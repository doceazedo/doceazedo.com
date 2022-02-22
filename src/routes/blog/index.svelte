<script lang="ts" context="module">
  export async function load({ fetch }) {
    const posts = await (
      await fetch('https://wp.lucasfernandes.com.br/wp-json/wp/v2/posts')
    ).json();

    return {
      props: {
        posts
      }
    };
  }
</script>

<script>
  import { LANG } from '$lib/stores';
  import { ArticlesList, PageTitle } from '$lib/components';
  import { SEO } from '$lib/modules';

  export let posts = [];
</script>

<svelte:head>
  <SEO path="/blog" />
</svelte:head>

<PageTitle title="Blog" paragraph={$LANG.blog.subtitle} />
<ArticlesList {posts} />
