import { json } from '@sveltejs/kit';
import SpotifyWebApi from 'spotify-web-api-node';
import 'dotenv/config';
import type { RequestHandler } from '@sveltejs/kit';

const fetchNowPlaying = async () => {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setCredentials({
    refreshToken,
    clientId,
    clientSecret
  });

  // TODO: Cachear access token
  const spotifyTokens = await spotifyApi.refreshAccessToken();
  spotifyApi.setAccessToken(spotifyTokens.body.access_token);

  const currentlyPlaying = await spotifyApi.getMyCurrentPlayingTrack();

  if (currentlyPlaying.body?.item) {
    const item = currentlyPlaying.body.item;
    if (item.type != 'track') return null;

    return {
      title: item.name,
      artist: item.artists?.[0].name,
      cover: item.album.images[1].url
    };
  }
};

const fetchIsLive = async () => {
  const resp = await fetch(`https://unttv.vercel.app/streams/${process.env.TWITCH_CHANNEL}`);
  const data = await resp.json();
  return !!data;
};

export const GET: RequestHandler = async () => {
  const [nowPlaying, isLive] = await Promise.all([fetchNowPlaying(), fetchIsLive()]);

  return json({
    nowPlaying,
    isLive
  });
};
