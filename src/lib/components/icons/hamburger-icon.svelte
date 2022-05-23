<script lang="ts">
  export let isCross = false;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class:cross={isCross}
>
  <line class="top" x1="3" y1="6" x2="21" y2="6" />
  <line class="mid" x1="3" y1="12" x2="21" y2="12" />
  <line class="bot" x1="3" y1="18" x2="21" y2="18" />
</svg>

<style lang="sass">
  line
    transform-origin: center
    transition: all .2s ease

  .cross
    .top
      transform: rotate(45deg) translateY(6px)

    .mid
      transform: scaleX(0)

    .bot
      transform: rotate(-45deg) translateY(-6px)
</style>
