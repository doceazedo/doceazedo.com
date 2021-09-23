<script>
  import { Navbar, Footer } from '../parts';
  import '../assets/css/minireset.min.css';
  import '../assets/css/app.css';
</script>

<svelte:head>
	<title>Lucas Fernandes</title>
</svelte:head>

<Navbar />

<main>
  <slot />
</main>

<Footer />

<style type="text/sass">
  @media screen and (max-width: 768px)
    main
      padding: 0 1rem
</style>