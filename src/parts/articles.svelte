<script lang="ts">
  import { lang } from '../stores';
  import SectionTitle from '../components/section-title.svelte';
  import Posts from '../components/posts.svelte';
  import Button from '../components/button.svelte';

  export let posts = [];
</script>

<section>
  <SectionTitle title={$lang.articles.title} paragraph={$lang.articles.paragraph} />

  <Posts {posts} />

  <Button outline center href="/blog">
    {$lang.articles.more}
  </Button>
</section>

<style lang="sass">
  @import '../assets/sass/vars.sass'

  section
    padding: 4rem 0
    border-bottom: $hr
</style>
