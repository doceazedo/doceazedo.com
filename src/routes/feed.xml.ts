import { XMLBuilder } from 'fast-xml-parser';
import { getPosts } from '$lib/utils';
import type { Post } from '$lib/modules/posts';

const builder = new XMLBuilder({
  ignoreAttributes: false,
  format: true,
  cdataPropName: 'cdata'
});

export const get = async () => {
  const data = await getPosts(5);
  const posts = data.body.posts.map((post: Post) => ({
    title: post.title,
    link: `https://doceazedo.com/blog/${post.slug}`,
    pubDate: new Date(post.date).toUTCString(),
    guid: `https://doceazedo.com/blog/${post.slug}`,
    description: {
      cdata: `<img src="https://doceazedo.com/img/thumbnails/${post.slug}.jpg" /> ${post?.description}`
    }
  }));

  const feed = {
    rss: {
      '@_xmlns:atom': 'http://www.w3.org/2005/Atom',
      '@_version': '2.0',
      channel: {
        title: 'DoceAzedo',
        link: 'https://doceazedo.com',
        description:
          'Um amontoado de textos sobre tecnologia e programação, misturados com conversa fiada sobre música, vivências pessoais e outras besteiras.',
        language: 'pt',
        copyright: 'GPLv3 License',
        lastBuildDate: new Date().toUTCString(),
        item: posts
      }
    }
  };

  const xml = builder.build(feed);

  return {
    body: xml,
    headers: {
      'Content-Type': 'text/xml'
    }
  };
};
