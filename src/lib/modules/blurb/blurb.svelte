<script lang="ts">
  import { browser, dev } from '$app/environment';
  import { Blurb, Button, ButtonIcon } from '$lib/components';
  import {
    GithubIcon,
    InstagramIcon,
    LastfmIcon,
    TwitchIcon,
    TwitterIcon
  } from '$lib/components/icons';
  import { LANG } from '$lib/stores';
  import image from '../../../assets/img/me-chinese-new-year.webp';
  import imageRedacted from '../../../assets/img/me-redacted.webp';
  import customCursorImage from '../../../assets/img/pat.gif';
  import doceAudio from '../../../assets/audio/doce.mp3';

  const githubUrl = 'https://github.com/doceazedo';
  const socials = [
    {
      icon: TwitterIcon,
      href: 'https://twitter.com/doceazedo911'
    },
    {
      icon: InstagramIcon,
      href: 'https://instagram.com/doceazedo911/'
    },
    {
      icon: TwitchIcon,
      href: 'https://twitch.tv/doceazedo911'
    },
    {
      icon: LastfmIcon,
      href: 'https://last.fm/user/doceazedo911',
      isLarge: true
    }
  ];

  let customCursorEl: HTMLImageElement;
  const customCursorSize = 24;

  const positionCursor = (event: MouseEvent) => {
    if (customCursorEl == null) return;
    customCursorEl.style.top = event.clientY - customCursorSize + 'px';
    customCursorEl.style.left = event.clientX - customCursorSize + 'px';
  };

  const audio = browser && new Audio(doceAudio);
  const onClickAudioButton = () => audio.play();

  const getAge = (birthday: Date) => {
    const today = new Date();
    const month = today.getMonth() - birthday.getMonth();
    let age = today.getFullYear() - birthday.getFullYear();
    if (month < 0 || (month == 0 && today.getDate() < birthday.getDate())) age--;
    return age;
  };
  const age = getAge(new Date('2003-01-21'));

  if (browser) window.addEventListener('mousemove', (event) => positionCursor(event));
</script>

<Blurb
  title={$LANG.blurb.title}
  paragraph={$LANG.blurb.paragraph.replace('%s', age.toString())}
  image={dev ? imageRedacted : image}
  bind:customCursorEl
  {customCursorImage}
  showAudioButton={$LANG.code == 'en'}
  {onClickAudioButton}
>
  <Button href={githubUrl} target="_blank">
    <GithubIcon />
    GitHub
  </Button>
  {#each socials as social}
    <ButtonIcon href={social.href} isLarge={social?.isLarge}>
      <svelte:component this={social.icon} />
    </ButtonIcon>
  {/each}
</Blurb>
