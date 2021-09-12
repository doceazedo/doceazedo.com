<script>
  import { page } from '$app/stores';
  import { browser } from '$app/env';
  import { lang } from '../stores';
  import logo from '../assets/img/logo.svg';

  let logoEl;
  let spinDegrees = 0;
  const spin = () => {
    spinDegrees += 360;
    logoEl.style.transform = `rotate(${spinDegrees}deg)`;
  }

  let currentLang = 'en';
  if (browser && navigator.language.startsWith('pt')) currentLang = 'pt';

  const changeLang = _lang => {
    lang.change(_lang);
    currentLang = _lang;
  };
</script>

<navbar>
  <a sveltekit:prefetch href="/">
    <img src={logo} alt="" bind:this={logoEl} on:click={spin}>
  </a>

  <ul>
    <li class:active={$page.path === '/'}><a sveltekit:prefetch href="/">{$lang.navbar.home}</a></li>
    <li class:active={$page.path.startsWith('/blog')}><a sveltekit:prefetch href="/blog">{$lang.navbar.blog}</a></li>
    <li class:active={$page.path === '/about'}><a sveltekit:prefetch href="/about">{$lang.navbar.about}</a></li>
    <li class:active={$page.path === '/contact'}><a sveltekit:prefetch href="/contact">{$lang.navbar.contact}</a></li>
    <li><span on:click={() => changeLang('pt')} class:active={currentLang == 'pt'}>PT-BR</span> / <span on:click={() => changeLang('en')} class:active={currentLang == 'en'}>EN</span></li>
  </ul>
</navbar>

<style type="text/sass">
  @import '../assets/sass/vars.sass'

  navbar
    position: relative
    display: flex
    align-items: center
    border-bottom: $hr

    &::before
      content: ''
      position: absolute
      height: 4rem
      width: 4rem
      background-color: rgba($primary, .25)
      border-radius: 50%
      filter: blur(.5rem)
      pointer-events: none

    >a img
      height: 4rem
      width: 4rem
      user-select: none
      transition: all .8s ease

    ul
      display: flex
      margin-left: auto

      li
        position: relative
        display: flex
        justify-content: center
        align-items: center
        height: 6rem
        cursor: default
        font-size: 1.25rem

        &::before
          content: ''
          position: absolute
          bottom: -1px
          left: 0
          width: 100%
          height: 1px
          background-color: $primary
          box-shadow: 0 0 .5rem .25rem rgba($primary, .25)
          opacity: 0
          transition: all .2s ease

        a
          display: flex
          justify-content: center
          align-items: center
          height: 100%
          padding: 0 1.5rem
          color: $whiteish
          text-decoration: none
          transition: all .2s ease

        &:hover a,
        &.active a,
        span.active
          color: $primary
          text-shadow: 0 0 .25rem $primary

        &.active::before
          opacity: 1

        &:last-child
          padding: 0 1.5rem
          color: rgba(255, 255, 255, .1)

          span
            transition: all .2s ease

            &:first-child
              margin-right: .5rem 

            &:last-child
              margin-left: .5rem 

            &:not(.active)
              color: $whiteish
              cursor: pointer
</style>