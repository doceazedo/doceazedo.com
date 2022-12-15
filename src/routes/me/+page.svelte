<script lang="ts">
  import { LANG } from '$lib/stores';
  import { Metadata, PageTitle } from '$lib/components';
  import meAtParis from '../../assets/img/me-paris.webp';
  import tattoo1 from '../../assets/img/tattoo-1.webp';
  import tattoo2 from '../../assets/img/tattoo-2.webp';
  import tattoo3 from '../../assets/img/tattoo-3.webp';
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
  </ul>
  <p>
    Se sentindo nostálgico? Me manda um e-mail:
    <a href="mailto:me@doceazedo.com">me@doceazedo.com</a> 👴
  </p>

  <h2>Oi, muito prazer!</h2>
  <img src={meAtParis} alt="Foto de mim com a Torre Eiffel ao fundo" />
  <p>
    Pode me chamar de Doce, eu sou um programador fullstack com foco em frontend atualmente morando
    na cidade de São Paulo, Brasil. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
    itaque ab, nam accusamus aut beatae dolorum maxime ratione minima sapiente laboriosam amet
    perspiciatis. Dolores tempora culpa ipsam? Deleniti, aspernatur corporis!
  </p>
  <p>
    Nunc tincidunt urna pharetra sagittis semper. Integer fermentum enim a eros faucibus sodales.
    Pellentesque porta nisl vel nulla fermentum faucibus.
  </p>
  <p>
    Vivamus condimentum mattis mi eget aliquam. Nunc maximus odio id pellentesque bibendum. Etiam
    elementum bibendum laoreet. Aenean consequat consequat ipsum, ut malesuada metus facilisis id.
    Sed aliquam fermentum egestas.
  </p>

  <h2>Fatos aleatórios</h2>
  <ul>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
  </ul>

  <h2>Ferramentas</h2>
  <p>
    Eu compilei alguns dos meus sites aleatórios preferidos <a href="/bookmarks">nessa página</a>.
    Além deles, essas são algumas das ferramentas que eu mais gosto:
  </p>
  <ul>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
  </ul>

  <h2>Meu equipamento</h2>
  <ul>
    <li><span>Programação:</span> M1 MacBook Pro 14" 2021</li>
    <li><span>Gaming:</span></li>
    <ul>
      <li><span>Processador:</span> AMD Ryzen 3600X</li>
      <li><span>Placa-mãe:</span> Gigabyte B450M DS3H</li>
      <li><span>RAM:</span> 24GB (3x8) Crucial Ballistix Sport LT 3000MHz</li>
      <li><span>GPU:</span> EVGA GTX 1660</li>
      <li><span>Armazenamento:</span> 2TB NVMe + 480GB SATA + 500GB HDD</li>
      <li><span>Gabinete:</span> EVGA GTX 1660</li>
    </ul>
    <li><span>Monitor:</span> Samsung 28" 4K LU28R550UQLMZD</li>
    <li><span>Teclado:</span> Logitech G512 (GX Brown)</li>
    <li><span>Mesa digitalizadora:</span> Wacom CTL472</li>
    <li><span>Headset:</span> Logitech Prodigy G733 / AirPods Max</li>
    <li><span>Microfone:</span> HyperX QuadCast</li>
    <li><span>Webcam:</span> Logitech C922 Pro / iPhone</li>
  </ul>
</div>

<style lang="sass">
  .tattoos
    display: grid
    grid-template-columns: repeat(3, 1fr)
    grid-column-gap: 2rem
    margin-bottom: 2rem

    img
      margin-bottom: 0

  ul
    :global(span)
      color: #fff
    
    :global(small)
      font-size: .9rem

  @media screen and (max-width: 768px)
    .tattoos
      grid-column-gap: .5rem
      margin-bottom: 1.5rem
</style>
