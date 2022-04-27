<script lang="ts" context="module">
  export const load = async ({ url }) => ({ props: { url } });
</script>

<script lang="ts">
  import { Container, SkipToContent } from '$lib/components';
  import { Footer, Navbar } from '$lib/modules';
  import '../assets/sass/minireset.sass';
  import '../assets/sass/global.sass';

  export let url: string;
</script>

<SkipToContent />
<Navbar />
<Container {url}>
  <slot />
</Container>
<Footer />
