<script lang="ts">
  import { Metadata, PageTitle } from '$lib/components';
  import _ from '$lib/lang';

  const isLastStep = (i: number) => i == $_.streams.prime.steps.length - 1;

  $: steps = $_.streams.prime.steps.map((step, i) => ({
    title: step.title,
    description: step.description
      .replace('%prime_link%', 'https://gaming.amazon.com/intro')
      .replace('%channel_link%', 'https://twitch.tv/doceazedo911')
      .replace('%discord_link%', 'https://discord.gg/vEGRe2kq8B'),
    image: `/img/prime/step-${i}.webp`,
    video: isLastStep(i) ? `/video/prime/step-${i}.mp4` : undefined
  }));
</script>

<Metadata title={$_.streams.prime.title} />
<PageTitle title={$_.streams.prime.title} subtitle={$_.streams.prime.paragraph} />

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
