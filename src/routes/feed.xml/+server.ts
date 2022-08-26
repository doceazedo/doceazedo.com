import { XMLBuilder } from 'fast-xml-parser';
import { getPosts } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

const baseUrl = 'https://doceazedo.com';

const builder = new XMLBuilder({
  ignoreAttributes: false,
  format: true,
  cdataPropName: 'cdata'
});

export const GET: RequestHandler = async () => {
  const data = await getPosts(5);
  const posts = data.posts.map((post) => ({
    title: post.title,
    link: `${baseUrl}/blog/${post.slug}`,
    pubDate: new Date(post.date).toUTCString(),
    guid: post.slug,
    description: {
      cdata: `<img src="${baseUrl}/img/thumbnails/${post.slug}.jpg" /> ${post?.description}`
    }
  }));

  const feed = {
    rss: {
      '@_xmlns:atom': 'http://www.w3.org/2005/Atom',
      '@_version': '2.0',
      channel: {
        title: 'DoceAzedo',
        link: baseUrl,
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
  return new Response(xml, {
    headers: {
      'Content-Type': 'text/xml'
    }
  });
};
