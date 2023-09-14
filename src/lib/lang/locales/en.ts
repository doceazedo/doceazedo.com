import type { Language } from '..';

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
    new: 'New!',
    readingTime: '%smin read'
  },
  footer: ['Powered by Svelte & SvelteKit', 'Developed by DoceAzedo'],
  about: {
    tldr: {
      online: {
        key: 'Online',
        value: 'DoceAzedo'
      },
      physically: {
        key: 'Physically',
        value: 'São Paulo, Brasil'
      },
      professionally: {
        key: 'Professionally',
        value: 'Frontend Developer @ %s'
      },
      casually: {
        key: 'Casually',
        value: 'Live coding, hyperpop, clubbing culture'
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
      photoCaption: 'Me in Paris with the Eiffel Tower on the background (2022)',
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
      fazendoca:
        'A social game about taking care of your farm, made on UE5 with a SvelteKit REST API, currently on early development.',
      overlay:
        'A set of visual scenes and interactive commands to spice up my live coding streams on Twitch.',
      ssn: 'A Minecraft server with no rules, open-source, with its own first-party web authentication, plugins and patches.',
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
    pronouns: {
      title: 'Pronouns',
      subtitle:
        'Use the following command to let everyone know how to refer to you (PT-BR only for now):',
      command: 'pronouns',
      copy: 'Copy command'
    },
    tts: {
      title: 'TTS',
      subtitle:
        'The TTS command can be used to send voice messages, simple as that. If you want to go a step further, several different voices, languages and features are available:',
      usage: {
        default: 'Use %s to send a voice message with a random Brazilian TikTok voice',
        google: 'Use %s to send a voice message with the Brazilian Google female voice',
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
  thankBusDriver: 'You thanked the bus driver',
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
    home: 'Home',
    setup:
      'Picture of my desk with my laptop, display, computer case, microphone, keyboard, headphones, drawing tablet, two knifes and a water bottle on top. There is a phone tripod besides the desk.'
  },
  topbar: {
    content:
      "\"I'm sorry, the old Lucas can't come to the phone right now. Why? Oh 'cause they're %s!\" I've fully embraced my DoceAzedo nickname as the name that better represents who I am. I also wrote something about it.",
    highlight: 'dead',
    readMore: 'Learn more about it.'
  },
  settings: {
    title: 'Preferences',
    theme: 'Background',
    colorTheme: 'Theme color',
    fontSize: 'Font size',
    readingWidth: 'Reading length',
    lineHeight: 'Line height',
    dyslexiaFont: 'Use font for dyslexia',
    elevatorSpeed: 'Elevator speed',
    resetLabel: 'Use default settings',
    resetButton: 'Reset',
    themes: {
      purple: 'Grape',
      blue: 'Blue coast',
      orange: 'Coquelicot',
      carmine: 'Raspberry',
      green: 'Mint',
      pink: 'Flamingo',
      fortnite: 'Fortnite'
    },
    themeUnlock: 'New color theme unlocked:',
    fontSizes: ['Small', 'Regular', 'Large', 'Huge'],
    lineHeights: ['Condensed', 'Default', 'Spaced'],
    noLightMode: 'This theme does not support light mode',
    adhdMode: 'Low attention span'
  },
  uses: {
    title: 'Uses',
    paragraph: 'All sorts of apps, settings and services I use for my daily life and development',
    hardware: {
      title: 'My hardware',
      mainPC: 'Main PC',
      gamingPC: {
        title: 'Gaming PC',
        items: {
          cpu: 'CPU',
          mobo: 'Motherboard',
          ram: 'RAM',
          gpu: 'GPU',
          psu: 'PSU',
          storage: 'Storage',
          case: 'Case'
        }
      },
      peripherals: {
        items: {
          display: 'Display',
          keyboard: 'Keyboard',
          mouse: 'Mouse',
          tablet: 'Drawing tablet',
          headphone: 'Headphone',
          mic: 'Microphone',
          webcam: 'Camera',
          desk: 'Desk',
          chair: 'Chair'
        }
      }
    },
    general: {
      title: 'General',
      items: {
        browser: 'for web browsing',
        music: 'for music streaming',
        passwordManager: 'for password management',
        docs: 'for writing documents',
        slides: 'for making presentations',
        cloud: 'for cloud storage and file sync'
      }
    },
    productivity: {
      title: 'Productivity',
      items: {
        notes: 'for note taking and task management',
        drafts: 'for drafts, diagrams and whiteboard',
        raycast: 'for a Spotlight and emoji picker alternative',
        screenshot: 'for screenshots and screen recordings',
        videoEditing: 'for video editing'
      }
    },
    coding: {
      title: 'Coding',
      items: {
        ide: 'for general development',
        ideKotlin: 'for Kotlin development',
        terminal: 'for terminal emulator'
      },
      vscode: {
        theme: 'for theme',
        font: 'for font',
        settings: 'Settings and extensions'
      },
      web: {
        title: 'Web development',
        items: {
          language: 'as my preferred language',
          svelte: 'as my preferred framework',
          svelteKit: 'as my preferred meta-framework',
          css: 'for styling',
          icons: 'for beautiful and cohesive icons',
          brandIcons: 'for brand icons',
          bundler: 'for frontend tooling',
          tests: 'for writing unit tests',
          hosting: 'for hosting'
        }
      }
    },
    streaming: {
      title: 'Streaming',
      items: {
        obs: 'for streaming and screen recording',
        chat: 'for Twitch chat',
        audio: 'for Mac audio routing'
      }
    },
    design: {
      title: 'Design',
      items: {
        figma: 'for UI design and prototyping',
        illustrator: 'for general vector design',
        photopea: 'for general image editing'
      }
    },
    social: {
      title: 'Social',
      items: {
        mastodonWeb: 'for Mastodon web client',
        mastodonMobile: 'for Mastodon iOS client',
        tweetdeck: 'for a better Twitter experience',
        discord: 'for joining and managing communities'
      }
    },
    utils: {
      title: 'Utilities',
      items: {
        pxToRem: 'for bidirectional PX to REM converter',
        gridGenerator: 'for generating CSS grids',
        svgomg: 'for optimizing SVGs',
        bulkResize: 'for resizing and optimizing images',
        icons: 'for browsing icon packs and emoji fonts'
      }
    },
    extensions: {
      title: 'Extensions',
      items: {
        adblocker: 'for blocking ads',
        darkReader: 'for dark mode everywhere',
        rss: 'for RSS reader',
        wappalyzer: 'for fiding out what stack a website is built with',
        jsonViewer: 'for viewing JSONs',
        hardRefresh: 'for all your cache problems',
        ogChecker: 'for previewing social metatags locally',
        youtubeDislike: 'for showing YouTube dislikes',
        youtubeQuality: 'for forcing HD videos on YouTube',
        youtubeSponsorBlock: 'for skipping sponsor segments on YouTube'
      }
    }
  }
};
