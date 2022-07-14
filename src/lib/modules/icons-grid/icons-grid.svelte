<script lang="ts">
  import * as simpleIcons from 'simple-icons/icons';
  import { LANG } from '$lib/stores';
  import { IconsGrid } from '$lib/components/icons-grid';
  import { Toast } from '$lib/components/toast';
  import { browser } from '$app/env';
  import type { SimpleIcon } from 'simple-icons';
  import { onMount } from 'svelte';

  let icons = Object.values(simpleIcons).sort((a, b) => a.slug.localeCompare(b.slug));
  let filteredIcons: SimpleIcon[] = [];
  let showToast = false;

  const searchIcons = (query: string) => {
    if (!query) return (filteredIcons = icons);

    const startsWith = icons.filter((x) => x.slug.startsWith(query));
    const includes = icons.filter((x) => x.slug.includes(query) && !startsWith.includes(x));
    filteredIcons = [...startsWith, ...includes];
  };

  const copyIcon = (icon: string) => {
    if (!browser) return;
    navigator.clipboard.writeText(`!icone ${icon}`);
    if (showToast) return;
    showToast = true;
    setTimeout(() => (showToast = false), 3500);
  };

  onMount(() => (filteredIcons = icons));
</script>

<IconsGrid icons={filteredIcons} search={searchIcons} copy={copyIcon} />

{#if showToast}
  <Toast>
    {$LANG.streams.icons.copied}
    <img src="/img/KomodoHype.png" alt="KomodoHype" />
  </Toast>
{/if}
