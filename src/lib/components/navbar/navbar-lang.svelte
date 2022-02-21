<script lang="ts">
  type Languages = {
    code: string;
    title: string;
  };

  export let languages: Languages[], activeLanguage: string, changeLanguage: (code: string) => void;
</script>

<div class="navbar-lang">
  {#each languages as lang}
    <button on:click={() => changeLanguage(lang.code)} class:active={activeLanguage == lang.code}>
      {lang.title}
    </button>
  {/each}
</div>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .navbar-lang
    display: flex
    padding: 0 1.5rem
    
    button
      position: relative
      display: flex
      justify-content: center
      align-items: center
      height: 6rem
      padding: 0
      color: $whiteish
      font-size: 1.25rem
      background: none
      border: none
      cursor: pointer
      transition: all .2s ease

      &.active
        color: $primary
        text-shadow: 0 0 .25rem $primary
        cursor: default

      &:not(:last-child)::after
        content: '/'
        margin: 0 .5rem
        color: rgba(#fff, .1)
        text-shadow: none

  @media screen and (max-width: 768px)
    .navbar-lang
      margin-left: auto

      button
        height: 4rem
</style>
