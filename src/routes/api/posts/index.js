import fs from 'fs';
import showdown from 'showdown';
import matter from 'gray-matter';
import moment from 'moment';
moment.locale('pt-br');

export async function get() {
  const converter = new showdown.Converter();
  const posts = [];

  const dir = await fs.promises.opendir('src/posts');
  for await (const dirent of dir) {
    let md = fs.readFileSync(`src/posts/${dirent.name}`);
    md = matter(md);
    md.content = converter.makeHtml(md.content);
    md.data.readableDatetime = moment(md.data.datetime).calendar();
    md.data.slug = dirent.name.slice(0, -3);
    posts.push({ ...md.data, content: md.content });
  }

  return {
    body: {
      posts
    }
  }
}