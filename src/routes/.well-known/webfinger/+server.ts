import { error, json } from '@sveltejs/kit';

const MASTODON_ALIAS = 'doce@doceazedo.com';
const MASTODON_USERNAME = 'doceazedo';
const MASTODON_DOMAIN = 'svelte.gay';

export const GET = async ({ url }) => {
  //const resource = url.searchParams.get('resource');
  //if (resource != `acct:${MASTODON_ALIAS}`) throw error(404);

  return json(
    {
      subject: `acct:${MASTODON_USERNAME}@${MASTODON_DOMAIN}`,
      aliases: [
        `https://${MASTODON_DOMAIN}/@${MASTODON_USERNAME}`,
        `https://${MASTODON_DOMAIN}/users/${MASTODON_USERNAME}`
      ],
      links: [
        {
          rel: `http://webfinger.net/rel/profile-page`,
          type: `text/html`,
          href: `https://${MASTODON_DOMAIN}/@${MASTODON_USERNAME}`
        },
        {
          rel: `self`,
          type: `application/activity+json`,
          href: `https://${MASTODON_DOMAIN}/users/${MASTODON_USERNAME}`
        },
        {
          rel: `http://ostatus.org/schema/1.0/subscribe`,
          template: `https://${MASTODON_DOMAIN}/authorize_interaction?uri={uri}`
        }
      ]
    },
    {
      headers: {
        'Content-Type': 'application/jrd+json'
      }
    }
  );
};
