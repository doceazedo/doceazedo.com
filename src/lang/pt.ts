import type { Language } from '.';

export const pt: Language = {
  code: 'pt',

  navbar: {
    blog: 'Blog',
    talks: 'Talks',
    streams: 'Streams',
    projects: 'Projetos',
    me: 'Sobre mim'
  },

  blurb: {
    title: 'Pode me chamar de Doce.',
    paragraph: [
      'Meu nome é Lucas, eu sou webdev frontend e gosto de',
      'criar layouts elegantes e reativos, mas também posso',
      'arquitetar APIs e bancos bem estruturados.'
    ],
    button: 'Bora conversar'
  },

  skills: {
    title: 'O que eu gosto de fazer',
    paragraph: [
      'Eu deveria mudar essa seção pra uma lista dos motivos que me fazem gostar',
      'tanto de Svelte. Mas por enquanto, vou deixar essas outras techs que eu curto:'
    ]
  },

  portfolio: {
    title: 'Meus últimos projetos e trabalhos',
    projects: [
      {
        title: 'Semaninha',
        description:
          'Site open-source desenvolvido com SvelteKit que permite gerar colagens das músicas que você mais ouviu, integrando as APIs do last.fm e Spotify.'
      },
      {
        title: 'convergencia.net.br',
        description:
          'Site institucional desenvolvido com WordPress e ACF para Convergência Digital, empresa de telemarketing e autoridade de registro na Grande BH.'
      },
      {
        title: 'grupostelegram.com.br',
        description:
          'Desenvolvido em React com Next.js e Chakra UI, hoje eu contribuo para esse que é um dos maiores indexadores de grupos de Telegram no Brasil.'
      },
      {
        title: 'Overlay + Bot',
        description:
          'Nas minhas lives de programação na Twitch, todo o visual e comandos estão sendo desenvolvidos com Svelte e SvelteKit.'
      },
      {
        title: 'doceazedo.com',
        description:
          'Site que reúne informações relacionadas às minhas lives na Twitch, como redes sociais e comandos do chat, também desenvolvido em Svelte e SvelteKit.'
      }
    ]
  },

  footer: ['Powered by Svelte & SvelteKit', 'Desenvolvido por Lucas Fernandes'],

  blog: {
    title: 'As últimas coisas que eu escrevi',
    subtitle:
      'Um amontoado de textos sobre tecnologia e programação, misturados com conversa fiada sobre música, vivências pessoais e outras besteiras. Basicamente meu Twitter só que, de fato, meu e sem a parte "micro" do microblog.',
    more: 'Ver mais'
  },

  about: {
    subtitle: 'Dev movido a curiosidade, evangelista de Svelte e streamer de live coding',
    intro:
      'Oi, eu me chamo Lucas. Eu sou um desenvolvedor frontend morando em Pedro Leopoldo, na região metropolitana de Belo Horizonte em Minas Gerais. Nesse site eu reúno alguns dos meus trabalhos e pedaços de conhecimento que eu gostaria de compartilhar com o mundo.',
    factsIntro:
      'Se você está nessa página talvez você ache legal algum desses fatos aleatórios sobre mim:',
    facts: [
      'Minha série preferida de todos os tempos é Sense8',
      'Jogos Vorazes é minha trilogia preferida de livros',
      'Apesar de novo, eu usei bastante Orkut, MSN, eMule e afins',
      'Eu fiz meu primeiro endereço de e-mail aos 5 anos de idade',
      'Minha mãe diz que eu aprendi a ler no computador pra conseguir usar sozinho',
      'Na época que eu jogava Habbo, eu participei como locutor e jornalista de múltiplos fã-sites do jogo',
      'Eu já abri alguns servidores públicos de Minecraft na vida, <a href="https://youtube.com/results?q=&quot;servidor+sem+nome&quot;" target="_blank">o último</a> foi em 2020 e fechou em 2021',
      'Na escola, eu gostava mais de escrever, desenhar e enfeitar títulos do que qualquer matéria específica',
      'Eu gosto muito de tatuagens e tenho três no momento:'
    ],
    tattoosTitle: 'Minhas tatuagens',
    tattoos: [
      'A tattoo da primeira imagem foi a primeira que eu fiz, em agosto de 2020. É o Homem de Lata protagonista do clipe da música <a href="https://www.youtube.com/watch?v=DP3j6hgS4VY" target="_blank">Na Sua Estante</a> da Pitty. É uma música que eu gosto desde pequeno e minha conexão com ela aumenta a cada vez que eu escuto.',
      'A segunda é uma planta carnívora, em referência à música <a href="https://song.link/br/i/1562845907" target="_blank">Venus Fly Trap</a> (do inglês, "planta carnívora"), da MARINA. Eu tinha vontade de tatuar algo que fizesse alusão às músicas dela desde que eu ouvi o álbum <a href="https://album.link/br/i/612448612" target="_blank">Electra Heart</a> pela primeira vez. Com o lançamento do impecável <a href="https://album.link/br/i/1562845738" target="_blank">Ancient Dreams in a Modern Land</a> agora em 2021, eu me senti inspirado a finalmente eternizar uma obra de arte dela no meu corpo.',
      'A minha mais recente, que eu fiz junto da anterior é o Napstablook, personagem do jogo indie Undertale, um dos poucos jogos que cativaram meu interesse. Ele é um fantasma músico e melancólico que, ao julgar pelas minhas outras tatuagens, fica perceptível minha identificação com ele.'
    ],
    keepInTouchTitle: 'Bora trocar uma ideia?',
    socialsIntro:
      'Eu não sou a pessoa mais conectada nas redes sociais do mundo, mas você pode me encontrar facilmente em uma dessas plataformas (por ordem decrescente de atividade):',
    socials: [
      'DoceAzedo#0911 no <a href="https://discord.com/users/241978119899185165" target="blank">Discord</a>',
      '@doceazedo911 no <a href="https://twitter.com/doceazedo911" target="blank">Twitter</a>',
      '@eightavocados no <a href="https://t.me/eightavocados" target="blank">Telegram</a>',
      '@doceazedo911 no <a href="https://instagram.com/doceazedo911" target="blank">Instagram</a>'
    ],
    livestream:
      'Eu também estou ao vivo na <a href="https://twitch.com/doceazedo911" target="blank">Twitch</a> de Terça à Quinta à partir das 19h30 programando ao vivo e conversando com as pessoas incríveis que aparecem por lá.',
    nickname:
      '"Que nome de usuário é esse, <i>doceazedo911</i>?" — pergunta que você provavelmente não fez. Mas respondendo mesmo assim, esse é o nick que eu uso por aí na internet desde que a Lady Gaga lançou o álbum <a href="https://album.link/br/i/1500951604" target="_blank">Chromatica</a> em maio de 2020 e eu venho juntando as músicas <a href="https://song.link/br/i/1500952438" target="_blank">Sour Candy</a> (do inglês, "doce azedo") e <a href="https://song.link/br/i/1500952435" target="_blank">911</a> desde então.',
    hardwareTitle: 'Meu equipamento',
    hardware: [
      'Processador: <span>AMD Ryzen 3600X</span>',
      'Placa-mãe: <span>Gigabyte B450M DS3H</span>',
      'Memória: <span>24GB (3x8) Crucial Ballistix Sport LT 3000MHz</span>',
      'Placa de vídeo: <span>EVGA GTX 1660</span>',
      'Armazenamento: <span>480GB SSD Crucial BX500 + 500GB HDD Western Digital</span>',
      'Gabinete: <span>Corsair Carbide Series SPEC-DELTA RGB</span>',
      'Monitores: <span>Samsung 24" 75hz 1ms + AOC 18.5"</span>',
      'Teclado: <span>Redragon Kumara</span>',
      'Mouse: <span>Redragon Cobra</span> <small>(Valorant: sensibilidade 0.45 e 800 DPI)</small>',
      'Mesa digitalizadora: <span>Wacom CTL472</span> <small>(osu: full area, modo janela 1366x768 em monitor 1920x1080)</small>',
      'Headset: <span>Logitech Prodigy G733</span>',
      'Microfone: <span>HyperX QuadCast</span>',
      'Earbuds: <span>Galaxy Buds+</span>',
      'Webcam: <span>Logitech C922 Pro</span>'
    ]
  },

  talks: {
    title: 'Palestras',
    paragraph:
      'Eu ainda não dei nenhuma palestra, mas tenho algumas preparadas. Se você quiser que eu me apresente em seu evento, envie um e-mail para me@doceazedo.com'
  },

  bookmarks: {
    title: 'Favoritos',
    paragraph: 'Alguns dos meus sites/ferramentas preferidos que eu recomendo',
    devUtils: '👨‍💻 Dev utils',
    design: '🎨 Design',
    resources: '📦 Materiais',
    subreddits: '👽 Subreddits',
    english: '📚 Inglês',
    extensions: '🌎 Extensões',
    accessibility: '🧏‍♀️ Acessibilidade',
    miscellaneous: '👌 Miscellaneous'
  },

  newsletter: {
    title: 'Ative o sininho',
    paragraph:
      'Não tem sininho para ativar e receber notificações de novos posts, o jeito é eu te mandar por e-mail assim que sair, sem cronograma definido. Você pode se desinscrever quando quiser.',
    subscribeRSS: 'Assinar feed RSS',
    subscribeNewsletter: 'ou inscreva-se na newsletter',
    subscribeButton: 'Inscrever',
    soon: 'Em breve™'
  },

  email: 'eu@lucasfernandes.com.br',
  posted: 'Publicado',
  skipToContent: 'Ir para o conteúdo',

  alt: {
    logo: 'Logotipo Doce Azedo',
    selfie:
      'Selfie de mim, pessoa branca de cabelos longos com as pontas descoloridas, usando óculos redondos e vestindo uma blusa de moletom verde escuro.',
    copyleft: 'Aprenda o que é Copyleft',
    listeningTo: 'Ouvindo',
    lastfm: 'Abrir meu perfil do Last.fm.',
    imageBeach:
      'Foto de mim, pessoa branca de cabelos castanhos na altura dos ombros, usando óculos escuros e um chapéu de pescador azul em uma praia.',
    changeLanguage: 'Alterar idioma para',
    langEn: 'Inglês',
    langPt: 'Português',
    nowLive: 'Ao vivo agora.',
    audioButton: 'Ouvir pronúncia',
    home: 'Início'
  }
};
