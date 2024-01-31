<script lang="ts">
  import _ from '$lib/lang';
  import { Metadata } from '$lib/components/metadata';
  import { SupportCTA } from '$lib/components/cta';
  import { LIVE_DATA } from '$lib/stores/live-data';
  import TwitchPlayer from '$lib/components/twitch-player/TwitchPlayer.svelte';
</script>

<Metadata title={$_.navbar.live} />

<h1 class="title">
  {$LIVE_DATA?.isLive ? $_.streams.titleOnline : $_.streams.titleOffline}
</h1>
<TwitchPlayer />

<h1 class="title">{$_.streams.supportMe}</h1>
<SupportCTA />

<style lang="sass">
  @import '../../assets/sass/vars'

  .title
    font-size: 1.75rem
    font-weight: 700
    margin: 4rem 0 1rem
</style>
