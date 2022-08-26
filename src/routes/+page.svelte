<script lang="ts">
  import { PostsLatest, Blurb } from '$lib/modules';
  import { Metadata, Newsletter } from '$lib/components';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Metadata />
<Blurb />
<PostsLatest posts={data.posts} />
<Newsletter />
