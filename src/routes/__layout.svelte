<script lang="ts">
  import { Navbar, Footer } from '../parts';
  import '../assets/css/minireset.min.css';
  import '../assets/css/app.css';
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