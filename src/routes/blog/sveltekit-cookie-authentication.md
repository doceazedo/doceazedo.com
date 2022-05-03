---
title: 'Como fazer autenticação com cookies usando SvelteKit e MongoDB'
date: '2021-10-03 19:14 GMT-3'
tags: ['sveltekit', 'mongodb']
icon: 'svelte'
---

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

Eu pessoalmente acho que [usar variáveis de ambiente com SvelteKit](https://kit.svelte.dev/faq#env-vars) é no mínimo irritante. Para acessar o banco, você vai precisar adicionar a URI de conexão com o MongoDB numa variável **VITE_MONGODB_URI** no arquivo **.env** na raíz do projeto. Depois será necessário criar uma pasta **utils** dentro de **src**, com dois arquivos.

O primeiro é o **env.js**, que vai exportar nossas variáveis de ambiente para o resto do projeto. Tome **muito cuidado** aqui, pois citar uma variável com o prefixo "VITE\_" no front-end irá **expor seu valor** para o cliente.

<p class="file-title">src/utils/env.js</p>

```js
export const MONGODB_URI = import.meta.env.VITE_MONGODB_URI;
```

O segundo arquivo a ser criado é o **connect-database.js**, que vai realizar a conexão com o MongoDB ou já usar uma que esteja disponível na memória.

<p class="file-title">src/utils/connect-database.js</p>

```js
import mongoose from 'mongoose';
import { MONGODB_URI } from './env';

let promise = null;
let cached = null;

const connectDatabase = async () => {
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

export default connectDatabase;
```

E como estamos usando o Mongoose, também será necessário criar um schema para nossa coleção de usuários. Para isso, crie um arquivo chamado **user.js** dentro de uma pasta **models**, dentro de **src**:

<p class="file-title">src/models/user.js</p>

```js
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  email: String,
  password: String,
  token: String
});

export default mongoose.models.Users || mongoose.model('Users', schema, 'Users');
```

Para facilitar o possível uso de múltiplos models no futuro, eu recomendo também criar um **index.js** para exportar todos eles, dessa forma:

<p class="file-title">src/models/index.js</p>

```js
export { default as UserModel } from './user';
```

## Configurar o hook.js

Agora precisamos criar o arquivo **hook.js** dentro de **src**. Esse arquivo nos permite manipular a requisição no servidor antes de renderizar a página ou rodar o endpoint. É aqui que vamos lidar com a definição e leitura das sessões. O arquivo deverá ficar mais ou menos assim:

<p class="file-title">src/hooks.js</p>

```js
import * as cookie from 'cookie';
import connectDatabase from './utils/connect-database';
import { UserModel } from './models';

export const handle = async ({ request, resolve }) => {
  await connectDatabase();
  const cookies = cookie.parse(request.headers.cookie || '');
  request.locals.user = cookies;

  const userSession = await UserModel.findOne({ token: cookies.token });

  if (userSession) {
    // Definir um objeto "user" com suas informações
    request.locals.user = {
      logged: true,
      email: userSession.email
    };
  }

  const resp = await resolve(request);
  return resp;
};

// Enviar o objeto "user" para o front-end
export const getSession = async (request) =>
  request.locals?.user?.logged ? { user: request.locals.user } : {};
```

## Criar endpoints de autenticação

Agora é preciso criar dois arquivos, **register.js** e **login.js**, ambos implementarão o método POST e servirão para autenticar o usuário. Eu prefiro criá-los dentro de **src/routes/api/auth** para ter certeza que eles serão tratados como _funções serverlesss_ pela Vercel, mas você pode criar esses arquivos diretamente em **src/routes/auth** ou onde achar melhor.

<p class="file-title">src/routes/api/auth/register.js</p>

```js
import sha256 from 'crypto-js/sha256.js';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { connectDatabase } from '../../../utils';
import { UserModel } from '../../../models';

export const post = async ({ body }) => {
  await connectDatabase();

  // Verificar se já existe algum registro com o e-mail informado
  const user = await UserModel.findOne({ email: body.get('email') });
  if (user) {
    return {
      status: 409,
      body: {
        error: 'Esse e-mail já está cadastrado'
      }
    };
  }

  // Cadastrar usuário já com um novo token de sessão
  const token = uuidv4();
  await UserModel.create({
    email: body.get('email'),
    password: sha256(body.get('password')),
    token
  });

  // Definir a sessão
  const headers = {
    'Set-Cookie': cookie.serialize('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict',
      path: '/'
    })
  };

  return {
    status: 200,
    headers,
    body: {
      message: 'Registrado com sucesso'
    }
  };
};
```

<p class="file-title">src/routes/api/auth/login.js</p>

```js
import CryptoJS from 'crypto-js';
import sha256 from 'crypto-js/sha256.js';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { connectDatabase } from '../../../utils';
import { UserModel } from '../../../models';

export const post = async ({ body }) => {
  await connectDatabase();

  // Verificar se o e-mail informado está registrado
  // Depois, verificar se as senhas conferem
  const user = await UserModel.findOne({ email: body.get('email') });
  if (!user || user.password !== sha256(body.get('password')).toString(CryptoJS.enc.Hex)) {
    return {
      status: 400,
      body: {
        error: 'E-mail e/ou senha inválidos'
      }
    };
  }

  // Gerar novo token de sessão e guardar
  const cookieId = uuidv4();
  await UserModel.updateOne({ email: body.get('email') }, { cookieId });

  // Definir a sessão
  const headers = {
    'Set-Cookie': cookie.serialize('session_id', cookieId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict',
      path: '/'
    })
  };

  return {
    status: 200,
    headers,
    body: {
      message: 'Logado com sucesso'
    }
  };
};
```

## Criar página de login e registro

Agora estamos falando de front-end, ou seja, você é quem deve definir como essa página deve se parecer, como ela se comportará e afins. Para manter esse tutorial simples, vou montar uma página básica que usa **fetch** para fazer as requisições e redirecionar para a página protegida.

<p class="file-title">src/routes/index.svelte</p>

```svelte
<script>
  import { goto } from '$app/navigation';

  let email = '', password = '';

  const submit = endpoint => {
    const res = await fetch(`/api/auth/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    });
    const data = await res.json();

    if (data.error)
      return console.log(data.error);

    // Redirecionar para página protegida
    goto('/perfil');
  };
</script>

<h1>Autenticação com cookies 🍪🥛</h1>

<div>
  <h2>Registrar</h2>
  <input type="email" placeholder="E-mail" bind:value={email} />
  <input type="password" placeholder="Senha" bind:value={password} />
  <button on:click={() => submit('register')}>Registrar</button>
</div>

<div>
  <h2>Login</h2>
  <input type="email" placeholder="E-mail" bind:value={email} />
  <input type="password" placeholder="Senha" bind:value={password} />
  <button on:click={() => submit('login')}>Login</button>
</div>
```

## Criar página protegida

Agora que o usuário já pode realizar login e registro, é hora de criar uma página que só aqueles que estiverem logados conseguem ver. Como exemplo, você pode criar uma página **/perfil**:

<p class="file-title">src/routes/perfil.svelte</p>

```svelte
<script context="module">
  export async function load({ session }) {
    return {
      props: {
        session
      }
    };
  }
</script>

<script>
  export let session;
</script>

{#if session?.user?.logged}
  <h1>✅ Você se conectou como <b>{session.user.email}</b>!</h1>
{:else}
  <h1>❌ Você não pode visualizar essa página!</h1>
  <a href="/">Voltar ao início</a>
{/if}
```

Alternativamente, você pode redirecionar quem não estiver logado para uma outra página:

<p class="file-title">src/routes/perfil.svelte</p>

```svelte
<script context="module">
  export async function load({ session }) {
    if (!session?.user?.logged) {
      return {
        status: 302,
        redirect: '/desconectado'
      };
    }

    return {
      props: {
        session
      }
    };
  }
</script>

<script>
  export let session;
</script>

<h1>✅ Você se conectou como <b>{session.user.email}</b>!</h1>
```

## Considerações finais

Eu gostaria de agradecer imensamente ao Nikolas Blahušiak, que se esforçou para reunir todas essas informações numa [resposta no Stack Overflow](https://stackoverflow.com/questions/69066169/how-to-implement-cookie-authentication-sveltekit-mongodb/). Eu tomei a liberdade de adaptar o conteúdo dele com mudanças que fazem mais sentido numa aplicação real, usando outras bibliotecas e com um código ligeiramente mais simples.

No **hook.js**, eu recomendo que você envie apenas os dados do usuário que você precisa utilizar no front-end para evitar expor dados internos ou sensíveis, como o ID do registro ou sua senha.

Nos endpoints de autenticação, você deve querer realizar verificações contra a requisição antes de cadastrar o usuário no seu banco de dados ou fazer login. Se estiver atrás de recomendações, eu sugiro usar o [yup](https://npmjs.com/package/yup) para cuidar disso.
