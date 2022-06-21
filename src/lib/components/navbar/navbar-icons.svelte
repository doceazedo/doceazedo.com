<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  type NavbarIcon = {
    icon: typeof SvelteComponent;
    href: string;
    target?: string;
  };

  export let icons: NavbarIcon[];
</script>

<div class="navbar-icons">
  {#each icons as icon}
    <!-- FIXME: add alt text -->
    <a href={icon.href} target={icon.target} class="icon" alt="">
      <svelte:component this={icon.icon} />
    </a>
  {/each}
</div>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .navbar-icons
    display: flex
    
    .icon
      position: relative
      display: flex
      justify-content: center
      align-items: center
      padding: .25rem
      color: $whiteish
      font-size: 1.25rem
      background: none
      border: none
      cursor: pointer
      transition: all .2s ease

      :global(svg)
        width: 1.25rem
        height: 1.25rem
        transition: all .2s ease

      &:hover :global(svg)
        color: $primary-light
        text-shadow: 0 0 .25rem $primary-light

  @media screen and (max-width: 768px)
    .navbar-icons
      margin-left: auto
</style>
