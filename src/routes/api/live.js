import dotenv from 'dotenv';
dotenv.config();

export async function get() {
  let res, lastfm, deezer, twitch, nowPlaying = false;

  res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=pxlucasf&api_key=${process.env['LASTFM_KEY']}&limit=1&format=json`);
  lastfm = await res.json();
  lastfm = lastfm.recenttracks.track[0];

  let isListening = true;

  if (lastfm.date) {
    let now = new Date();
    now = new Date(now.setHours(now.getHours() + now.getTimezoneOffset() / 60));
    const playedAt = new Date(Date.parse(lastfm.date['#text']));
    const hoursAgo = Math.abs(now - playedAt) / 36e5;
    // Última música tocada há menos de 15 minutos
    isListening = hoursAgo < .25;
  }

  if (isListening) {
    res = await fetch(`https://api.deezer.com/search?q=${lastfm.artist['#text']} ${lastfm.name}`);
    deezer = await res.json();
    deezer = deezer.data[0].album.cover_medium;

    nowPlaying = {
      title: lastfm.name,
      artist: lastfm.artist['#text'],
      cover: deezer
    };
  }

  res = await fetch(`https://api.twitch.tv/helix/streams?user_login=${process.env['TWITCH_CHANNEL']}`, {
    headers: {
      'Authorization': `Bearer ${process.env['TWITCH_OAUTH_TOKEN']}`,
      'Client-Id': process.env['TWITCH_CLIENT_ID']
    }
  });
  twitch = await res.json();
  twitch = twitch.data.length;

  return {
    body: {
      nowPlaying,
      isLive: twitch ? true : false
    }
  }
}