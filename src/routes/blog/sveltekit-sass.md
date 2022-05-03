---
title: 'Como usar Sass (ou SCSS) no seu projeto SvelteKit'
date: '2021-08-28 00:22 GMT-3'
tags: ['sveltekit', 'sass']
icon: 'svelte'
---

Boas notícias! Desde que eu escrevi esse post, o SvelteKit atualizou e já vem com o preprocess instalado e configurado. Isso significa que tudo o que você precisa fazer para usar Sass ou SCSS no seu projeto é instalar o pacote `sass`:

```bash
npm install -D sass
# ou com yarn
yarn add -D sass
```

Sim, é só isso! 🎉 Agora você pode usar a tag `<style lang="sass">` dentro dos seus componentes:

```svelte
<style lang="sass">
  @import 'vars.sass'

  div
    color: $primary
    border-radius: .5rem
</style>
```

E se você prefere SCSS ao invés de Sass, é só trocar a linguagem de `sass` para `scss` na tag `<style>` e pronto:

```svelte
<style lang="scss">
  @import 'vars.scss';

  div {
    color: $primary;
    border-radius: 0.5rem;
  }
</style>
```

Agora uma dica: pode ser um pouco chato ter que escrever essa tag manualmente, principalemente se você sempre usa Sass, por isso eu criei um snippet no meu VSCode que faz isso por mim. É só abrir a paleta de comandos com **[F1]**, selecionar **Preferences: Open User Snippets** e criar um novo snippet com o seguinte código:

```json
{
  "Add SASS style tag": {
    "prefix": "style:sass",
    "body": [
      "<style lang=\"sass\">",
      "  $0",
      "</style>"
    ],
    "description": "Add SASS style tag"
  }}
}
```

Com isso, ao invés de digitar a tag manualmente, você só precisa digitar **"style:sass"** dentro do seu arquivo.

Aproveite!
