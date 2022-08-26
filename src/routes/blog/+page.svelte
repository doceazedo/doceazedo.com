<script lang="ts">
  import type { PageData } from './$types';

  import { PostsGrid } from '$lib/modules/posts';
  import { Metadata, PageTitle } from '$lib/components';
  import { LANG } from '$lib/stores';

  export let data: PageData;
</script>

<Metadata title={$LANG.navbar.blog} />
<PageTitle title={$LANG.navbar.blog} paragraph={$LANG.blog.subtitle} />
<PostsGrid posts={data.posts} regular={true} />
