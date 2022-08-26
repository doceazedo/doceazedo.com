import { json } from '@sveltejs/kit';
import 'dotenv/config';
import type { RequestHandler } from '@sveltejs/kit';

type VOD = {
  id: string;
  stream_id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  title: string;
  description: string;
  created_at: Date;
  published_at: Date;
  url: string;
  thumbnail_url: string;
  viewable: string;
  view_count: number;
  language: string;
  type: string;
  duration: string;
  muted_segments: null;
};

export const GET: RequestHandler = async () => {
  const twitch = await (
    await fetch(`https://api.twitch.tv/helix/videos?user_id=${process.env.TWITCH_CHANNEL_ID}`, {
      headers: {
        Authorization: `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`,
        'Client-Id': `${process.env.TWITCH_CLIENT_ID}`
      }
    })
  ).json();

  const vods =
    twitch?.data
      ?.filter((vod: VOD) => !!vod.thumbnail_url)
      ?.map((vod: VOD) => ({
        ...vod,
        thumbnail_url: vod.thumbnail_url.replace('%{width}', '640').replace('%{height}', '360')
      }))
      ?.slice(0, 4) || [];

  return json(vods);
};
