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
  import { ArticlesList, PageTitle } from '$lib/components';
  import { LANG } from '$lib/stores';
  import SEO from '../../components/seo.svelte';

  export let posts = [];
</script>

<svelte:head>
  <SEO path="/blog" />
</svelte:head>

<PageTitle title="Blog" paragraph={$LANG.blog.subtitle} />
<ArticlesList {posts} />
