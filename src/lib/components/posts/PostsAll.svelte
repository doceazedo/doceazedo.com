<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import PostsGrid from './PostsGrid.svelte';
  import PostTagsList from './PostTagsList.svelte';
  import { POSTS } from '.';

  $: selectedTags =
    (browser &&
      $page.url.searchParams
        ?.get('tags')
        ?.split(',')
        ?.filter((x) => !!x)) ||
    [];

  $: tags = [...new Set($POSTS.map((x) => x.tags).flat())].sort((a, b) => a.localeCompare(b));

  $: filteredPosts = selectedTags.length
    ? $POSTS.filter((post) => !!post.tags.find((tag) => selectedTags.includes(tag)))
    : $POSTS;
</script>

<PostTagsList {tags} bind:selected={selectedTags} />
<PostsGrid posts={filteredPosts} regular />
