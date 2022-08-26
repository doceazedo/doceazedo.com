---
title: 'Como fazer autenticação com cookies usando SvelteKit e MongoDB'
description: 'Aprenda a desenvolver um simples sistema de login e senha'
date: '2021-10-03 19:14 GMT-3'
tags: ['sveltekit', 'mongodb']
icon: 'svelte'
---

> O código abaixo está atualizado com a versão `1.0.0-next.396` do SvelteKit, que pode quebrar (de novo) a qualquer momento. Se você perceber que algo não está mais funcionando, por favor, não hesite em me avisar.

Chegou o momento que eu precisei desenvolver aquela clássica autenticação com login e senha baseada em cookies. Nesse tutorial eu vou mostrar como eu fiz isso, com endpoints de login e registro e uma página acessível apenas para usuários que fizerem login.

## Instalar as dependências

Antes de começarmos, precisamos instalar alguns pacotes. Vou listar todos abaixo com seus devidos propósitos para que você entenda o que está instalando ou caso você queira substituir algum (e se substituir, comenta no fim da página o motivo 🤭):

- **cookie**, para definir e ler cookies;
- **crypto-js**, para criptografar senhas;
- **uuid**, para gerar tokens de sessão aleatórios;
- **mongoose**, para manipular o banco de dados.

Você pode instalar todos os pacotes acima com um único comando:

```bash
npm install cookie crypto-js uuid mongoose
# ou com yarn
yarn add cookie crypto-js uuid mongoose
```

## Configurar o MongoDB

Algumas versões do SvelteKit atrás, para usar variáveis de ambiente era necessário passá-las pelo Vite (que só funcionava com variáveis públicas) ou instanciar o dotenv por conta própria. Agora podemos importá-las diretamente do módulo `$env`, que funciona tanto com variáveis públicas, quanto privadas, mas também com valores dinâmicos.

Nesse caso, podemos definir uma variável **MONGODB_URI** com a URI de conexão com o MongoDB no arquivo **.env** na raíz do projeto, que fica mais ou menos parecido com isso:

```bash
MONGODB_URI="mongodb://usuario:senha@hostname:porta/?authSource=admin"
```

E sempre que precisarmos dessa variável, podemos importá-la da seguinte maneira:

```js
import { env } from '$env/dynamic/private';

const mongodbURI = env.MONGODB_URI;
// ou usando desestruturação
const { MONGODB_URI } = env;
```

E como estamos usando o Mongoose, também será necessário criar um schema para nossa coleção de usuários. Para isso, crie um arquivo chamado **user.js** dentro de uma pasta **models**, dentro de **src/lib**:

<p class="file-title">src/lib/models/user.js</p>

```js
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: String
});

export const UserModel = mongoose.models.Users || mongoose.model('Users', schema, 'Users');
```

Por fim, vamos criar também um arquivo **index.js** para exportar todos os schemas dessa pasta, mesmo que a primeiro momento só exista um:

<p class="file-title">src/lib/models/index.js</p>

```js
export { UserModel } from './user';
```

## Funções utilitárias

E já que estamos criando os arquivos iniciais, vamos criar uma pasta **utils** também dentro de **src/lib**. Lá nós podemos guardar nossas funções utilitárias que serão reusadas de modo geral pela nossa aplicação.

Assim sendo, crie um arquivo dentro de **utils** chamado **connect-database.js**, que será responsável por realizar a conexão com o MongoDB (ou usar uma conexão que já esteja disponível na memória):

<p class="file-title">src/lib/utils/connect-database.js</p>

```js
import mongoose from 'mongoose';
import { env } from '$env/dynamic/private';

const { MONGODB_URI } = env;

let promise = null;
let cached = null;

export const connectDatabase = async () => {
  if (cached) return cached;
  if (!promise) {
    promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
  const client = await promise;
  cached = { client };
  return cached;
};
```

Na mesma pasta, crie um arquivo de nome **set-cookie-headers.js**, que será responsável por definir os cookies de sessão do usuário. Ele retornará o cabeçalho que precisaremos enviar nas respostas dos endpoints de autenticação que ainda vamos implementar na nossa API:

<p class="file-title">src/lib/utils/set-cookie-headers.js</p>

```js
import * as cookie from 'cookie';

export const setCookieHeaders = (token, days = 90) => ({
  'Set-Cookie': cookie.serialize('token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * days,
    sameSite: 'strict',
    path: '/'
  })
});
```

Por fim, vamos criar também um arquivo **index.js** para exportar todas as funções dessa pasta:

<p class="file-title">src/lib/utils/index.js</p>

```js
export { connectDatabase } from './connect-database';
export { setCookieHeaders } from './set-cookie-headers';
```

## Configurar o hook.js

Agora precisamos criar o arquivo **hook.js** dentro de **src**. Esse arquivo nos permite manipular a requisição no servidor antes de renderizar a página ou chamar nosso endpoint, e é aqui que vamos verificar o token do usuário e definir novas sessões.

O nosso hook precisará exportar duas funções:

- `handle()`, que recebe um objeto `event` representando a requisição e uma função `resolve` que usa o roteador do SvelteKit para gerar uma resposta, logo deve sempre ser retornada
- `getSession()`, que recebe o mesmo objeto `event`, porém deve retornar um objeto `session` que será acessível ao cliente, logo não deve nunca conter informações sensíveis

<p class="file-title">src/hooks.js</p>

```js
import * as cookie from 'cookie';
import { connectDatabase } from '$lib/utils';
import { UserModel } from '$lib/models';

export const handle = async ({ event, resolve }) => {
  // Primeiro de tudo, precisamos conectar ao banco de dados
  await connectDatabase();

  // Depois, fazemos o parse dos cookies que vieram na requisição
  // Se não tiver um cookie chamado "token", podemos retornar
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  if (!cookies.token) return await resolve(event);

  // Agora vamos buscar o usuário pelo token, se encontrar,
  // vamos salvar os dados que queremos expor PUBLICAMENTE
  // em event.locals, para serem usados nas nossas páginas
  const user = await UserModel.findOne({ token: cookies.token });
  if (user)
    event.locals.user = {
      name: user.name,
      email: user.email
      // ...
    };

  // Por fim, retornamos o resolve(event)
  return await resolve(event);
};

// Aqui precisamos apenas retornar os dados do usuário
export const getSession = async (event) => ({
  user: event.locals.user || null
});
```

Se você estiver usando TypeScript, sua IDE deve estar dizendo que as propriedades que você definiu nos objetos `locals` e `session` não existem. Isso é por que você ainda deve adicionar os tipos de mesmo nome no arquivo **src/app.d.ts**, que nesse caso ficaria parecido com isso:

<p class="file-title">src/app.d.ts</p>

```ts
interface User {
  name: string;
  email: string;
}

declare namespace App {
  interface Locals {
    user: User;
  }

  interface Session {
    user: User;
  }
}
```

Se após atualizar esse arquivo sua IDE ainda não tiver atualizado os tipos, tente fechar e reabrir o programa (ou use `CTRL + R` no VS Code).

## Criar endpoints de autenticação

Agora é preciso criar dois arquivos, **register.js** e **login.js**, ambos implementarão o método POST e servirão para autenticar o usuário. Eu prefiro criá-los dentro de **src/routes/api/auth**, mas você pode criar esses arquivos diretamente em **src/routes/auth** ou onde achar melhor.

<p class="file-title">src/routes/api/auth/register.js</p>

```js
import sha256 from 'crypto-js/sha256.js';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { connectDatabase, setCookieHeaders } from '$lib/utils';
import { UserModel } from '$lib/models';

export const POST = async ({ request }) => {
  await connectDatabase();

  // Primeiro, fazemos o parse do corpo da requisição
  const body = await request.json();

  // Agora, buscamos um usuário com o e-mail informado
  // Se já existir um, retornamos uma mensagem de erro
  const user = await UserModel.findOne({ email: body.email });
  if (user)
    return {
      status: 409,
      body: {
        message: 'Esse e-mail já está cadastrado'
      }
    };

  // Vamos gerar um novo UUID que servirá de token de sessão
  const token = uuidv4();

  // Agora podemos registrar um novo usuário, já com o token
  await UserModel.create({
    name: body.name,
    email: body.email,
    password: sha256(body.password).toString(),
    token
  });

  // Usamos nossa função utilitária para definir os cookies
  const headers = setCookieHeaders(token);

  // Por fim, retornamos a sessão e uma mensagem de sucesso
  return {
    headers,
    body: {
      message: 'Registrado com sucesso'
    }
  };
};
```

<p class="file-title">src/routes/api/auth/login.js</p>

```js
import sha256 from 'crypto-js/sha256.js';
import { v4 as uuidv4 } from 'uuid';
import { connectDatabase, setCookieHeaders } from '$lib/utils';
import { UserModel } from '$lib/models';

export const POST = async ({ request }) => {
  await connectDatabase();
  const body = await request.json();

  // Vamos buscar um usuário com o e-mail informado
  const user = await UserModel.findOne({ email: body.email });

  // Se não houver ou se a senha for diferente, retornamos
  // uma mensagem de erro
  if (!user || user.password !== sha256(body.password).toString()) {
    return {
      status: 400,
      body: {
        message: 'E-mail e/ou senha inválidos'
      }
    };
  }

  // Vamos gerar um novo token, guardamos e definimos os cookies
  const token = uuidv4();
  await UserModel.updateOne({ email: body.email }, { token });
  const headers = setCookieHeaders(token);

  // Por fim, retornamos tudo com uma mensagem de sucesso
  return {
    headers,
    body: {
      message: 'Logado com sucesso'
    }
  };
};
```

## Criar página de login e registro

Agora estamos falando de frontend, ou seja, você é quem deve definir como essa página deve se parecer, como ela se comportará e afins. Para manter esse tutorial simples, vou montar uma página de login e outra de registro, ambas bem básicas, usando `fetch` para fazer as requisições e redirecionar para a página protegida.

<p class="file-title">src/routes/login.svelte</p>

```svelte
<script>
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';

  const handleSubmit = async () => {
    const resp = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await resp.json();

    // Redirecionar para página protegida
    goto('/profile');
  };
</script>

<h1>Autenticação com cookies 🍪🥛</h1>
<h2>Faça login:</h2>

<form on:submit|preventDefault={handleSubmit}>
  <input type="email" placeholder="E-mail" bind:value={email} />
  <input type="password" placeholder="Senha" bind:value={password} />
  <button type="submit">Login</button>
</form>

<p>
  Não tem uma conta? <a href="/register">Registre-se.</a>
</p>
```

<p class="file-title">src/routes/register.svelte</p>

```svelte
<script>
  import { goto } from '$app/navigation';

  let name = '';
  let email = '';
  let password = '';

  const handleSubmit = async () => {
    const resp = await fetch(`/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });
    const data = await resp.json();

    // Redirecionar para página protegida
    goto('/profile');
  };
</script>

<h1>Autenticação com cookies 🍪🥛</h1>
<h2>Registre-se:</h2>

<form on:submit|preventDefault={handleSubmit}>
  <input type="name" placeholder="Nome" bind:value={name} />
  <input type="email" placeholder="E-mail" bind:value={email} />
  <input type="password" placeholder="Senha" bind:value={password} />
  <button type="submit">Registrar</button>
</form>

<p>
  Já possui uma conta? <a href="/login">Faça login.</a>
</p>
```

Repare que as duas páginas são praticamente idênticas, com pequenas diferenças nos textos e nos campos. Essa é uma boa oportunidade para criar e reusar componentes, e implementar os [layouts](https://kit.svelte.dev/docs/layouts) do SvelteKit – fica aí a dica.

## Criar página protegida

Agora que o usuário já pode realizar login e registro, é hora de criar uma página que só aqueles que estiverem logados conseguem ver. Como, por exemplo, você pode criar uma página **/profile** que redireciona quem não tiver uma sessão de volta para a página de login:

<p class="file-title">src/routes/profile.svelte</p>

```svelte
<script>
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  export let session;
</script>

<h1>Seja bem-vinde, <b>{session.user.name}</b>! 😊👋</h1>
```

Você pode ainda deixar esse redirecionamento em um arquivo **\_\_layout.svelte** dentro de uma pasta para fazer com que todas as páginas lá dentro sejam protegidas, por exemplo:

<p class="file-title">src/routes/dashboard/__layout.svelte</p>

```svelte
<slot />
```

<p class="file-title">src/routes/dashboard/index.svelte</p>

```svelte
<script>
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  export let session;
</script>

<h1>Olá, <b>{session.user.name}</b>!</h1>
<p>Todas as páginas em /dashboard são protegidas, incluindo essa! 🤩🔓</p>
```

Alternativamente, você pode usar a mesma página para mostrar diferentes conteúdos, dependendo se o usuário estiver logado ou não:

<p class="file-title">src/routes/videos.svelte</p>

```svelte
<script>
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  export let session;
</script>

{#if session?.user}
  <h1>Seja bem-vinde, <b>{session.user.name}</b>! 😊👋</h1>
  <p>Esse é um conteúdo feito especialmente para você:</p>
  <!-- ... -->
{:else}
  <h1>Olá, visitante!</h1>
  <!-- ... -->
  <p>Já pensou em <a href="/register">criar uma conta</a>?</p>
{/if}
```

## Considerações finais

Há muito o que pode ser melhorado nesse código que foi deixado de lado em prol de simplificar o tutorial, por exemplo, criar controllers para a API e organizar as requisições do frontend em um arquivo separado.

Considere que se você realmente pretende fazer o seu próprio sistema de autenticação, existem muitas outras medidas de segurança que você deve tomar como, por exemplo, usar [password salting](https://websitesecuritystore.com/blog/what-is-password-salting) para armazenar senhas (o [bcrypt](https://www.npmjs.com/package/bcrypt) pode te ajudar com isso); usar [tokens CSRF](https://www.stackhawk.com/blog/node-js-csrf-protection-guide-examples-and-how-to-enable-it) para validar requisições e; mitigar ataques à força bruta como [enumeração de usuários](https://www.rapid7.com/blog/post/2017/06/15/about-user-enumeration). **Muitas das vezes, fazer um simples sistema de autenticação se torna tão complexo que é mais rápido, seguro e barato usar uma solução pronta.**

Lembre-se sempre que o retorno do `getSession()` no hook é exposto para o cliente, isso significa que você deve ter muito cuidado com os valores retornados por ele. Tenha sempre certeza de que nenhuma informação sensível ou interna está sendo retornada.

Nos endpoints de autenticação, você deve querer realizar verificações contra a requisição antes de cadastrar o usuário no seu banco de dados ou fazer login, para verificar se o e-mail informado é válido, por exemplo. Se estiver atrás de recomendações, eu sugiro usar o [yup](https://npmjs.com/package/yup) para cuidar disso.

No mais, você deve ter percebido que o banco de dados / ORM não impacta muito no desenvolvimento da aplicação, isso quer dizer que você pode facilmente substituir o Mongoose por, digamos, Prisma.

Divirta-se programando!
