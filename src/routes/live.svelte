<script lang="ts">
  import { LANG } from '$lib/stores';
  import { Metadata } from '$lib/components';
  import { LIVE_DATA } from '$lib/modules/live';
  import { TwitchPlayer } from '$lib/modules/twitch-player';
</script>

<Metadata title={$LANG.navbar.streams} />

<h1 class="title">
  {$LIVE_DATA?.isLive ? $LANG.streams.titleOnline : $LANG.streams.titleOffline}
</h1>
<TwitchPlayer />

<style lang="sass">
  .title
    font-size: 1.75rem
    font-weight: 700
    margin-bottom: 1rem

    &:first-child
      margin-top: 4rem
</style>
