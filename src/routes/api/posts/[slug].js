import fs from 'fs';
import showdown from 'showdown';
import matter from 'gray-matter';
import moment from 'moment';
moment.locale('pt-br');

export function get({ params }) {
  try {
    const { slug } = params;
  
    const converter = new showdown.Converter();

    let md = fs.readFileSync(`src/posts/${slug}.md`);
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