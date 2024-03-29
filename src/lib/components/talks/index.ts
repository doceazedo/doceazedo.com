import { writable } from 'svelte/store';

export type Talk = {
  title: string;
  slug: string;
  date: Date;
  organizer: Organizer;
  replay: string;
  resources: Resource[];
};

export type Organizer = {
  name: string;
  slug: string;
  url: string;
};

export type Organizers = {
  [version: string]: Organizer;
};

export type Resource = {
  link?: {
    label: string;
    url: string;
  };
  html?: string;
};

const organizers: Organizers = {
  kotlinautas: {
    name: 'Kotlinautas',
    slug: 'kotlinautas',
    url: 'https://kotlinautas.dev'
  },
  nodebr: {
    name: 'NodeBR',
    slug: 'nodebr',
    url: 'https://nodebr.org'
  }
};

export const TALKS = writable<Talk[]>([
  {
    title: 'Aprenda a programar em Kotlin fazendo plugins para Minecraft',
    slug: 'plugin-minecraft-futebol-kotlin',
    date: new Date('09 Jul 2022'),
    organizer: organizers.kotlinautas,
    replay: 'https://twitch.tv/videos/1537950001',
    resources: [
      {
        link: {
          label: 'Baixar slides (PDF)',
          url: '/resources/plugin-minecraft-futebol-kotlin.pdf'
        }
      },
      {
        link: {
          label: 'Baixar mapa',
          url: '/resources/campinho-do-doce.zip'
        }
      },
      {
        link: {
          label: 'PaperMC',
          url: 'https://papermc.io/downloads'
        }
      },
      {
        link: {
          label: 'Maven',
          url: 'https://maven.apache.org/download.cgi'
        }
      },
      {
        link: {
          label: 'Extensão Minecraft Development',
          url: 'https://plugins.jetbrains.com/plugin/8327-minecraft-development'
        }
      },
      {
        link: {
          label: 'Documentação do Spigot',
          url: 'https://hub.spigotmc.org/javadocs/bukkit/'
        }
      },
      {
        link: {
          label: 'Fóruns do Spigot',
          url: 'https://www.spigotmc.org/forums/spigot-discussion.7/'
        }
      },
      {
        link: {
          label: 'Arquivos config.yml',
          url: 'https://gist.github.com/doceazedo/1fc20bb7bd63a7d3d217c5a830a55a86'
        }
      },
      {
        link: {
          label: 'Arquivo run.bat',
          url: 'https://gist.github.com/doceazedo/4f1c0e8f9a8b80150df489babd86e281'
        }
      },
      {
        html: 'Comando para fazer build do JAR: <code>mvn install</code>'
      }
    ]
  },

  {
    title: 'Mensageria e tarefas assíncronas com Node.js e BullMQ',
    slug: 'nodebr-bullmq',
    date: new Date('02 Oct 2023'),
    organizer: organizers.nodebr,
    replay: 'https://www.youtube.com/watch?v=CxTTt0zuXuU',
    resources: [
      {
        link: {
          label: 'Baixar slides (PDF)',
          url: '/resources/nodebr-bullmq.pdf'
        }
      },
      {
        link: {
          label: 'Código fonte',
          url: 'https://github.com/doceazedo/nodebr-bullmq'
        }
      },
      {
        link: {
          label: 'BullMQ',
          url: 'https://github.com/taskforcesh/bullmq'
        }
      },
      {
        link: {
          label: 'Bull Dashboard',
          url: 'https://github.com/felixmosh/bull-board'
        }
      }
    ]
  }
]);
