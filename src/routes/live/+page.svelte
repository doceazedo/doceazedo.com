<script lang="ts">
  import { LANG } from '$lib/stores';
  import { Metadata } from '$lib/components/metadata';
  import { SupportCTA } from '$lib/components/cta';
  import { TtsUsage, TtsVoicesTable } from '$lib/components/tts';
  import { LIVE_DATA } from '$lib/modules/live';
  import { TwitchPlayer } from '$lib/modules/twitch-player';
  import { IconsGrid, ICONS } from '$lib/components/icons-grid';

  $: iconsQty = $ICONS.length;
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

<h1 id="tts" class="title">{$LANG.streams.tts.title}</h1>
<p class="subtitle">{$LANG.streams.tts.subtitle}</p>
<TtsUsage />
<TtsVoicesTable />

<style lang="sass">
  @import '../../assets/sass/vars'

  .title
    font-size: 1.75rem
    font-weight: 700
    margin: 4rem 0 1rem

  .subtitle
    font-size: 1.25rem
    line-height: 1.25
    color: $whiteish

  :global([data-theme="light"])
    .subtitle
      color: $blackish
</style>
