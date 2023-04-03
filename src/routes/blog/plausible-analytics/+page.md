---
title: 'Rastreie as visitas do seu site de forma privativa com Plausible'
description: 'Descubra como rastrear as visitas do seu site sem negligenciar a privacidade'
date: '2023-04-03 17:54'
tags: ['analytics', 'privacidade']
icon: 'detective-emoji'
---

Eu sempre quis monitorar quantos acessos meu site recebe, saber de onde vem os acessos, em quais páginas as pessoas estão mais interessadas e coisas desse tipo. O problema pra mim é que serviços como o Google Analytics são invasivos demais.

Há pouco mais de um mês eu encontrei o [Plausible](https://plausible.io/), um serviço **💸 pago 💸** porém de código aberto, focado em privacidade e muito mais leve e fácil de usar. Eles não têm links de afiliados ou anúncios pagos, então esse é um tutorial/recomendação honesto.

## Primeiros passos

Para começar a usar o Plausible, basta se cadastrar para o teste gratuito de 30 dias, clicando no botão **Start free trial**. Não é necessário cartão de crédito e você decide se continua usando o serviço após o período de teste terminar. Durante esse período você terá acesso completo à plataforma.

![](/img/plausible-register-button.jpg)

A página de registro não tem mistério, é super simples! Você só precisa preencher o básico: **nome, e-mail e senha**. No próximo passo é você deverá confirmar sua conta com o código que foi enviado para o endereço de e-mail que você cadastrou.

![](/img/plausible-register-form.jpg)

Na próxima etapa, você deve informar o domínio do seu site, no meu caso, **doceazedo.com**, e o fuso horário em que os relatórios serão apresentados à você.

![](/img/plausible-register-domain.jpg)

## Adicionado o script no seu site

Com o cadastro dos seus dados pessoais e do seu site finalizados, nessa última etapa você vai terá um script que deve ser adicionado na tag `<head>` do seu site.

![](/img/plausible-snippet.jpg)

A maneira que você deve adicionar esse script no seu site vai variar um pouco de acordo com as ferramentas que você usa para desenvolver o mesmo. Como meu site é desenvolvido com [SvelteKit](https://kit.svelte.dev), tudo o que eu preciso fazer é adicionar esse script no arquivo `src/app.html`, acima de `%sveltekit.head%`:

<p class="file-title">src/app.html</p>

```html
<head>
  <!-- ... -->
  <script defer data-domain="doceazedo.com" src="https://plausible.io/js/script.js"></script>
  %sveltekit.head%
</head>
```

Se você usa um CMS, como o WordPress, por exemplo, você pode simplesmente instalar o plugin [Plausible Analytics](https://wordpress.org/plugins/plausible-analytics/), sem precisar adicionar o script manualmente.

Agora, se você não tem certeza de qual é o equivalente à ferramenta ou plataforma que você usa, você pode conferir os [guias de integração](https://plausible.io/docs/integration-guides) na documentação oficial do Plausible. Lá você encontra mais detalhes para rastrear o uso não só do seu site, mas também de aplicativos, pacotes e servidores.

Com o script adicionado, você pode clicar no botão **Start collecting data** nessa mesma página para começar a rastrear as visitas do seu site! 🥳

## Testando o Plausible

Tudo certo! Agora você deve ver um painel como esse. Os dados começarão a aparecer de acordo com as visitas que o seu site recebe.

![](/img/plausible-dashboard.jpg)

Se você ainda não conseguir ver essa página, ou caso os gráficos e tabelas estejam todos vazios, é necessário que você **acesse o seu site antes**.

Se mesmo após acessar seu site você não conseguir ver os dados do painel, **verifique se o Plausible foi instalado corretamente**. No seu site, você pode abrir o DevTools com a tecla `F12` e conferir manualmente se o script está de fato dentro da tag `<head>`.

<p align="center">
  <img src="/img/plausible-script.jpg">
</p>

Se o script não estiver aqui, você deve verificar se seguiu o passo a passo para integrar o Plausible com sua plataforma corretamente. Isso também pode significar que seu navegador está com uma versão desatualizada da página e limpar o cache (com `Ctrl` + `F5` no Windows/Linux ou `⌘` + `Shift` + `R` no Mac) pode ajudar a resolver.

Ainda não deu certo? Pode ser que você esteja com um adblocker ativado — eles também bloqueiam rastreadores como o Plausible e o Google Analytics — então é preciso que você **desabilite seu adblocker** ou adicione uma exceção para o seu site.

## Aprimorando os seus dados

Agora que o Plausible já está rastreando o tráfego do seu site, você pode ir ainda além e obter mais detalhes sobre quem o visita e como as pessoas interagem com ele. Então seguem algumas dicas! 💡

O painel permite ver a origem do tráfego do seu site e você pode usar tags como `?ref=exemplo` ao final dos links para rastrear fontes específicas, por exemplo, `?ref=newsletter` para rastrear quem acessa os posts do seu blog através da sua newsletter. _Você pode ver isso na prática assinando a minha newsletter no fim da página._ 🤭

Você também pode usar atributos como `plausible-event-name="Exemplo"` para rastrear clicks em botões e links específicos. Nesse caso é necessário adicionar outro script ao `<head>` junto ao anterior. Eles são quase iguais, com a diferença que esse termina em `script.tagged-events.js`:

```html
<script defer data-domain="doceazedo.com" src="https://plausible.io/js/script.js"></script>
<script defer data-domain="doceazedo.com" src="https://plausible.io/js/script.tagged-events.js"></script>
```

No painel, você também pode habilitar o recebimento de relatórios semanais e mensais com as análises de visitas do seu site. Você também pode receber um e-mail sempre que houver um pico de visitantes no seu site.

<p>
  <video autoplay loop controls>
    <source src="/video/plausible-email-reports.mp4" type="video/mp4">
  </video>
</p>

## E pra finalizar...

Por fim, você deve ter percebido também que adblockers bloqueiam serviços de analytics, mesmo que eles sejam focados em privacidade como o Plausible. Se você estiver preocupado em estar perdendo dados, _~~eu recomendo que você [leia o meu post](/plausible-proxy) sobre configurar um proxy na Vercel para evitar que adblockers bloqueiem o Plausible~~_ **(SOON™)**.

Como mencionado, o Plausible tem o [código aberto](https://github.com/plausible/analytics) e você pode hospedar a [sua própria instância](https://plausible.io/docs/self-hosting) e ter controle total dos seus dados (e quem sabe até não pagar nada por isso)!
