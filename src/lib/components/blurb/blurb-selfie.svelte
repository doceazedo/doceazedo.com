<script lang="ts">
  import { browser, dev } from '$app/environment';
  import _ from '$lib/lang';
  import { COLOR_THEMES, COLOR_THEME } from '$lib/stores';
  import customCursorImage from '../../../assets/img/pat.gif';
  import defaultSelfie from '../../../assets/img/me-selfie-v3.webp';

  $: selfieSrc = $COLOR_THEMES[$COLOR_THEME]?.selfie || defaultSelfie;
  const instagramURL = 'https://instagram.com/doceazedo911';

  $: patArea = $COLOR_THEMES[$COLOR_THEME].patArea || {
    x: 10,
    y: 120,
    width: 90,
    height: 70
  };
  $: patAreaStyle = `
    --x: ${patArea.x}px;
    --y: ${patArea.y}px;
    --width: ${patArea.width}px;
    --height: ${patArea.height}px;
  `;

  let customCursorEl: HTMLImageElement;
  const customCursorSize = 40;

  const positionCursor = (event: MouseEvent) => {
    if (customCursorEl == null) return;
    customCursorEl.style.top = event.clientY - customCursorSize + 'px';
    customCursorEl.style.left = event.clientX - customCursorSize + 'px';
  };

  if (browser) window.addEventListener('mousemove', (event) => positionCursor(event));

  const openInstagram = () => {
    if (!browser) return;
    window.open(instagramURL, '_blank')?.focus();
  };
</script>

<div class="blurb-selfie" on:contextmenu|preventDefault={openInstagram}>
  <figure class="selfie-wrapper">
    <img class="selfie" src={selfieSrc} alt={$_.alt.selfie} />
    <div
      class="pat-area"
      class:is-active={customCursorImage}
      class:is-debug={dev}
      style={patAreaStyle}
    />
    <img src={customCursorImage} alt="" class="pat-cursor" bind:this={customCursorEl} />
  </figure>
</div>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .selfie-wrapper
    position: relative
    display: flex
    margin-bottom: 1rem

    &:hover
      .selfie
        filter: grayscale(1)

      &::before
        left: -.75rem
        bottom: -.75rem

    .selfie
      height: 400px
      width: 300px
      border-radius: 1rem
      pointer-events: none
      user-select: none
      z-index: 10
      transition: .8s ease

    &::before,
    &::after
      content: ''
      position: absolute
      height: 400px
      width: 300px

    &::before
      left: -1rem
      bottom: -1rem
      border: 2px solid var(--primary)
      border-radius: 1rem
      transition: .5s ease

    &::after
      background-color: rgba(var(--primary-rgb), .125)
      transform: scaleY(1.2) scalex(1.5)
      border-radius: 50%
      filter: blur(1.5rem)

    .pat-area
      position: absolute
      top: var(--x)
      left: var(--y)
      width: var(--width)
      height: var(--height)
      z-index: 10

      &.is-debug
        border: 1px dashed rgba(red, .25)

      &.is-active
        cursor: none

    .pat-cursor
      position: fixed
      display: none
      width: 5rem
      height: 5rem
      pointer-events: none
      z-index: 10

  @media screen and (max-width: 768px)
    .selfie-wrapper
      width: fit-content
      margin-left: 1rem

      &,
      &::before,
      &::after,
      img
        height: 300px !important
        width: 225px !important

  @media screen and (min-width: 769px)
    .pat-area.is-active:hover + .pat-cursor
      display: block
</style>
