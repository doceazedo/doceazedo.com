---
title: "Backfeeding comments from Bluesky & Mastodon to steal engagement for my blog"
date: "2025/07/06"
icon: "/img/icons/bluesky-app.webp"
---

I love having my own website! Unfortunately, most people aren't checking my website as often as I'ld like them to, so if I want them to actually see what I post here, I have to repost it where they already are.

This is what we call [POSSE](https://indieweb.org/POSSE): **P**ublish (on your) **O**wn **S**ite, **S**yndicate **E**lsewhere. It's the concept of writing your posts on your own site, then sharing it on social platforms so your friends can read and reply there. That way your site stays the source of truth, but your posts still show up in people's timelines.

Usually, the conversations around your posts happens somewhere else. When you talk about your blog posts with your friends and mutuals, you do it on social media, not back on your site.

That's what [backfeeding](https://indieweb.org/backfeed) is for! We can pull those interactions back into our original post. You publish on your site, syndicate out, people engage on social media, and then you steal it all back.

_(This was inspired by what Adam is doing on his site, [nerdy.dev](https://nerdy.dev/sizzle-rizzle#comments).)_

## Chicken and egg situation

I obviously need to have a blog post first, otherwise there's no (valid) URL to share and no nice thumbnails to grab people's attention.

Once a blog post is published, I post it on Bluesky + Mastodon, then come back and add the IDs my backend needs to fetch comments. Hopefully no one checks the blog meanwhile.

Here's what the top of the Markdown file for this post looks like:

```md title="+page.md"
---
title: "Backfeeding comments from Bluesky & Mastodon to steal engagement for my blog"
date: "2025/07/06"
icon: "/img/icons/bluesky-app.webp"
blueskyPostId: "3lsk23dqwks2c"       // 👈
mastodonPostId: "114797956354613326" // i come back & add these
---

I love having my own website! [...]
```

That's literally it. Later my backend will read this frontmatter, and know which threads to steal all the engagement from.

> 💡 If this site had a database, I'd just have my backend find my Bluesky/Mastodon tweets linking here and save their IDs. Then, it could always fetch comments without me editing the blog post by hand.

## Fetching replies from Bluesky

I won't go too deep on the whole process. It's very usual stuff. You connect to their API and make a request for the content you want.

The most complicated part is probably handling facets. On Bluesky, posts can have images, @mentions, #hashtags, etc. So I have to parse the raw text, replace facets, sanitize HTML (no `<script>alert(1)</script>` for you, sorry :/), and then put everything in a simplified format (as I don't use most of the data Bluesky gives me) like this:

```typescript
type PostActivity = {
	likesCount: number;
	comments: {
		author: PostCommentAuthor;
		content: string;
		likesCount: number;
		url: string;
		postedAt: string;
		embed?: PostCommentEmbed; // images, videos, links, etc.
		source: "bluesky" | "mastodon";
	}[];
};
```

## Fetching replies from Mastodon

Mastodon is even easier. You don't need to authenticate to their API, you just need to call your preferred instance's API endpoint.

Of course, Mastodon posts are structured differently than Bluesky's. That's why I made that `PostActivity` type, so I can have a stripped structured that can fit both. So even tho this type was made based on Bluesky's replies, it's totally generic enough for me to fit Mastodon's into it.

## Moderation

As for spam and bad actors, I'm counting on Bluesky's moderation and instance admins to keep the place somewhat clean... 😅

Adam (the [nerdy.dev](https://nerdy.dev)) does it by only showing replies he likes. I think that's neat, but I'm not nearly that popular (yet) to have the luxury of having comments to pick my favorites from.

If I ever get to a point where randoms show up to troll on my blog posts, I'll probably do the opposite. Show everything by default, but have a special way to hide comments.

I'm thinking maybe if I reply to your comment with "shut up" or whatever on Bluesky or Mastodon, it hides you from my site. Open to suggestions.

## Page views

Oh yeah, we also have page views now.

I fetch [Plausible](/blog/plausible-analytics)'s API to see how many times the blog post page was visited. I think it makes sense to put it alongside counters for likes and comments. All the little vanity numbers right together :)

Also, don't tell anyone, but... as I redesigned my site recently, I also changed the domain and slugs of some of my posts. So i went into Plausible's panel, copied over the existing view counts, and hardcoded them into the counter for those pages.

Otherwise they'd all get reset to zero. Who wants that, right? :p

## Try it out!

Scroll down a bit and look at the comments section. You should see replies from Mastodon and Bluesky, including images, links, hashtags, and all. You can comment on whichever site you like best.

Just be nice, okay? Or I'll "shut up" you.
