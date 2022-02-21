<script lang="ts">
  import { lang } from '$lib/stores';
  import {
    Skills,
    CapacitorIcon,
    KotlinIcon,
    MongoDbIcon,
    MySqlIcon,
    NextjsIcon,
    NodejsIcon,
    ReactIcon,
    SassIcon,
    SvelteIcon,
    TypescriptIcon,
    UnityIcon
  } from '$lib/components';

  const skills = [
    [
      {
        icon: TypescriptIcon,
        name: 'TypeScript'
      },
      {
        icon: SvelteIcon,
        name: 'Svelte & SvelteKit'
      },
      {
        icon: ReactIcon,
        name: 'React'
      },
      {
        icon: NextjsIcon,
        name: 'Next.js'
      },
      {
        icon: SassIcon,
        name: 'Sass'
      },
      {
        icon: NodejsIcon,
        name: 'Node.js'
      }
    ],
    [
      {
        icon: KotlinIcon,
        name: 'Kotlin <small>(Spigot API)</small>'
      },
      {
        icon: UnityIcon,
        name: 'Unity <small>(C#)</small>'
      },
      {
        icon: MySqlIcon,
        name: '<small>(My/Postgre)</small>SQL<small>(ite)</small>'
      },
      {
        icon: MongoDbIcon,
        name: 'MongoDB'
      },
      {
        icon: CapacitorIcon,
        name: 'Capacitor'
      }
    ]
  ];
</script>

<Skills {skills} title={$lang.skills.title} paragraph={$lang.skills.paragraph} />
