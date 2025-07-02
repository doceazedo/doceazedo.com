---
title: "How to use SvelteKit with Docker"
date: "2023/07/27"
icon: "/img/icons/docker-moby.svg"
---

Want to dockerize your SvelteKit project? It's super easy, I'll show you! ☺️

First things first, if you haven't created your project yet, you can do that using the command `npm create svelte@latest`. This creates a fresh SvelteKit project with all the basic setup you need.

To get started, we're gonna use an [adapter](https://kit.svelte.dev/docs/adapters) for Node servers. Adapters in SvelteKit are basically plugins that tell your app how to run in different environments, whether that's Node.js, static hosting, serverless functions, or other platforms. For Docker, we need the Node adapter since we'll be running our app in a Node.js environment inside the container.

Install it with `npm i -D @sveltejs/adapter-node` and update your project's **svelte.config.js** file:

```diff title="svelte.config.js"
- import adapter from '@sveltejs/adapter-auto';
+ import adapter from '@sveltejs/adapter-node';
```

The `adapter-auto` tries to automatically detect your deployment environment, but since we're explicitly using Docker with Node, we want to be specific about it.

## Dockerizing

In your project's root directory, create a **.dockerignore** file. This file lists all the files and directories we want the container to ignore, think of it like `.gitignore` but for Docker. We don't want to copy over dependencies (since we'll install them fresh), config files that are specific to your local machine, or files that SvelteKit generates during development:

```txt title=".dockerignore"
.svelte-kit
build
node_modules
.dockerignore
.eslintignore
.eslintrc.cjs
.git
.gitattributes
.gitignore
.prettierignore
.prettierrc
Dockerfile
README.md
```

The `.svelte-kit` folder contains development-specific files, `build` will be generated fresh when we build inside the container, and `node_modules` should be installed from scratch to avoid any platform-specific binary issues.

Next, create a **Dockerfile**. This file is basically a recipe that tells Docker how to build your container image, it's a step-by-step list of instructions.

SvelteKit requires **Node 16** or newer to run properly. I recommend using an Alpine-based image because it comes pre-configured with everything we need and it's super lightweight and performant. Alpine Linux is a security-focused, lightweight Linux distribution that's perfect for containers. We start with `FROM node:16-alpine`.

Now we'll use `WORKDIR /app` to set our working directory inside the container. Think of this as doing `cd /app`, all subsequent commands will run from this directory.

Then `COPY package.json package-lock.json ./` copies over your dependency files. We copy these first (before copying the rest of our code) because Docker caches layers, and dependencies don't change as often as our source code. This means if you make a small code change, Docker can reuse the cached layer where dependencies were installed instead of reinstalling everything.

To install dependencies, we use `RUN npm ci`. The `npm ci` command does a clean install that exactly matches your `package-lock.json` file, it's faster and more reliable than `npm install` for production builds.

> 💡 Remember that if your project uses a different package manager (like yarn, pnpm, or bun), the commands and files will be different.

After that, we copy the remaining files with `COPY . .` and build the project with `RUN npm run build`. The build step compiles your SvelteKit app into optimized JavaScript that can run in production.

Finally, we expose the default port with `EXPOSE 3000` (this is mainly for documentation, it tells other developers which port the app uses) and run the application using `CMD ["node", "build"]`. The CMD instruction specifies what command should run when the container starts.

Your Dockerfile should look something like this:

```Dockerfile title="Dockerfile"
FROM node:16-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "build"]
```

Now we can use the `docker build` command to build our container image. The image is like a template, it contains everything needed to run your app. Use the `-t` flag to give it a **tag** (basically a human-readable name for your image), and `.` at the end to tell Docker to look for the Dockerfile in the current directory.

```sh
docker build -t sveltekit-docker .
```

The build process will go through each step in your Dockerfile, creating layers that can be cached and reused in future builds.

After building, we can use `docker run` with the `-p` flag to specify [port mapping](https://docs.docker.com/network/#published-ports) and the tag we just defined to run our container:

```sh
docker run -p 3000:3000 sveltekit-docker
```

The `-p 3000:3000` maps port 3000 on your host machine to port 3000 inside the container, so you can access the app from your browser.

All done! 🎉 Your application is now running and can be accessed at `http://localhost:3000`!

## Docker Compose

If you wanna take it up a notch, you can set up a new container with your project using **Docker Compose**. Docker Compose is a tool that helps you configure and run applications with multiple containers, super useful when you have a database, Redis, or other services alongside your web app.

Even if you're just running one container now, Docker Compose makes it easier to manage configuration and is great for when your project grows more complex.

If you don't have one already, create a **docker-compose.yml** file. Then add a new service with a name of your choice. The configuration should look something like this:

```yml title="docker-compose.yml"
services:
  sveltekit-docker:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
```

The `context` tells Docker Compose where to find the files it needs to build the image. The `dockerfile` specifies which Dockerfile to use (useful if you have multiple Dockerfiles for different environments).

The values will vary depending on your project structure. For example, if your "docker-compose.yml" is in the repository root but your SvelteKit project is in the "./apps/frontend" folder, the `context` should reflect that path.

🎊 Now you can start your application with Docker Compose:

```sh
docker-compose up
```

This command will build your image (if it hasn't been built yet) and start the container. You can add `-d` to run it in the background (detached mode) if you don't want to see the logs in your terminal.

## Conclusion

This is a basic setup for dockerizing your SvelteKit projects. You can optimize your images even further and configure more options, this article should give you a solid starting point for using Docker in your projects.

There are tons of optimizations you can make, like multi-stage builds (where you use one stage to build your app and another smaller stage to run it), using specific Node versions, setting up health checks, or configuring environment variables properly.

> 💡 Depending on each project's dependencies, configurations can get more complex, for example, with monorepos or when using Prisma (which needs specific setup for database connections and migrations in containers).

If you have any questions, drop them in the comments! If I can't answer, I'll get [Leozinho](/blog/blog/tryhackme-couch#:~:text=Leozinho) to help out! 💜
