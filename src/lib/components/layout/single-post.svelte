<script>
  import '../../../assets/css/prism-material-dark.css';
  import { SinglePost } from '$lib/modules';

  export let title,
    description,
    date,
    tags = [],
    icon;
</script>

<SinglePost {title} {description} {date} {tags} {icon}>
  <slot />
</SinglePost>
