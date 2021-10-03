<script>
  import { page } from '$app/stores';
  import { Navbar, Footer } from '../parts';
  import '../assets/css/minireset.min.css';
  import '../assets/css/app.css';

  console.log($page);
</script>

<svelte:head>
	<title>Lucas Fernandes</title>
  <meta name="title" content="Lucas Fernandes">
  <meta name="description" content="I am a fullstack developer, specially for the web, building stylish and responsive layouts and designing well structured APIs and databases.">

  <meta property="og:type" content="website">
  <meta property="og:url" content="https://{$page.host}{$page.path}">
  <meta property="og:title" content="Lucas Fernandes">
  <meta property="og:description" content="I am a fullstack developer, specially for the web, building stylish and responsive layouts and designing well structured APIs and databases.">
  <meta property="og:image" content="https://{$page.host}/thumbnail.jpg">

  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://{$page.host}{$page.path}">
  <meta property="twitter:title" content="Lucas Fernandes">
  <meta property="twitter:description" content="I am a fullstack developer, specially for the web, building stylish and responsive layouts and designing well structured APIs and databases.">
  <meta property="twitter:image" content="https://{$page.host}/thumbnail.jpg">
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