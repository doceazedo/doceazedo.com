<script context="module">
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