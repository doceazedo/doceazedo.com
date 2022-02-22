export type LiveStatsApiResponse = {
  isLive: boolean;
  nowPlaying: {
    title: string;
    artist: string;
    cover: string;
  };
};

export { default as Footer } from './footer.svelte';
