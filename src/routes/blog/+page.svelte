<script lang="ts">
  import { PostsGrid } from '$lib/modules/posts';
  import { Metadata, PageTitle } from '$lib/components';
  import { LANG } from '$lib/stores';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Metadata title={$LANG.navbar.blog} />
<PageTitle title={$LANG.navbar.blog} paragraph={$LANG.blog.subtitle} />
<PostsGrid posts={data.posts} regular showTags />
