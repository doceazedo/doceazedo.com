<script lang="ts">
  import type { Step } from '.';

  export let steps: Step[] = [];
</script>

<ul class="steps">
  {#each steps as step, i}
    <li class="step">
      <div class="step-number">{i + 1}</div>
      <div class="step-details">
        <h2>{step.title}</h2>
        <p class="content">
          {@html step.description}
        </p>
        {#if step.video}
          <div class="video-wrapper">
            <video autoplay muted loop>
              <source src={step.video} type="video/mp4" />
            </video>
          </div>
        {:else}
          <figure>
            <img src={step.image} alt={step.title} />
          </figure>
        {/if}
      </div>
    </li>
  {/each}
</ul>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .steps
    display: flex
    flex-direction: column
    gap: 3rem

    .step
      display: flex
      gap: 1rem

      &-number
        display: flex
        height: fit-content
        padding: .5rem .75rem
        background-color: var(--primary)
        border-radius: .5rem
        font-weight: 700
        box-shadow: 0 0 .5rem .25rem rgba(var(--primary-rgb), .25)
        color: #fff

      &-details
        h2
          font-size: 1.25rem
          font-weight: 700
          margin-bottom: .25rem

        .content
          color: $whiteish
          margin-bottom: 1rem
          font-size: 1rem

        figure,
        .video-wrapper
          display: flex
          position: relative

          &::before
            display: block
            content: ''
            position: absolute
            width: 100%
            height: 100%
            background-color: rgba(var(--primary-rgb), .1)
            filter: blur(2rem)
            z-index: -1
            border-radius: 50%
            transform: scale(1.1)

        video,
        img
          border-radius: 1rem

  :global([data-theme="light"])
    .step-details .content
      color: $blackish
</style>
