import { writable } from 'svelte/store';

export type LiveResponse = {
  nowPlaying: NowPlaying;
  isLive: boolean;
};

export type NowPlaying = {
  title: string;
  artist: string;
  cover: string;
};

const getLiveData = async () => {
  try {
    const resp = await fetch('/api/live');
    const data: LiveResponse = await resp.json();
    LIVE_DATA.set(data);
  } catch (error) {
    return null;
  }
};
export const LIVE_DATA = writable<LiveResponse>(undefined, () => {
  getLiveData();
  setInterval(getLiveData, 10000);
});
