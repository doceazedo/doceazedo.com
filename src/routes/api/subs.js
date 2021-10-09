import dotenv from 'dotenv';
dotenv.config();

export async function get() {
  const res = await fetch(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=98776633`, {
    headers: {
      'Authorization': `Bearer ${process.env['TWITCH_OAUTH_TOKEN']}`,
      'Client-Id': process.env['TWITCH_CLIENT_ID']
    }
  });
  const twitch = await res.json();

  return {
    body: {
      count: twitch.data.length,
      message: `${twitch.data.length} subscribers`
    }
  }
}
