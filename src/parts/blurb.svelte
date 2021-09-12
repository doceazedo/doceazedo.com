<script>
  import { lang } from '../stores';
  import Button from '../components/button.svelte';
  import selfie from '../assets/img/selfie.webp';
</script>

<header>
  <div>
    <h1>{$lang.blurb.title}</h1>
    <p>
      {#each $lang.blurb.paragraph as line}
        {line} <br>
      {/each}
    </p>
    <div class="buttons">
      <Button>{$lang.blurb.button}</Button>
      <Button outline href="https://github.com/pxlucasf" target="_blank">GitHub</Button>
    </div>
  </div>
  <div>
    <figure>
      <img src={selfie} alt="">
    </figure>
  </div>
</header>

<style type="text/sass">
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
        img
          filter: grayscale(1)

        &::before
          left: -.75rem
          bottom: -.75rem

      img
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
</style>