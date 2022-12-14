<script lang="ts">
  import { Metadata, PageTitle } from '$lib/components';
  import { TutorialSteps } from '$lib/modules';
  import { LANG } from '$lib/stores';
</script>

<Metadata title={$LANG.streams.prime.title} />
<PageTitle title={$LANG.streams.prime.title} paragraph={$LANG.streams.prime.paragraph} />
<TutorialSteps />
