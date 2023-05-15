<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { LANG } from '$lib/stores';
  import { LIVE_DATA } from '$lib/modules/live';
  import { HomeIcon } from '$lib/components/icons';
  import { navbarItems } from './navbar-data';

  export let toggleMobileMenu: () => void, hamburgerEl: HTMLElement;

  let menuWrapperEl: HTMLDivElement;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      !menuWrapperEl ||
      !hamburgerEl ||
      menuWrapperEl.contains(event.target as HTMLElement) ||
      hamburgerEl.contains(event.target as HTMLElement) ||
      event.defaultPrevented
    )
      return;
    toggleMobileMenu();
  };
</script>

<svelte:body on:click={handleClickOutside} />

<div
  class="mobile-menu-wrapper"
  on:click={toggleMobileMenu}
  on:keypress
  transition:fade={{ duration: 300, easing: quintOut }}
  bind:this={menuWrapperEl}
>
  <div class="mobile-menu" transition:fly={{ duration: 300, y: 64, opacity: 0, easing: quintOut }}>
    <a href="/" class="mobile-menu-item">
      <HomeIcon />
      {$LANG.navbar.home}
    </a>

    {#each navbarItems as item}
      <a href="/{item.slug}" class="mobile-menu-item">
        <svelte:component this={item.icon} />
        <span class:live={item.slug == 'streams' && $LIVE_DATA?.isLive}>
          {$LANG.navbar[item.slug]}
        </span>
      </a>
    {/each}
  </div>
</div>

<style lang="sass">
  @import '../../../assets/sass/vars'
  @import '../../../assets/sass/mixins'

  .mobile-menu-wrapper
    position: fixed
    bottom: 0
    left: 0
    display: flex
    flex-direction: column
    justify-content: flex-end
    width: 100%
    height: calc(100% - 77px)
    background-color: rgba(#000, .5)
    z-index: 100
    
    .mobile-menu
      width: 100%
      padding: .5rem 0
      background-color: var(--primary)
      border-top-left-radius: 1.5rem
      border-top-right-radius: 1.5rem

      &-item
        position: relative
        display: flex
        align-items: center
        gap: .75rem
        padding: .75rem 1.5rem
        color: $whiteish
        transition: all .2s ease

        &:hover
          background-color: rgba(#fff, .1)

        .live
          position: relative
          
          &::after
            @include live-badge
            top: calc(50% - 2px)
            right: -1rem
            height: .5rem
            width: .5rem
            border: none

        :global(svg)
          height: 1.5rem
          width: 1.5rem
</style>
