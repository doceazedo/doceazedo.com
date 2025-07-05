import {
	AppBskyEmbedExternal,
	AppBskyEmbedImages,
	AppBskyEmbedRecord,
	AppBskyEmbedRecordWithMedia,
	AppBskyEmbedVideo,
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
	likesCount: number;
	viewsCount: number;
	comments: {
		author: {
			id: string;
			displayName: string;
			url: string;
			avatar: string;
		};
		content: string;
		embed?: PostCommentEmbed;
		likesCount: number;
		url: string;
		postedAt: string;
		source: "bluesky" | "mastodon";
	}[];
};

export type PostCommentEmbed =
	| {
			type: "image";
			images: {
				thumbnail: string;
				fullsize: string;
				alt?: string;
				aspectRatio?: { width: number; height: number };
			}[];
	  }
	| {
			type: "video";
			playlist: string;
			thumbnail?: string;
			aspectRatio?: { width: number; height: number };
	  }
	| {
			type: "link";
			url: string;
			title: string;
			description?: string;
			thumbnail?: string;
	  };

export type BlueskyRawEmbed =
	| $Typed<AppBskyEmbedImages.View>
	| $Typed<AppBskyEmbedVideo.View>
	| $Typed<AppBskyEmbedExternal.View>
	| $Typed<AppBskyEmbedRecord.View>
	| $Typed<AppBskyEmbedRecordWithMedia.View>;
