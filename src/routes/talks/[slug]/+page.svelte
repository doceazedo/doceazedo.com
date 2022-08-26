<script lang="ts">
  import { Metadata, TalkDetails } from '$lib/components';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Metadata title={data.talk.title} />
<TalkDetails talk={data.talk} />
