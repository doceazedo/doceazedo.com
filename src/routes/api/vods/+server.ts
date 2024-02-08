import { json } from '@sveltejs/kit';
import 'dotenv/config';
import type { RequestHandler } from '@sveltejs/kit';

type VOD = {
  id: string;
  userId: string;
  userName: string;
  userDisplayName: string;
  title: string;
  description: string;
  creationDate: string;
  publishDate: string;
  url: string;
  thumbnailUrl: string;
  isPublic: boolean;
  views: number;
  language: string;
  type: string;
  duration: string;
  durationInSeconds: number;
  streamId: string;
  mutedSegmentData: unknown[];
};

export const GET: RequestHandler = async () => {
  const resp = await fetch(
    `https://unttv.vercel.app/videos/channel/${process.env.TWITCH_CHANNEL_ID}`
  );
  const data = await resp.json();

  const vods =
    data
      .filter((vod: VOD) => !!vod.thumbnailUrl)
      .map((vod: VOD) => ({
        ...vod,
        thumbnailUrl: vod.thumbnailUrl.replace('%{width}', '640').replace('%{height}', '360')
      }))
      .slice(0, 4) || [];

  return json(vods);
};
