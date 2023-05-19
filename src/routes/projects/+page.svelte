<script lang="ts">
  import _ from '$lib/lang';
  import { Metadata, PageTitle } from '$lib/components';
  import ProjectsSM from '$lib/components/projects/ProjectsSM.svelte';
  import ProjectsXL from '$lib/components/projects/ProjectsXL.svelte';
</script>

<Metadata title={$_.navbar.projects} />

<PageTitle title={$_.navbar.projects}>
  <div class="content">
    {$_.projects.subtitle}
    <a href="https://github.com/doceazedo" target="_blank">
      {$_.projects.subtitleGitHub}
    </a>.
  </div>
</PageTitle>

<div class="projects-container">
  <ProjectsXL />
  <ProjectsSM />
</div>

<style lang="sass">
  .projects-container
    display: flex
    flex-direction: column
    gap: 4rem
</style>
