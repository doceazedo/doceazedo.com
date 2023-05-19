<script lang="ts">
  import { Metadata } from '$lib/components';
  import TalkDetails from '$lib/components/talks/TalkDetails.svelte';

  export let data;
</script>

<Metadata title={data.talk.title} />
<TalkDetails talk={data.talk} />
