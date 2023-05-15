<script lang="ts">
  import { LANG } from '$lib/stores';

  type Voice = {
    id: string;
    vendor: 'polly' | 'tiktok';
  };

  type VoiceLanguage = {
    lang: string;
    voices: Voice[];
    primary?: boolean;
  };

  const voices: VoiceLanguage[] = [
    {
      lang: '🇩🇪 DE',
      voices: [
        { id: 'marlene', vendor: 'polly' },
        { id: 'vicki', vendor: 'polly' },
        { id: 'hans', vendor: 'polly' },
        { id: 'de_001', vendor: 'tiktok' },
        { id: 'de_002', vendor: 'tiktok' }
      ]
    },
    {
      lang: '🇸🇦 AR',
      voices: [{ id: 'zeina', vendor: 'polly' }]
    },
    {
      lang: '🇨🇳 ZH',
      voices: [{ id: 'zhiyu', vendor: 'polly' }]
    },
    {
      lang: '🇰🇷 KO',
      voices: [
        { id: 'seoyeon', vendor: 'polly' },
        { id: 'kr_002', vendor: 'tiktok' },
        { id: 'kr_004', vendor: 'tiktok' },
        { id: 'kr_003', vendor: 'tiktok' }
      ]
    },
    {
      lang: '🇩🇰 DA',
      voices: [
        { id: 'naja', vendor: 'polly' },
        { id: 'mads', vendor: 'polly' }
      ]
    },
    {
      lang: '🇳🇱 NL',
      voices: [
        { id: 'lotte', vendor: 'polly' },
        { id: 'ruben', vendor: 'polly' }
      ]
    },
    {
      lang: '🇦🇺 EN-AU',
      voices: [
        { id: 'nicole', vendor: 'polly' },
        { id: 'olivia', vendor: 'polly' },
        { id: 'russell', vendor: 'polly' },
        { id: 'en_au_001', vendor: 'tiktok' },
        { id: 'en_au_002', vendor: 'tiktok' }
      ]
    },
    {
      lang: '🇬🇧 EN-GB',
      voices: [
        { id: 'amy', vendor: 'polly' },
        { id: 'emma', vendor: 'polly' },
        { id: 'brian', vendor: 'polly' },
        { id: 'en_uk_001', vendor: 'tiktok' },
        { id: 'en_uk_003', vendor: 'tiktok' }
      ]
    },
    {
      lang: '🇮🇳 EN-IN',
      voices: [
        { id: 'aditi', vendor: 'polly' },
        { id: 'raveena', vendor: 'polly' }
      ]
    },
    {
      lang: '🇳🇿 EN-NZ',
      voices: [{ id: 'aria', vendor: 'polly' }]
    },
    {
      lang: '🇿🇦 EN-ZA',
      voices: [{ id: 'ayanda', vendor: 'polly' }]
    },
    {
      lang: '🇺🇸 EN-US',
      voices: [
        { id: 'ivy', vendor: 'polly' },
        { id: 'joanna', vendor: 'polly' },
        { id: 'kendra', vendor: 'polly' },
        { id: 'kimberly', vendor: 'polly' },
        { id: 'salli', vendor: 'polly' },
        { id: 'joey', vendor: 'polly' },
        { id: 'justin', vendor: 'polly' },
        { id: 'kevin', vendor: 'polly' },
        { id: 'matthew', vendor: 'polly' },
        { id: 'en_us_001', vendor: 'tiktok' },
        { id: 'en_us_006', vendor: 'tiktok' },
        { id: 'en_us_007', vendor: 'tiktok' },
        { id: 'en_us_009', vendor: 'tiktok' },
        { id: 'en_us_010', vendor: 'tiktok' },
        { id: 'en_us_ghostface', vendor: 'tiktok' },
        { id: 'en_us_c3po', vendor: 'tiktok' },
        { id: 'en_us_stitch', vendor: 'tiktok' }
      ]
    },
    {
      lang: '🏴󠁧󠁢󠁷󠁬󠁳󠁿 EN-CY',
      voices: [{ id: 'geraint', vendor: 'polly' }]
    },
    {
      lang: '🇫🇷 FR',
      voices: [
        { id: 'celine', vendor: 'polly' },
        { id: 'lea', vendor: 'polly' },
        { id: 'mathieu', vendor: 'polly' },
        { id: 'fr_001', vendor: 'tiktok' },
        { id: 'fr_002', vendor: 'tiktok' }
      ]
    },
    {
      lang: '🇨🇦 FR-CA',
      voices: [
        { id: 'chantal', vendor: 'polly' },
        { id: 'gabrielle', vendor: 'polly' }
      ]
    },
    {
      lang: '🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY',
      voices: [{ id: 'gwyneth', vendor: 'polly' }]
    },
    {
      lang: '🇮🇳 HI',
      voices: [{ id: 'aditi', vendor: 'polly' }]
    },
    {
      lang: '🇮🇩 ID',
      voices: [{ id: 'id_001', vendor: 'tiktok' }]
    },
    {
      lang: '🇮🇸 IS',
      voices: [
        { id: 'dora', vendor: 'polly' },
        { id: 'karl', vendor: 'polly' }
      ]
    },
    {
      lang: '🇮🇹 IT',
      voices: [
        { id: 'carla', vendor: 'polly' },
        { id: 'bianca', vendor: 'polly' },
        { id: 'giorgio', vendor: 'polly' }
      ]
    },
    {
      lang: '🇯🇵 JA',
      voices: [
        { id: 'mizuki', vendor: 'polly' },
        { id: 'takumi', vendor: 'polly' },
        { id: 'jp_001', vendor: 'tiktok' },
        { id: 'jp_003', vendor: 'tiktok' },
        { id: 'jp_005', vendor: 'tiktok' },
        { id: 'jp_006', vendor: 'tiktok' }
      ]
    },
    {
      lang: '🇳🇴 NB',
      voices: [{ id: 'liv', vendor: 'polly' }]
    },
    {
      lang: '🇵🇱 PL',
      voices: [
        { id: 'ewa', vendor: 'polly' },
        { id: 'maja', vendor: 'polly' },
        { id: 'jacek', vendor: 'polly' },
        { id: 'jan', vendor: 'polly' }
      ]
    },
    {
      lang: '🇧🇷 PT-BR',
      primary: true,
      voices: [
        { id: 'camila', vendor: 'polly' },
        { id: 'vitoria', vendor: 'polly' },
        { id: 'ricardo', vendor: 'polly' },
        { id: 'br_003', vendor: 'tiktok' },
        { id: 'br_004', vendor: 'tiktok' },
        { id: 'br_005', vendor: 'tiktok' }
      ]
    },
    {
      lang: '🇵🇹 PT-PT',
      voices: [
        { id: 'ines', vendor: 'polly' },
        { id: 'cristiano', vendor: 'polly' }
      ]
    },
    {
      lang: '🇷🇴 RO',
      voices: [{ id: 'carmen', vendor: 'polly' }]
    },
    {
      lang: '🇷🇺 RU',
      voices: [
        { id: 'tatyana', vendor: 'polly' },
        { id: 'maxim', vendor: 'polly' }
      ]
    },
    {
      lang: '🇪🇸 ES-ES',
      voices: [
        { id: 'conchita', vendor: 'polly' },
        { id: 'lucia', vendor: 'polly' },
        { id: 'enrique', vendor: 'polly' },
        { id: 'es_002', vendor: 'tiktok' }
      ]
    },
    {
      lang: '🇲🇽 ES-MX',
      voices: [
        { id: 'mia', vendor: 'polly' },
        { id: 'es_mx_002', vendor: 'tiktok' }
      ]
    },
    {
      lang: '🇺🇸 ES-US',
      voices: [
        { id: 'lupe', vendor: 'polly' },
        { id: 'penelope', vendor: 'polly' },
        { id: 'miguel', vendor: 'polly' }
      ]
    },
    {
      lang: '🇸🇪 SV',
      voices: [{ id: 'astrid', vendor: 'polly' }]
    },
    {
      lang: '🇹🇷 TR',
      voices: [{ id: 'filiz', vendor: 'polly' }]
    }
  ];
</script>

<table class="table">
  <thead>
    <tr>
      <th>{$LANG.streams.tts.table.lang}</th>
      <th>Amazon Polly</th>
      <th>TikTok</th>
    </tr>
  </thead>
  <tbody>
    {#each voices as lang}
      {@const pollyVoices = lang.voices.filter((voice) => voice.vendor == 'polly')}
      {@const tikTokVoices = lang.voices.filter((voice) => voice.vendor == 'tiktok')}
      <tr class:primary={lang.primary}>
        <td>{lang.lang}</td>
        <td>
          {#each pollyVoices as voice}
            {voice.id}<br />
          {/each}
          {#if !pollyVoices.length}
            -
          {/if}
        </td>
        <td>
          {#each tikTokVoices as voice}
            {voice.id}<br />
          {/each}
          {#if !tikTokVoices.length}
            -
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="sass">
  @import '../../../assets/sass/vars'

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

    td:nth-child(2),
    td:nth-child(3)
      width: 24rem

  :global([data-theme="light"])
    table
      box-shadow: inset 0 0 0 1px var(--primary)

      th,
      td
        border-color: var(--primary)

      thead th,
      tr.primary
        background-color: rgba(var(--primary-rgb), .25)

      thead th
        color: var(--primary)
</style>
