<script context="module">
  export async function load({ page, fetch }) {
    const res = await fetch(`/api/posts/${page.params.slug}`);

    if (res.ok) {
      return {
        props: {
          post: await res.json()
        }
      };
    }

    return {
      status: res.status,
      error: new Error(`Couldn't load the requested post`)
    };
  }
</script>

<script>
  export let post = {};
</script>

<svelte:head>
  <title>{post.metadata.title} - Lucas Fernandes</title>
</svelte:head>

<header>
  <div>
    <h1>{post.metadata.title}</h1>
    <h2>{post.metadata.readableDatetime}</h2>
    <ul>
      {#each post.metadata.categories.split(', ') as category}
        <li>{category}</li>
      {/each}
    </ul>
  </div>
  <div>
    <img src="/src/assets/img/{post.metadata.icon}.svg" alt="">
  </div>
</header>

<article class="content">
  {@html post.content}
</article>

<style type="text/sass">
  @import '../../assets/sass/vars.sass'

  header
    display: flex
    justify-content: space-between
    padding: 4rem 0
    margin-bottom: 4rem
    border-bottom: $hr

    >div:last-child
      flex-shrink: 0
      margin-left: 1rem

    h1
      font-size: 2rem
      font-weight: 700

    h2
      font-size: 1.25rem
      color: $whiteish

    ul
      display: flex
      margin-top: 1rem

      li
        padding: .5rem .75rem
        background-color: $primary
        box-shadow: 0 0 .5rem .25rem rgba($primary, .25)

        &:not(:last-child)
          margin-right: .5rem

    img
      height: 6rem
</style>