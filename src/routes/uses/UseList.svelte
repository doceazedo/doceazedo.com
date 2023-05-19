<script lang="ts">
  import { SubtitleWithIcon } from '$lib/components';
  import { AttachmentIcon } from '$lib/components/icons';
  import type { SvelteComponent } from 'svelte';
  import type { UsesThingSection } from '$lib/lang';

  type ThingsWithLinks = {
    [key: string]: {
      name: string;
      url: string;
    };
  };

  export let things: ThingsWithLinks;
  export let lang: UsesThingSection;
  export let showTitle = true;
  export let icon: new (...args: any[]) => SvelteComponent = AttachmentIcon;
</script>

{#if showTitle}
  <SubtitleWithIcon {icon}>
    {lang.title}
  </SubtitleWithIcon>
{/if}

<ul>
  <slot name="pre" />
  {#each Object.keys(things) as key}
    {@const thing = things[key]}
    <li>
      <a href={thing.url} target="_blank" rel="noreferrer">{thing.name}</a>
      {lang.items[key]}
    </li>
  {/each}
  <slot />
</ul>
