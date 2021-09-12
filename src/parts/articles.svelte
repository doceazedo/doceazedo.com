<script>
  import SectionTitle from '../components/section-title.svelte';
  import Posts from '../components/posts.svelte';
  import Button from '../components/button.svelte';

  export let posts = [];
</script>

<section>
  <SectionTitle
    title="Latest articles"
    paragraph={[
      'I pretty much rather reading articles than watching tutorials, so',
      'here I gather stuff that I learned and want to share.'
    ]} />
  
  <Posts posts={posts}/>

  <Button outline center href="/blog">
    View all
  </Button>
</section>

<style type="text/sass">
  @import '../assets/sass/vars.sass'

  section
    padding: 4rem 0
    border-bottom: $hr
</style>