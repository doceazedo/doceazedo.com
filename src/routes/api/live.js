import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
dotenv.config();

export async function get() {
  const refreshToken = process.env['SPOTIFY_REFRESH_TOKEN'];
  const clientId = process.env['SPOTIFY_CLIENT_ID'];
  const clientSecret = process.env['SPOTIFY_CLIENT_SECRET'];

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setCredentials({
    refreshToken,
    clientId,
    clientSecret,
  });

  // TODO: Cachear access token
  const spotifyTokens = await spotifyApi.refreshAccessToken();
  spotifyApi.setAccessToken(spotifyTokens.body.access_token);

  const currentlyPlaying = await spotifyApi.getMyCurrentPlayingTrack();

  const twitch = await(await fetch(`https://api.twitch.tv/helix/streams?user_login=${process.env['TWITCH_CHANNEL']}`, {
    headers: {
      'Authorization': `Bearer ${process.env['TWITCH_OAUTH_TOKEN']}`,
      'Client-Id': process.env['TWITCH_CLIENT_ID']
    }
  })).json();

  
  let nowPlaying = null;
  if (currentlyPlaying.body?.item) {
    const item = currentlyPlaying.body.item;
    
    nowPlaying = {
      title: item.name,
      artist: item.artists[0].name,
      cover: item.album.images[1].url,
    };
  }

  return {
    body: {
      nowPlaying,
      isLive: twitch.data?.length ? true : false,
    }
  }
}