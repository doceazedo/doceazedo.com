import { getLatestBlogPosts } from "$lib/utils/blog-posts";

export const load = async () => {
	const posts = getLatestBlogPosts();
	return { posts };
};
