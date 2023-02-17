import type { Language } from '.';

export const en: Language = {
  code: 'en',

  navbar: {
    home: 'Home',
    blog: 'Blog',
    talks: 'Talks',
    live: 'Streams',
    projects: 'Projects',
    me: 'About me'
  },

  blurb: {
    title: "Howdy, I'm Doce!",
    paragraph:
      "I'm DoceAzedo, a %s years old curiosity-driven developer, Svelte evangelist, arch-enemy of the zeros and ones (he/they) and live coder."
  },

  skills: {
    title: 'What I like to do',
    paragraph: [
      'I should probably change this section to a list of reasons that makes me',
      "love Svelte so much. For now, I'll just leave these other tech I like:"
    ]
  },

  blog: {
    title: "See what I've written lately",
    subtitle:
      'A bunch of texts about technology and programming, mixed with me talking about music, personal experiences and other nerdy nonsense.',
    more: 'View all',
    new: 'New!'
  },

  footer: ['Powered by Svelte & SvelteKit', 'Developed by DoceAzedo'],

  about: {
    tldr: {
      online: {
        key: 'Online',
        value: 'DoceAzedo'
      },
      legally: {
        key: 'Legally',
        value: 'Lucas Fernandes'
      },
      physically: {
        key: 'Physically',
        value: 'São Paulo, Brasil'
      },
      professionally: {
        key: 'Professionally',
        value: 'Fullstack Developer @ %s'
      },
      casually: {
        key: 'Casually',
        value: 'Live coding, hyperpop, emojis'
      },
      pronouns: {
        key: 'Pronouns',
        value: 'he/him or they/them'
      }
    },
    contact:
      'You can get in touch with me by email at %email% or just DM me on %twitter% or %discord%. I always appreciate meeting new people!',
    me: {
      title: 'Hi, nice to meet you!',
      intro:
        "You can call me Doce, I'm a fullstack frontend developer currently living in São Paulo, Brazil. This is my little spot on the web where I talk about myself and stuff that I like, and I hope you can find something cool or useful here.",
      interests:
        "I'm a non-binary person — my pronouns are <b>he/him</b> or <b>they/them</b> — who loves to code (and I really value a good DX), I like to go live on %twitch% while I develop my personal projects. I also like everything related to emojis and Unicode and I never miss the chance to talk about the word of %svelte%.",
      music:
        "Also, I really enjoy listening to music. I'm the type of person who loves to take a break and listen through an entire album without interruptions or skips. My favorite genres are pop, k-pop and hyperpop, particularly the Brazilian scene. You can see more about my musical taste on my %s."
    },
    trivia: {
      title: 'Random facts',
      items: [
        'My first contact with programming was around the age of 12 with Visual Basic',
        'I love the Hunger Games trilogy and I have all four books of the series',
        'I strongly believe that there is a limbo between the generations from 1998 to 2003',
        'When I used to play Habbo Hotel, I took part of several fan sites as a DJ and journalist',
        'Although I don\'t consider myself a "gamer", I\'m obsessed with everything Portal, Valve and Facepunch',
        'Despite that, I also play Fortnite, Valorant and Beat Saber occasionally',
        "I'm quite into the game cheating scene and the never ending battle between hackers and anticheats"
      ]
    },
    software: {
      title: 'My software',
      items: {
        stack: {
          key: 'Stack',
          value: 'This website is made with %framework% and is hosted on %host%'
        },
        ide: {
          key: 'IDE',
          value: '%main_ide% with the %main_theme% theme (and %kotlin_ide%)'
        },
        terminal: {
          key: 'Terminal',
          value: '%s'
        },
        notes: {
          key: 'Notes',
          value: '%s'
        },
        music: {
          key: 'Music',
          value: '%s'
        }
      },
      bookmarks: {
        paragraph: 'I have also compiled some of my favorite random websites and tools on %s.',
        linkLabel: 'this page'
      }
    },
    hardware: {
      title: 'My hardware',
      items: {
        devPc: {
          key: 'Coding PC',
          value: 'M1 MacBook Pro 14" 2021'
        },
        gamingPc: {
          title: 'Gaming PC',
          items: [
            {
              key: 'CPU',
              value: 'AMD Ryzen 3600X'
            },
            {
              key: 'Motherboard',
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
              key: 'PSU',
              value: 'Corsair CV650'
            },
            {
              key: 'Storage',
              value: '2TB NVMe + 480GB SATA + 500GB HDD'
            },
            {
              key: 'Case',
              value: 'Corsair Spec Delta RGB'
            }
          ]
        },
        peripherals: [
          {
            key: 'Display',
            value: 'Samsung UR550 28" 4K'
          },
          {
            key: 'Keyboard',
            value: 'Logitech G512 (GX Brown)'
          },
          {
            key: 'Mouse',
            value: 'Redragon Cobra'
          },
          {
            key: 'Drawing tablet',
            value: 'Wacom CTL472'
          },
          {
            key: 'Headset',
            value: 'AirPods Max'
          },
          {
            key: 'Microphone',
            value: 'HyperX QuadCast'
          },
          {
            key: 'Webcam',
            value: 'Logitech C922 Pro (PC) / Built-in (Mac)'
          }
        ]
      }
    },
    wrapup: 'Have a question or just wanna talk? Hit me up!'
  },

  talks: {
    title: 'Talks',
    paragraph:
      'These are the recordings and resources of the talks I presented, if you think it would be cool to have me speak at your event, shoot me an email:',
    at: '@',
    watch: 'Watch recording',
    resources: 'Resources',
    resourcesPretitle: 'Talk resources'
  },

  bookmarks: {
    title: 'Bookmarks',
    paragraph: 'Some of my favorite websites/tools that I highly recommend',
    devUtils: '👨‍💻 Dev utils',
    design: '🎨 Design',
    resources: '📦 Resources',
    subreddits: '👽 Subreddits',
    english: '📚 English',
    extensions: '🌎 Extensions',
    accessibility: '🧏‍♀️ Accessibility',
    miscellaneous: '👌 Miscellaneous'
  },

  newsletter: {
    title: 'Ring the bell 🔔',
    paragraph:
      'I will email all the new posts to you as soon as they come out, with no set schedule. You can unsubscribe at any time.',
    placeholder: 'youremail@example.com',
    subscribe: 'Subscribe',
    messages: {
      success: 'Nice! You will now get notified about new posts. ✨',
      error: 'Something went wrong! Please try again later or %s. 😰',
      openIssue: 'open an issue'
    }
  },

  projects: {
    subtitle: 'A few highlights of my open-source projects. View them all',
    subtitleGitHub: 'on GitHub',
    url: 'Visit',
    writeup: 'Write-up',
    source: 'Source',
    demo: 'Demo',
    details: {
      semaninha:
        "Last.fm collage generator, featuring the songs you've listened to the most, powered by SvelteKit and Puppeteer.",
      'svelte-flow':
        'Library for creating diagrams, inspired by React Flow and still at the early stages of development.',
      overlay:
        'A set of visual scenes and interactive commands to spice up my live coding streams on Twitch.',
      emotettv: 'A dead simple library to parse Twitch emotes with ease',
      powerchat: 'Inactive project that aims to make the Twitch chat more modern',
      'quarto-101': 'Project with the aim of recreating all the BBB (reality show) systems',
      autoparkour: 'Spigot plugin that generates parkour tracks programmatically',
      bitterctf: 'Spigot plugin for a standalone capture the flag minigame server'
    }
  },

  streams: {
    titleOnline: 'Live now!',
    titleOffline: 'Last livestream',
    supportMe: 'Support my content',
    subscribe: {
      title: 'Subscribe',
      paragraph: "By subscribing, you'll not only be supporting my streams but also:",
      benefits: [
        'Be able to watch without ads',
        'Get exclusive badge and emotes',
        'Get exclusive Discord role and emotes'
      ],
      prime: 'Free sub with Prime',
      sub: 'Subscribe for $4.99'
    },
    donate: {
      title: 'Donate via PicPay',
      paragraph: 'Feeling like giving me money? Click here, type the value and a message.'
    },
    icons: {
      title: 'Icons',
      subtitle:
        'Choose one of the %s icons below to copy the command and paste it into the chat to join a team and show your pride for it!',
      copied: 'Command copied, now paste it into the chat!'
    },
    tts: {
      title: 'TTS',
      subtitle:
        'The TTS command can be used to send voice messages, simple as that. If you want to go a step further, several different voices, languages and features are available:',
      usage: {
        default: 'Use %s to send a voice message with the Google default Brazilian female voice',
        polly: 'Use %s to send a voice message with one of the voices below',
        ssml: 'Use %s to send a voice message with %s'
      },
      placeholder: {
        message: 'message',
        code: 'code'
      },
      ssmlTags: 'SSML tags',
      table: {
        lang: 'Language',
        code: 'Name / Code',
        type: 'Voice type',
        voiceTypes: {
          f: '🎀 Feminine',
          m: '🧢 Masculine'
        }
      }
    },
    prime: {
      title: 'Free sub with Prime',
      paragraph: 'How to get a free subscription on my Twitch channel with Prime',
      steps: [
        {
          title: 'Subscribe for Prime free trial',
          description:
            '<a href="%prime_link%" target="_blank">Click here</a> to access the Prime Gaming landing page and click "Try Prime".'
        },
        {
          title: 'Login with your Amazon account',
          description:
            'If you already have an Amazon account, sign in. Otherwise, create a new one.'
        },
        {
          title: 'Click the subscribe button',
          description:
            '<a href="%channel_link%" target="_blank">Go to my channel</a> and click on "Subscribe".'
        },
        {
          title: 'Subscribe for free',
          description:
            'Check the option "Use Prime subscription" and then click on "Subscribe with Prime".'
        },
        {
          title: 'Join our Discord server',
          description:
            'Connect your Twitch account with Discord, <a href="%discord_link%" target="_blank">join the HQ</a> and get a exclusive role and emotes.'
        }
      ]
    }
  },

  email: 'me@doceazedo.com',
  posted: 'Published',
  skipToContent: 'Skip to content',

  alt: {
    logo: 'DoceAzedo logo',
    selfie: 'Photo of me',
    copyleft: 'Learn what is Copyleft',
    listeningTo: 'Listening to',
    lastfm: 'Open my Last.fm profile.',
    imageBeach:
      'Photo of me, a white person with shoulder-length brown hair, wearing sunglasses and a blue bucket hat on a beach.',
    changeLanguage: 'Change language to',
    langEn: 'English',
    langPt: 'Portuguese',
    nowLive: 'Now live.',
    audioButton: 'Listen to pronunciation',
    home: 'Home'
  },

  topbar: {
    content:
      "\"I'm sorry, the old Lucas can't come to the phone right now. Why? Oh 'cause they're %s!\" I've fully embraced my DoceAzedo nickname as the name that better represents who I am. I also wrote something about it.",
    highlight: 'dead',
    readMore: 'Learn more about it.'
  }
};
