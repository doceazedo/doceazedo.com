<script lang="ts" context="module">
  export async function load({ fetch }) {
    const posts = await (await fetch('https://wp.lucasfernandes.com.br/wp-json/wp/v2/posts')).json();

    return {
      props: {
        posts
      }
    };
  }
</script>

<script>
  import { lang } from '../../stores';
  import PageTitle from '../../components/page-title.svelte';
  import Posts from '../../components/posts.svelte';
  import SEO from '../../components/seo.svelte';

  export let posts = [];
</script>

<svelte:head>
  <SEO path="/blog" />
</svelte:head>

<PageTitle
  title="Blog"
  paragraph={$lang.blog.subtitle} />

<Posts posts={posts} />