<script lang="ts">
  import { page } from '$app/stores';
  import {
    NavbarAchievement,
    NavbarIcons,
    NavbarItem,
    NavbarLang,
    NavbarMenuMobile,
    NavbarMenu,
    Navbar
  } from '$lib/components';
  import { LIVE_DATA } from '$lib/modules/live';
  import { LANG } from '$lib/stores';
  import { sleep } from '$lib/utils';
  import type { NavbarLink } from '$lib/components/navbar';

  const navbarItems: NavbarLink[] = [
    {
      slug: 'blog',
      icon: 'ri:newspaper-line'
    },
    {
      slug: 'talks',
      icon: 'ri:slideshow-2-line'
    },
    {
      slug: 'streams',
      icon: 'ri:live-line'
    },
    {
      slug: 'projects',
      icon: 'ri:code-s-slash-line'
    },
    {
      slug: 'me',
      icon: 'ri:user-line'
    }
  ];
  const languages = {
    pt: { code: 'pt', title: 'PT-BR', icon: 'circle-flags:br' },
    en: { code: 'en', title: 'EN', icon: 'circle-flags:gb' }
  };
  const icons = [
    {
      icon: 'ri:bookmark-line',
      href: '/bookmarks'
    },
    {
      icon: 'ri:rss-line',
      href: '/feed.xml',
      target: '_blank'
    }
  ];
  let activeLanguage = 'en';
  let showMobileMenu = false;
  let brandClicks = 0;
  let brandAnimating = false;
  let achievementGet = false;
  let hamburgerEl: HTMLElement;

  const changeLanguage = (code: string) => {
    LANG.change(code);
    activeLanguage = code;
  };

  LANG.subscribe((x) => (activeLanguage = x.code));

  const toggleMobileMenu = () => (showMobileMenu = !showMobileMenu);

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

<Navbar {toggleMobileMenu} {onClickBrand} isMobileMenusOpen={showMobileMenu} bind:hamburgerEl>
  <NavbarMenu>
    {#each navbarItems as item}
      <NavbarItem
        href="/{item.slug}"
        active={$page.url.pathname.startsWith(`/${item.slug}`)}
        live={item.slug == 'streams' && $LIVE_DATA?.isLive}
      >
        {$LANG.navbar[item.slug]}
      </NavbarItem>
    {/each}
  </NavbarMenu>

  <NavbarIcons {icons} />

  <NavbarLang {languages} {changeLanguage} {activeLanguage} />

  {#if achievementGet}
    <NavbarAchievement />
  {/if}
</Navbar>

{#if showMobileMenu}
  <NavbarMenuMobile items={navbarItems} {toggleMobileMenu} {hamburgerEl} />
{/if}
