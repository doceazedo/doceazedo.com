import fs from 'fs';
import showdown from 'showdown';
import matter from 'gray-matter';
import moment from 'moment';
moment.locale('pt-br');

export async function get({ params }) {
  if (params.slug) {
    try {
      const converter = new showdown.Converter();
      let md = fs.readFileSync(`src/posts/${params.slug}.md`);
      md = matter(md);
      md.content = converter.makeHtml(md.content);
      md.data.readableDatetime = moment(md.data.datetime).calendar();
      
      return {
        body: {
          content: md.content,
          metadata: md.data
        }
      }
    } catch (err) {
      return {
        status: 404
      }
    }
  }

  const posts = [];

  const dir = await fs.promises.opendir('src/posts');
  for await (const dirent of dir) {
    let md = fs.readFileSync(`src/posts/${dirent.name}`);
    md = matter(md);
    md.data.readableDatetime = moment(md.data.datetime).calendar();
    md.data.slug = dirent.name.slice(0, -3);
    posts.push(md.data);
  }

  return {
    body: {
      posts
    }
  }
}