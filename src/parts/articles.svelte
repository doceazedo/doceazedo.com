<script>
  import { lang } from '../stores';
  import SectionTitle from '../components/section-title.svelte';
  import Posts from '../components/posts.svelte';
  import Button from '../components/button.svelte';

  export let posts = [];
</script>

<section>
  <SectionTitle
    title={$lang.articles.title}
    paragraph={$lang.articles.paragraph} />
  
  <Posts posts={posts}/>

  <Button outline center href="/blog">
    {$lang.articles.more}
  </Button>
</section>

<style type="text/sass">
  @import '../assets/sass/vars.sass'

  section
    padding: 4rem 0
    border-bottom: $hr
</style>