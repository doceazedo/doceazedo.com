<script lang="ts">
  import { TutorialSteps, type Step } from '$lib/components';
  import { LANG } from '$lib/stores';

  const isLastStep = (i: number) => i == $LANG.streams.prime.steps.length - 1;

  $: steps = $LANG.streams.prime.steps.map((step, i) => ({
    title: step.title,
    description: step.description
      .replace('%prime_link%', 'https://gaming.amazon.com/intro')
      .replace('%channel_link%', 'https://twitch.tv/doceazedo911')
      .replace('%discord_link%', 'https://discord.gg/vEGRe2kq8B'),
    image: `/img/prime/step-${i}.webp`,
    video: isLastStep(i) ? `/video/prime/step-${i}.mp4` : undefined
  }));
</script>

<TutorialSteps {steps} />
