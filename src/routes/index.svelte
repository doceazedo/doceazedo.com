<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { PostsLatest, Blurb } from '$lib/modules';
  import { Metadata, Newsletter } from '$lib/components';
  import type { Post } from '$lib/modules/posts';

  export let posts: Post[] = [];
</script>

<Metadata />
<Blurb />
<PostsLatest {posts} />
<Newsletter />
