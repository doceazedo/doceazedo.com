<script context="module">
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
  import PageTitle from '../../components/page-title.svelte';
  import Posts from '../../components/posts.svelte';

  export let posts = [];
</script>

<PageTitle
  title="Blog"
  paragraph="I pretty much rather reading articles than watching tutorials, so, here I gather stuff that I learned and want to share." />

<Posts posts={posts.posts} />