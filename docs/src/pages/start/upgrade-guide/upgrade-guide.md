---
title: UI Upgrade Guide
desc: How to upgrade Quasar from older versions to the latest one.
---

::: tip Quasar CLI with Vite or Webpack
You now have the option to choose between Quasar CLI with Vite and Quasar CLI with Webpack.
:::

::: tip Composition and Options API
You will notice that all of our documentation examples are using Vue 3's Composition API. This does NOT mean that you can't use Vue Options API. On the contrary, maintaining Options API will actually help you on your upgrade path and make it a lot easier for you. After upgrading is done we do recommend switching to the Composition API, but by no means you are required to do so.
:::

### Video guide

Clicking on the poster below will open a Youtube playlist on the process of upgrading your Quasar CLI project from Quasar v1 to Quasar v2. It may get out of sync as we progress with Quasar v2, but it may help you get started.

<script doc>
import UpgradeVideoLink from './UpgradeVideoLink.vue'
</script>

<UpgradeVideoLink />

## Older v2 to latest v2

### With UMD
Simply replace the version string in all the CSS and JS tags that refer to Quasar to the newer version.

### With Quasar CLI

```bash
# run these commands inside
# of a Quasar UI v2 project

# check for upgradable packages
$ quasar upgrade

# do the actual upgrade
$ quasar upgrade --install
```

It's recommended to keep `vue` & `vue-router` packages up to date too:

```tabs
<<| bash Yarn |>>
# optional, but recommended
$ yarn add vue@3 vue-router@4
<<| bash NPM |>>
# optional, but recommended
$ npm install --save vue@3 vue-router@4
<<| bash PNPM |>>
# optional, but recommended
$ pnpm add vue@3 vue-router@4
<<| bash Bun |>>
# optional, but recommended
$ bun add vue@3 vue-router@4
```

::: warning Note for code editor terminals
If you're using a code editor terminal instead of an external one and you run `quasar upgrade` and get the error *Command not found* or *@quasar/cli* version appears to be *undefined*, you will need to go to the settings of your code editor terminal and untick the option (or its equivalent) *Add 'node_modules/.bin' from the project root to %PATH%*, then restart your code editor.
:::

### With Quasar Vite plugin

```bash
$ yarn upgrade quasar
# or other package manager equivalent
```

Optionally, you may also want to make sure that you have the latest `@quasar/vite-plugin` package.

It's recommended to keep `vue` and `@quasar/extras` packages up to date too:

```tabs
<<| bash Yarn |>>
# optional, but recommended
$ yarn add vue@3 @quasar/extras@latest
<<| bash NPM |>>
# optional, but recommended
$ npm install --save vue@3 @quasar/extras@latest
<<| bash PNPM |>>
# optional, but recommended
$ pnpm add vue@3 @quasar/extras@latest
<<| bash Bun |>>
# optional, but recommended
$ bun add vue@3 @quasar/extras@latest
```

## Migrate to v2 from v1

**This guide refers to Quasar CLI & UMD projects**, but information from here can be used for Vue CLI too. For developers already using Vue CLI on your projects you can check out how to install the [vue-cli-plugin-quasar](/start/vue-cli-plugin) package that works with Quasar v2. You will also need to make a few changes to your main.js (and also upgrade your Vue CLI project to support Vue 3) too (best way currently is to generate a new Vue CLI project for Vue 3 and then following the [install steps](/start/vue-cli-plugin#add-vue-cli-quasar-plugin) for the vue-cli-plugin-quasar and check out the changes incurred to that /src folder, then apply the same principle to your current Vue CLI project).

::: danger
* Quasar CLI for Quasar v1 only had the option to use Webpack. But now you can choose between Quasar CLI with Vite and Quasar CLI with Webpack.
* **The rest of this guide will focus on Quasar CLI with Webpack.**
:::

::: danger
This guide refers to converting/upgrading to a project with `@quasar/app-webpack` v3 and `@quasar/app-vite` v1, both of which are no longer the latest versions. This means that you will have to convert to q/app-webpack v3 first, then to the newer versions.
<br><br>
All the other pages of the current documentation website that you are reading now refer to the latest version of both q/app-vite & q/app-webpack. For the old q/app-webpack or q/app-vite, the documentation is [here](https://legacy-app.quasar.dev/home).
<br><br>
The links for the upgrade guide to the newest CLI versions (to be processed after you've gone through all the information on this page):
* [Quasar CLI with Vite Upgrade Guide](/quasar-cli-vite/upgrade-guide)
* [Quasar CLI with Webpack Upgrade Guide](/quasar-cli-webpack/upgrade-guide).

<br>
After going through this page, we recommend you to eventually switch to the superior Quasar CLI with Vite (q/app-vite). The steps would be:

1. Follow this page.
2. Upgrade to latest q/app-webpack v4 ([Upgrade Guide](/quasar-cli-webpack/upgrade-guide))
3. Convert from q/app-webpack to q/app-vite ([Convert to App CLI with Vite](/quasar-cli-vite/convert-to-quasar-cli-with-vite))
:::

### Intro

We've put in a lot of work, so the transition from Quasar v1 to v2 is as painless as possible. Don't be afraid by the length of this page, as it doesn't reflect the effort that you need to put into upgrading your app to Quasar v2 (we just tried to make it as complete as possible). The API of Quasar components, directives and plugins has minor changes, but we kept the breaking changes to a bare minimum. We've also added some new cool features to some components.

Quasar UI v2 is based on Vue 3, as opposed to the previous version which was based on Vue 2. This means that your app code (Vue components, directives, etc) should be Vue 3 compliant too, not just the Quasar UI source-code. If you are using additional libraries in your app, please make sure that you are using their Vue 3 versions.

Quasar UI v2 is not just a port to Vue 3 and Composition API. __There are lots of significant performance enhancements in Quasar's algorithms too!__ You'll love it!

::: warning IMPORTANT!
* No IE11 support - Vue 3 does not support IE11 either. If IE11 support is mandatory for your project(s), then continue using Quasar UI v1.
* In order to support Node 13+ (and for many other benefits) we have **upgraded Webpack from v4 to v5**. You may need to upgrade your webpack plugins accordingly.
* Quasar Stylus variables are no longer available (only Sass/SCSS). This does NOT mean that you can't use Stylus anymore though.
* Node v10 reached its End Of Life and so support for it has been dropped. Be sure to update Node (to at least v12.22.1) and npm/yarn on your system accordingly to the new constraints, which include fixes for latest know security issues. This Node version also include native ESM module support, which will help us further modernize Quasar codebase under the hood during Quasar v2 lifecycle without breaking changes.
:::

Before you start with this journey of upgrading your project from v1 to v2, you should know a few additional things:
1) Read the documentation before asking questions on Discord server or forums.
2) Prepare a CodePen so staff can help you, if you think you've found an issue.
3) Dig into the [Quasar source code](https://github.com/quasarframework/quasar/tree/dev) (it'll help you understand the framework as well as teach you best practices for programming with Vue).
4) Don't use framework components as mixins unless absolutely necessary (wrap them if you need to).
5) Don't target inner component stuff with CSS selectors unless absolutely necessary.
6) We recommend `yarn` whenever possible because of its speed and efficient use. However, when using globals, we still recommend using `npm`, especially if you use `nvm` (Node Version Manager).
7) Use `git` for repository management and make regular commits, it is like taking notes on the process and lets you revert to a previous state in case you get stuck.
8) Use Quasar boot files for any pre-mounting app routines.
9) Finally, become a [backer/sponsor](https://donate.quasar.dev) and get access to the special Discord support chat room for priority support. This also helps the project survive.

If you get stuck, check out the forums or visit our Discord server for help which comes not just from staff, but from the community as well.

::: warning Info
It should be noted that we have tried our hardest to make sure everything in the Upgrade documentation is correct. However, because this has been a manual process, there are likely errors. If you find any, don't be afraid to make a PR and propose a change to make corrections.
:::

### Initial Steps

There are two paths you can follow. They are described below. Choose the path that fits your needs best. We do, however, recommend the first option.

#### Option 1: Convert a project

::: danger Important!
This guide assumes that you are currently using a `@quasar/app` v2 project. You will upgrade it to Quasar CLI with Webpack for Quasar v2 (the package is now named `@quasar/app-webpack` to better differentiate it from Quasar CLI with Vite).
:::

Before starting, it is highly suggested to make a copy of your current working project or create a new branch with git.

1) **Ensure** you have latest `@quasar/cli`:
  ```tabs
  <<| bash Yarn |>>
  $ yarn global add @quasar/cli@latest
  <<| bash NPM |>>
  $ npm i -g @quasar/cli@latest
  <<| bash PNPM |>>
  $ pnpm add -g @quasar/cli@latest
  <<| bash Bun |>>
  # experimental support
  $ bun install -g @quasar/cli@latest
  ```

2) **Stylus related**: Are you using Stylus and Quasar Stylus variables? Then before anything, convert all those files to Sass/SCSS (including src/css/app.styl -> src/css/app.sass or app.scss). If you still want to use Stylus in your project (without Quasar Stylus variables), then you'll also need to install the stylus related packages (which are no longer supplied by "@quasar/app" out of the box):
  ```tabs
  <<| bash Yarn |>>
  # only if you still want to use Stylus (but without Quasar Stylus variables)
  $ yarn add stylus stylus-loader
  <<| bash NPM |>>
  # only if you still want to use Stylus (but without Quasar Stylus variables)
  $ npm install --save stylus stylus-loader
  <<| bash PNPM |>>
  # only if you still want to use Stylus (but without Quasar Stylus variables)
  $ pnpm add stylus stylus-loader
  <<| bash Bun |>>
  # only if you still want to use Stylus (but without Quasar Stylus variables)
  $ bun add stylus stylus-loader
  ```
3) **Upgrade** Node to at least v12.22.1, npm to at least v6.14.12 and yarn to at least v1.17.3.
  ```bash
  # if you are already using a lts/erbium version (eg. 12.14.0), take note of its version, it should be listed at "lts/erbium" row
  $ nvm list

  # if you're using `nvm` helper on Linux (https://github.com/nvm-sh/nvm)
  $ nvm install 12.22.1 && nvm alias default lts/erbium && nvm use default
  # if you're using `nvm` helper on Windows (https://github.com/coreybutler/nvm-windows)
  $ nvm install 12.22.1 && nvm use 12.22.1

  # uninstall previous "lts/erbium" version, we suppose 12.14.0 was already installed in our case
  nvm uninstall 12.14.0
  ```
4) **Remove** folders `.quasar`, `node_modules` and `package-lock.json` or `yarn.lock` file. This generally isn't needed, but in some cases it will avoid trouble with yarn/npm upgrading the packages for the purpose of this guide.
5) **Uninstall**: `@quasar/app`
  ```tabs
  <<| bash Yarn |>>
  $ yarn remove @quasar/app
  <<| bash NPM |>>
  $ npm uninstall --save-dev @quasar/app
  <<| bash PNPM |>>
  $ pnpm remove @quasar/app
  <<| bash Bun |>>
  $ bun remove @quasar/app
  ```
6) **Install**: `@quasar/app-webpack` v3, `quasar` v2, `vue` v3 and `vue-router` v4 packages (the last two are no longer supplied by @quasar/app):
  ```tabs
  <<| bash Yarn |>>
  $ yarn add --dev @quasar/app-webpack@3
  $ yarn add quasar@2 vue@3 vue-router@4
  <<| bash NPM |>>
  $ npm install --save-dev @quasar/app-webpack@3
  $ npm install --save quasar@2 vue@3 vue-router@4
  <<| bash PNPM |>>
  $ pnpm add -D @quasar/app-webpack@3
  $ pnpm add quasar@2 vue@3 vue-router@4
  <<| bash Bun |>>
  $ bun add --dev @quasar/app-webpack@3
  $ bun add quasar@2 vue@3 vue-router@4
  ```
7) **Remove** `.quasar` and `node_modules` folders, and `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml` / `bun.lock` / `bun.lockb` file, then run `yarn/npm/pnpm/bun install` to regenerate the lock file. This forces the upgrade of the whole dependency graph (deep dependencies included) and avoids troubles with mismatching packages, especially webpack 5 related ones.
8) If you are using ESLint, then edit `/.eslintrc.cjs` (also rename from `/.eslintrc.js`):
  ```js
  // old way
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/essential' // or equivalent
  ]

  // NEW way
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  extends: [
    'plugin:vue/vue3-essential' // or equivalent
  ]
  ```

  Also upgrade ESLint deps. Example:

  ```js
  "@babel/eslint-parser": "^7.13.14",  // replaces babel-eslint !
  "eslint": "^8.11.0",
  "eslint-plugin-vue": "^9.0.0",
  "eslint-webpack-plugin": "^3.1.1", // replaces eslint-loader !
  "eslint-config-standard": "^17.0.0",
  "eslint-plugin-import": "^2.19.1",
  "eslint-plugin-n": "^15.0.0",
  "eslint-plugin-promise": "^6.0.0",
  "eslint-plugin-quasar": "^1.0.0"
  ```

  In the `/quasar.config` file, before the `module.exports = function (ctx)` add:
  ```js
  import ESLintPlugin from 'eslint-webpack-plugin'
  ```

  In quasar.config file > build add:
  ```js
  chainWebpack (chain) {
    chain
      .plugin('eslint-webpack-plugin')
      .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])
  }
  ```
9) If you are using Vuex, you will need to manually install it:
  ```tabs
  <<| bash Yarn |>>
  $ yarn add vuex@4
  <<| bash NPM |>>
  $ npm install --save vuex@4
  <<| bash PNPM |>>
  $ pnpm add vuex@4
  <<| bash Bun |>>
  $ bun add vuex@4
  ```

10) Edit quasar.config file > framework > lang. It will be explained in the "Quasar language packs" section on this page.
  ```js
  // old way
  framework: {
    lang: 'en-us'
  }

  // NEW way
  framework: {
    lang: 'en-US'
  }
  ```
11) Check all your manually installed webpack plugins to be compatible with Webpack 5 (the vast majority should already be compatible). Also update quasar.config file > [devServer config](/quasar-cli-webpack/quasar-config-file#property-devserver) to match [webpack-dev-server v4](https://github.com/webpack/webpack-dev-server).
12) Follow the rest of the guide. You'll need to adapt to the breaking changes of the new versions of Vue 3, Vue Router 4, Vuex 4, Vue-i18n 9 and any other vue plugin that you are using.
13) Upgrade your other project dependencies (especially ESLint related ones).

#### Option 2: Create a project

Second option is to create a fresh project and port to it bit by bit. We see this option as a worst case scenario (where you encounter problems with Vue 3 and Vue Router v4 rather than with Quasar itself) and we only mention it for the completeness of this guide.

You can generate a new Quasar v2 project as shown below and then you can port your app to it.

```tabs
<<| bash Yarn |>>
$ yarn create quasar
# then pick "App with Quasar CLI"
# decide if you want "Quasar CLI with Vite" or "Quasar CLI with Webpack"
<<| bash NPM |>>
$ npm init quasar@latest
# then pick "App with Quasar CLI"
# decide if you want "Quasar CLI with Vite" or "Quasar CLI with Webpack"
<<| bash PNPM |>>
$ pnpm create quasar@latest
# then pick "App with Quasar CLI"
# decide if you want "Quasar CLI with Vite" or "Quasar CLI with Webpack"
<<| bash Bun |>>
# experimental support
$ bun create quasar@latest
# then pick "App with Quasar CLI"
# decide if you want "Quasar CLI with Vite" or "Quasar CLI with Webpack"
```

### Webpack v5

In order to support Node 13+ (and for many other benefits) we have **upgraded Webpack from v4 to v5**. You may need to upgrade your webpack plugins accordingly.

#### Nodejs polyfills
Webpack v5 removed the Nodejs polyfills for the web client builds. If you are using packages for the web client that rely on Nodejs API (they shouldn't!), you will get errors saying that some packages are missing. Examples: `Buffer`, `crypto`, `os`, `path`.

These need to be addressed by the package owners. But if you don't want to wait and just want to run your app/website (with a bit of risk), then you can manually install [node-polyfill-webpack-plugin](https://www.npmjs.com/package/node-polyfill-webpack-plugin) (`yarn add --dev node-polyfill-webpack-plugin`) then reference it in quasar.config file > build > chainWebpack. Example:

```
// quasar.config file
import nodePolyfillWebpackPlugin from 'node-polyfill-webpack-plugin'

build: {
  chainWebpack (chain) {
    chain.plugin('node-polyfill').use(nodePolyfillWebpackPlugin)
  }
}
```

#### Webpack devserver
As part of the upgrade to Webpack 5, Quasar CLI now supplies [webpack-dev-server v4](https://github.com/webpack/webpack-dev-server) and [webpack-dev-middleware v4](https://github.com/webpack/webpack-dev-middleware) which come with their own breaking changes. This influences quasar.config file > devServer options. Below are some of the most used props:

| Prop name | Type | Description |
| --- | --- | --- |
| devMiddleware | Object | Configuration supplied to webpack-dev-middleware v4 |
| https | Boolean/Object | Same as before with webpack 4 |
| onBeforeSetupMiddleware | Function | Replaces "before" |
| onAfterSetupMiddleware | Function | Replaces "after" |
| proxy | Object/Array | Same as before with webpack 4 |

::: tip
If you've tampered with quasar.config file > [devServer](/quasar-cli-webpack/quasar-config-file#property-devserver) then you might be interested in a list of all the breaking changes proposed by webpack-dev-server v4: [release notes](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md). Check if any apply to you.
:::

#### webpack-chain

::: warning
At the moment of writing these lines, [webpack-chain](https://github.com/neutrinojs/webpack-chain) has not been updated to fully support Webpack 5. This has impact over all quasar.config file > chainWebpack{...} methods. While these methods will still work, the newer parts of the configuration introduced in Webpack 5 are not (yet) available. For those parts, the `extendWebpack*` methods should be used, until webpack-chain is fully Webpack 5 compatible.
:::

### App.vue

You'll need to edit src/App.vue and remove the wrapper `<div id="q-app">`. You don't (and should NOT) need it anymore.

```html
<!-- old way -->
<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<!-- NEW way -->
<template>
  <router-view />
</template>
```

### Vue 3

Since you will also switch to [Vue 3](https://vuejs.org), it's best that you also take a look at its [migration guide](https://v3-migration.vuejs.org/) **after**  finishing reading this migration guide.

If you're using .vue files, you'll most likely have a fairly easy transition because 1) vue-loader (supplied by `@quasar/app`) is the one parsing the [SFC syntax](https://vuejs.org/api/sfc-spec.html) and instructing Vue 3 on what to do and 2) you can still use the Options API (although we recommend that you convert to the newer and better [Composition API](https://vuejs.org/guide/introduction.html#api-styles)).

We suggest that you first convert your project to Quasar v2 while maintaining Options API (because your components are already in Options API form and you probably want to ensure everything is working first). After this transition, you can convert all your Vue components to Composition API, but in no way is this a requirement.

Along with Vue3, there is a new major version of [Vue Router v4](https://router.vuejs.org), which has its own [breaking changes](https://router.vuejs.org/guide/migration/) you should be aware of. There's also the new [Vuex v4](https://vuex.vuejs.org/) too.

#### Vue 3 breaking changes examples

##### The v-model

One of the most important breaking changes when dealing with Vue 3 is how v-model works. It is now an alias to the `model-value` + `@update:model-value` combo, instead of `value` + `@input`. This has impact on all Quasar components using v-model. If you're writing your components in .vue files, then you don't need to worry about it as vue-loader correctly translates it for you.

Also, if you emit custom events from your Vue components, you will need to explicitly specify them like below:

```html
<script>
// your Vue component;
// let's assume that we emit 'ok' and 'myEvent' events
// from this component

export default {
  // ...
  emits: [ 'ok', 'myEvent' ],
  // ...
}
</script>
```

##### The event bus methods

One other breaking change is the drop of the event bus methods ($on, $once, $off, $emit). However, Quasar v2 (v2.8.4+) has a native equivalent: [EventBus util](/quasar-utils/event-bus-util).

### Vue Router v4

This is a Vue 3 ecosystem upstream breaking change. Update src/router files to match Vue Router v4's API. Vue Router v4 comes with its own [breaking changes](https://router.vuejs.org/guide/migration/index.html). Especially note below how we are dealing with the 404 error.

```js Default src/router/index.js content:
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in the quasar.config file instead!
    // quasar.config file -> build -> vueRouterMode
    // quasar.config file -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  return Router
}
```

```js Default src/router/routes.js content:
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
```

If you use TypeScript, you must replace the `RouteConfig` interface occurrences with `RouteRecordRaw`.

### Vuex v4

First step that you need to take is that you need to manually install Vuex into your app.

```tabs
<<| bash Yarn |>>
$ yarn add vuex@4
<<| bash NPM |>>
$ npm i --save vuex@4
<<| bash PNPM |>>
$ pnpm add vuex@4
<<| bash Bun |>>
$ bun add vuex@4
```

This is a Vue 3 ecosystem upstream breaking change. You'll need to update src/store files to match Vuex v4's API. Notice the "createStore" import from vuex and its usage in an example below. For informative purposes: [Vuex migration to 4.0 from 3.x](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html)

```js Default src/store/index.js content:
import { createStore } from 'vuex'
// import example from './module-example'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}
```

### Vue-i18n v9

This is a Vue 3 ecosystem upstream breaking change. Update src/boot/i18n.js file to match Vue-i18n v9's API. Vue-i18n comes with its own [breaking changes](https://vue-i18n-next.intlify.dev/guide/migration/breaking.html).

Since this package isn't provided by `@quasar/app`, you must update the dependency in your project via `yarn add vue-i18n`

```js Default src/boot/i18n.js content:
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
// You'll need to create the src/i18n/index.js/.ts file too

export default ({ app }) => {
  // Create I18n instance
  const i18n = createI18n({
    locale: 'en-US',
    globalInjection: true,
    messages
  })

  // Tell app to use the I18n instance
  app.use(i18n)
}
```

If you use TypeScript, remove the existing augmentation of 'vue/types/vue' as it has been integrated into the upstream package.

### @vue/composition-api

If you've been using Composition API package for Vue 2, you'll need to change all imports to point towards the Vue package.

  ```diff
  // OLD, @vue/composition-api way
  - import { ref } from '@vue/composition-api'

  // New Vue 3 way
  + import { ref } from 'vue'
  ```

If you were using the deprecated `context.root` object, you must refactor your code to avoid using it, as it's not available anymore.

Delete `src/boot/composition-api` boot file and the corresponding entry from the `/quasar.config` file. Then uninstall the `@vue/composition-api` package:

```tabs
<<| bash Yarn |>>
$ yarn remove @vue/composition-api
<<| bash NPM |>>
$ npm uninstall --save @vue/composition-api
<<| bash PNPM |>>
$ pnpm remove @vue/composition-api
<<| bash Bun |>>
$ bun remove @vue/composition-api
```

If you use TypeScript, prepare to reload VSCode many times, as all upgrades will cause typings cache problems.

### Quasar components

#### Vue 3 and v-model

The `v-model` is now an alias to the `model-value` + `@update:model-value` combo, instead of `value` + `@input`. This has impact on all Quasar components using v-model. If you're writing your components in .vue files then you don't need to worry about it as vue-loader correctly translates it for you.

Suggestion: you may want to do a search and replace for `:value` and `@input`. Please be careful on replacing the `:value` as some components (QLinearProgress, QCircularProgress) are not tied to v-model and still use `value` as a property.

#### Vue 3 and scoped slots

All slots are now acting in the same manner as the scoped slots in Vue 2. If you're using Options API, then you can do a search and replace for `this.$scopedSlots` (and replace it with `this.$slots`).

#### QDrawer/QDialog/QMenu/QTooltip

Use "class" and "style" attributes instead of "content-class" / "content-style" props for the above mentioned Quasar components.

#### QBtn/QItem/QBreadcrumbs/QRouteTab

New props: href, target.

For QBtn, it is no longer necessary to specify `type="a"` when using `href` prop.

The `href` prop is especially useful for UMD if you don't also inject Vue Router.

#### QBtn/QRouteTab

If you were using the `to` prop and delaying navigation in your `@click` handler:

```diff
function onClick (e, go) {
-  e.navigate = false // old way
+  e.preventDefault() // new way
   // ...maybe later call go()?
}
```

#### QBreadcrumbsEl

Removed "append" prop because Vue Router v4 [has also dropped it](https://router.vuejs.org/guide/migration/index.html#removal-of-append-prop-in-router-link).
Added "tag" and "ripple" properties.

#### QColor

Added "no-header-tabs" prop.

#### QChatMessage

Now by default, the "label", "name", "text" and "stamp" are protected from XSS attacks. This means that all of the `*-sanitize` props have been dropped, as this behavior has now become the standard in Quasar. Should you wish to display HTML as content for these props, you now need to explicitly specify them through new Boolean props (`*-html`).

| Removed Boolean prop | New opposite equivalent Boolean prop |
| --- | --- |
| label-sanitize | label-html |
| name-sanitize | name-html |
| text-sanitize | text-html |
| stamp-sanitize | stamp-html |

#### QDate

When `@update:model-value` event (equivalent of the old `@input`) is triggered, the contents of the first parameter no longer contain the (deprecated) `changed` prop.

#### QDialog

Added "no-shake", "transition-duration".
Use "class" and "style" attributes instead of "content-class" / "content-style" props.

#### QExpansionItem

Removed the "append" property because Vue Router v4 [has also dropped it](https://router.vuejs.org/guide/migration/index.html#removal-of-append-prop-in-router-link).

#### (New) Connecting to QForm

Should you wish to create your own Vue components that need to connect to a parent QForm (for validation purposes), we've made it easier for you:

```js Composition API variant
import { useFormChild } from 'quasar'

useFormChild ({
  validate,     // Function returning a Boolean (or a Promise resolving to a Boolean)
  resetValidation, // Optional function which resets validation
  requiresQForm // Boolean -> if "true" and your component
                //   is not wrapped by QForm it then displays
                //   an error message
})

// some component
export default {
  setup () {
    // required! should return a Boolean
    function validate () {
      console.log('called my-comp.validate()')
      return true
    }

    function resetValidation () {
      // ...
    }

    useFormChild({ validate, resetValidation, requiresQForm: true })
  }
}
```

```js Options API variant
import { QFormChildMixin } from 'quasar'

// some component
export default {
  mixins: [ QFormChildMixin ],

  methods: {
    // required! should return a Boolean
    validate () {
      console.log('called my-comp.validate()')
      return true
    },

    // optional
    resetValidation () {
      // ...
    }
  },

  // ...
}
```

#### QInnerLoading

Added "label", "label-class" and "label-style" props.

#### QImg

This component has been redesigned from the ground up. It now makes use of a more modern API. The immediate effects are that it uses less RAM memory and runtime is much faster.

Added properties: "loading", "crossorigin", "fit", "no-spinner", "no-native-menu", "no-transition".
Removed properties: "transition", "basic" (now equivalent to "no-spinner" + "no-transition")
Changed property "no-default-spinner" to "no-spinner".

For the detailed changes, please view the API Card on [QImg](/vue-components/img#qimg-api) page.

#### QPagination

Added prop "gutter".

#### QPopupEdit

Some performance improvements have been made on this component and as a result you will need to now use the default slot.

```html The OLD way
<q-popup-edit
  content-class="bg-primary text-white"
  buttons
  color="white"
  v-model="myModel"
>
  <q-input
    type="textarea"
    dark
    color="white"
    v-model="myModel"
    autofocus
  />
</q-popup-edit>
```

The NEW way is below. Notice `v-slot="scope"` is applied directly on `<q-popup-edit>` and using `scope.value` instead of `myModel` for the inner `<q-input>` component:

```html The NEW way
<q-popup-edit
  class="bg-primary text-white"
  buttons
  color="white"
  v-model="myModel"
  v-slot="scope"
>
  <q-input
    type="textarea"
    dark
    color="white"
    v-model="scope.value"
    autofocus
    @keyup.enter="scope.set"
  />
</q-popup-edit>
```

For more detailed information on the usage, please read [QPopupEdit](/vue-components/popup-edit)'s page.

#### QLayout

The `@scroll` event parameter now has a slightly different content:

```js
{
  position, // Number (pixels from top)
  direction, // String ("top", "bottom")
  directionChanged, // Boolean
  inflectionPoint, // last position (from the top) when direction changed - Number (pixels)
  delta // difference since last @scroll update - Number (pixels)
}
```

#### QOptionGroup

Added "label" and "label-N" slots.

#### QRouteTab

Added "ripple" property.

#### QScrollArea

QScrollArea has been redesigned so that it now supports both vertical and horizontal scrolling simultaneously.

* Added props: "vertical-bar-style" and "horizontal-bar-style" (that come on top of "bar-style" which is applied to both vertical and horizontal scrolling bars)
* Added props: "vertical-thumb-style" and "horizontal-thumb-style" (that come on top of "thumb-style" which is applied to both vertical and horizontal scrolling bar thumbs)
* Removed prop: "horizontal" (now obsolete as QScrollArea support both vertical and horizontal scrolling simultaneously)
* The "getScrollPosition" method now returns an Object of the form `{ top, left }` (example: `{ top: 5, left: 0 }`)
* The "setScrollPosition" and "setScrollPercentage" methods now require a new first param (named "axis" with values either "horizontal" or "vertical"): (axis, offset[, duration])

#### QScrollObserver

Replaced property "horizontal" with "axis" (String: "vertical", "horizontal", "both"; default value: "vertical").

The `@scroll` event parameter now has a slightly different content:

```js
{
  position: {
    top, left // Numbers (pixels)
  },
  direction, // String ("top", "right", "bottom" or "left")
  directionChanged, // Boolean
  inflectionPoint: { // last position when direction changed
    top, left // Numbers (pixels)
  },
  delta: { // difference since last @scroll update
    top, left // Numbers (pixels)
  }
}
```

#### QSelect

* The "itemEvents" prop has been dropped from the "option" slot. That information is now contained within the "itemProps". This change is a logical result Vue 3's flattening of the rendering function's second parameter ("on", "props" etc. merged together into a single Object).
* New method: "blur()"

#### QSlider/QRange

New props: track-size, thumb-size, marker-labels, marker-labels-class, switch-label-side, switch-marker-labels-side, inner-min, inner-max,
thumb-color, track-color, track-img, inner-track-color, inner-track-img, selection-color, selection-img.

New props specific to QRange: left-thumb-color, right-thumb-color

New slots: marker-label, marker-label-group

#### QTable

Renamed the "data" property to "rows" (to solve TS conflict issue with "data" incorrectly inferred as the "data()" method of a Vue component).

New prop: "column-sort-order". New "columns" definition prop ("sortOrder") and now "style" and "classes" can be Functions too.

Due to the new v-model feature of Vue 3, which replaces the ".sync" modifier, `:pagination.sync="..."` now need to be used as `v-model:pagination="..."`

#### QTable/QTree

Due to the new v-model feature of Vue 3, which replaces the ".sync" modifier, the following properties need to be used differently:

| Old way | New way |
| --- | --- |
| pagination.sync="varName" | v-model:pagination="varName" |
| selected.sync="varName" | v-model:selected="varName" |
| expanded.sync="varName" | v-model:expanded="varName" |

#### QTabs

Added "active-class" prop.

#### QBtnDropdown/QCarousel/QTooltip/QMenu/QDialog/QStepper/QTabPanels

Added "transition-duration" property.

#### QSkeleton

Added "animation-speed" prop.

#### QUploader

The QUploaderBase component has been removed in favor of the [createUploaderComponent](/vue-components/uploader#supporting-other-services) util.

### Quasar directives

The only breaking change in this section is that **we've removed the GoBack directive**. Use the router reference instead to push/replace/go(-1).

```js
// Composition API variant
import { useRouter } from 'vue-router'

setup () {
  const $router = useRouter()

  // go back by one record, the same as $router.back()
  $router.go(-1)
}
```

```js
// Options API variant inside your component
this.$router.go(-1)
```

### Quasar plugins

#### AppFullscreen plugin

The request() method now accepts another node while in fullscreen already.

#### Loading plugin

* Added "boxClass" property
* By default, the message is protected from XSS attacks. Should you wish to display HTML content with the "message" prop, you should also specify "html: true". This behavior is completely opposite to that of Quasar v1, where you had the prop "sanitize" (not available anymore; enabled now by default) to NOT display HTML.

#### Dialog plugin
A few things changed:

1. If you are using the Dialog plugin with a custom component, then you must now supply the component properties under "componentProps":

  ```js
  // OLD, DEPRECATED v1 way
  const dialog = this.$q.dialog({ // or Dialog.create({...})
    component: MyVueComponent,
    someProp: someValue,
    // ...
  })

  // New v2 way (Composition API)
  import { useQuasar } from 'quasar'

  setup () {
    const $q = useQuasar()
    // ...
    const dialog = $q.dialog({ // or Dialog.create({...})
      component: MyVueComponent,
      componentProps: {
        someProp: someValue,
        // ...
      }
    })
  }

  // New v2 way (Options API)
  const dialog = this.$q.dialog({ // or Dialog.create({...})
    component: MyVueComponent,
    componentProps: {
      someProp: someValue,
      // ...
    }
  })
  ```
2. The `parent` and `root` props have been removed. Due to the Vue 3 architecture, we can no longer use a "parent" component for the provide/inject functionality. But you'll still be able to use Vue Router/Vuex/etc. inside of your custom component.
3. If invoking the Dialog plugin with a custom component then you need to add `emits: [ 'ok', 'hide' ]` to your component as Vue 3 now requires an explicit list of events that the component might emit. You can also transform the component to Composition API. For detailed information please see [Invoking custom component](/quasar-plugins/dialog#invoking-custom-component).
  ```js
  // the invoked component code
  export default {
    // ...
    emits: [ 'ok', 'hide' ],
    // ...
  }
  ```
4. If invoking the Dialog with the built-in component, then there is a new way of supplying the native attributes:
  ```js
  // OLD way
  prompt: { // or "options"
    // ...
    attrs: {
      someattribute: 'value'
    }
  }

  // New v2 way
  prompt: { // or "options"
    // ...
    someattribute: 'value'
  }
  ```

#### Meta plugin

```js
// v1 way (OLD, DEPRECATED)
// some .vue file
export default {
  meta: {
    // ...definition
  }
}
```

The new way (Composition API or Options API):

```js
// Composition API variant
// for some .vue file
import { useMeta } from 'quasar'

export default {
  setup () {
    // Needs to be called directly under the setup() method!
    useMeta({
      // ...definition
    })
  }
}
```

```js
// Options API variant
// for some .vue file
import { createMetaMixin } from 'quasar'

export default {
  mixins: [
    createMetaMixin({ /* ...definition */})
    // OR dynamic:
    createMetaMixin(function () {
      // "this" here refers to the vue component
      return {
        /* ...definition... */
      }
    })
  ]
}
```

For detailed information please see [Meta Plugin](/quasar-plugins/meta#usage).

### Quasar utils

#### date utils
The object literal property names provided for methods "addToDate" and "subtractFromDate" have been normalized: [#7414](https://github.com/quasarframework/quasar/issues/7414).

| Old | New | Changed? |
| --- | --- | --- |
| year | years | **Yes** |
| month | months | **Yes** |
| days | days | - |
| hours | hours | - |
| minutes | minutes | - |
| seconds | seconds | - |
| milliseconds | milliseconds | - |

#### exportFile util

The exportFile() util (forces browser to download a file with your specified content) is enhanced with new features: you can specify bom (byte order mark) and/or a text encoding. [More info](/quasar-utils/other-utils#export-file).

#### scroll utils

| Old method name | NEW method name |
| --- | --- |
| getScrollPosition | getVerticalScrollPosition |
| animScrollTo | animVerticalScrollTo |
| setScrollPosition | setVerticalScrollPosition |

#### color utils

Removed "getBrand" and "setBrand" from color utils. They are replaced by "getCssVar" and "setCssVar":

```js
// OLD, DEPRECATED v1 way:
import { colors } from 'quasar'

const { getBrand, setBrand } = colors
const primaryColor = getBrand('primary')
setBrand('primary', '#f3c')

// NEW v2 way:
import { getCssVar, setCssVar } from 'quasar'

const primaryColor = getCssVar('primary')
setCssVar('primary', '#f3c')
```

#### EventBus util

Vue 3 dropped of the event bus methods ($on, $once, $off, $emit). However, Quasar v2 (v2.8.4+) has a native equivalent: [EventBus util](/quasar-utils/event-bus-util).


### Quasar language packs
We have changed the language pack filenames to reflect the standard naming used by browsers. This will allow you to use `$q.lang.getLocale()` when you want to dynamically import the Quasar language pack file.

Full list of changes:
| Old name | New name |
| --- | --- |
| en-us | en-US |
| en-gb | en-GB |
| az-latn | az-Latn |
| fa-ir | fa-IR |
| kz | kk |
| ko-kr | ko-KR |
| kur-CKB | kur-CKB |
| nb-no | nb-NO |
| pt-br | pt-BR |
| zh-hans | zh-CN |
| zh-hant | zh-TW |

If you have configured a default Quasar language pack in your `/quasar.config` file, then you need to edit it:

```diff
framework: {
-  lang: 'en-us' // old way
+  lang: 'en-US' // new way
}
```

You'll also need to edit all your dynamic imports from `quasar/lang/` to match the new syntax.

### Quasar CSS

The color CSS variable names (all the brand related ones) have changed:

```js
// old
--q-color-primary, --q-color-secondary, ...

// new
--q-primary, --q-secondary, ...
```

### Quasar UMD
* Due to the new Vue 3 architecture, the code for bootstrapping the app has changed and you will need to adapt [accordingly](/start/umd).
* There have been changes to the naming scheme of script and css tags to include the type of distribution. For example, the minified resources filenames now end in `.prod.js` / `.prod.css`. This was done to match Vue 3's own file naming scheme.

::: tip
For an in-depth look at the necessary UMD scripts and tags, please use our [generator tool](/start/umd#installation).
:::

### Quasar App CLI

This section refers to "@quasar/app" v3 package which supports Vue 3 and Quasar UI v2.

* Dropped support for `src/css/quasar.variables.styl`. Also, if you still want to use Stylus as preprocessor (but without the Quasar Stylus variables) then you need to manually install `stylus` and `stylus-loader` as dev dependencies into your project ("@quasar/app" does not supply them anymore).
* New quasar.config file > build > vueLoaderOptions prop
* Remove quasar.config file > framework > importStrategy. Auto import works so great that is now used by default and as the only option.
* The url-loader configuration has been enhanced so it now also supports "ico" files out of the box
* If you have been using quasar.config file > build > rtl in the form of an Object, then you must match [these options](https://github.com/elchininet/postcss-rtlcss) now, since we've switched from the unmaintained postcss-rtl to postcss-rtlcss package.

If you have boot files, where you access and change the `$q` Object through `Vue.prototype.$q`, then you need to adapt this:

```js
// old way in boot file
Vue.prototype.$q.iconSet.chip.remove = 'fas fa-times-circle'

// NEW way
export default ({ app }) => {
  app.config.globalProperties.$q.iconSet.chip.remove = 'fas fa-times-circle'
}
```

Nothing changed in regards to how App Extensions work. Please note that not all of our App Extensions are yet compatible with Quasar UI v2. We are working towards releasing new compatible versions of them.

#### TypeScript

Update `src/shims-vue.d.ts` to match [Vue3 version](https://github.com/quasarframework/quasar-starter-kit/blob/b206de59d87b8adcc25a8f7863cfe705bf6b3741/template/src/shims-vue.d.ts).

Create a `src/quasar.d.ts` file and copy into it the content from [here](https://github.com/quasarframework/quasar/blob/71143c4417d6bf3fd7a5dc88dd0e577d822ddc92/create-quasar/templates/app/quasar-v2/ts-webpack/BASE/src/quasar.d.ts).

If you use ESLint, update the property into the `/quasar.config` file:

```js
// old way
supportTS: {
  tsCheckerConfig: { eslint: true },
},

// new way
supportTS: {
  tsCheckerConfig: {
    eslint: {
      enabled: true,
      files: './src/**/*.{ts,tsx,js,jsx,vue}',
    },
  },
},
```

This is due to upstream breaking changes of `fork-ts-checker-webpack-plugin`.

### Quasar App CLI Electron mode

::: warning
If you have a project using the Quasar Electron mode, then it's essential to read its own [Electron mode upgrade guide](/quasar-cli/developing-electron-apps/electron-upgrade-guide#Upgrading-from-Quasar-v1).
:::

Out of the box [support for TS](/quasar-cli/developing-electron-apps/electron-with-typescript) now available.

You can also enable ESLint for the main thread and the preload script now:

```js
electron: {
  chainWebpackMain (chain) {
    chain.plugin('eslint-webpack-plugin')
      .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
  },

  chainWebpackPreload (chain) {
    chain.plugin('eslint-webpack-plugin')
      .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
  }
}
```

### Quasar App CLI PWA mode

If you are using Workbox in InjectManifest mode, then it's useful to know that the `/src-pwa/custom-service-worker.js` is now being compiled too. This means that in your code you can now import with relative path too.

Due to the upgrade to Webpack 5, you will need to also upgrade `workbox-webpack-plugin` to v6+.

You can now enable ESLint for the custom service worker too. And it [supports TS](/quasar-cli/developing-pwa/pwa-with-typescript) out of the box (in which case, rename the extension to `.ts`).

Enabling ESLint for the custom service worker is done by editing your `/quasar.config` file:

```js
pwa: {
  chainWebpackCustomSW (chain) {
    chain.plugin('eslint-webpack-plugin')
      .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
  }
}
```

### Quasar App CLI SSR mode

If you have a project using the Quasar SSR mode, then it's essential to read its own [SSR mode upgrade guide](/quasar-cli/developing-ssr/ssr-upgrade-guide).

Out of the box [support for TS](/quasar-cli/developing-ssr/ssr-with-typescript) now available.

### Quasar Extras
Nothing changed. You can use it as for Quasar UI v1.

### Quasar Icon Genie
Nothing changed. You can use it the same way as for "@quasar/app" v1 or v2 projects.
