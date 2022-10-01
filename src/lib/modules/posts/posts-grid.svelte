<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { PostsGrid, TagsList } from '$lib/components';
  import type { Post } from '.';

  export let posts: Post[] = [],
    regular = false,
    showTags = false;

  $: selectedTags =
    browser &&
    $page.url.searchParams
      ?.get('tags')
      ?.split(',')
      ?.filter((x) => !!x) || [];

  $: tags = [...new Set(posts.map((x) => x.tags).flat())].sort((a, b) => a.localeCompare(b));

  $: filteredPosts = selectedTags.length
    ? posts.filter((post) => !!post.tags.find((tag) => selectedTags.includes(tag)))
    : posts;
</script>

<TagsList active={showTags} {tags} bind:selected={selectedTags} />
<PostsGrid posts={filteredPosts} {regular} />
