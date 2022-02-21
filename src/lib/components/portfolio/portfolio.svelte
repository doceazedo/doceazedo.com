<script lang="ts">
  import { lang } from '$lib/stores';
  import { SectionTitle, Section } from '$lib/components';

  type PortfolioItem = {
    image: string;
    url: string;
    scroll?: string;
  };

  export let items: PortfolioItem[], title: string;
</script>

<Section>
  <SectionTitle {title} />
  <ul>
    {#each items as item, i}
      <li>
        <a href={item.url} class="item" target="_blank">
          <div class="image">
            <figure
              style="background-image:url({item.image}); --speed: {item.scroll || '0s'}"
              class:scroll={item.scroll}
            />
          </div>

          <div class="info">
            <h1>{$lang.portfolio.projects[i].title}</h1>
            <p>{$lang.portfolio.projects[i].description}</p>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</Section>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .item
    display: flex
    text-decoration: none
    gap: 4rem

  ul
    display: flex
    flex-direction: column
    gap: 4rem

    li:nth-child(odd)
      .image::before
        left: -1rem

      figure
        transform: perspective(1000px) rotateY(13deg) rotateX(5deg) rotate(-1deg) scaleY(.9) scaleX(.95) translateX(3%) translateY(-3%)

      h1,
      p
        text-align: right

    li:nth-child(even)
      .image
        order: 1

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

    h1
      font-size: 2.25rem
      font-weight: 700
      margin-bottom: 1rem
      color: #fff

    p
      font-size: 1.25rem
      line-height: 1.25
      color: $whiteish

  @media screen and (max-width: 768px)
    .item
      flex-direction: column
      gap: 2rem

    li

      figure
        height: 240px !important
        width: 100% !important

      .image
        margin: 0 !important
        order: unset !important

      .info
        h1,
        p
          text-align: center !important

        h1
          font-size: 1.75rem !important

      &:not(:last-child) .info
        padding-bottom: 4rem
        border-bottom: 1px solid rgba(#fff, .1)
</style>
