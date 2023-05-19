<script lang="ts">
  import { page } from '$app/stores';
  import LANG from '$lib/lang';
  import { LIVE_DATA } from '$lib/modules/live';
  import { NavbarItem } from '$lib/components';
  import { navbarItems } from './navbar-data';
</script>

<div class="navbar-items">
  {#each navbarItems as item}
    <NavbarItem
      href="/{item.slug}"
      active={$page.url.pathname.startsWith(`/${item.slug}`)}
      live={item.slug == 'live' && $LIVE_DATA?.isLive}
    >
      {$LANG.navbar[item.slug]}
    </NavbarItem>
  {/each}
</div>

<style lang="sass">
  .navbar-items
    display: flex
    margin-left: auto

  @media screen and (max-width: 768px)
    .navbar-items
      display: none
</style>
