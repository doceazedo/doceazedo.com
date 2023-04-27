<script lang="ts">
  import { ProjectsXL } from '$lib/components/projects';
  import type { Project } from '$lib/components/projects';

  const items: Project[] = [
    {
      id: 'fazendoca',
      title: 'Fazendoca',
      source: 'https://github.com/doceazedo/fazendoca-ue5'
    },
    {
      id: 'overlay',
      title: 'Overlay & SucoBOT',
      url: 'https://twitch.tv/doceazedo911',
      source: 'https://github.com/doceazedo/overlay'
    },
    {
      id: 'ssn',
      title: 'SSN.gg',
      url: 'http://ssn.gg',
      source: 'https://github.com/doceazedo/ssn'
    }
  ];
</script>

<ProjectsXL {items} />
