<script>
  import { browser } from '$app/env';
  import { lang } from '../stores';

  export let posts = [];

  const readableDate = (dateString, lang) => {
    if (browser) {
      dayjs.extend(dayjs_plugin_relativeTime);
      return dayjs(dateString).locale(lang == 'pt' ? 'pt-br' : 'en-us').fromNow();
    }
    return '';
  }
</script>

<div>
  {#each posts as post}
    <a sveltekit:prefetch href="/blog/{post.slug}">
      <figure style="background-image:url('/blog-icons/{post.icon}.svg')"></figure>
      <div>
        <h1>{post.title}</h1>
        <h2>{$lang.posted} {readableDate(post.createdAt, $lang.code)}</h2>
      </div>
      <ul>
        {#each post.categories as category}
          <li>{category}</li>
        {/each}
      </ul>
    </a>
  {/each}
</div>

<style type="text/sass">
  @import '../assets/sass/vars.sass'
  
  div
    display: flex
    flex-direction: column

    a
      position: relative
      display: flex
      background-color: rgba(255, 255, 255, .05)
      padding: 1rem 1.25rem 1rem 1rem
      color: #fff
      text-decoration: none
      border-left: .25rem solid transparent
      transition: all .2s ease

      &::before
        content: ''
        position: absolute
        top: -.25rem
        left: -.5rem
        background-color: rgba($primary, .5)
        height: calc(100% + .5rem)
        width: .75rem
        filter: blur(.25rem)
        opacity: 0
        transition: all .2s ease

      &:hover
        transform: translateX(.5rem)
        border-left-color: $primary

        &::before
          opacity: 1

      &:not(:last-child)
        margin-bottom: 1rem

      figure
        height: 4rem
        width: 4rem
        margin-right: 1rem
        background-position: center
        background-repeat: no-repeat
        background-size: contain

      div
        display: flex
        flex-direction: column
        justify-content: center

        h1
          font-size: 1.25rem
          font-weight: 700
          margin-bottom: .25rem

      ul
        display: flex
        align-items: center
        margin-left: auto

        li
          padding: .25rem .75rem
          background-color: $primary

          &:not(:last-child)
            margin-right: .5rem

  @media screen and (max-width: 768px)
    a
      flex-direction: column
      text-align: center

      &:hover
        transform: translateY(-.5rem) !important

      figure
        height: 3rem
        width: 3rem
        margin: 0 auto 1rem !important

      ul
        margin: 1rem auto 0
</style>