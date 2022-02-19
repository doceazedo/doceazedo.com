<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/env';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { lang } from '../stores';
  import { MenuIcon } from 'svelte-feather-icons';
  import logo from '../assets/img/logo.svg';
  import achievement from '../assets/img/achievement.webp';

  let logoEl;
  let spinDegrees = 0;
  let spinnedTimes = 0;
  let achievementGet = false;
  let achievementTimeout;
  const spin = () => {
    spinDegrees += 360;
    logoEl.style.transform = `rotate(${spinDegrees}deg)`;

    spinnedTimes++;
    clearTimeout(achievementTimeout);
    if (spinnedTimes == 10) {
      achievementGet = true;
      setTimeout(() => (achievementGet = false), 8000);
    } else if (spinnedTimes < 10) {
      achievementTimeout = setTimeout(() => (spinnedTimes = 0), 2500);
    }
  };

  let currentLang = 'en';
  if (browser && navigator.language.startsWith('pt')) currentLang = 'pt';

  const changeLang = (_lang) => {
    lang.change(_lang);
    currentLang = _lang;
  };

  let showMobileMenu = false;
</script>

<navbar>
  <a href="/">
    <img src={logo} alt="" bind:this={logoEl} on:click={spin} />
  </a>

  <ul class:show={showMobileMenu} on:click={() => (showMobileMenu = false)}>
    <li class:active={$page.url.pathname === '/'}><a href="/">{$lang.navbar.home}</a></li>
    <li class:active={$page.url.pathname.startsWith('/blog')}>
      <a sveltekit:prefetch href="/blog">{$lang.navbar.blog}</a>
    </li>
    <li class:active={$page.url.pathname === '/about'}>
      <a href="/about">{$lang.navbar.about}</a>
    </li>
    <li class:active={$page.url.pathname === '/contact'}>
      <a href="/contact">{$lang.navbar.contact}</a>
    </li>
    <li>
      <span on:click={() => changeLang('pt')} class:active={currentLang == 'pt'}>PT-BR</span> /
      <span on:click={() => changeLang('en')} class:active={currentLang == 'en'}>EN</span>
    </li>
  </ul>

  <div class="mobile-menu" on:click={() => (showMobileMenu = true)}>
    <MenuIcon size="24" />
  </div>
</navbar>

{#if achievementGet}
  <img
    class="achievement"
    src={achievement}
    alt=""
    transition:fly={{ delay: 500, duration: 800, y: -80, opacity: 1, easing: quintOut }}
  />
{/if}

<style lang="sass">
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
          z-index: 1
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

    .mobile-menu
      display: none

  .achievement
    position: fixed
    top: 1rem
    right: 1rem
    z-index: 999

  @media screen and (max-width: 768px)
    navbar
      ul
        position: fixed
        top: 0
        left: 0
        height: 100%
        width: 100%
        z-index: 999
        flex-direction: column
        background-color: rgba(#000, .5)
        backdrop-filter: blur(.25rem)
        transition: all .2s ease

        &:not(.show)
          pointer-events: none
          opacity: 0

          li
            transform: translateY(-4rem)

        li
          height: 4rem
          background-color: #11052c
          transition: all .2s ease

      img
        height: 3rem !important

      .mobile-menu
        display: flex
        justify-content: center
        align-items: center
        height: 4rem
        width: 4rem
        margin-left: auto
</style>
