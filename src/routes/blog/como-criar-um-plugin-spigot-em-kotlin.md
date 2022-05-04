---
title: 'Como criar um plugin Spigot em Kotlin'
description: 'Aprenda a como criar o projeto de um plugin Spigot usando Kotlin'
date: '2021-12-15 13:19 GMT-3'
tags: ['kotlin', 'minecraft', 'spigot']
icon: 'kotlin'
---

**Hey, [esse artigo também está disponível em vídeo](https://youtube.com/watch?v=yBa03w6Nk08)!**

Criar um novo projeto de plugin Spigot em Kotlin é muito simples e nesse guia eu vou te mostrar o jeito mais fácil de se fazer isso. Eu assumo que você tenha instalado e vá usar o IntelliJ IDEA. Além da IDE, você vai precisar de:

- [Extensão Minecraft Development](https://plugins.jetbrains.com/plugin/8327-minecraft-development)
- [Maven](https://maven.apache.org/download.cgi)

## Criando novo projeto

Com isso instalado, crie um novo projeto na IDE. A extensão que instalamos vai adicionar no menu a opção **Minecraft**, selecione ela e escolha a opção **Spigot Plugin**.

Quanto ao JDK, essa opção vai depender de qual versão do Java é necessária para rodar o Spigot na versão que você quiser atingir. Por exemplo, ainda hoje o Java 8 é a versão mais usada entre servidores, mas as atualizações mais recentes do Minecraft, como a 1.18, já requerem o Java 17.

<p align="center">
  <img src="/img/spigot-plugin-new-project.png">
</p>

Com isso, prossiga para próxima etapa. Em **GroupId**, você deve colocar o domínio do seu site ao contrário, no meu caso poderia ser `br.com.lucasfernandes`. Caso você não tenha um, você pode usar o seu nome de usuário do GitHub no formato `com.github.doceazedo`.

**ArtifactId** é o nome que será mostrado ao gerar a build do arquivo JAR. Esse também será usado por padrão como o nome do seu plugin.

Em **Version**, você pode deixar o padrão ou alterar como quiser. Esse valor poderá ser alterado facilmente depois no arquivo **pom.xml**.

Abaixo, deixe **Maven** selecionado.

<p align="center">
  <img src="/img/spigot-plugin-build-settings.png">
</p>

Nas configurações do Spigot, os campos **Plugin Name** e **Main Class Name** já devem vir preenchidos de forma satisfatória, mas eu prefiro alterar a classe primária, no segundo campo, para `Main`. Nesse caso ficaria `com.github.doceazedo.meupluginkotlin.Main`, pois acho mais fácil de ler.

Escolha a **versão do Minecraft** que você quer atingir. Eu gosto de selecionar a 1.13.2 que funciona desde essa própria versão até as mais recentes, mas você pode selecionar a que preferir.

Os campos abaixo são opcionais. Em **Load Prefix** você pode repetir o nome do plugin, ele será usado na hora de imprimir mensagens no console. **Load Before**, **Depend** e **Soft Depend** podem ficar vazios, pois se referem à lista de plugins que são necessários para que o nosso funcione, e nesse momento não há nenhum. Os outros campos são autoexplicativos.

<p align="center">
  <img src="/img/spigot-plugin-spigot-settings.png">
</p>

Por fim, defina o nome do projeto e onde ele será salvo na sua máquina. Você pode repetir novamente o nome do plugin aqui.

<p align="center">
  <img src="/img/spigot-plugin-project-name.png">
</p>

## Configurando Kotlin

Agora você já tem o esqueleto de um plugin Spigot em Java. Para usarmos o Kotlin, o primeiro passo é abrir o projeto até chegar na classe primária, clicar com o botão direito e depois na opção **Convert Java File to Kotlin File**. Clique em **OK** para configurar o Kotlin no projeto e novamente em **OK**.

<p align="center">
  <img src="/img/spigot-plugin-convert.png">
</p>

O arquivo **pom.xml** se abrirá. Nele precisamos alterar a versão do Java de “1.8” para a que escolhemos anteriormente (no meu caso, 16). Você pode usar `CTRL + H` (ou `CTRL + R`, ao menos na minha máquina) para encontrar todas as ocorrências de “1.8” e substituir pela versão correta. Ou se preferir fazer a substituição manualmente, procure pelas tags `<java.version>` e `<jvmTarget>`.

<p align="center">
  <img src="/img/spigot-plugin-java-version.gif">
</p>

Agora no final do arquivo, procure pela dependência **kotlin-stdlib-jdk8** e simplesmente substitua por **kotlin-stdlib**.

Depois clique no ícone de <img src="/img/spigot-plugin-maven-icon.png" class="inline"> para atualizar as mudanças que fizemos. Aguarde alguns segundos e repare que o **pom.xml** não terá mais nenhum erro.

<p align="center">
  <img src="/img/spigot-plugin-kotlin-stdlib.gif">
</p>

Agora clique novamente com o botão direito na classe primária, e depois na opção **Convert Java File to Kotlin File**. Depois clique em **Yes** e pronto, já podemos escrever plugins spigot em Kotlin! 🥳

Uma última coisa que precisamos fazer agora é abrir o arquivo **plugin.yml** na pasta **resources**. No fim desse arquivo, nós vamos adicionar a biblioteca do Kotlin, assim no momento que o Spigot executar nosso plugin, ele saberá que deve instalar o Kotlin como dependência.

Repare que no fim da linha está a versão do Kotlin. Você pode descobrir a versão que você está usando no começo do arquivo **pom.xml**, na tag `<kotlin.version>`.

<p class="file-title">src/main/resources/plugin.yml</p>

```yml
libraries:
  - org.jetbrains.kotlin:kotlin-stdlib:1.6.10
```

Agora sim você já pode desfrutar de todas as maravilhas do Kotlin para desevolver seu plugin Spigot! ☕🎉

## Gerando arquivo .JAR

Citando a [documentação do Spigot](https://spigotmc.org/wiki/how-to-use-kotlin-in-your-plugins), uma limitação do Kotlin é não conseguir compilar o arquivo .JAR diretamente na IDE. Mas com o Maven instalado, é só abrir o terminal na pasta do projeto e rodar:

```bash
mvn install
```

Finalizado, o arquivo estará disponível na pasta “target”. Pode ser que você encontre outros JARs com prefixos como “original-” e “shaded-” que podem ser ignorados. Use sempre o arquivo com apenas o nome e versão do seu plugin, sem prefixo.

## Desenvolvendo plugin

Aqui não tem segredo, apesar do foco desse post é explicar como criar o projeto de plugin Spigot com Kotlin, eu vou desenvolver uma funcionalidade para demonstração. Algo bem simples, um comando `/helloworld` que retornará no chat nosso nickname e um número aleatório.

Para isso, eu vou criar um package chamado **commands** e um object chamado **HelloWorldCmd**. Essa é uma estrutura que eu gosto e fica se parecendo assim:

<p align="center">
  <img src="/img/spigot-plugin-structure.png">
</p>

O nosso objeto deve extender `CommandExecutor` e conter uma função que sobrescreve `onCommand` (só de digitar “override” dentro do objeto a IDE já deve preencher o resto pra você). Nessa função, vou retornar `false` caso quem tenha enviado o commando não seja um jogador. Vou pegar o nickname do jogador e vou usar a função `Random.nextInt()` do Kotlin para gerar um número aleatório entre 0 e 100. Por fim vou enviar a mensagem e retornar `true`.

<p class="file-title">commands/HelloWorldCmd.kt</p>

```kotlin
object HelloWorldCmd : CommandExecutor {
    override fun onCommand(sender: CommandSender, command: Command, label: String, args: Array<out String>): Boolean {
        if (sender !is Player) return false
        val name = sender.displayName
        val number = Random.nextInt(0, 100)
        sender.sendMessage("Oi, $name! Seu número é $number ;)")
        return true
    }
}
```

Um pequeno detalhe que vou fazer é colorir a mensagem. Você pode usar essa [tabela de cores](https://wiki.ess3.net/mc) como referência e o símbolo de “§” (`CTRL + ALT + =` no Windows) antes do código da cor. No meu caso ficou assim:

```kotlin
sender.sendMessage("§aOi, §e$name§a! Seu número é §e$number §a;)")
```

Agora para registrar esse comando, devemos abrir o **plugin.yml** e adicioná-lo na lista. Se quiser, você pode adicionar dentro do comando a permissão, descrição, aliases [e mais](https://spigotmc.org/wiki/plugin-yml/#commands), mas visando a simplicidade desse guia, vou deixar vazio.

<p class="file-title">src/main/resources/plugin.yml</p>

```yml
commands:
  helloworld:
```

Abrindo agora a nossa classe primária, ao ativar o plugin em `onEnable`, devemos definir o executor do comando passando o objeto que desenvolvemos.

<p class="file-title">Main.kt</p>

```kotlin
class Main : JavaPlugin() {
    override fun onEnable() {
        getCommand("helloworld")?.setExecutor(HelloWorldCmd)
    }
}
```

**Finalizado!** Nesse ponto você criou um projeto Spigot, configurou o Kotlin, aprendeu a gerar o arquivo JAR e usou a API do Spigot e funcionalidades do Kotlin para desenvolver seu primeiro comando, dá uma olhada em como fica quando pegamos o arquivo compilado e colocamos dentro de um servidor:

<p align="center">
  <img src="/img/spigot-plugin-result.gif">
</p>
