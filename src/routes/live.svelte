<script lang="ts">
  import * as simpleIcons from 'simple-icons/icons';
  import { LANG } from '$lib/stores';
  import { Metadata } from '$lib/components/metadata';
  import { SupportCTA } from '$lib/components/cta';
  import { LIVE_DATA } from '$lib/modules/live';
  import { TwitchPlayer } from '$lib/modules/twitch-player';
  import { IconsGrid } from '$lib/modules/icons-grid';

  const iconsQty = Object.keys(simpleIcons).length;
</script>

<Metadata title={$LANG.navbar.live} />

<h1 class="title">
  {$LIVE_DATA?.isLive ? $LANG.streams.titleOnline : $LANG.streams.titleOffline}
</h1>
<TwitchPlayer />

<h1 class="title">{$LANG.streams.supportMe}</h1>
<SupportCTA />

<h1 class="title">{$LANG.streams.icons.title}</h1>
<p class="subtitle">
  {$LANG.streams.icons.subtitle.replace('%s', iconsQty.toString())}
</p>
<IconsGrid />

<style lang="sass">
  @import '../assets/sass/vars'

  .title
    font-size: 1.75rem
    font-weight: 700
    margin: 4rem 0 1rem

  .subtitle
    font-size: 1.25rem
    line-height: 1.25
    color: $whiteish
</style>
