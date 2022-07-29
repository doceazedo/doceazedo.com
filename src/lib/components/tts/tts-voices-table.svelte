<script lang="ts">
  import { LANG } from '$lib/stores';

  type Voice = {
    id: string;
    gender: 'f' | 'm'; // lol
  };

  type VoiceLanguage = {
    lang: string;
    voices: Voice[];
    primary?: boolean;
  };

  const polly: VoiceLanguage[] = [
    {
      lang: 'Alemão',
      voices: [
        { id: 'marlene', gender: 'f' },
        { id: 'vicki', gender: 'f' },
        { id: 'hans', gender: 'm' }
      ]
    },
    {
      lang: 'Árabe',
      voices: [{ id: 'zeina', gender: 'f' }]
    },
    {
      lang: 'Chinês',
      voices: [{ id: 'zhiyu', gender: 'f' }]
    },
    {
      lang: 'Coreano',
      voices: [{ id: 'seoyeon', gender: 'f' }]
    },
    {
      lang: 'Dinamarquês',
      voices: [
        { id: 'naja', gender: 'f' },
        { id: 'mads', gender: 'm' }
      ]
    },
    {
      lang: 'Holandês',
      voices: [
        { id: 'lotte', gender: 'f' },
        { id: 'ruben', gender: 'm' }
      ]
    },
    {
      lang: 'Inglês (australiano)',
      voices: [
        { id: 'nicole', gender: 'f' },
        { id: 'olivia', gender: 'f' },
        { id: 'russell', gender: 'm' }
      ]
    },
    {
      lang: 'Inglês (britânico)',
      voices: [
        { id: 'amy', gender: 'f' },
        { id: 'emma', gender: 'f' },
        { id: 'brian', gender: 'm' }
      ]
    },
    {
      lang: 'Inglês (indiano)',
      voices: [
        { id: 'aditi', gender: 'f' },
        { id: 'raveena', gender: 'f' }
      ]
    },
    {
      lang: 'Inglês (neozelandês)',
      voices: [{ id: 'aria', gender: 'f' }]
    },
    {
      lang: 'Inglês (sul-africano)',
      voices: [{ id: 'ayanda', gender: 'f' }]
    },
    {
      lang: 'Inglês (americano)',
      voices: [
        { id: 'ivy', gender: 'f' },
        { id: 'joanna', gender: 'f' },
        { id: 'kendra', gender: 'f' },
        { id: 'kimberly', gender: 'f' },
        { id: 'salli', gender: 'f' },
        { id: 'joey', gender: 'm' },
        { id: 'justin', gender: 'm' },
        { id: 'kevin', gender: 'm' },
        { id: 'matthew', gender: 'm' }
      ]
    },
    {
      lang: 'Inglês (galês)',
      voices: [{ id: 'geraint', gender: 'm' }]
    },
    {
      lang: 'Francês',
      voices: [
        { id: 'celine', gender: 'f' },
        { id: 'lea', gender: 'f' },
        { id: 'mathieu', gender: 'm' }
      ]
    },
    {
      lang: 'Francês (canadense)',
      voices: [
        { id: 'chantal', gender: 'f' },
        { id: 'gabrielle', gender: 'f' }
      ]
    },
    {
      lang: 'Galês',
      voices: [{ id: 'gwyneth', gender: 'f' }]
    },
    {
      lang: 'Hindi',
      voices: [{ id: 'aditi', gender: 'f' }]
    },
    {
      lang: 'Islandês',
      voices: [
        { id: 'dora', gender: 'f' },
        { id: 'karl', gender: 'm' }
      ]
    },
    {
      lang: 'Italiano',
      voices: [
        { id: 'carla', gender: 'f' },
        { id: 'bianca', gender: 'f' },
        { id: 'giorgio', gender: 'm' }
      ]
    },
    {
      lang: 'Japonês',
      voices: [
        { id: 'mizuki', gender: 'f' },
        { id: 'takumi', gender: 'm' }
      ]
    },
    {
      lang: 'Norueguês',
      voices: [{ id: 'liv', gender: 'f' }]
    },
    {
      lang: 'Polonês',
      voices: [
        { id: 'ewa', gender: 'f' },
        { id: 'maja', gender: 'f' },
        { id: 'jacek', gender: 'm' },
        { id: 'jan', gender: 'm' }
      ]
    },
    {
      lang: 'Português (brasileiro)',
      primary: true,
      voices: [
        { id: 'camila', gender: 'f' },
        { id: 'vitoria', gender: 'f' },
        { id: 'ricardo', gender: 'm' }
      ]
    },
    {
      lang: 'Português (europeu)',
      voices: [
        { id: 'ines', gender: 'f' },
        { id: 'cristiano', gender: 'm' }
      ]
    },
    {
      lang: 'Romeno',
      voices: [{ id: 'carmen', gender: 'f' }]
    },
    {
      lang: 'Russo',
      voices: [
        { id: 'tatyana', gender: 'f' },
        { id: 'maxim', gender: 'm' }
      ]
    },
    {
      lang: 'Espanhol (europeu)',
      voices: [
        { id: 'conchita', gender: 'f' },
        { id: 'lucia', gender: 'f' },
        { id: 'enrique', gender: 'm' }
      ]
    },
    {
      lang: 'Espanhol (mexicano)',
      voices: [{ id: 'mia', gender: 'f' }]
    },
    {
      lang: 'Espanhol (americano)',
      voices: [
        { id: 'lupe', gender: 'f' },
        { id: 'penelope', gender: 'f' },
        { id: 'miguel', gender: 'm' }
      ]
    },
    {
      lang: 'Sueco',
      voices: [{ id: 'astrid', gender: 'f' }]
    },
    {
      lang: 'Turco',
      voices: [{ id: 'filiz', gender: 'f' }]
    }
  ];
</script>

<table class="table">
  <thead>
    <tr>
      <th>{$LANG.streams.tts.table.code}</th>
      <th>{$LANG.streams.tts.table.lang}</th>
      <th>{$LANG.streams.tts.table.type}</th>
    </tr>
  </thead>
  <tbody>
    {#each polly as lang}
      <tr class:primary={lang.primary}>
        <td>{lang.lang}</td>
        <td>
          {#each lang.voices as voice}
            {voice.id}<br />
          {/each}
        </td>
        <td>
          {#each lang.voices as voice}
            {$LANG.streams.tts.table.voiceTypes[voice.gender]}<br />
          {/each}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="sass">
  table
    width: 100%
    border-radius: 1rem
    border-collapse: collapse
    overflow: hidden
    box-shadow: inset 0 0 0 1px #201c2a
    margin-top: 2rem

    thead th,
    tr.primary
      background-color: #201c2a

    th,
    td
      padding: .5em
      border: 1px solid #201c2a
      vertical-align: top
      line-height: 1.5

    td:first-child,
    td:nth-child(2)
      width: 16rem
</style>
