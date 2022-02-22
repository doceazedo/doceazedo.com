import type { Language } from '.';

export const en: Language = {
  code: 'en',

  navbar: {
    home: 'Home',
    blog: 'Blog',
    about: 'About me',
    contact: 'Contact'
  },

  blurb: {
    title: "I'm Lucas Fernandes.",
    paragraph: [
      'I am a frontend developer, specially for the web,',
      'building stylish and responsive layouts yet',
      'designing well structured APIs and databases.'
    ],
    button: 'Keep in touch'
  },

  skills: {
    title: 'What I like to do',
    paragraph: [
      'I should probably change this section to a list of reasons that makes me',
      "love Svelte so much. For now, I'll just leave these other tech I like:"
    ]
  },

  portfolio: {
    title: 'My latest projects and works',
    projects: [
      {
        title: 'Semaninha',
        description:
          'Open-source website developed with SvelteKit and Puppeteer that allows you to generate collages with your top listened songs, using the last.fm API.'
      },
      {
        title: 'convergencia.net.br',
        description:
          'Corporate website developed with WordPress and ACF for Convergência Digital, a telemarketing and RA company from Minas Gerais, Brazil.'
      },
      {
        title: 'grupostelegram.com.br',
        description:
          'Powered by React with Next.js and Chakra UI, the Grupos Telegram website is one of the biggest Telegram group and channel indexers in Brazil.'
      },
      {
        title: 'Overlay + Bot',
        description:
          'In my live coding streams on Twitch, every overlay visuals and chat commands are being developed with Svelte and SvelteKit.'
      },
      {
        title: 'doceazedo.com',
        description:
          'A place with my social media, chat commands and everything related to my Twitch livestreams. Also actively developed with Svelte and SvelteKit.'
      }
    ]
  },

  articles: {
    title: 'Latest articles',
    paragraph: [
      'I pretty much rather reading articles than watching tutorials, so',
      'here I gather stuff that I learned and want to share.'
    ],
    more: 'View all'
  },

  footer: ['Powered by Svelte & SvelteKit', 'Developed by Lucas Fernandes'],

  blog: {
    subtitle:
      'I pretty much rather reading articles than watching tutorials, so here I gather stuff that I learned and want to share. I hope you find something that grabs your attention.'
  },

  about: {
    subtitle: 'Curiosity-driven developer, Svelte evangelist and live coding streamer',
    intro:
      'Hi, my name is Lucas. I am a frontend developer based in Minas Gerais, Brazil. Here on this site I gather some of my work and pieces of knowledge that I would like to share with the world.',
    factsIntro:
      "If you're on this page maybe you'll find some of these random facts about me fun (or something...):",
    facts: [
      'My favorite Netflix series of all time is Sense8',
      'Hunger Games is my favorite book trilogy',
      'Although being quite young, I used a lot of Orkut, MSN, eMule and the like',
      'I made my very first email address at 5 years old',
      'According to my mom, I learned to read on the computer so I could use it by myself',
      'I have managed a few public Minecraft servers, <a href="https://youtube.com/results?q=&quot;servidor+sem+nome&quot;" target="_blank">the last one</a> was opened in 2020 and soon closed in 2021',
      'At high school, I enjoyed writing and drawing more than any specific subject',
      'I really like tattoos and I have three of them at the moment:'
    ],
    tattoosTitle: 'My tattoos',
    tattoos: [
      'The tattoo on the first image was the first one I did, in August 2020. It is the Tin Man, protagonist of the music video <a href="https://www.youtube.com/watch?v=DP3j6hgS4VY" target="_blank">Na Sua Estante</a> by Pitty. It\'s a song I love since I was little and my connection to it grows every time I play it.',
      'The second is a venus fly trap, in reference to the song of the same name, <a href="https://song.link/br/i/1562845907" target="_blank">Venus Fly Trap</a> by MARINA. I\'ve been wanting to tattoo something that refers to her songs since I first heard the <a href="https://album.link/br/i/612448612" target="_blank">Electra Heart</a> album. With the release of the flawless <a href="https://album.link/br/i/1562845738" target="_blank">Ancient Dreams in a Modern Land</a> now in 2021, I felt inspired to finally immortalize one of her artworks in my body.',
      "My most recent one (which I made with the previous one) is Napstablook, a character from the indie game Undertale, one of the few games that captured my interest. He is a melancholic ghost that likes music, and judging by my other tattoos, it's easy to notice that I identify a lot with him."
    ],
    keepInTouchTitle: 'Wanna talk?',
    socialsIntro:
      "I'm not the most online person on social media in the world, but you can easily find me on one of these platforms (in descending order of activity):",
    socials: [
      'DoceAzedo#0991 on <a href="https://discord.com/users/241978119899185165" target="blank">Discord</a>',
      '@doceazedo911 on <a href="https://twitter.com/doceazedo911" target="blank">Twitter</a>',
      '@eightavocados on <a href="https://t.me/eightavocados" target="blank">Telegram</a>',
      '@doceazedo911 on <a href="https://instagram.com/doceazedo911" target="blank">Instagram</a>'
    ],
    livestream:
      'I\'m also live on <a href="https://twitch.com/doceazedo911" target="blank">Twitch</a> from Tuesday to Thursday starting at 7:30pm (GMT -3) coding and chatting with the amazing people that show up there.',
    nickname:
      '"What nickname is that, <i>doceazedo911</i>?" — question you probably didn\'t ask. But to answer anyway, that\'s the username I\'ve been using around the internet since Lady Gaga released her album <a href="https://album.link/br/i/1500951604" target="_blank">Chromatica</a> in May 2020 and I\'ve been putting together the songs <a href="https://song.link/br/i/1500952438" target="_blank">Sour Candy</a> (in portuguese, "doce azedo") and <a href="https://song.link/br/i/1500952435" target="_blank">911</a> ever since.',
    hardwareTitle: 'My hardware',
    hardware: [
      'CPU: <span>AMD Ryzen 3600X</span>',
      'Motherboard: <span>Gigabyte B450M DS3H</span>',
      'Memory: <span>24GB (3x8) Crucial Ballistix Sport LT 3000MHz</span>',
      'GPU: <span>EVGA GTX 1660</span>',
      'Storage: <span>480GB SSD Crucial BX500 + 500GB HDD Western Digital</span>',
      'Case: <span>Corsair Carbide Series SPEC-DELTA RGB</span>',
      'Displays: <span>Samsung 24" 75hz 1ms + AOC 18.5"</span>',
      'Keyboard: <span>Redragon Kumara</span>',
      'Mouse: <span>Redragon Cobra</span> <small>(Valorant: sensibility 0.45 e 800 DPI)</small>',
      'Drawing tablet: <span>Wacom CTL472</span> <small>(osu: full area, 1366x768 windowed mode with 1920x1080 display)</small>',
      'Headset: <span>Logitech Prodigy G733</span>',
      'Microphone: <span>HyperX QuadCast</span>',
      'Earbuds: <span>Galaxy Buds+</span>',
      'Webcam: <span>Logitech C922 Pro</span>'
    ]
  },

  contact: {
    title: 'Get in touch',
    paragraph:
      "If you want to hire me, talk about a project or just chat with no commitment, let's do it!",
    telegramButton: '@eightavocados on Telegram'
  },

  email: 'me@lucasfernandes.com.br',
  posted: 'Published'
};
