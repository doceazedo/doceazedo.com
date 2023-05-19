<script lang="ts">
  import { Blurb, Metadata } from '$lib/components';
  import { POSTS } from '$lib/components/posts';
  import PostsLatest from '$lib/components/posts/PostsLatest.svelte';
  import Newsletter from '$lib/components/newsletter/Newsletter.svelte';

  export let data;

  $POSTS = data.posts;
</script>

<Metadata />
<Blurb />
<PostsLatest />
<Newsletter />
