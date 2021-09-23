import * as contentful from 'contentful/dist/contentful.node';
import dotenv from 'dotenv';
dotenv.config();

const client = contentful.createClient({
  space: process.env['CONTENTFUL_SPACE_ID'],
  accessToken: process.env['CONTENTFUL_DELIVERY_KEY'],
});

export const fetchPosts = async (limit = 0) => {
  const query = { content_type: 'post', select: 'fields.title,fields.slug,fields.createdAt,fields.categories,fields.icon' };
  if (limit) query.limit = limit;
  const entries = await client.getEntries(query);
  if (entries.items) {
    const posts = [];
    entries.items.forEach(post => posts.push(post.fields));
    return posts;
  }
  return [];
};

export const fetchSinglePost = async (slug) => {
  const entries = await client.getEntries({
    content_type: 'post',
    'fields.slug[in]': slug,
  });
  if (entries.items && entries.items.length) return entries.items[0].fields;
  return false;
};
