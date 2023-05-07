---
title: 'Operação Sofá: Como eu hackeei um banco de dados CouchDB'
description: '...e acabei comprometendo uma máquina e escalonando privilégios de root. Ops.'
date: '2023-05-07 01:56'
tags: ['infosec', 'ctf', 'hacking']
icon: 'technologist-emoji'
---

Meu amigo [Leozinho](https://github.com/leoggo) me chamou pra jogar rouba-bandeira. Eu, inocentemente, aceitei sem saber que se tratava na verdade de um CTF (**C**apture **t**he **F**lag), um desafio de segurança da informação onde você deve hackear um sistema para conseguir uma chave secreta.

O desafio que ele escolheu pra mim foi o [Couch](https://tryhackme.com/room/couch) na plataforma [TryHackMe](https://tryhackme.com/). Dando uma olhada na página, podemos ver que a dificuldade é fácil e o objetivo final é conseguir privilégios na máquina para acessar o arquivo com a chave secreta e, durante o percurso, devemos encontrar outras informações que serão solicitadas e vão nos guiar até a bandeira.

## Preparando o ambiente

Para começar o desafio, eu iniciei uma máquina virtual com o [ParrotOS](https://www.parrotsec.org), uma distribuição Linux que vem repleta de ferramentas úteis relacionadas a cibersegurança, similar ao Kali Linux (porém com suporte ao Apple Sillicon) e perfeito para participar de desafios como esse sem sujar sua máquina principal.

Com o Linux inicializado, eu conectei na VPN da máquina que o TryHackMe forneceu e anotei o IP.

## Quantas portas estão abertas?

Essa foi a primeira pergunta. Como eu descubro quantas portas estão abertas? Eu também não sei, então pesquisei como listar as portas abertas num IP específico e cheguei a esse comando usando o `nmap`:

```sh
nmap 10.10.204.9
```
O comando apontou que havia apenas uma porta aberta, a `22`. Essa porta é padrão para SSH, o que pode ser útil mais tarde se precisarmos acessar a máquina. Tentei responder "1" e a resposta estava... **errada!**

Pensei um pouco e, realmente, se nós vamos hackear um banco de dados, eu esperaria que a porta do banco talvez também estivesse aberta. Pesquisei então como listar **todas** as portas abertas usando o `nmap` e assim descobri que, por padrão, o `nmap` só escaneia as 1000 portas mais comuns e que eu precisaria usar a flag `-p-` para escanear todas as 65532 portas do computador:

```sh
nmap -p- 10.10.204.9
```

Depois de 16 longos minutos, ele encontrou mais uma só porta, a `5984`. A resposta certa era "2".

## Acessando o CouchDB

Usando o comando `curl 10.10.204.9:5984` (ou acessando essa URL no navegador), podemos ver alguns dados sobre a aplicação rodando nessa porta, confirmando assim que é de fato o **CouchDB** na versão **1.6.1**:

```json
{
  "couchdb": "Welcome",
  "uuid": "ef680bb740692240059420b2c17db8f3",
  "version": "1.6.1",
  "vendor": {
    "version": "16.04",
    "name": "Ubuntu"
  }
}
```

O desafio pergunta também quais as rotas para o painel administrativo do banco de dados e para listar todos os bancos. Uma rápida pesquisa no Google nos trás `_utils` e `_all_dbs`, respectivamente. Podemos acessar essas rotas no navegador para confirmar a resposta e ter acesso total ao banco:

![](/img/tryhackme-couch-utils.jpg)

Sem senha nem nada? Isso tá muito bom pra ser verdade... 🤨

Enfim... o banco “secret” chama atenção logo de cara. Ao abrí-lo, nós podemos ver um campo “passwordbackup” com um conjunto de usuário e senha sem nenhum tipo de criptografia:

![](/img/tryhackme-couch-secret.jpg)

## Comprometendo a máquina

Nossa próxima missão é encontrar a chave num arquivo "user.txt" nessa máquina. Usando as informações que nós coletamos até agora, nós sabemos que provavelmente nós podemos acessar a máquina via SSH e também temos um conjunto de usuário e senha.

Naturalmente, cabe a nós tentar acessar o SSH usando essas credenciais. Eu já precisei fazer isso antes, mas usando chaves, então tive que pesquisar como fazer login com usuário e senha e cheguei a esse comando:

```sh
ssh atena@10.10.204.9
```

A senha é solicitada logo em seguida e, de fato, o usuário e senha estão corretos. Conseguimos acesso à maquina. Hackeamos o mainframe. 😎

![](/img/tryhackme-couch-ssh.jpg)

Agora vamos encontrar o arquivo "user.txt". Podemos começar usando `ls` para listar os arquivos no diretório atual e... tá aqui. O arquivo já tá aqui. E podemos pegar a chave imprimindo o conteúdo do arquivo com o comando `cat user.txt` e *voilà*: `THM{1ns3cure_couchdb}` ✨

<p align="center">
  <img src="/img/hacker-im-in.gif" />
</p>

## Escalonando privilégios

É aqui onde o filho chora e a mãe não vê. Ou, nesse caso, onde eu choro e o Leozinho ri. Nós agora precisamos escalar nossos privilégios para encontrar a chave final — ou bandeira — no arquivo "root.txt".

Partindo do princípio de que precisaríamos ter acesso total à máquina para acessar esse arquivo, tentei usar `sudo ls` para ver se tinha algum outro arquivo que eu não conseguia ver antes. Nem sei se isso faz diferença, acho que não, mas foi aí que eu descobri que esse usuário não tem permissão para usar `sudo`:

```sh
atena is not in the sudoers file. This incident will be reported.
```

Tentei descobrir que usuários estavam nesse tal arquivo de "sudoers". Encontrei alguns comandos diferentes na internet, mas todos me apontavam que não havia nenhum. Então, em teoria, eu teria que conseguir acesso ao root — o usuário supremo do sistema com acesso à tudo. *Escrevendo isso agora parece meio óbvio, né? Afinal, a gente tá procurando o arquivo "root.txt".*

Pesquisei então sobre como escalonar privilégios no Linux e encontrei [esse artigo do Joseph Carson](https://delinea.com/blog/linux-privilege-escalation) que explica com muitos detalhes como funcionam as permissões no Linux e algumas técnicas, exploits e ferramentas para automatizar esse processo. O conteúdo é muito rico e explica tudo muito bem de uma ponta à outra, recomendo a leitura.

A primeira ferramenta que o Joseph listou foi o [LinEnum](https://github.com/rebootuser/LinEnum), um script que enumera uma extensa lista de informações e possíveis vetores de ataque em uma máquina. Esse artigo não detalha como usar o script, então achei um [outro post](https://null-byte.wonderhowto.com/how-to/use-linenum-identify-potential-privilege-escalation-vectors-0197225/) e, em suma, é só baixar o arquivo na máquina da vítima, tornar o script executável, rodar e analisar as informações.

Então assim eu fiz, criei uma pastinha pra deixar tudo organizado, afinal, nós somos hackers e não mal educados, e daí  baixei o script usando `wget`:

```sh
mkdir linenum
cd linenum
wget https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh
```

E assim eu descobri que a máquina não tem acesso à internet. 😵‍💫 Mas tudo bem, eu usei esse comando então na minha máquina e depois enviei para a vítima usando `scp`:

```sh
scp atena@10.10.204.9:~/linenum .
```

Voltando para a máquina da vítima, marquei o script como executável e rodei:

```sh
chmod +x ./LinEnum.sh
./LinEnum.sh
```

Depois de alguns minutinhos, eu obtive uma extensa lista repleta de informações do sistema e possíveis vulnerabilidades:

<p align="center">
  <img src="/img/tryhackme-couch-linenum.jpg" style="height:310px" />
</p>

Nessa etapa, eu tive que analisar todas as informações que me foram apresentadas, o que é bem difícil quando você não tem certeza do que você está procurando. Tentei seguir as dicas do post de como analisar as informações, mas sem muito sucesso. Depois de um bom tempo, o Leozinho me atentou que o que eu precisava estava bem na minha frente, isso é, bem no fim do resultado do LinEnum.

E é aqui que vem a reviravolta. A máquina está rodando **Docker**.

<p align="center">
  <img src="/img/monica-plot-twist.jpg" />
</p>

## Abusando do Docker

O que eu achei que seria simplesmente acessar um banco de dados, se tornou escalonar privilégios abusando das configurações do Docker. Pesquisei esses termos no Google e encontrei dois recursos muito interesantes, um [artigo sobre esse assunto](https://flast101.github.io/docker-privesc/) e nele uma referência para o [GTFOBins](https://gtfobins.github.io/gtfobins/docker/), uma lista de programas que podem ser usados para burlar restrições de segurança mal configuradas, incluindo o Docker.

Em teoria, se o Docker estiver instalado e o usuário tiver permissão para usá-lo, nós podemos abusar das permissões do Docker para, entre outras coisas, criar um container que tem acesso a todos os arquivos locais da máquina da vítima.

Dessa forma, tentei rodar `docker ps` para listar o contêineres ativos e... **não temos permissão.** 😐

Depois de gastar mais alguns neurônios, o Leozinho voltou a repetir a dica que ele havia me passado anteriormente. E analisando os resultados do LinEnum mais uma vez, podemos ver o histórico de comandos do usuário e um desses comandos é relacionado ao Docker.

<p align="center">
  <img src="/img/tryhackme-couch-docker-rce.jpg" style="height:310px" />
</p>

Eu não vou mentir, eu não tenho a menor ideia de que comando seja esse, mas ele é bem parecido com o que eu vi nos recursos que encontrei e, de fato, pode ser usado com a mesma finalidade! Lendo o comando, podemos perceber que ele monta os arquivos locais no diretório `/mnt` do contâiner.

E justamente em `/mnt` nós temos um outro diretório `root` com o arquivo `root.txt` guardando nossa estimada bandeira: `THM{RCE_us1ng_Docker_API}` 🥳🏁

![](/img/tryhackme-couch-fin.jpg)

## Conclusão

Demorei mais ou menos 1 hora e meia para terminar esse desafio e com certeza aprendi muita coisa sobre permissões no Linux e cibersegurança no geral. Foi cansativo, mas acho que valeu a pena. Muito do processo é entender aonde as perguntas do TryHackMe querem te levar e pegar as dicas implícitas que elas te entregam. Penso que com o tempo se desenvolva um olhar mais clínico para entender melhor o que exatamente pesquisar e analisar.

No mais, agradeço mais uma vez ao [Leozinho](https://github.com/leoggo) pelo incentivo e apoio! Recomendo à todas as pessoas interessadas na área a experimentar participar de ao menos um desafio de CTF. Certamente é uma experiência muito enriquecedora que eu não vou repetir tão cedo.
