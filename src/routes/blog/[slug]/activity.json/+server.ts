import { ATP_IDENTIFIER, ATP_PASSWORD } from "$env/static/private";
import { SOCIALS } from "$lib/constants.js";
import type { PostActivity } from "$lib/types.js";
import {
	AppBskyFeedGetLikes,
	AppBskyFeedGetPostThread,
	AtpAgent,
} from "@atproto/api";
import { error, json } from "@sveltejs/kit";

const BLUESKY_USER = SOCIALS.bluesky.url.split("profile/")[1];

const agent = new AtpAgent({
	service: "https://bsky.social",
});

export const GET = async ({ params }) => {
	const post = await import(`../../(posts)/${params.slug}/+page.md`);
	if (!post) return error(404);

	return json({
		bluesky: await getBlueskyData(post.metadata?.bskyPostId),
	} as PostActivity);
};

const getBlueskyData = async (
	postId?: string,
): Promise<PostActivity["bluesky"] | null> => {
	if (!postId) return null;

	try {
		await agent.login({
			identifier: ATP_IDENTIFIER,
			password: ATP_PASSWORD,
		});
	} catch (_error) {
		return null;
	}

	let postThread: AppBskyFeedGetPostThread.OutputSchema;
	try {
		const resp = await agent.getPostThread({
			uri: `at://${BLUESKY_USER}/app.bsky.feed.post/${postId}`,
		});
		postThread = resp.data;
	} catch (_error) {
		return null;
	}
	if (!("post" in postThread.thread)) return null;

	const likes: AppBskyFeedGetLikes.Like[] = [];
	/*
		try {
			const resp = await agent.getLikes({
				uri: postThread.thread.post.uri,
			});
			likes = resp.data?.likes || null;
		} catch (_error) {}
	*/

	return {
		thread: postThread.thread,
		likes,
	};
};
