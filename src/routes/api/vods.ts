import dotenv from 'dotenv';
dotenv.config();

export async function get() {
  const twitch = await (
    await fetch(`https://api.twitch.tv/helix/videos?user_id=${process.env.TWITCH_CHANNEL_ID}`, {
      headers: {
        Authorization: `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID
      }
    })
  ).json();
  const vods =
    twitch?.data
      ?.filter((vod) => !!vod.thumbnail_url)
      ?.map((vod) => ({
        ...vod,
        thumbnail_url: vod.thumbnail_url.replace('%{width}', 640).replace('%{height}', 360)
      }))
      ?.slice(0, 4) || [];

  return {
    body: vods
  };
}
