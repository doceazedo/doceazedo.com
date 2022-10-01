<script lang="ts">
  import { Button } from '$lib/components';

  export let tags: string[] = [];
  export let selected: string[] = [];
  export let active = true;

  const getUpdatedTags = (selected: string[], tag: string) =>
    selected.includes(tag) ? selected.filter((x) => x != tag) : [...selected, tag];

  const getTagsParams = (selected: string[], tag: string) => {
    const updatedTags = getUpdatedTags(selected, tag);
    const tagsParams = updatedTags.map((x) => encodeURIComponent(x));
    return tagsParams.length ? `/blog?tags=${tagsParams}` : '/blog';
  };
</script>

{#if active}
  <ul class="tags">
    {#each tags as tag}
      <li>
        <Button
          href={getTagsParams(selected, tag)}
          outline={!selected.includes(tag)}
          small
        >
          #{tag}
        </Button>
      </li>
    {/each}
  </ul>
{/if}

<style lang="sass">
  .tags
    display: flex
    flex-wrap: wrap
    gap: .75rem
    margin-bottom: 1.75rem
</style>
