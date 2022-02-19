<script lang="ts">
  import { browser } from '$app/env';
  import { lang } from '../stores';
  import Button from '../components/button.svelte';
  import selfie from '../assets/img/selfie.webp';
  import customCursorImage from '../assets/img/pat.gif';

  let customCursor: HTMLImageElement;
  const cursorSize = 112 / 2;

  const positionCursor = (event: MouseEvent) => {
    let mouse = {
      x: event.clientX,
      y: event.clientY
    };
    if (customCursor == null) return;
    customCursor.style.top = mouse.y - cursorSize + 'px';
    customCursor.style.left = mouse.x - cursorSize + 'px';
  };

  if (browser) {
    window.addEventListener('mousemove', (event) => {
      positionCursor(event);
    });
  }
</script>

<header>
  <div>
    <h1>{$lang.blurb.title}</h1>
    <p>
      {#each $lang.blurb.paragraph as line}
        {line} <br />
      {/each}
    </p>
    <div class="buttons">
      <Button href="/contact">{$lang.blurb.button}</Button>
      <Button outline href="https://github.com/doceazedo" target="_blank">GitHub</Button>
    </div>
  </div>
  <div>
    <figure>
      <img class="selfie" src={selfie} alt="" />
      <div class="pat-area" />
      <img src={customCursorImage} alt="Patting hand" class="pat-cursor" bind:this={customCursor} />
    </figure>
  </div>
</header>

<style lang="sass">
  @import '../assets/sass/vars.sass'

  header
    display: flex
    justify-content: space-between
    align-items: center
    padding: 6rem 0
    border-bottom: $hr

    h1
      font-size: 3rem
      font-weight: 700
      margin-bottom: 1rem

    p
      font-size: 1.25rem
      line-height: 1.25
      color: $whiteish
      margin-bottom: 4rem

    figure
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
        transition: .5s ease

      &::after
        background-color: rgba($primary, .125)
        transform: scaleY(1.2) scalex(1.5)
        border-radius: 50%
        filter: blur(1.5rem)

      .pat-area
        position: absolute
        top: 0
        left: 120px
        width: 130px
        height: 90px
        cursor: none
        z-index: 10

      .pat-cursor
        position: fixed
        display: none
        pointer-events: none
        z-index: 10

  @media screen and (max-width: 768px)
    header
      flex-direction: column-reverse
      padding: 3rem 0

      >div:first-child
        width: 100%
        text-align: center

        h1
          font-size: 2rem

        p
          margin-bottom: 3rem

        br
          display: none

      >div:last-child
        display: flex
        justify-content: center
        width: 100%
        margin-bottom: 2rem

        figure
          width: fit-content
          margin-left: 1rem

          &,
          &::before,
          &::after,
          img
            height: 300px
            width: 225px

      .buttons
        justify-content: center

  @media screen and (min-width: 769px)
    .pat-area:hover + .pat-cursor
      display: block
</style>
