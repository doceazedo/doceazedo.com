<script lang="ts">
  import { ProjectsXL } from '$lib/components/projects';
  import type { Project } from '$lib/components/projects';

  const items: Project[] = [
    {
      id: 'semaninha',
      title: 'Semaninha',
      url: 'https://semaninha.com',
      source: 'https://github.com/doceazedo/semaninha'
    },
    {
      id: 'svelte-flow',
      title: 'Svelte Flow',
      writeup: '/blog/photopea-vs-photoshop',
      source: 'https://github.com/doceazedo/semaninha',
      demo: '#'
    },
    {
      id: 'overlay',
      title: 'Overlay & SucoBOT',
      url: 'https://twitch.tv/doceazedo911',
      source: 'https://github.com/doceazedo/overlay'
    }
  ];
</script>

<ProjectsXL {items} />
