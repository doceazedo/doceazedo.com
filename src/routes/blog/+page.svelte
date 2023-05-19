<script lang="ts">
  import { Metadata, PageTitle } from '$lib/components';
  import { LANG } from '$lib/stores';
  import { POSTS } from '$lib/components/posts';
  import PostsAll from '$lib/components/posts/PostsAll.svelte';

  export let data;

  $POSTS = data.posts;
</script>

<Metadata title={$LANG.navbar.blog} />
<PageTitle title={$LANG.navbar.blog} paragraph={$LANG.blog.subtitle} />
<PostsAll />
