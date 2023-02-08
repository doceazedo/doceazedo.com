export type LiveResponse = {
  nowPlaying: NowPlaying;
  isLive: boolean;
};

export type NowPlaying = {
  title: string;
  artist: string;
  cover: string;
};
