<script lang="ts">
  import { LANG } from '$lib/stores';
  import { PageTitle } from '$lib/components';
  import NoContent from '../assets/img/no-content.webp';
</script>

<PageTitle title={$LANG.talks.title} paragraph={$LANG.talks.paragraph} />
<figure>
  <img src={NoContent} alt="" />
</figure>

<style lang="sass">
  figure
    text-align: center

    img
      border-radius: 1rem
</style>
