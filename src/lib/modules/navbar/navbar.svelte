<script lang="ts">
  import { page } from '$app/stores';
  import {
    NavbarAchievement,
    NavbarIcons,
    NavbarItem,
    NavbarLang,
    NavbarMenu,
    Navbar
  } from '$lib/components';
  import { LANG } from '$lib/stores';
  import { sleep } from '$lib/utils';

  const navbarPageSlugs = ['blog', 'talks', 'streams', 'projects', 'me'];
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
      href: '/blog/feed.xml'
    },
    {
      icon: 'ri:github-line',
      href: 'https://github.com/doceazedo'
    },
    {
      icon: 'ri:twitter-line',
      href: 'https://twitter.com/doceazedo911'
    },
    {
      icon: 'ri:twitch-line',
      href: 'https://twitch.tv/doceazedo911'
    }
  ];
  let activeLanguage = 'en';
  let showMobileMenu = false;
  let brandClicks = 0;
  let brandAnimating = false;
  let achievementGet = false;

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

<Navbar {toggleMobileMenu} {onClickBrand}>
  <NavbarMenu {toggleMobileMenu} {showMobileMenu}>
    {#each navbarPageSlugs as slug}
      <NavbarItem href="/{slug}" active={$page.url.pathname.startsWith(`/${slug}`)}>
        {$LANG.navbar[slug]}
      </NavbarItem>
    {/each}
  </NavbarMenu>

  <NavbarIcons {icons} />

  <NavbarLang {languages} {changeLanguage} {activeLanguage} />

  {#if achievementGet}
    <NavbarAchievement />
  {/if}
</Navbar>
