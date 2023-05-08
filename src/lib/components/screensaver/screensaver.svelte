<script lang="ts">
  import { dev } from '$app/environment';
  import { IS_SLEEPING } from '$lib/stores';
  import { ScreensaverDisplay } from '.';

  const secondsUntilSleep = dev ? 3 : 30;

  let screensaverTimer: ReturnType<typeof setInterval>;

  const onBlur = () => {
    screensaverTimer = setInterval(() => {
      IS_SLEEPING.set(true);
      document.body.classList.add('is-sleeping');
    }, secondsUntilSleep * 1000);
  };

  const onFocus = () => {
    if (!$IS_SLEEPING) return;
    IS_SLEEPING.set(false);
    clearTimer();
    document.body.classList.remove('is-sleeping');
  };

  const clearTimer = () => clearInterval(screensaverTimer);
</script>

<svelte:window on:blur={onBlur} on:focus={clearTimer} />
{#if $IS_SLEEPING}
  <ScreensaverDisplay on:mousemove={onFocus} />
{/if}
