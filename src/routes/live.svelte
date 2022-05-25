<script lang="ts">
  import { LANG } from '$lib/stores';
  import { Metadata } from '$lib/components/metadata';
  import { SupportCTA } from '$lib/components/cta';
  import { LIVE_DATA } from '$lib/modules/live';
  import { TwitchPlayer } from '$lib/modules/twitch-player';
</script>

<Metadata title={$LANG.navbar.live} />

<h1 class="title">
  {$LIVE_DATA?.isLive ? $LANG.streams.titleOnline : $LANG.streams.titleOffline}
</h1>
<TwitchPlayer />

<h1 class="title">Apoie o meu conteúdo</h1>
<SupportCTA />

<style lang="sass">
  .title
    font-size: 1.75rem
    font-weight: 700
    margin: 4rem 0 1rem
</style>
