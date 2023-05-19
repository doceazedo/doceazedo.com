<script lang="ts">
  import { Metadata, PageTitle } from '$lib/components';
  import _ from '$lib/lang';
  import { POSTS } from '$lib/components/posts';
  import PostsAll from '$lib/components/posts/PostsAll.svelte';

  export let data;

  $POSTS = data.posts;
</script>

<Metadata title={$_.navbar.blog} />
<PageTitle title={$_.navbar.blog} paragraph={$_.blog.subtitle} />
<PostsAll />
