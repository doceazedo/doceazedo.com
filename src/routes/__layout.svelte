<script lang="ts">
  import { Navbar } from '$lib/modules';
  import { Footer } from '../parts';
  import '../assets/sass/minireset.sass';
  import '../assets/sass/global.sass';
</script>

<Navbar />

<main>
  <slot />
</main>

<Footer />

<style lang="sass">
  @media screen and (max-width: 768px)
    main
      padding: 0 1rem
</style>
