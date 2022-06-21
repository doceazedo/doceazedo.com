<script lang="ts">
  import { ProjectsSM } from '$lib/components/projects';
  import type { Project } from '$lib/components/projects';

  const items: Project[] = [
    {
      id: 'emotettv',
      title: 'emoteTTV',
      imageFormat: 'gif',
      source: 'https://github.com/doceazedo/emotettv',
      demo: 'https://svelte.dev/repl/9b8bd1e644814acb85c1a3ecf439eab5?version=3.46.4'
    },
    {
      id: 'powerchat',
      title: 'Powerchat',
      imageFormat: 'webp',
      demo: 'https://cdn.discordapp.com/attachments/850745152623607818/969075300963078164/unknown.png'
    },
    {
      id: 'quarto-101',
      title: 'Quarto 101',
      imageFormat: 'svg',
      source: 'https://github.com/doceazedo/taylz-mobile'
    },
    {
      id: 'autoparkour',
      title: 'AutoParkour',
      imageFormat: 'gif',
      source: 'https://github.com/doceazedo/autoparkour'
    },
    {
      id: 'bitterctf',
      title: 'BitterCTF',
      imageFormat: 'gif',
      source: 'https://github.com/doceazedo/bitterctf'
    }
  ];
</script>

<ProjectsSM {items} />
