---
title: Providing a directive
desc: Tips and tricks on how to provide a Vue directive to the host app of a Quasar App Extension.
scope:
  tree:
    l: "."
    c:
    - l: package.json
    - l: src
      c:
      - l: boot
        e: folder to contain boot code
        c:
        - l: register-my-directive.js
          e: boot file for directive
      - l: directive
        e: folder to contain directive
        c:
        - l: MyDirective.js
          e: directive file
      - l: index.js
        e: Described in Index API
---

This guide is for when you want to create a new directive and provide it through an App Extension, which will inject it into the hosting app.

::: tip
To create an App Extension project folder, please first read the [Development Guide > Introduction](/app-extensions/development-guide/introduction).
:::

::: tip Full Example
To see an example of what we will build, head over to [MyDirective full example](https://github.com/quasarframework/app-extension-examples/tree/v2/my-directive), which is a GitHub repo with this App Extension.
:::

Create a folder structure to keep your code modularized and organized. For instance, for a directive, create a structure that looks like this:

<DocTree :def="scope.tree" />

Now, you need to handle registering your Vue directive. You do this with the `/index.js` file (described in the [Index API](/app-extensions/development-guide/index-api)) that was created when you set up your new App Extension.

Let's break it down.

```js File: /index.js
export default function (api) {
  // (Optional!)
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of Quasar App CLI
  api.compatibleWith('quasar', '^2.0.0')

  if (api.hasVite === true) {
    api.compatibleWith('@quasar/app-vite', '^2.0.0')
  }
  else { // api.hasWebpack === true
    api.compatibleWith('@quasar/app-webpack', '^4.0.0')
  }

  // Here we extend the /quasar.config file, so we can add
  // a boot file which registers our new Vue directive;
  // "extendConf" will be defined below (keep reading the tutorial)
  api.extendQuasarConf(extendConf)
}
```

The first group does a compatibility check with Quasar (which is optional, but recommended). If your component is using features of Quasar that were available after a certain version, you can make sure that the version of Quasar installed is the correct one.

::: tip
Not only can you do a `api.compatibleWith()` to check against Quasar packages, but with any other available packages (that you do not supply yourself through your App Extension) as well. Please read [Handling package dependencies](/app-extensions/development-guide/introduction#handling-package-dependencies) section from the App Extension Development Guide > Introduction page for more information.
:::

The second group tells Quasar to call our custom function when the `extendQuasarConf` CLI life-cycle hook is called. It would look something like this:

```js File: /index.js
function extendConf (conf, api) {
  // make sure my-directive boot file is registered
  conf.boot.push('~quasar-app-extension-my-directive/src/boot/register-my-directive.js')

  // @quasar/app-vite does not need this
  if (api.hasVite !== true) {
    // make sure boot & other files get transpiled
    conf.build.webpackTranspileDependencies.push(/quasar-app-extension-my-directive[\\/]src/)
  }
}
```

Finally, let's see how the boot file would look like. Make sure that you read the [@quasar/app-vite Boot files](/quasar-cli-vite/boot-files) / [@quasar/app-webpack Boot files](/quasar-cli-webpack/boot-files) documentation and understand what a Boot file is first.

```js File: /src/boot/my-directive.js
import MyDirective from '../directive/MyDirective.js'

// We globally register our directive with Vue;
// Remember that all directives in Vue will start with 'v-'
// but that should not be part of your directive name
// https://vuejs.org/guide/custom-directive.html#custom-directives
// 'my-directive' will be used as 'v-my-directive'
export default ({ app }) => {
  app.directive('my-directive', MyDirective)
}
```
