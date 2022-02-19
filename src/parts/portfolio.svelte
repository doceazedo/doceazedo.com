<script lang="ts">
  import { lang } from '../stores';
  import SectionTitle from '../components/section-title.svelte';
  import portfolioSemaninha from '../assets/img/portfolio-semaninha.webp';
  import portfolioConvergencia from '../assets/img/portfolio-convergencia.webp';
  import portfolioGruposTelegram from '../assets/img/portfolio-grupostelegram.webp';
  import portfolioOverlay from '../assets/img/portfolio-overlay.webp';
  import portfolioDoceAzedo from '../assets/img/portfolio-doceazedo.webp';

  const projects = [
    {
      image: portfolioSemaninha,
      link: 'https://semaninha.com',
    },
    {
      image: portfolioConvergencia,
      scroll: '1.5s',
      link: 'https://convergencia.net.br',
    },
    {
      image: portfolioGruposTelegram,
      scroll: '4s',
      link: 'https://grupostelegram.com.br',
    },
    {
      image: portfolioOverlay,
      link: 'https://github.com/doceazedo/overlay',
    },
    {
      image: portfolioDoceAzedo,
      link: 'https://doceazedo.com',
    },
  ];
</script>

<section>
  <SectionTitle
    title={$lang.portfolio.title} />
    <ul>
      {#each projects as project, i}
        <li>
          <div class="image">
            <figure style="background-image:url({project.image}); --speed: {project.scroll || '0s'}" class:scroll={project.scroll}>
              {#if project.link}
                <a href={project.link} target="_blank" class="content"> </a>
              {/if}
            </figure>
          </div>
          
          <div class="info">
            {#if project.link}
              <a href={project.link} target="_blank" class="content"> </a>
            {/if}
            <h1>{$lang.portfolio.projects[i].title}</h1>
            <p>{$lang.portfolio.projects[i].description}</p>
          </div>
        </li>
      {/each}
    </ul>
</section>

<style lang="sass">
  @import '../assets/sass/vars.sass'

  section
    padding: 4rem 0
    border-bottom: $hr

    li
      display: flex

      &:not(:last-child)
        margin-bottom: 4rem

      &:nth-child(odd)
        .image
          margin-right: 4rem

          &::before
            left: -1rem

          figure
            transform: perspective(1000px) rotateY(13deg) rotateX(5deg) rotate(-1deg) scaleY(.9) scaleX(.95) translateX(3%) translateY(-3%)

        h1,
        p
          text-align: right

      &:nth-child(even)
        .image
          order: 1
          margin-left: 4rem

          figure
            transform: perspective(1000px) rotateY(-13deg) rotateX(5deg) rotate(1deg) scaleY(.9) scaleX(.95) translateX(-3%) translateY(-3%)

      .image
        position: relative

        figure
          display: flex
          height: 300px
          width: 540px
          background-color: rgba(255, 255, 255, .05)
          flex-shrink: 0
          overflow: hidden
          transition: all var(--speed) ease, transform .5s ease
          background-position: center center
          background-repeat: no-repeat
          background-size: cover

          a
            position: absolute
            height: 100%
            width: 100%

          &.scroll
            background-position: top center

            &:hover
              background-position: bottom center

          &:hover
            transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(1) translateX(0) translateY(0)

        &::before
          content: ''
          position: absolute
          height: 100%
          width: 100%
          background-color: rgba($primary, .25)
          border-radius: 50%
          filter: blur(2rem)
          pointer-events: none
          transform: scaleY(1.1)

      .info
        position: relative
        display: flex
        flex-direction: column
        justify-content: center

        a
          position: absolute
          height: 100%
          width: 100%

        h1
          font-size: 2.25rem
          font-weight: 700
          margin-bottom: 1rem

        p
          font-size: 1.25rem
          line-height: 1.25
          color: $whiteish

  @media screen and (max-width: 768px)
    li
      flex-direction: column

      figure
        height: 240px !important
        width: 100% !important

      .image
        margin: 0 !important
        margin-bottom: 2rem !important
        order: unset !important

      .info
        h1,
        p
          text-align: center !important

        h1
          font-size: 2rem !important

      &:not(:last-child) .info
        padding-bottom: 4rem
        border-bottom: 1px solid rgba(#fff, .1)
</style>