<script lang="ts">
  import _ from '$lib/lang';
  import { SectionTitle } from '$lib/components';
  import PostsGrid from './PostsGrid.svelte';
  import { POSTS } from '.';
</script>

<section>
  <SectionTitle title={$_.blog.title} actionLabel={$_.blog.more} actionHref="/blog" />
  <PostsGrid posts={$POSTS} hasHighlight />
</section>

<style lang="sass">
  section
    margin-bottom: 3rem
</style>
