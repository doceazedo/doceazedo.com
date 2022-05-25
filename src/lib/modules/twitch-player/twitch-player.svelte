<script lang="ts">
  import { TwitchPlayer } from '$lib/components/twitch-player';
  import { LIVE_DATA } from '$lib/modules/live';
  import { onMount } from 'svelte';
  import { getVODs } from './twitch-player.client';
  import type { VOD } from './twitch-player.types';

  let allVods: VOD[] = [];
  let vods: VOD[] = [];
  let videoUrl = '';

  const channel = 'doceazedo911';
  const parents = '?parent=localhost&parent=doceazedo.com&parent=pbe.doceazedo.com';
  const baseUrl = `https://player.twitch.tv/${parents}`;
  const chatboxUrl = `https://twitch.tv/embed/doceazedo911/chat${parents}&darkpopout`;

  const updateVideos = () => {
    videoUrl = $LIVE_DATA?.isLive
      ? `${baseUrl}&channel=${channel}`
      : `${baseUrl}&video=${allVods?.[0]?.id}`;
    vods = $LIVE_DATA?.isLive ? allVods.slice(0, 3) : allVods.slice(1);
  };

  onMount(async () => {
    allVods = await getVODs();
    updateVideos();
  });

  LIVE_DATA.subscribe(updateVideos);
</script>

<TwitchPlayer {videoUrl} {vods} {chatboxUrl} />
