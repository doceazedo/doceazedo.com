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
    replay: 'https://twitch.tv/lissatransborda/videos',
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
          label: 'Arquivos config.yml',
          url: 'https://gist.github.com/doceazedo/1fc20bb7bd63a7d3d217c5a830a55a86'
        }
      },
      {
        html: 'Comando para fazer build do JAR: <code>mvn install</code>'
      }
    ]
  }
]);
