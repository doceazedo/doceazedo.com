import type { Language } from '..';

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
      photoCaption: 'Eu em Paris com a Torre Eiffel ao fundo (2022)',
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
    resources: '📦 Recursos',
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
      fazendoca:
        'Um joguinho social sobre cuidar da sua fazenda, feito na UE5 com uma API REST em SvelteKit; ainda em desenvolvimento.',
      overlay:
        'Um conjunto de visuais e comandos interativos para animar as minhas livestreams de programação.',
      ssn: 'Um servidor de Minecraft sem regras e open-source com sistema de autenticação web, plugins e correções próprias.',
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
    pronouns: {
      title: 'Pronomes',
      subtitle: 'Use o comando abaixo para indicar como as pessoas devem se referir a você:',
      command: 'pronomes',
      copy: 'Copiar comando'
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
    home: 'Início',
    setup:
      "Foto da minha mesa com meu notebook, monitor, gabinete, microfone condensador, teclado, mouse, headphone, mesa digitalizadora, duas facas e uma garrafa d'água em cima. Ao lado da mesa está um tripé para telefone."
  },
  topbar: {
    content:
      '"Me desculpe, o antigo Lucas não pode atender o telefone agora. Por quê? Ah, porque ele está %s!" Eu adotei meu apelido DoceAzedo como o nome que melhor representa quem eu sou. E eu escrevi sobre isso.',
    highlight: 'morto',
    readMore: 'Saiba mais.'
  },
  settings: {
    title: 'Preferências',
    theme: 'Plano de fundo',
    colorTheme: 'Cor do tema',
    fontSize: 'Tamanho da fonte',
    readingWidth: 'Largura da leitura',
    lineHeight: 'Altura da linha',
    dyslexiaFont: 'Usar fonte para dislexia',
    elevatorSpeed: 'Velocidade do elevador',
    resetLabel: 'Ajustes predefinidos',
    resetButton: 'Redefinir',
    themes: {
      purple: 'Uva',
      blue: 'Costa azul',
      orange: 'Papoula',
      carmine: 'Framboesa',
      green: 'Menta',
      pink: 'Flamingo'
    },
    themeUnlock: 'Nova cor de tema desbloqueada:',
    fontSizes: ['Pequena', 'Normal', 'Grande', 'Enorme'],
    lineHeights: ['Condensado', 'Padrão', 'Espaçado']
  },
  uses: {
    title: 'Eu uso',
    paragraph:
      'Todos os tipos de programas, configurações e serviços que eu uso no dia a dia e para programar',
    hardware: {
      title: 'Meu equipamento',
      mainPC: 'Principal',
      gamingPC: {
        title: 'Jogatina',
        items: {
          cpu: 'CPU',
          mobo: 'Placa-mãe',
          ram: 'RAM',
          gpu: 'Placa de vídeo',
          psu: 'Fonte',
          storage: 'Armazenamento',
          case: 'Gabinete'
        }
      },
      peripherals: {
        items: {
          display: 'Monitor',
          keyboard: 'Teclado',
          mouse: 'Mouse',
          tablet: 'Mesa digitalizadora',
          headphone: 'Fone de ouvido',
          mic: 'Microfone',
          webcam: 'Câmera'
        }
      }
    },
    general: {
      title: 'Dia a dia',
      items: {
        browser: 'para navegar na internet',
        music: 'para ouvir música',
        passwordManager: 'para gerenciamento de senhas',
        docs: 'para escrever documentos',
        slides: 'para fazer apresentações',
        cloud: 'para armazenamento em nuvem e sincronizar arquivos'
      }
    },
    productivity: {
      title: 'Produtividade',
      items: {
        notes: 'para anotações e gerenciamento de tarefas',
        drafts: 'para rascunhos, diagramas e quadro branco',
        raycast: 'para substituir o Spotlight e o seletor de emojis',
        screenshot: 'para screenshots e gravações de tela simples',
        videoEditing: 'para edição de vídeos'
      }
    },
    coding: {
      title: 'Programação',
      items: {
        ide: 'para programação no geral',
        ideKotlin: 'para programação em Kotlin',
        terminal: 'para emulador de terminal'
      },
      vscode: {
        theme: 'como tema',
        font: 'como fonte',
        settings: 'Configurações e extensões'
      },
      web: {
        title: 'Desenvolvimento web',
        items: {
          language: 'como minha linguagem preferida',
          svelte: 'como meu framework preferido',
          svelteKit: 'como meu meta-framework preferido',
          css: 'para estilização',
          icons: 'para ícones bonitos e coesos',
          brandIcons: 'para ícones de marcas',
          bundler: 'para ferramentas de frontend',
          tests: 'para escrever testes unitários',
          hosting: 'para hospedagem'
        }
      }
    },
    streaming: {
      title: 'Streaming',
      items: {
        obs: 'para transmissão e gravação de tela',
        chat: 'para chat da Twitch',
        audio: 'para roteamento de áudio no Mac'
      }
    },
    design: {
      title: 'Design',
      items: {
        figma: 'para design de UI e prototipagem',
        illustrator: 'para design de vetores no geral',
        photopea: 'para edição de imagens no geral'
      }
    },
    social: {
      title: 'Comunicação',
      items: {
        mastodonWeb: 'para aplicativo web do Mastodon',
        mastodonMobile: 'para aplicativo iOS do Mastodon',
        tweetdeck: 'para uma melhor experiência no Twitter',
        discord: 'para participação e gerenciamento de comunidades'
      }
    },
    utils: {
      title: 'Utilitários',
      items: {
        pxToRem: 'para conversor de PX e REM bidirecional',
        gridGenerator: 'para gerar grids CSS',
        svgomg: 'para otimizar SVGs',
        bulkResize: 'para redimensionar e otimizar imagens',
        icons: 'para navegação entre ícones e fontes de emoji'
      }
    },
    extensions: {
      title: 'Extensões',
      items: {
        adblocker: 'para bloqueador de anúncios',
        darkReader: 'para habilitar modo escuro em todos os lugares',
        rss: 'para leitor de RSS',
        wappalyzer: 'para descobrir a stack de um site',
        jsonViewer: 'para visualização de JSONs',
        hardRefresh: 'para todos os seus problemas de cache',
        ogChecker: 'para pré-visualização local de metatags de redes sociais',
        youtubeDislike: 'para mostrar dislikes no YouTube',
        youtubeQuality: 'para sempre tocar vídeos em HD no YouTube',
        youtubeSponsorBlock: 'para pular segmentos patrocinados no YouTube'
      }
    }
  }
};
