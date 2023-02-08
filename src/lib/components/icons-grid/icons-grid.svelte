<script lang="ts">
  import { onMount } from 'svelte';
  import * as simpleIcons from 'simple-icons';
  import { LANG } from '$lib/stores';
  import { Toast } from '$lib/components/toast';
  import { IconItem, IconsSearch } from '.';
  import { FILTERED_ICONS, ICONS } from './icons-grid.store';

  onMount(() => {
    $ICONS = Object.values(simpleIcons).sort((a, b) => a.slug.localeCompare(b.slug));
    $FILTERED_ICONS = $ICONS;
  });

  let isToastVisible = false;
  const showToast = () => {
    if (isToastVisible) return;
    isToastVisible = true;
    setTimeout(() => (isToastVisible = false), 3500);
  };
</script>

<IconsSearch />

<ul class="icons-grid" id="icons">
  {#each $FILTERED_ICONS as icon}
    {#key icon.slug}
      <IconItem {icon} on:click={showToast} />
    {/key}
  {/each}
</ul>

{#if isToastVisible}
  <Toast>
    {$LANG.streams.icons.copied}
    <img src="/img/KomodoHype.png" alt="KomodoHype" />
  </Toast>
{/if}

<style lang="sass">
  .icons-grid
    display: grid
    grid-template-columns: repeat(6, 1fr)
    grid-column-gap: 1rem
    grid-row-gap: 1rem
    grid-auto-rows: min-content
    max-height: 29rem
    padding-right: 1rem
    overflow: auto

    &::-webkit-scrollbar
      width: .5rem

    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb
      background-color: rgba(#fff, .1)
      border-radius: 25px

    &::-webkit-scrollbar-thumb:hover
      background-color: rgba(#fff, .2)
</style>
