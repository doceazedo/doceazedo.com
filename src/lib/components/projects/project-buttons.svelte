<script lang="ts">
  import { LANG } from '$lib/stores';
  import { Button, Buttons } from '$lib/components';
  import type { Project } from './projects.types';

  export let item: Project;

  const linkTypes = ['url', 'writeup', 'source', 'demo'];
</script>

<Buttons small>
  {#each linkTypes as type}
    {#if !!item?.[type]}
      <Button href={item?.[type]} target="_blank" outline small>
        {$LANG.projects?.[type]}
      </Button>
    {/if}
  {/each}
</Buttons>
