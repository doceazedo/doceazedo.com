<script lang="ts">
  import _ from '$lib/lang';
  import { FooterElevator, FooterMusicPlayer } from '.';
</script>

<footer>
  <p class="copyleft">
    <span>{$_.footer[0]}</span>
    <span>
      {$_.footer[1]}
      <a
        href="https://gnu.org/licenses/copyleft.html"
        target="_blank"
        rel="noreferrer"
        aria-label={$_.alt.copyleft}
      >
        <span class="flip">&copy;</span>
        {new Date().getFullYear()}
      </a>
    </span>
  </p>

  <FooterMusicPlayer />
</footer>

<FooterElevator />

<style lang="sass">
  @import '../../../assets/sass/vars.sass'
  @import '../../../assets/sass/mixins.sass'

  footer
    display: flex
    justify-content: space-between
    align-items: center
    max-width: 900px
    margin: 4rem auto 0
    padding: 3rem 0
    border-top: $hr

    .copyleft
      display: flex
      flex-direction: column

      .flip
        display: inline-block
        transform: scaleX(-1)

  :global([data-theme="light"])
    footer
      border-top: $hr-light

  @media screen and (max-width: 768px)
    footer
      position: relative
      flex-direction: column

      p
        margin-bottom: 2rem
        text-align: center
</style>
