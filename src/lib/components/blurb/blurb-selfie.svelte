<script lang="ts">
  import { browser, dev } from '$app/environment';
  import { LANG } from '$lib/stores';
  import selfie from '../../../assets/img/me-chinese-new-year.webp';
  import selfieRedacted from '../../../assets/img/me-redacted.webp';
  import customCursorImage from '../../../assets/img/pat.gif';

  const selfieSrc = dev ? selfie : selfieRedacted;

  let customCursorEl: HTMLImageElement;
  const customCursorSize = 24;

  const positionCursor = (event: MouseEvent) => {
    if (customCursorEl == null) return;
    customCursorEl.style.top = event.clientY - customCursorSize + 'px';
    customCursorEl.style.left = event.clientX - customCursorSize + 'px';
  };

  if (browser) window.addEventListener('mousemove', (event) => positionCursor(event));
</script>

<div class="blurb-selfie">
  <figure class="selfie-wrapper">
    <img class="selfie" src={selfieSrc} alt={$LANG.alt.selfie} />
    <div class="pat-area" class:is-active={customCursorImage} />
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
      border: 2px solid $primary
      border-radius: 1rem
      transition: .5s ease

    &::after
      background-color: rgba($primary, .125)
      transform: scaleY(1.2) scalex(1.5)
      border-radius: 50%
      filter: blur(1.5rem)

    .pat-area
      position: absolute
      top: 80px
      left: 130px
      width: 40px
      height: 25px
      z-index: 10

      &.is-active
        cursor: none

    .pat-cursor
      position: fixed
      display: none
      width: 3rem
      height: 3rem
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
