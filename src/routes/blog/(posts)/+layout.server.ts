export const load = async ({ route }) => {
	const slug = route.id.split("/blog/(posts)/")[1];
	const post = await import(`./${slug}/+page.md`);
	console.log(post.metadata);
	return {
		metadata: post.metadata,
	};
};
