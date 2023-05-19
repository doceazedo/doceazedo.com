<script lang="ts">
  import LANG from '$lib/lang';
  import { Metadata, PageTitle } from '$lib/components';
  import TalksList from '$lib/components/talks/TalksList.svelte';

  const emailLink = '<a href="mailto:me@doceazedo.com">me@doceazedo.com</a>';
</script>

<Metadata title={$LANG.talks.title} />
<PageTitle title={$LANG.talks.title} paragraph="{$LANG.talks.paragraph} {emailLink}" />
<TalksList />
