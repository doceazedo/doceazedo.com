<script lang="ts">
  import { browser } from '$app/env';
  import { Blurb, Button } from '$lib/components';
  import { LANG } from '$lib/stores';
  import image from '../../../assets/img/selfie.webp';
  import customCursorImage from '../../../assets/img/pat.gif';

  let customCursorEl: HTMLImageElement;
  const customCursorHalfSize = 112 / 2;

  const positionCursor = (event: MouseEvent) => {
    if (customCursorEl == null) return;
    customCursorEl.style.top = event.clientY - customCursorHalfSize + 'px';
    customCursorEl.style.left = event.clientX - customCursorHalfSize + 'px';
  };

  if (browser) window.addEventListener('mousemove', (event) => positionCursor(event));
</script>

<Blurb
  title={$LANG.blurb.title}
  paragraph={$LANG.blurb.paragraph}
  {image}
  bind:customCursorEl
  {customCursorImage}
>
  <Button href="/contact">{$LANG.blurb.button}</Button>
  <Button outline href="https://github.com/doceazedo" target="_blank">GitHub</Button>
</Blurb>
