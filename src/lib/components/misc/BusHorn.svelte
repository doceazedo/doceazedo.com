<script lang="ts">
  import toast from 'svelte-french-toast';
  import { browser } from '$app/environment';
  import { UNLOCKED_THEMES, unlockTheme } from '$lib/stores';
  import { toastTheme } from '$lib/utils/toast';
  import _ from '$lib/lang';
  import fortniteBusHorn from '../../../assets/audio/fortnite_bus_horn.mp3';

  let busHorn: HTMLAudioElement;

  if (browser) {
    busHorn = new Audio(fortniteBusHorn);
    busHorn.volume = 0.5;
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!browser) return;
    if (event.key.toLowerCase() !== 'b') return;
    if (document.querySelector('input:focus')) return;

    busHorn.play();
    if ($UNLOCKED_THEMES.includes('fortnite')) return;
    toast.success($_.thankBusDriver, {
      ...toastTheme,
      duration: 10000
    });
    unlockTheme('fortnite');
  };
</script>

<svelte:window on:keypress={handleKeyPress} />
