import fs from 'fs';
import showdown from 'showdown';
import matter from 'gray-matter';
import moment from 'moment';
import appRoot from 'app-root-path';
moment.locale('pt-br');

export async function get({ params }) {
  const { slug } = params;
  const dirList = [];
  const dir = await fs.promises.opendir(`${appRoot}/src/posts`);

  for await (const dirent of dir) {
    dirList.push(`${appRoot}/src/posts/${dirent.name}`);
    if (dirent.name != `${slug}.md`) continue;

    const converter = new showdown.Converter();
    let md = fs.readFileSync(`${appRoot}/src/posts/${dirent.name}`);
    md = matter(md);
    md.content = converter.makeHtml(md.content);
    md.data.readableDatetime = moment(md.data.datetime).calendar();

    return {
      body: {
        content: md.content,
        metadata: md.data,
        dirList
      }
    }
  }

  return {
    status: 404,
    body: { dirList }
  }
}