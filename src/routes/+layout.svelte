<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { Container, SkipToContent } from '$lib/components';
  import { Footer, Navbar, TopbarDomainMigration } from '$lib/modules';
  import '../assets/sass/minireset.sass';
  import '../assets/sass/global.sass';

  $: ref = browser ? $page.url.searchParams.get('ref') : '';
</script>

<SkipToContent />
<TopbarDomainMigration {ref} />
<Navbar />
<Container>
  <slot />
</Container>
<Footer />
