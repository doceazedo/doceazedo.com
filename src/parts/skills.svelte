<script>
  import { lang } from '../stores';
  import SectionTitle from '../components/section-title.svelte';
  import TypescriptIcon from '../assets/img/typescript.svg';
  import SvelteIcon from '../assets/img/svelte.svg';
  import ReactIcon from '../assets/img/react.svg';
  import NextjsIcon from '../assets/img/nextjs.svg';
  import SassIcon from '../assets/img/sass.svg';
  import NodejsIcon from '../assets/img/nodejs.svg';
  import KotlinIcon from '../assets/img/kotlin.svg';
  import UnityIcon from '../assets/img/unity.svg';
  import MySqlIcon from '../assets/img/mysql.svg';
  import MongoDbIcon from '../assets/img/mongodb.svg';
  import CapacitorIcon from '../assets/img/capacitor.svg';
</script>

<section>
  <SectionTitle
    title={$lang.skills.title}
    paragraph={$lang.skills.paragraph} />

    <ul>
      <li>
        <img src={TypescriptIcon} alt="">
        <p>TypeScript</p>
      </li>
      <li>
        <img src={SvelteIcon} alt="">
        <p>Svelte & SvelteKit</p>
      </li>
      <li>
        <img src={ReactIcon} alt="">
        <p>React & Next.js</p>
      </li>
      <li>
        <img src={NextjsIcon} alt="">
        <p>Next.js</p>
      </li>
      <li>
        <img src={SassIcon} alt="">
        <p>Sass</p>
      </li>
      <li>
        <img src={NodejsIcon} alt="">
        <p>Node.js</p>
      </li>
    </ul>

    <ul>
      <li>
        <img src={KotlinIcon} alt="">
        <p>Kotlin <small>(Spigot API)</small></p>
      </li>
      <li>
        <img src={UnityIcon} alt="">
        <p>Unity <small>(C#)</small></p>
      </li>
      <li>
        <img src={MySqlIcon} alt="">
        <p><small>(My/Postgre)</small>SQL<small>(ite)</small></p>
      </li>
      <li>
        <img src={MongoDbIcon} alt="">
        <p>MongoDB</p>
      </li>
      <li>
        <img src={CapacitorIcon} alt="">
        <p>Capacitor</p>
      </li>
    </ul>
</section>

<style type="text/sass">
  @import '../assets/sass/vars.sass'

  section
    padding: 4rem 0
    border-bottom: $hr

    ul
      display: flex
      justify-content: center

      li
        display: flex
        flex-direction: column
        align-items: center
        width: 16.666%
        cursor: default

        img,
        p
          transition: all .2s ease

        img
          height: 4rem
          width: 4rem
          user-select: none
          opacity: .5
          pointer-events: none

        p
          opacity: 0

        small
          opacity: .75

        &:hover
          img,
          p
            opacity: 1

          p
            transform: translateY(.75rem)

      + ul
        margin-top: 3rem

  @media screen and (max-width: 768px)
    ul
      + ul
        margin-top: 2rem !important

      img
        height: 2rem !important
        width: 2rem !important

      p
        display: none !important
</style>