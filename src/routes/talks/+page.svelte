<script lang="ts">
  import _ from '$lib/lang';
  import { Metadata, PageTitle } from '$lib/components';
  import TalksList from '$lib/components/talks/TalksList.svelte';

  const emailLink = '<a href="mailto:me@doceazedo.com">me@doceazedo.com</a>';
</script>

<Metadata title={$_.talks.title} />
<PageTitle title={$_.talks.title} paragraph="{$_.talks.paragraph} {emailLink}" />
<TalksList />
