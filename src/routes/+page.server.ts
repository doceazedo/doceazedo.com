type Post = {
	metadata: object;
	date: string;
	title: string;
	icon: string;
	pinned?: boolean;
};

export const load = async () => {
	let posts: Post[] = [];
	const paths = import.meta.glob("/src/**/*.md", {
		eager: true,
	});
	for (const path in paths) {
		const file = paths[path] as Post;
		const slug = path.split("/")[5];

		const metadata = file.metadata;
		const post = { ...metadata, slug } as unknown as Post;
		posts.push(post);

		posts = posts.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);

		const pinnedPosts = posts.filter((post) => post.pinned);
		if (pinnedPosts) {
			posts = [...pinnedPosts, ...posts.filter((post) => !post.pinned)];
		}

		posts.slice(0, 6);
	}
	return { posts };
};
