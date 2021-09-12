---
title: How to use Sass (and SCSS) with SvelteKit
datetime: 2021-08-28 03:21:00
categories: frontend, ux, tools
icon: svelte
---
Sass is great. Svelte is also great and even greater with SvelteKit. What about using both? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda odio, quibusdam neque atque inventore quas ex exercitationem eius voluptates doloremque minima. Atque vitae ut assumenda laborum asperiores quos sint sit.

First of all, open your SvelteKit project and install `sass` itself and `svelte-preprocess` as development dependencies:

```
npm i -D sass svelte-preprocess
```

After that, open the `svelte.config.js` file and import `svelte-preprocess` to it, like this:

```
import sveltePreprocess from 'svelte-preprocess';

const config = {
  preprocess: sveltePreprocess(),
  // ...
};

export default config;
```

Congratulations! You now successfully installed Sass in your SvelteKit project. You can now use it inside the `<style type="text/sass">` tag, like this:

```
<style type="text/sass">
  @import 'vars.sass'

  div
    color: $primary
    border-radius: .5rem
</style>
```

If you prefer to use SCSS intead of Sass, you may change the `sass` to `scss` in the `<style>` tag and that's it:

```
<style type="text/scss">
  @import 'vars.scss';

  div {
    color: $primary;
    border-radius: .5rem;
  }
</style>
```