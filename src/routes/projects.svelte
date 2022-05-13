<script lang="ts">
  import { LANG } from '$lib/stores';
  import { PageTitle } from '$lib/components';
  import { ProjectsXL, ProjectsSM } from '$lib/modules/projects';
</script>

<PageTitle title={$LANG.navbar.projects}>
  <div class="content">
    {$LANG.projects.subtitle}
    <a href="https://github.com/doceazedo" target="_blank">
      {$LANG.projects.subtitleGitHub}
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
