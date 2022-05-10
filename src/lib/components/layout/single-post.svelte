<script>
  import '../../../assets/css/prism-material-dark.css';
  import { SinglePost } from '$lib/modules';

  export let title,
    date,
    tags = [],
    icon;
</script>

<SinglePost {title} {date} {tags} {icon}>
  <slot />
</SinglePost>
