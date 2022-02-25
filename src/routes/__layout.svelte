<script lang="ts">
  import { Container, SkipToContent } from '$lib/components';
  import { Navbar, Footer } from '$lib/modules';
  import '../assets/sass/minireset.sass';
  import '../assets/sass/global.sass';
</script>

<SkipToContent />
<Navbar />
<Container>
  <slot />
</Container>
<Footer />
