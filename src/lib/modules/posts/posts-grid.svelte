<script lang="ts">
  import { PostsGrid } from '$lib/components';
  import type { Post } from '.';

  export let posts: Post[] = [],
    regular = false;
</script>

<PostsGrid {posts} {regular} />
