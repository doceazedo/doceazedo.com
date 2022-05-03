/* eslint-disable no-useless-escape */

export const getPosts = async (qty?: number) => {
  console.log('getPosts utils');
  const files = import.meta.glob('../../routes/blog/*.md');
  const posts = Object.entries(files);
  const size = qty || posts.length;

  console.log(posts);

  const allPosts = await Promise.all(
    posts.slice(0, size).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const slug = path.match(/[^\\\/]+(?=\.[\w]+$)|[^\\\/]+$/)[0];
      const post = {
        slug,
        ...metadata
      };

      return post;
    })
  );

  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b?.meta?.date).getTime() - new Date(a?.meta?.date).getTime()
  );

  return {
    body: {
      posts: sortedPosts
    }
  };
};
