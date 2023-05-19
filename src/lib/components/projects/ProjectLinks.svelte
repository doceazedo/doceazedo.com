<script lang="ts">
  import _ from '$lib/lang';
  import { THEME } from '$lib/stores';
  import { Button, Buttons } from '$lib/components';
  import type { Project } from '.';

  export let item: Project;

  const linkTypes = ['url', 'writeup', 'source', 'demo'] as const;
</script>

<Buttons small>
  {#each linkTypes as type}
    {#if !!item?.[type]}
      <Button href={item?.[type]} target="_blank" outline={$THEME == 'dark'} small>
        {$_.projects?.[type]}
      </Button>
    {/if}
  {/each}
</Buttons>
