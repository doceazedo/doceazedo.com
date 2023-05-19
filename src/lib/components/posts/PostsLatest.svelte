<script lang="ts">
  import { LANG } from '$lib/stores';
  import { SectionTitle } from '$lib/components';
  import PostsGrid from './PostsGrid.svelte';
  import { POSTS } from '.';
</script>

<section>
  <SectionTitle title={$LANG.blog.title} actionLabel={$LANG.blog.more} actionHref="/blog" />
  <PostsGrid posts={$POSTS} hasHighlight />
</section>

<style lang="sass">
  section
    margin-bottom: 3rem
</style>
