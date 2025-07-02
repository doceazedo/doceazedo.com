---
title: "Old school: Using WordPress as a headless CMS"
date: "2022/01/11"
icon: "/img/icons/wordpress.svg"
---

Before we dive in, let me warn you that this is one of those messy posts where we're gonna chat more than follow a strict tutorial. So if you want to skip all the rambling, [click here](#turning-wordpress-into-a-headless-cms).

Last month I went to write a new post for my blog, which at that moment was being powered by Contentful. Since it was still only the third post on the blog, I tried to do something pretty basic for the first time: add an image. I couldn't do it.

The truth is that Contentful's text editor is absolutely garbage and super limited. Writing code blocks (something kind of essential for a programming blog) is a horrible experience. And sneaking between small annoyances, all the work it would take to upload an image and make the site recognize it was the final straw that made me decide I was going to change my CMS. But which one?

## Idea 1: Markdown files

When this site was still in the idea phase, the original concept for this blog was simply to save some Markdown files and let SvelteKit generate pages from them. Seems like the perfect solution for me. I love Markdown, I could put all posts in a [submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) and I wouldn't be limited to a specific editor. But apparently Vercel isn't a big fan of this idea.

After trying really hard to make Vercel allow me to use `fs` to read files at build time, I understood that it just doesn't work that way. Now, if you know any way to make this happen, please let me know in the comments and I'll make the third version of this blog immediately. After all, have you ever seen a programming blog with actual content? Of course not! Devs just remake their own blog several times and document the process (see this post).

## Idea 2: A (different) headless CMS

There are many headless CMS options, and I really wasn't in the mood to test them one by one just to find out it wouldn't please me and redo everything with the next one. Or worse, only discover it doesn't work for me when I go to write the next post months later!

> 💭 Reviewing the text, I realized this paragraph implies I'll only write the next post in a few months, which indicates my lack of consideration for my own blog and my awareness of it.

I even considered testing Strapi, since I always hear a lot about it, but to host it for free I would have to put it on something like Heroku and I didn't want to see my blog sleeping. 😪💤

## Idea 3: Back to WordPress

I've used WordPress for many years. I know and love this bastard better than I'd like to, and despite the countless disadvantages it brings as a complete CMS, it provides an API out of the box that would allow me to use it as a ✨ _headless CMS_ ✨ very easily.

<p align="center">
  <img src="/img/blog/wordpress-headless-cms/embrace-wp.webp">
</p>

But what about hosting? Well, even without having any active projects on Hostinger, I've been renting shared hosting with them for many years that always saves me when I need to upload a file via FTP or run a PHP script. And that's also where all my emails are, and imagine having to migrate all of them 🥶 I won't stop paying for my plan there anytime soon.

So it's decided! I opened Hostinger's cute panel, used the auto installer and literally in a minute I already had a WordPress site running.

## Turning WordPress into a headless CMS

The reality is that since WordPress already provides the API right out of the installation, without needing to configure anything, it would already be possible to consume it immediately, but I wanted to make some small customizations to better adapt to my needs.

First, I opened the "index.php" file in the site root and disabled the `WP_USE_THEMES` option, making WordPress not even worry about loading the site's frontend, since we're only going to use the API:

```php
define('WP_USE_THEMES', false);
```

I took advantage of the open file and at the end of it I already added a redirect to my site's frontend, in case someone tries to access the WordPress address for whatever reason:

```php
header('location: https://doceazedo.com');
```

## (Advanced) custom fields

In a proper headless CMS, we can create our own content types and what fields they carry. In WordPress, everything is considered a post (posts, pages, comments) and there are several plugins that help us create different types of posts and extend existing ones. Since we're making a blog, we're just going to add a few extra things to the post. And this is when I reunite with an old love: [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields) 💖

<p align="center">
  <img src="/img/blog/wordpress-headless-cms/its-all-posts.webp">
</p>

ACF allows you to create custom fields for our posts. In my case, I needed to create a field to upload an icon (which I place next to the title) and another that serves as a hashtag list. I could even use the categories that WordPress itself provides, but it's not exactly the way I wanted, and that's the beauty of this whole thing, it's very easy to do whatever I want with WordPress plus ACF! 😍

Here for my blog, the free version of ACF already serves me super well, but I've used the PRO version on other projects to make lists, tables, galleries and other more advanced things and I'll always be the first to recommend buying this plugin.

Then I also needed to install [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/), which exposes these custom fields in the existing API without any additional configuration.

## Other useful plugins

A plugin that for me is essential is the [Classic Editor](https://wordpress.org/plugins/classic-editor/). Just compare the ratings of the Classic Editor plugin with those of the current Gutenberg editor (🤮) to understand why.

Another plugin I ended up needing was [Enable SVG, WebP, and ICO Upload](https://wordpress.org/plugins/enable-svg-webp-ico-upload/), since by default WordPress doesn't accept uploading SVGs as images and that's the format I use for icons. This plugin solves that problem.

Hiding the WordPress version and other internal details prevents malicious people from abusing possible vulnerabilities. The [Hide My WP Ghost](https://wordpress.org/plugins/hide-my-wp) plugin can help with this and, as a bonus, change the horrible route that is "/wp-admin" to something you prefer like "/panel".

A captcha plugin like [WP Captcha](https://wordpress.org/plugins/wp-captcha) can also be useful if you want to add a layer of protection to the panel.

Speaking of the panel, a plugin I really like is [Custom Login Page Customizer by Colorlib](https://wordpress.org/plugins/colorlib-login-customizer), which allows you to easily customize the appearance of the login page. This one is totally cosmetic.

## Now just integrate and be happy!

With the panel configured and the API ready for use, you just write your posts and integrate with your frontend according to the [super neat WordPress documentation](https://developer.wordpress.org/rest-api/reference/posts). I think this is a good opportunity for me to take advantage and demonstrate how to do this with React and Svelte.

The logic will be the same: fetch posts from the API and show them all using the [details tag](https://w3schools.com/tags/tag_details.asp). WordPress returns the post content already formatted in HTML, so it will be necessary to insert it without sanitizing, and since in this case I'm the one writing the posts, in theory I can trust myself and this content.

With React, we're going to use `useState` to store our posts and `useEffect` to pull data from the API. Then we use `map` to loop through the posts. To show the HTML, I had to add a `<div>` and pass the content through the `dangerouslySetInnerHTML` property:

```jsx title="App.jsx"
import { useEffect, useState } from "react";

const Blog = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const resp = await fetch("https://example.com/wp-json/wp/v2/posts");
			const data = await resp.json();
			setPosts(data);
		};

		fetchData();
	}, [setPosts]);

	return (
		<>
			<h1>My blog</h1>
			{posts.map((post) => (
				<details>
					<summary>{post.title.rendered}</summary>
					<div
						dangerouslySetInnerHTML={{ __html: post.content.rendered }}
					></div>
				</details>
			))}
		</>
	);
};

export default Blog;
```

Now with Svelte, it's a matter of creating a variable for posts and pulling the data when the component is created, inside `onMount`. Then we use `{#each}` to loop and pass the content with the `@html` prefix (no need for the `<div>`):

```svelte title="Blog.svelte"
<script>
	import { onMount } from "svelte";

	let posts = [];

	onMount(async () => {
		const resp = await fetch("https://example.com/wp-json/wp/v2/posts");
		posts = await resp.json();
	});
</script>

<h1>My blog</h1>

{#each posts as post}
	<details>
		<summary>{post.title.rendered}</summary>
		{@html post.content.rendered}
	</details>
{/each}
```

Remember that if you want to pull a specific post, you can pass the `slug` parameter in this same endpoint, for example:

```js
await (
	await fetch(`https://example.com/wp-json/wp/v2/posts?slug=${slug}`)
).json();
```

Finally, if you want a more practical example, you can take a look at how I did this on this site, using SvelteKit and rendering everything at build time.

> 💡 Welp. Too late. I don't use WordPress for this blog anymore. But it's still very useful tho.
