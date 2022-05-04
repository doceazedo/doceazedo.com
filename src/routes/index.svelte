<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { PostsLatest, Blurb, SEO } from '$lib/modules';
  import { Newsletter } from '$lib/components';
  import type { Post } from '$lib/modules/posts';

  export let posts: Post[] = [];
</script>

<svelte:head>
  <SEO />
</svelte:head>

<Blurb />
<PostsLatest {posts} />
<Newsletter />
