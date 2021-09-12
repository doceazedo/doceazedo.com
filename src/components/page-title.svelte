<script>
  export let title, paragraph;
</script>

<h1>{title}</h1>
<p>{paragraph}</p>

<style type="text/sass">
  @import '../assets/sass/vars.sass'

  h1
    font-size: 2.25rem
    font-weight: 700
    margin-top: 4rem
    margin-bottom: 1rem

  p
    font-size: 1.25rem
    line-height: 1.25
    color: $whiteish
    margin-bottom: 4rem
</style>