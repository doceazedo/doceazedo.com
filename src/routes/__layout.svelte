<script lang="ts">
  import { Container } from '$lib/components';
  import { Navbar, Footer } from '$lib/modules';
  import '../assets/sass/minireset.sass';
  import '../assets/sass/global.sass';
</script>

<Navbar />

<Container>
  <slot />
</Container>

<Footer />
