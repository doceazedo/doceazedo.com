<script lang="ts" context="module">
  export const load = ({ url }) => {
    return {
      props: {
        url
      }
    };
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/env';
  import { Container, SkipToContent } from '$lib/components';
  import { Footer, Navbar, TopbarDomainMigration } from '$lib/modules';
  import '../assets/sass/minireset.sass';
  import '../assets/sass/global.sass';

  export let url: string;

  $: ref = browser && $page.url.searchParams.get('ref');
</script>

<SkipToContent />
<TopbarDomainMigration {ref} />
<Navbar />
<Container {url}>
  <slot />
</Container>
<Footer />
