import type { Language } from '.';

export const pt: Language = {
  code: 'pt',

  navbar: {
    home: 'Início',
    blog: 'Blog',
    talks: 'Talks',
    live: 'Lives',
    projects: 'Projetos',
    me: 'Sobre mim'
  },

  blurb: {
    title: 'Oiee, eu sou o Doce!',
    paragraph:
      'Eu sou o DoceAzedo, tenho %s anos e sou um dev movido à curiosidade, evangelista de Svelte, arqui-inimigo dos zeros e uns (ele/delu) e live coder.'
  },

  skills: {
    title: 'O que eu gosto de fazer',
    paragraph: [
      'Eu deveria mudar essa seção pra uma lista dos motivos que me fazem gostar',
      'tanto de Svelte. Mas por enquanto, vou deixar essas outras techs que eu curto:'
    ]
  },

  footer: ['Powered by Svelte & SvelteKit', 'Desenvolvido por DoceAzedo'],

  blog: {
    title: 'As últimas coisas que eu escrevi',
    subtitle:
      'Um amontoado de textos sobre tecnologia e programação, misturados com conversa fiada sobre música, vivências pessoais e outras besteiras.',
    more: 'Ver mais',
    new: 'Novo!'
  },

  about: {
    tldr: {
      online: {
        key: 'Online',
        value: 'DoceAzedo'
      },
      legally: {
        key: 'Legalmente',
        value: 'Lucas Fernandes'
      },
      physically: {
        key: 'Fisicamente',
        value: 'São Paulo, Brasil'
      },
      professionally: {
        key: 'Profisionalmente',
        value: 'Fullstack Developer @ %s'
      },
      casually: {
        key: 'Casualmente',
        value: 'Live coding, hyperpop, emojis'
      },
      pronouns: {
        key: 'Pronomes',
        value: 'ele/dele ou elu/delu'
      }
    },
    contact:
      'Você pode entrar em contato comigo pelo e-mail %email% ou me mandar uma DM no %twitter% ou no %discord%. Eu adoro conhecer gente nova!',
    me: {
      title: 'Oi, muito prazer!',
      intro:
        'Pode me chamar de Doce, eu sou um programador fullstack com foco em frontend atualmente morando na cidade de São Paulo, Brasil. Esse site é o lugarzinho em que eu falo sobre mim e sobre as coisas que eu gosto, e espero que você encontre algo legal ou útil por aqui.',
      interests:
        'Eu sou uma pessoa não-binária — meus pronomes são <b>ele/dele</b> ou <b>elu/delu</b> — que adora programar (e dou muito valor para um bom DX), gosto de fazer lives na %twitch% enquanto desenvolvo meus projetos pessoais, também gosto de tudo relacionado a emojis e Unicode e não perco a oportunidade de evagelizar a palavra do %svelte%.',
      music:
        'Além disso, eu gosto muito de ouvir música. Eu sou o tipo de pessoa que ama parar para ouvir um álbum inteiro sem interrupções. Meus gêneros preferidos são pop, k-pop e hyperpop, especialmente a cena brasileira. Você pode ver mais sobre meus gostos musicais no meu %s.'
    },
    trivia: {
      title: 'Fatos aleatórios',
      items: [
        'Meu primeiro contato com programação foi por volta dos 12 anos com Visual Basic',
        'Eu amo a trilogia de Jogos Vorazes e coleciono os quatro livros da série',
        'Eu acredito fortemente que existe um limbo entre as gerações de 1998 até 2003',
        'Na época que eu jogava Habbo, eu participei como locutor e jornalista de vários fã-sites',
        'Apesar de não me considerar <i>gamer</i>, eu sou fissurado por tudo sobre Portal, Valve e Facepunch',
        'Além disso eu também jogo Fortnite, Valorant e Beat Saber ocasionalmente',
        'Eu tenho interesse na cena de cheating em jogos e a eterna luta entre hackers e anticheats'
      ]
    },
    software: {
      title: 'Meus programas',
      items: {
        stack: {
          key: 'Stack',
          value: 'Esse site foi feito com %framework% e hospedado na %host%'
        },
        ide: {
          key: 'IDE',
          value: '%main_ide% com o tema %main_theme% (e %kotlin_ide%)'
        },
        terminal: {
          key: 'Terminal',
          value: '%s'
        },
        notes: {
          key: 'Anotações',
          value: '%s'
        },
        music: {
          key: 'Música',
          value: '%s'
        }
      },
      bookmarks: {
        paragraph:
          'Eu também compilei alguns dos meus sites aleatórios e ferramentas preferidas %s.',
        linkLabel: 'nessa página'
      }
    },
    hardware: {
      title: 'Meu equipamento',
      items: {
        devPc: {
          key: 'Programação',
          value: 'M1 MacBook Pro 14" 2021'
        },
        gamingPc: {
          title: 'Jogatina',
          items: [
            {
              key: 'CPU',
              value: 'AMD Ryzen 3600X'
            },
            {
              key: 'Placa-mãe',
              value: 'Gigabyte B450M DS3H'
            },
            {
              key: 'RAM',
              value: '24GB (3x8) Crucial Ballistix 3000MHz'
            },
            {
              key: 'GPU',
              value: 'EVGA GTX 1660'
            },
            {
              key: 'Fonte',
              value: 'Corsair CV650'
            },
            {
              key: 'Armazenamento',
              value: '2TB NVMe + 480GB SATA + 500GB HDD'
            },
            {
              key: 'Gabinete',
              value: 'Corsair Spec Delta RGB'
            }
          ]
        },
        peripherals: [
          {
            key: 'Monitor',
            value: 'Samsung UR550 28" 4K'
          },
          {
            key: 'Teclado',
            value: 'Logitech G512 (GX Brown)'
          },
          {
            key: 'Mouse',
            value: 'Redragon Cobra'
          },
          {
            key: 'Mesa digitalizadora',
            value: 'Wacom CTL472'
          },
          {
            key: 'Headset',
            value: 'AirPods Max'
          },
          {
            key: 'Microfone',
            value: 'HyperX QuadCast'
          },
          {
            key: 'Webcam',
            value: 'Logitech C922 Pro (PC) / Built-in (Mac)'
          }
        ]
      }
    },
    wrapup: 'Tem alguma dúvida ou quer trocar uma ideia? É só chamar!'
  },

  talks: {
    title: 'Palestras',
    paragraph:
      'Essas são as gravações e recursos das palestras que eu apresentei, se você acha que seria legal me ter palestrando em seu evento, manda um e-mail para',
    at: 'em',
    watch: 'Assistir gravação',
    resources: 'Recursos',
    resourcesPretitle: 'Recursos da talk'
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
    miscellaneous: '👌 Diversos'
  },

  newsletter: {
    title: 'Ative o sininho 🔔',
    paragraph:
      'Eu te aviso por e-mail assim que sairem novos posts, sem cronograma definido. Você pode se desinscrever quando quiser.',
    placeholder: 'seuemail@exemplo.com',
    subscribe: 'Inscrever',
    messages: {
      success: 'Show! Você agora vai receber avisos de novos posts. ✨',
      error: 'Algo deu errado! Tente novamente mais tarde ou %s. 😰',
      openIssue: 'abra um issue'
    }
  },

  projects: {
    subtitle: 'Alguns destaques dos meus projetos open-source. Veja todos',
    subtitleGitHub: 'no GitHub',
    url: 'Visitar',
    writeup: 'Notas',
    source: 'Código',
    demo: 'Demo',
    details: {
      semaninha:
        'Gerador de colagens com as músicas que você mais ouviu na semana no Last.fm, desenvolvido com SvelteKit e Puppeteer.',
      'svelte-flow':
        'Biblioteca que permite criar diagramas, inspirado no React Flow e ainda no início do desenvolvimento.',
      overlay:
        'Um conjunto de visuais e comandos interativos para animar as minhas livestreams de programação.',
      emotettv: 'Biblioteca para fazer parse dos emotes da Twitch, sem esforço',
      powerchat: 'Projeto (inativo) que visa deixar o chat da Twitch mais moderno',
      'quarto-101': 'Projeto com o objetivo de recriar os sistemas da casa do BBB',
      autoparkour: 'Plugin Spigot que gera trilhas de parkour programaticamente',
      bitterctf: 'Plugin Spigot de um minigame de rouba-bandeira independente'
    }
  },

  streams: {
    titleOnline: 'Ao vivo agora!',
    titleOffline: 'Última transmissão',
    supportMe: 'Apoie o meu conteúdo',
    subscribe: {
      title: 'Inscreva-se',
      paragraph: 'Se inscrevendo no canal, além de apoiar minhas lives você:',
      benefits: [
        'Pode assistir sem anúncios',
        'Ganha um emblema e emotes exclusivos',
        'Ganha cargo e emotes exclusivos no Discord'
      ],
      prime: 'Seja sub Prime',
      sub: 'Inscreva-se por R$ 7,90'
    },
    donate: {
      title: 'Doação via PicPay',
      paragraph: 'Quer me mandar uns trocados? Clique aqui, digite o valor e uma mensagem.'
    },
    icons: {
      title: 'Ícones',
      subtitle:
        'Escolha um dos %s ícones abaixo para copiar o comando e cole no chat para participar de um time e mostrar seu orgulho por ele!',
      copied: 'Comando copiado, agora é só colar no chat!'
    },
    tts: {
      title: 'TTS',
      subtitle:
        'O comando TTS pode ser usado para mandar mensagens de voz, simples assim. Se você quiser ir um pouco além, estão disponíveis várias vozes, idiomas e funções diferentes:',
      usage: {
        default: 'Use %s para enviar uma mensagem com uma voz do TikTok aleatória',
        google: 'Use %s para enviar uma mensagem com a voz feminina do Google',
        polly: 'Use %s para enviar uma mensagem com uma das vozes abaixo',
        ssml: 'Use %s para enviar uma mensagem com %s'
      },
      placeholder: {
        message: 'mensagem',
        code: 'código'
      },
      ssmlTags: 'tags SSML',
      table: {
        lang: 'Idioma',
        code: 'Nome / Código',
        type: 'Tipo de voz',
        voiceTypes: {
          f: '🎀 Feminina',
          m: '🧢 Masculina'
        }
      }
    },
    prime: {
      title: 'Seja sub Prime',
      paragraph: 'Como ser sub gratuitamente no meu canal da Twitch com Prime',
      steps: [
        {
          title: 'Assine o teste grátis do Prime',
          description:
            '<a href="%prime_link%" target="_blank">Clique aqui</a> para acessar a página do Prime Gaming e clique em "Experimente o Prime".'
        },
        {
          title: 'Acesse sua conta Amazon',
          description: 'Se já tiver uma conta Amazon, faça login. Caso contrário, crie uma nova.'
        },
        {
          title: 'Clique para se inscrever',
          description:
            '<a href="%channel_link%" target="_blank">Acesse o meu canal</a> e clique em "Inscrição".'
        },
        {
          title: 'Inscreva-se gratuitamente',
          description:
            'Selecione a opção "Usar inscrição com Prime" e em seguida clique em "Inscreva-se com o Prime".'
        },
        {
          title: 'Junte-se ao Discord',
          description:
            'Conecte sua conta da Twitch no Discord e <a href="%discord_link%" target="_blank">faça parte do QG</a> para ganhar um cargo e emotes exclusivos.'
        }
      ]
    }
  },

  email: 'eu@doceazedo.com',
  posted: 'Publicado',
  skipToContent: 'Ir para o conteúdo',

  alt: {
    logo: 'Logotipo Doce Azedo',
    selfie: 'Fotografia de mim',
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
  },

  topbar: {
    content:
      '"Me desculpe, o antigo Lucas não pode atender o telefone agora. Por quê? Ah, porque ele está %s!" Eu adotei meu apelido DoceAzedo como o nome que melhor representa quem eu sou. E eu escrevi sobre isso.',
    highlight: 'morto',
    readMore: 'Saiba mais.'
  }
};
