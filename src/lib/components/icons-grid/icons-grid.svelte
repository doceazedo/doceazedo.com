<script lang="ts">
  import { onMount } from 'svelte';
  import * as simpleIcons from 'simple-icons';
  import toast, { Toaster } from 'svelte-french-toast';
  import { LANG } from '$lib/stores';
  import { toastTheme } from '$lib/utils/toast';
  import { IconItem, IconsSearch } from '.';
  import { FILTERED_ICONS, ICONS } from './icons-grid.store';

  onMount(() => {
    $ICONS = Object.values(simpleIcons).sort((a, b) => a.slug.localeCompare(b.slug));
    $FILTERED_ICONS = $ICONS;
  });
</script>

<IconsSearch />

<ul class="icons-grid" id="icons">
  {#each $FILTERED_ICONS as icon}
    {#key icon.slug}
      <IconItem {icon} on:click={() => toast.success($LANG.streams.icons.copied, toastTheme)} />
    {/key}
  {/each}
</ul>

<Toaster />

<style lang="sass">
  @import '../../../assets/sass/vars'

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

  :global([data-theme="light"])
    .icons-grid
      &::-webkit-scrollbar-track
        background-color: rgba(var(--primary-rgb), .1)

      &::-webkit-scrollbar-thumb
        background-color: var(--primary-light)

      &::-webkit-scrollbar-thumb:hover
        background-color: var(--primary)
</style>
