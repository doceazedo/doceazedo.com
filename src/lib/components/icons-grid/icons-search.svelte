<script lang="ts">
  import { Input } from '$lib/components/input';
  import { SearchIcon } from '$lib/components/icons';
  import { FILTERED_ICONS, ICONS } from './icons-grid.store';

  const searchIcons = (query: string) => {
    if (!query) return ($FILTERED_ICONS = $ICONS);

    const startsWith = $ICONS.filter((x) => x.slug.startsWith(query));
    const includes = $ICONS.filter((x) => x.slug.includes(query) && !startsWith.includes(x));
    $FILTERED_ICONS = [...startsWith, ...includes];
  };

  let query = '';
  $: query, searchIcons(query);
</script>

<div class="search">
  <Input bind:value={query} placeholder="Pesquisa..." />
  <SearchIcon />
</div>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .search
    position: relative
    margin: 2rem 0

    :global(svg)
      position: absolute
      top: .75rem
      right: .75rem
      width: 1.5rem
      height: 1.5rem
      pointer-events: none
      transition: all .2s ease

    &:focus-within :global(svg)
      color: var(--primary)-light

  :global([data-theme="light"])
    .search
      &:focus-within :global(svg)
        color: var(--primary)

      :global(svg)
        color: var(--primary)-light
</style>
