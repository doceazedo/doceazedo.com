export type Post = {
	metadata: object;
	date: string;
	title: string;
	icon: string;
	slug: string;
	pinned?: boolean;
};

export type NowPlayingTrack = {
	artist: string;
	track: string;
	cover: string | null;
	nowPlaying: boolean;
	playedAt: string | null;
};
