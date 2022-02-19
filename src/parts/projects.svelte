<script lang="ts">
  import SectionTitle from '../components/section-title.svelte';
  import MusicwrapLogo from '../assets/img/musicwrap-logo.svg';
</script>

<section>
  <SectionTitle title="Projects I'm working on" />
  <ul>
    {#each Array(3) as uwu}
      <li>
        <a href="https://musicwrap.xyz" target="_blank">
          <img src={MusicwrapLogo} alt="" />
        </a>
        <p>
          Um site open-source que gera imagens com as músicas que você mais ouviu na semana. Ele foi
          desenvolvido com React e Fastify e integra as APIs do last.fm e Deezer.
        </p>
      </li>
    {/each}
  </ul>
</section>

<style lang="sass">
  @import '../assets/sass/vars.sass'

  section
    padding: 4rem 0
    border-bottom: $hr

    ul
      display: flex

      li
        width: 33.3333%

        a
          display: flex
          justify-content: center
          align-items: center
          height: 8rem
          padding: 0 1.5rem
          margin-bottom: 1.5rem
          /* remover dps: */
          color: #fff
          text-decoration: none
          transition: all .2s ease

          &:hover
            background-color: rgba(255, 255, 255, 0.05)

          img
            pointer-events: none

        p
          text-align: center
          line-height: 1.25
          color: $whiteish

        &:not(:last-child)
          margin-right: 1.75rem
</style>
