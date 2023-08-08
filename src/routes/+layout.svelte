<script lang="ts">
  import { Toaster } from 'svelte-french-toast';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { Container, Footer, Navbar, SkipToContent } from '$lib/components';
  import { Screensaver } from '$lib/components/screensaver';
  import TopbarDomainMigration from '$lib/components/topbar/TopbarDomainMigration.svelte';
  import BusHorn from '$lib/components/misc/BusHorn.svelte';
  import '../assets/sass/minireset.sass';
  import '../assets/sass/fonts.sass';
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
<Screensaver />
<BusHorn />
<Toaster />
