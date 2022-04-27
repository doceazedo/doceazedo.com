<script lang="ts">
  import { LANG } from '$lib/stores';
  import { AudioIcon, Buttons } from '$lib/components';

  export let title: string,
    paragraph: string[],
    image: string,
    customCursorEl: HTMLImageElement = null,
    customCursorImage: string = null,
    showAudioButton = false,
    onClickAudioButton: () => void = null;
</script>

<header class="blurb">
  <div class="blurb-info">
    <h1>
      {title}
      {#if showAudioButton}
        <button class="audio" on:click={onClickAudioButton} aria-label={$LANG.alt.audioButton}>
          <AudioIcon />
        </button>
      {/if}
    </h1>
    <p>
      {#each paragraph as line}
        {line} <br />
      {/each}
    </p>
    <Buttons>
      <slot />
    </Buttons>
  </div>
  <div class="blurb-selfie">
    <figure>
      <img class="selfie" src={image} alt={$LANG.alt.selfie} />
      <div class="pat-area" class:is-active={customCursorImage} />
      <img src={customCursorImage} alt="" class="pat-cursor" bind:this={customCursorEl} />
    </figure>
  </div>
</header>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .blurb
    display: flex
    justify-content: space-between
    align-items: center
    padding: 6rem 0
    border-bottom: $hr

    h1
      position: relative
      font-size: 3rem
      font-weight: 700
      margin-bottom: 1rem

      .audio
        position: absolute
        top: -.5rem
        right: -.5rem
        display: flex
        justify-content: center
        align-items: center
        width: 1.5rem
        height: 1.5rem
        padding: 0
        color: $primary-light
        background-color: rgba($primary, .3)
        border: none
        border-radius: 50%
        cursor: pointer

    p
      font-family: $font-secondary
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
        z-index: 10

        &.is-active
          cursor: none

      .pat-cursor
        position: fixed
        display: none
        pointer-events: none
        z-index: 10

  @media screen and (max-width: 768px)
    .blurb
      flex-direction: column-reverse
      padding: 3rem 0

      &-info
        width: 100%
        text-align: center

        h1
          font-size: 2rem

        p
          margin-bottom: 3rem

        br
          display: none

      &-selfie
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
            height: 300px !important
            width: 225px !important

  @media screen and (min-width: 769px)
    .pat-area.is-active:hover + .pat-cursor
      display: block
</style>
