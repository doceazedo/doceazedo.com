---
title: "Track your site traffic with privacy using Plausible"
date: "2023-04-03"
icon: "/img/detective-emoji.svg"
---

I always wanted to know how many people visit my site, where they come from, which pages they care about and how they navigate it. The problem was that tools like Google Analytics felt way too invasive for me.

A little over a month ago I found [Plausible](https://plausible.io/). It is an **open source** analytics platform, **paid**, but fully focused on privacy. It is lightweight, fast, and super easy to use. This is not sponsored. No affiliate links here. Just a legit recommendation and a walkthrough.

## Getting started

The setup is chill. Go to the site and click **Start free trial**. You do not need a credit card and the trial lasts 30 days with full access to the platform.

![](/img/plausible-register-button.webp)

The sign up form is clean and simple. You will fill in your name, email and a password. After that you will get a confirmation code by email to activate your account.

![](/img/plausible-register-form.webp)

Next you will enter your site’s domain. In my case that was **doceazedo.com**. You also choose your timezone so your traffic reports are shown using the correct time reference.

![](/img/plausible-register-domain.webp)

## Adding the script to your site

Once you finish setting up your account and site, Plausible gives you a script tag to include in your website. This script goes into your `<head>` tag.

![](/img/plausible-snippet.webp)

How you add this script depends on how your site is built. My site uses [SvelteKit](https://kit.svelte.dev) so I just added the script inside `src/app.html`, right above `%sveltekit.head%`.

```html title="src/app.html"
<head>
	<!-- ... -->
	<script
		defer
		data-domain="doceazedo.com"
		src="https://plausible.io/js/script.js"
	></script>
	%sveltekit.head%
</head>
```

If you are using WordPress or another CMS, you can install the [Plausible Analytics plugin](https://wordpress.org/plugins/plausible-analytics/) instead. It handles the integration for you.

If you are not sure how to integrate it with your stack, check out the [official integration guides](https://plausible.io/docs/integration-guides). They cover how to use it with different platforms, apps and environments.

Once the script is on your site, you can hit the **Start collecting data** button to start tracking visits. 🥳

## Testing the setup

You should now see a dashboard like this:

![](/img/plausible-dashboard.webp)

If your dashboard is blank, it may be because no one has accessed your site yet. Try visiting it yourself to trigger the first hit.

If you still see nothing, open your browser DevTools (press `F12`) and check if the script is actually present inside the `<head>`.

<p align="center">
  <img src="/img/plausible-script.webp">
</p>

If it is missing, go back and verify the installation steps. It could also be a caching issue. Try forcing a refresh with `Ctrl + F5` on Windows or Linux, or `Cmd + Shift + R` on Mac.

Still no data? You might have an ad blocker enabled. Ad blockers usually block trackers by default, even privacy-respecting ones like Plausible. Try disabling your ad blocker or whitelist your own site.

## Improving your data

Now that your site is being tracked, you can dig deeper into traffic sources and user interactions. Here are a few technical ways to level up your analytics.

Use query strings like `?ref=newsletter` at the end of your URLs to track referral traffic. This helps you know how many people came from specific sources. The dashboard will group those under **referrers**.

To track events like button clicks or link interactions, use the attribute `plausible-event-name="YourEvent"`. For that to work, you need to add a different script tag. It is almost the same, but it ends in `script.tagged-events.js`.

```html
<script
	defer
	data-domain="doceazedo.com"
	src="https://plausible.io/js/script.js"
></script>
<script
	defer
	data-domain="doceazedo.com"
	src="https://plausible.io/js/script.tagged-events.js"
></script>
```

You can also enable weekly or monthly email reports. Plausible will email you analytics summaries. You can even set it up to notify you when traffic spikes.

<p>
  <video autoplay loop controls>
    <source src="/video/plausible-email-reports.mp4" type="video/mp4">
  </video>
</p>

## One last thing

As you may have noticed, ad blockers can still block Plausible scripts. That means you might lose some traffic data even with this privacy-first tool.

If you want to prevent this, you can proxy the script through your own domain to make it unblockable. I will write a full tutorial for that setup **soon™**, and it will be linked here when it is ready.

Also, since Plausible is [open source](https://github.com/plausible/analytics), you can host your own self-managed instance if you want full control or want to avoid paying for the hosted plan. The [self-hosting guide](https://plausible.io/docs/self-hosting) explains the full process.

That is it. You now have a privacy friendly way to track your site’s traffic. Let me know if you build something cool with it!
