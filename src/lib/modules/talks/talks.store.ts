import { writable } from 'svelte/store';
import type { Promoters, Talk } from './talks.types';

const promoters: Promoters = {
  kotlinautas: {
    name: 'Kotlinautas',
    slug: 'kotlinautas',
    url: 'https://kotlinautas.dev'
  }
};

export const TALKS = writable<Talk[]>([
  {
    title: 'Aprenda a programar em Kotlin fazendo plugins para Minecraft',
    slug: 'plugin-minecraft-futebol-kotlin',
    date: new Date('09 Jul 2022'),
    promoter: promoters.kotlinautas,
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
  }
]);
