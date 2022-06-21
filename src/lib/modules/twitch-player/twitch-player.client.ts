import type { VOD } from './twitch-player.types';

const baseUrl = '/api/vods';

export const getVODs = async () => {
  try {
    const resp = await fetch(baseUrl);
    const data: VOD[] = await resp.json();
    return data;
  } catch (error) {
    return [];
  }
};
