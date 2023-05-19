<script lang="ts">
  import { LANG } from '$lib/stores';
  import ProjectLinks from './ProjectLinks.svelte';
  import type { Project } from '.';

  const items: Project[] = [
    {
      id: 'fazendoca',
      title: 'Fazendoca',
      source: 'https://github.com/doceazedo/fazendoca-ue5'
    },
    {
      id: 'overlay',
      title: 'Overlay & SucoBOT',
      url: 'https://twitch.tv/doceazedo911',
      source: 'https://github.com/doceazedo/overlay',
      imageFormat: 'gif'
    },
    {
      id: 'ssn',
      title: 'SSN.gg',
      url: 'http://ssn.gg',
      source: 'https://github.com/doceazedo/ssn'
    }
  ];
</script>

<ul class="projects">
  {#each items as item}
    <li class="item">
      <figure class="screenshot">
        <img src="/img/projects/{item.id}.{item.imageFormat || 'webp'}" class="image" alt="" />
      </figure>

      <div class="info">
        <h1>{item.title}</h1>
        <p>{$LANG.projects.details?.[item.id]}</p>
        <ProjectLinks {item} />
      </div>
    </li>
  {/each}
</ul>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .projects
    display: flex
    flex-direction: column
    gap: 4rem

    .item
      display: flex
      justify-content: space-between
      gap: 2rem

      &:nth-child(odd)
        .screenshot
          &::before
            left: -1rem

          .image
            transform: perspective(1000px) rotateY(13deg) rotateX(5deg) rotate(-1deg) scaleY(.9) scaleX(.95) translateX(3%) translateY(-3%)

        .info
          align-items: flex-end

          h1,
          p
            text-align: right

      &:nth-child(even)
        .screenshot
          order: 1

          .image
            transform: perspective(1000px) rotateY(-13deg) rotateX(5deg) rotate(1deg) scaleY(.9) scaleX(.95) translateX(-3%) translateY(-3%)

    .screenshot
      position: relative
      display: flex
      flex-shrink: 0
      height: 270px
      width: 480px

      .image
        background-color: rgba(255, 255, 255, .05)
        border-radius: 1rem
        transition: all .4s ease

        &:hover
          transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(1) translateX(0) translateY(0) !important

      &::before
        content: ''
        position: absolute
        height: 100%
        width: 100%
        background-color: rgba(var(--primary-rgb), .25)
        border-radius: 50%
        filter: blur(2rem)
        pointer-events: none
        transform: scaleY(1.1)

  .info
    position: relative
    display: flex
    flex-direction: column
    justify-content: center
    gap: .75rem

    h1,
    p
      transition: color .4s ease

    h1
      font-size: 1.75rem
      font-weight: 600
      color: #fff

    p
      font-family: var(--font-secondary)
      font-size: 1.25rem
      line-height: 1.25
      color: $whiteish

  :global([data-theme="light"])
    .info
      h1
        color: #000

      p
        color: $blackish

  @media screen and (max-width: 768px)
    .item
      flex-direction: column

      .screenshot
        order: unset !important
        width: 100%
        height: 100%
        aspect-ratio: 16/9

      .info
        align-items: center !important

        h1,
        p
          text-align: center !important

        h1
          font-size: 1.5rem

        p
          font-size: 1.2rem
    // li

    //   .image
    //     height: 240px !important
    //     width: 100% !important

    //   .screenshot
    //     margin: 0 !important
    //     order: unset !important

    //   .info
    //     h1,
    //     p
    //       text-align: center !important

    //     h1
    //       font-size: 1.75rem !important

    //   &:not(:last-child) .info
    //     padding-bottom: 4rem
    //     border-bottom: 1px solid rgba(#fff, .1)
</style>
