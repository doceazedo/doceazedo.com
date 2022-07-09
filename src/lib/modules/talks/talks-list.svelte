<script lang="ts">
  import { TalksList } from '$lib/components';
  import { TALKS } from './talks.store';
</script>

<TalksList talks={$TALKS} />
