<script>
  import PageTitle from '../components/page-title.svelte';
  import meAtBeach from '../assets/img/me-beach.webp';
  import tattoo1 from '../assets/img/tattoo-1.webp';
  import tattoo2 from '../assets/img/tattoo-2.webp';
  import tattoo3 from '../assets/img/tattoo-3.webp';
</script>

<svelte:head>
  <title>Lucas Fernandes</title>
</svelte:head>

<PageTitle
  title="Sobre mim"
  paragraph="Programador movido a curiosidade e streamer de live coding" />

<div class="content">
  <p>Oi, eu me chamo Lucas. Eu sou um desenvolvedor fullstack trabalhando em Pedro Leopoldo, na região metropolitana de Belo Horizonte em Minas Gerais. Nesse site eu reúno alguns dos meus trabalhos e pedaços de conhecimento que eu gostaria de compartilhar com o mundo.</p>
  <img src={meAtBeach} alt="">
  <p>Se você está nessa página talvez você ache legal algum desses fatos aleatórios sobre mim:</p>
  <ul>
    <li>Minha série preferida de todos os tempos é Sense8</li>
    <li>Jogos Vorazes é minha trilogia preferida de livros</li>
    <li>Apesar de novo, eu usei bastante Orkut, MSN, eMule e afins</li>
    <li>Minha mãe diz que eu aprendi a ler no computador pra conseguir usar sozinho</li>
    <li>Na época que eu jogava Habbo, eu participei como locutor e jornalista de múltiplos fã-sites do jogo</li>
    <li>Eu já abri alguns servidores públicos de Minecraft na vida, <a href="https://youtube.com/results?q=&quot;servidor+sem+nome&quot;" target="_blank">o último</a> foi em 2020 e fechou em 2021</li>
    <li>Na escola, eu gostava mais de escrever, desenhar e decorar títulos do que qualquer matéria específica</li>
    <li>Eu gosto muito de tatuagens e tenho três no momento:</li>
  </ul>
  <h4>Minhas tatuagens</h4>
  <div class="tattoos">
    <img src={tattoo1} alt="">
    <img src={tattoo2} alt="">
    <img src={tattoo3} alt="">
  </div>
  <p>A tattoo da primeira imagem foi a primeira que eu fiz, em agosto de 2020. É o homem de lata protagonista do clipe da música <a href="https://www.youtube.com/watch?v=DP3j6hgS4VY" target="_blank">Na Sua Estante</a> da Pitty. É uma música que eu gosto desde pequeno e minha conexão com ela aumenta a cada vez que eu escuto.</p>
  <p>A segunda é uma planta carnívora, em referência à música <a href="https://song.link/br/i/1562845907" target="_blank">Venus Fly Trap</a> (do inglês, "planta carnívora"), da Marina. Eu tinha vontade de tatuar algo que fizesse alusão às músicas dela desde que eu ouvi o álbum <a href="https://album.link/br/i/612448612" target="_blank">Electra Heart</a> pela primeira vez. Com o lançamento do impecável <a href="https://album.link/br/i/1562845738" target="_blank">Ancient Dreams in a Modern Land</a> agora em 2021, eu me senti inspirado a finalmente eternizar uma obra de arte dela no meu corpo.</p>
  <p>A minha mais recente, que eu fiz junto da anterior é o Napstablook, personagem do jogo indie Undertale, um dos poucos jogos que cativaram meu interesse. Ele é um fantasma músico e melancólico que, ao julgar pelas minhas outras tatuagens, fica perceptível minha identificação com ele.</p>
  <h4>Bora trocar uma ideia?</h4>
  <p>Eu não sou a pessoa mais conectada nas redes sociais do mundo, mas você pode me encontrar facilmente em uma dessas plataformas (por ordem decrescente de atividade):</p>
  <ul>
    <li>DoceAzedo#2202 no <a href="https://discord.gg/vEGRe2kq8B" target="blank">Discord</a></li>
    <li>@doceazedo911 no <a href="https://twitter.com/doceazedo911" target="blank">Twitter</a></li>
    <li>@eightavocados no <a href="https://t.me/eightavocados" target="blank">Telegram</a></li>
    <li>@doceazedo911 no <a href="https://instagram.com/doceazedo911" target="blank">Instagram</a></li>
  </ul>
  <p>Eu também estou ao vivo na <a href="https://twitch.com/doceazedo911" target="blank">Twitch</a> de Terça à Sábado à partir das 19h30 programando ao vivo e conversando com as pessoas incríveis que aparecem por lá.</p>
  <p>"Que nome de usuário é esse, <i>doceazedo911</i>?" — pergunta que você provavelmente não fez. Mas respondendo mesmo assim, esse é o nick que eu uso por aí na internet desde que a Lady Gaga lançou o álbum <a href="https://album.link/br/i/1500951604" target="_blank">Chromatica</a> em maio de 2020 e eu venho juntando as músicas <a href="https://song.link/br/i/1500952438" target="_blank">Sour Candy</a> (do inglês, "doce azedo") e <a href="https://song.link/br/i/1500952435" target="_blank">911</a> desde então.</p>
  <h4>Meu equipamento</h4>
  <ul>
    <li>Processador: <span>AMD Ryzen 3600X</span></li>
    <li>Placa-mãe: <span>Gigabyte B450M DS3H</span></li>
    <li>Memória: <span>24GB (3x8) Crucial Ballistix Sport LT 3000MHz</span></li>
    <li>Placa de vídeo: <span>EVGA GTX 1660</span></li>
    <li>Armazenamento: <span>480GB SSD Crucial BX500 + 500GB HDD Western Digital</span></li>
    <li>Gabinete: <span>Corsair Carbide Series SPEC-DELTA RGB</span></li>
    <li>Monitores: <span>Samsung 24" 75hz 1ms + AOC 18.5"</span></li>
    <li>Teclado: <span>Redragon Kumara</span></li>
    <li>Mouse: <span>Redragon Cobra</span> <small>(Valorant: sensibilidade 0.45 e 800 DPI)</small></li>
    <li>Mesa digitalizadora: <span>Wacom CTL472</span> <small>(osu: full area, resolução em 71,15%)</small></li>
    <li>Headset: <span>Logitech Prodigy G231</span></li>
    <li>Webcam: <span>Logitech C922 Pro</span></li>
  </ul>
</div>

<style type="text/sass">
  .tattoos
    display: grid
    grid-template-columns: repeat(3, 1fr)
    grid-column-gap: 2rem
    margin-bottom: 2rem

    img
      margin-bottom: 0

  ul li
    span
      color: #fff
    
    small
      font-size: .8rem

  @media screen and (max-width: 768px)
    .tattoos
      grid-column-gap: .5rem
      margin-bottom: 1.5rem
</style>