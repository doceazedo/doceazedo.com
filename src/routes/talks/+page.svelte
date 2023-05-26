<script lang="ts">
  import _ from '$lib/lang';
  import { Metadata, PageTitle } from '$lib/components';
  import TalksList from '$lib/components/talks/TalksList.svelte';
</script>

<Metadata title={$_.talks.title} />
<PageTitle title={$_.talks.title}>
  {$_.talks.paragraph}
  <a href="mailto:me@doceazedo.com">me@doceazedo.com</a>
</PageTitle>
<TalksList />
