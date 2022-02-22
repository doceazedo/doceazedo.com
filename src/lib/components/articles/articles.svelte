<script lang="ts">
  import { ArticlesList, Button, SectionTitle, Section } from '$lib/components';
  import type { WordPressApiResponse } from '$lib/modules';

  export let title: string,
    paragraph: string[],
    buttonLabel: string,
    posts: WordPressApiResponse[] = [];
</script>

<Section>
  <SectionTitle {title} {paragraph} />
  <ArticlesList {posts} />
  <Button outline center href="/blog">
    {buttonLabel}
  </Button>
</Section>
