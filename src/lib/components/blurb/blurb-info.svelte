<script lang="ts">
  import { browser } from '$app/environment';
  import { LANG } from '$lib/stores';
  import { AudioIcon, Buttons, Button, ButtonIcon } from '$lib/components';
  import {
    GithubIcon,
    LastfmIcon,
    MastodonIcon,
    TwitchIcon,
    TwitterIcon
  } from '$lib/components/icons';
  import namePronunciationAudio from '../../../assets/audio/doce.mp3';

  const githubUrl = 'https://github.com/doceazedo';
  const socials = [
    {
      icon: TwitterIcon,
      href: 'https://twitter.com/doceazedo911'
    },
    {
      icon: MastodonIcon,
      href: 'https://bolha.us/@doceazedo'
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

  $: showAudioButton = $LANG.code == 'en';
  const audio = browser && new Audio(namePronunciationAudio);
  const onClickAudioButton = () => audio && audio.play();

  const getAge = (birthday: Date) => {
    const today = new Date();
    const month = today.getMonth() - birthday.getMonth();
    let age = today.getFullYear() - birthday.getFullYear();
    if (month < 0 || (month == 0 && today.getDate() < birthday.getDate())) age--;
    return age;
  };
  const age = getAge(new Date('2003-01-21'));
</script>

<div class="blurb-info">
  <h1 class="name">
    {$LANG.blurb.title}
    {#if showAudioButton}
      <button class="audio" on:click={onClickAudioButton} aria-label={$LANG.alt.audioButton}>
        <AudioIcon />
      </button>
    {/if}
  </h1>
  <p class="bio">{$LANG.blurb.paragraph.replace('%s', age.toString())}</p>
  <Buttons>
    <Button href={githubUrl} target="_blank">
      <GithubIcon />
      GitHub
    </Button>
    {#each socials as social}
      <ButtonIcon href={social.href} rel="me" isLarge={social?.isLarge}>
        <svelte:component this={social.icon} />
      </ButtonIcon>
    {/each}
  </Buttons>
</div>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .name
    position: relative
    width: fit-content
    font-size: 2.75rem
    font-weight: 700
    margin-bottom: 1rem

    .audio
      position: absolute
      top: -.5rem
      right: -1.75rem
      display: flex
      justify-content: center
      align-items: center
      width: 1.5rem
      height: 1.5rem
      padding: 0
      color: $primary-light
      background-color: rgba($primary, .3)
      border: none
      border-radius: 50%
      cursor: pointer

  .bio
    max-width: 31rem
    margin-bottom: 4rem
    font-family: $font-secondary
    font-size: 1.25rem
    line-height: 1.25
    color: $whiteish
    transition: color .4s ease

  :global([data-theme="light"])
    .bio
      color: $blackish

  @media screen and (max-width: 768px)
    .name
      font-size: 2rem

      .audio
        right: -1.5rem
        width: 1.25rem
        height: 1.25rem

        :global(svg)
          height: .9rem
          width: .9rem

    .bio
      margin-bottom: 3rem
</style>
