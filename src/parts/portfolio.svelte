<script>
  import SectionTitle from '../components/section-title.svelte';
  import PortfolioPlaceholder from '../assets/img/portfolio-placeholder.jpg'
</script>

<section>
  <SectionTitle
    title="A few websites I made" />
    <ul>
      {#each Array(4) as uwu, i}
        <li>
          <div class="image">
            <figure style="background-image:url({PortfolioPlaceholder})"></figure>
          </div>
          <div class="content">
            <h1>sitechique{i + 1}.com</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda facere aspernatur accusantium exercitationem quis ea excepturi praesentium.</p>
          </div>
        </li>
      {/each}
    </ul>
</section>

<style type="text/sass">
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
          transition: all 1.5s ease, transform .5s ease
          background-position: top center
          background-repeat: no-repeat
          background-size: cover

          &:hover
            transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(1) translateX(0) translateY(0)
            background-position: bottom center

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

      .content
        display: flex
        flex-direction: column
        justify-content: center

        h1
          font-size: 2.25rem
          font-weight: 700
          margin-bottom: 1rem

        p
          font-size: 1.25rem
          line-height: 1.25
          color: $whiteish
</style>