<script lang="ts">
  import { LANG } from '$lib/stores';
  import { Metadata, PageTitle } from '$lib/components';
  import meAtParis from '../../assets/img/me-paris.webp';
  import thatsAllFolks from '../../assets/img/thats-all-folks.gif';

  const songIDs = ['7AZzCQ6S8HXLFBXsqH2HWE', '4SBTecHxEs2ayXLiqs7Kmz', '78Jpy7RTri3JulwgQ9sNEP'];
</script>

<Metadata title={$LANG.navbar.me} />
<PageTitle title={$LANG.navbar.me} />

<div class="content">
  <h2>TL;DR</h2>
  <ul>
    <li><span>Online:</span> DoceAzedo</li>
    <li><span>Legalmente:</span> Lucas Fernandes</li>
    <li><span>Fisicamente:</span> São Paulo, Brasil</li>
    <li>
      <span>Profisionalmente:</span> Fullstack Developer @
      <a href="https://datawrapper.de" target="_blank" rel="noreferrer">Datawrapper</a>
    </li>
    <li><span>Casualmente:</span> Live coding, hyperpop, emojis</li>
    <li><span>Pronomes:</span> ele/dele ou elu/delu</li>
  </ul>
  <p>
    Você pode entrar em contato comigo pelo e-mail
    <a href="mailto:me@doceazedo.com">me@doceazedo.com</a> ou me mandar uma DM no
    <a href="https://twitter.com/doceazedo911">Twitter</a> ou no
    <a href="https://discord.gg/vEGRe2kq8B">Discord</a>. Eu adoro conhecer gente nova!
  </p>

  <h2>Oi, muito prazer!</h2>
  <img src={meAtParis} alt="Foto de mim com a Torre Eiffel ao fundo" />
  <p>
    Pode me chamar de Doce, eu sou um programador fullstack com foco em frontend atualmente morando
    na cidade de São Paulo, Brasil. Esse site é o lugarzinho em que eu falo sobre mim e sobre as
    coisas que eu gosto, e espero que você encontre algo legal aqui.
  </p>
  <p>
    Eu sou uma pessoa não-binária — meus pronomes são <b>ele/dele</b> ou <b>elu/delu</b> — que adora
    programar (e dou muito valor para um bom DX), gosto de fazer lives na
    <a href="https://twitch.tv/doceazedo911">Twitch</a> enquanto desenvolvo meus projetos pessoais,
    também gosto de tudo relacionado a emojis e Unicode e não perco a oportunidade de evagelizar a
    palavra do <a href="https://svelte.dev">Svelte</a>.
  </p>
  <p>
    Além disso, eu gosto muito de ouvir música. Eu sou o tipo de pessoa que ama parar para ouvir um
    álbum inteiro sem interrupções. Meus gêneros preferidos são pop, k-pop e hyperpop, especialmente
    a cena brasileira. Você pode ver mais sobre meus gostos musicais no meu <a
      href="https://last.fm/user/doceazedo911">Last.fm</a
    >.
  </p>

  <p class="showcase is-spotify">
    {#each songIDs as songID}
      <iframe
        title="Song preview"
        src="https://open.spotify.com/embed/track/{songID}"
        height={80}
        frameBorder={0}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    {/each}
  </p>

  <h2>Fatos aleatórios</h2>
  <ul>
    <li>Meu primeiro contato com programação foi por volta dos 12 anos com Visual Basic</li>
    <li>Eu amo a trilogia de Jogos Vorazes e coleciono os quatro livros da série</li>
    <li>Eu acredito fortemente que existe um limbo entre as gerações de 1998 até 2003</li>
    <li>
      Na época que eu jogava Habbo, eu participei como locutor e jornalista de vários fã-sites
    </li>
    <li>
      Apesar de não me considerar <i>gamer</i>, eu sou fissurado por tudo sobre Portal, Valve e
      Facepunch
    </li>
    <li>Além disso eu também jogo Fortnite, Valorant e Beat Saber ocasionalmente</li>
    <li>
      Eu tenho interesse na cena de cheating em jogos e a eterna luta entre hackers e anticheats
    </li>
  </ul>

  <h2>Meus programas</h2>
  <ul>
    <li>
      <span>Stack:</span>
      Esse site foi feito com
      <a href="https://kit.svelte.dev" target="_blank" rel="noopener noreferrer">SvelteKit</a> e
      hospedado na
      <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a>
    </li>
    <li>
      <span>IDE:</span>
      <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer"
        >Visual Studio Code</a
      >
      com o tema
      <a href="https://taniarascia.github.io/new-moon" target="_blank" rel="noopener noreferrer"
        >New Moon</a
      >
      (e
      <a href="https://jetbrains.com/idea" target="_blank" rel="noopener noreferrer"
        >IntelliJ IDEA</a
      >)
    </li>
    <li>
      <span>Terminal:</span>
      <a href="https://warp.dev" target="_blank" rel="noopener noreferrer">Warp</a>
    </li>
    <li>
      <span>Anotações:</span>
      <a href="https://obsidian.md" target="_blank" rel="noopener noreferrer">Obsidian</a>
    </li>
    <li>
      <span>Música:</span>
      <a href="https://spotify.com/" target="_blank" rel="noopener noreferrer">Spotify</a>
    </li>
  </ul>
  <p>
    Eu também compilei alguns dos meus sites aleatórios e ferramentas preferidas
    <a href="/bookmarks">nessa página</a>.
  </p>

  <h2>Meu equipamento</h2>
  <ul>
    <li><span>Programação:</span> M1 MacBook Pro 14" 2021</li>
    <li><span>Jogatina:</span></li>
    <ul>
      <li><span>Processador:</span> AMD Ryzen 3600X</li>
      <li><span>Placa-mãe:</span> Gigabyte B450M DS3H</li>
      <li><span>RAM:</span> 24GB (3x8) Crucial Ballistix 3000MHz</li>
      <li><span>GPU:</span> EVGA GTX 1660</li>
      <li><span>Fonte:</span> Corsair CV650</li>
      <li><span>Armazenamento:</span> 2TB NVMe + 480GB SATA + 500GB HDD</li>
      <li><span>Gabinete:</span> Corsair Spec Delta RGB</li>
    </ul>
    <li><span>Monitor:</span> Samsung UR550 28" 4K</li>
    <li><span>Teclado:</span> Logitech G512 (GX Brown)</li>
    <li><span>Mouse:</span> Redragon Cobra</li>
    <li><span>Mesa digitalizadora:</span> Wacom CTL472</li>
    <li><span>Headset:</span> AirPods Max</li>
    <li><span>Microfone:</span> HyperX QuadCast</li>
    <li><span>Webcam:</span> Logitech C922 Pro (PC) / Built-in (Mac)</li>
  </ul>

  <div class="wrap-up">
    <img src={thatsAllFolks} alt="" />
    <p>Tem alguma dúvida ou quer trocar uma ideia? É só chamar!</p>
  </div>
</div>

<style lang="sass">
  ul
    :global(span)
      color: #fff

  .wrap-up
    display: flex
    flex-direction: column
    align-items: center

  @media screen and (max-width: 768px)
    .wrap-up
      align-items: flex-start
</style>
