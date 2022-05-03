<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { PostsGrid, Blurb, Portfolio, SEO, Skills } from '$lib/modules';
  import { SectionTitle } from '$lib/components';
  import { LANG } from '$lib/stores';
  import type { Post } from '$lib/modules/posts';

  export let posts: Post[] = [];
</script>

<svelte:head>
  <SEO />
</svelte:head>

<Blurb />

<SectionTitle title={$LANG.blog.title} actionLabel={$LANG.blog.more} actionHref="/blog" />
<PostsGrid {posts} />

<Skills />
<Portfolio />
