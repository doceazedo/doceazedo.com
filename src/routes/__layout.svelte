<script lang="ts" context="module">
  export const load = ({ url }) => {
    const ref = url.searchParams.get('ref');
    return {
      props: {
        url,
        ref
      }
    };
  };
</script>

<script lang="ts">
  import { Container, SkipToContent } from '$lib/components';
  import { Footer, Navbar, TopbarDomainMigration } from '$lib/modules';
  import '../assets/sass/minireset.sass';
  import '../assets/sass/global.sass';

  export let url: string, ref: string;
</script>

<SkipToContent />
<TopbarDomainMigration {ref} />
<Navbar />
<Container {url}>
  <slot />
</Container>
<Footer />
