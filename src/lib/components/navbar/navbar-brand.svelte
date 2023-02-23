<script lang="ts">
  import { LANG } from '$lib/stores';
  import { sleep } from '$lib/utils';
  import { BrandDoceAzedo, NavbarAchievement } from '$lib/components';

  let brandAnimating = false;
  let brandClicks = 0;
  let achievementGet = false;

  const onClickBrand = async (event: Event) => {
    if (brandAnimating) return;
    brandAnimating = true;

    brandClicks++;
    if (brandClicks >= 5) achievementGet = true;

    const brand = event.target as HTMLElement;
    const brandParts = brand.getElementsByTagName('path');

    brandParts[0].classList.add('hide');
    await sleep(100);
    brandParts[1].classList.add('hide');
    await sleep(500);
    brandParts[0].classList.remove('hide');
    await sleep(100);
    brandParts[1].classList.remove('hide');

    brandAnimating = false;
  };
</script>

<a class="navbar-brand" href="/" on:click={onClickBrand} aria-label={$LANG.alt.home}>
  <BrandDoceAzedo />
</a>

{#if achievementGet}
  <NavbarAchievement />
{/if}

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .navbar-brand
    position: relative
    display: flex
    transition: all .8s ease

    :global(svg)
      height: 3rem
      pointer-events: none
      user-select: none

    &::before
      content: ''
      position: absolute
      width: 100%
      height: 100%
      background-color: rgba($primary, .25)
      border-radius: 50%
      filter: blur(1rem)
      transform: scale(1.25)
      pointer-events: none
      transition: all .2s ease
  
  :global([data-theme="light"])
    .navbar-brand::before
      background-color: rgba($primary-light, .25)

  @media screen and (max-width: 768px)
    .navbar-brand :global(svg),
    .navbar-brand::before
      height: 2.5rem
</style>
