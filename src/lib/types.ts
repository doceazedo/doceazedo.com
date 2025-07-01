import {
	AppBskyFeedDefs,
	AppBskyFeedGetLikes,
	AppBskyFeedGetPostThread,
	type $Typed,
} from "@atproto/api";
import type { SimpleIcon } from "simple-icons";

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

export type Project = {
	pretitle: string;
	title: string;
	description: string;
	thumbnail: string;
	video?: string;
	stack: (SimpleIcon | string)[];
	role: string;
	details: string;
	links: { label: string; url: string }[];
	media: {
		url: string;
		label: string;
	}[];
	visible?: boolean;
};

export type PostActivity = {
	bluesky: {
		thread: $Typed<AppBskyFeedDefs.ThreadViewPost>;
		likes: AppBskyFeedGetLikes.Like[];
	};
};
