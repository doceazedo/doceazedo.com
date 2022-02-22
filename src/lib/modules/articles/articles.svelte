<script lang="ts">
  import { LANG, POSTS } from '$lib/stores';
  import { Articles } from '$lib/components';
</script>

<Articles
  title={$LANG.articles.title}
  paragraph={$LANG.articles.paragraph}
  buttonLabel={$LANG.articles.more}
  posts={$POSTS}
/>
