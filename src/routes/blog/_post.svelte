<script>
  import '../../assets/css/prism-material-dark.css';
  import { SinglePost } from '$lib/modules';

  export let title,
    slug,
    date,
    tags = [],
    icon;
</script>

<SinglePost {title} {slug} {date} {tags} {icon}>
  <slot />
</SinglePost>
