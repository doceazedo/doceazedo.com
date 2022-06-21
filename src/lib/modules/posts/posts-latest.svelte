<script lang="ts">
  import { LANG } from '$lib/stores';
  import { SectionTitle } from '$lib/components';
  import { PostsGrid } from '$lib/modules/posts';
  import type { Post } from '$lib/modules/posts';

  export let posts: Post[] = [];
</script>

<section>
  <SectionTitle title={$LANG.blog.title} actionLabel={$LANG.blog.more} actionHref="/blog" />
  <PostsGrid {posts} />
</section>

<style lang="sass">
  section
    margin-bottom: 3rem
</style>
