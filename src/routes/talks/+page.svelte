<script lang="ts">
  import { LANG } from '$lib/stores';
  import { Metadata, PageTitle } from '$lib/components';
  import { TalksList } from '$lib/modules';

  const emailLink = '<a href="mailto:me@doceazedo.com">me@doceazedo.com</a>';
</script>

<Metadata title={$LANG.talks.title} />
<PageTitle title={$LANG.talks.title} paragraph="{$LANG.talks.paragraph} {emailLink}" />
<TalksList />
