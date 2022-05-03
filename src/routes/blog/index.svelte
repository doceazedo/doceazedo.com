<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { PostsGrid } from '$lib/modules/posts';
  import { PageTitle } from '$lib/components';
  import { LANG } from '$lib/stores';
  import type { Post } from '$lib/modules/posts';

  export let posts: Post[] = [];
</script>

<PageTitle title={$LANG.navbar.blog} paragraph={$LANG.blog.subtitle} />
<PostsGrid {posts} regular={true} />
