---
title: Quasar Language Packs
desc: How to configure the Quasar language packs in a Quasar app.
keys: Lang,lang
related:
  - /options/rtl-support
  - /options/app-internationalization
---
A Quasar Language Pack refers to the internationalization of Quasar's own components, some of which have labels.

<DocApi file="Lang" />

<DocInstallation title="Configuration" config="lang" />

::: warning
It should be noted that what is described below is the internationalization of Quasar components only. If you need to internationalize your own components, read [App Internationalization](/options/app-internationalization) documentation page.
:::

As mentioned above, some Quasar components have their own labels. When it comes to internationalization, one option is to configure labels through the label properties on each instance of Quasar components (like QTable). This is how you can customize the text to match the selected language. This however, takes time and adds unnecessary complexity to your website/app. **Instead**, you can use the Quasar Language Packs which have a number of standard label definitions translated for you, like "Cancel", "Clear", "Select", "Update", etc. No need to translate these again! And it comes out of the box.

::: tip
For a complete list of available Quasar Languages, check [Quasar Languages on GitHub](https://github.com/quasarframework/quasar/tree/dev/ui/lang).
<br><br>**If your desired language is not on that list**, then feel free to submit a PR to add it. It takes from 5 to 10 minutes at most. We kindly welcome any language!
:::

## Configuring the default Language Pack

Unless configured otherwise (see below), Quasar uses the `en-US` Language Pack by default.

### Hardcoded

If the default Quasar Language Pack is not dynamically determined (does not depend on cookies for example), then you can:

```tabs
<<| js Quasar CLI |>>
// quasar.config file

framework: {
  lang: 'de'
}
<<| js Vite Plugin |>>
// main.js file

// ...
import { Quasar } from 'quasar'
// ...
import langDe from 'quasar/lang/de'
// ...
app.use(Quasar, {
  // ...,
  lang: langDe
})
<<| html Quasar UMD |>>
<!-- include this after Quasar JS tag -->
<script src="https://cdn.jsdelivr.net/npm/quasar@2/dist/lang/de.umd.prod.js"></script>
<script>
  Quasar.Lang.set(Quasar.Lang.de)
</script>
```

::: tip
For **Quasar UMD**, check what tags you may still need to include in your HTML files on [UMD / Standalone](/start/umd) page.
:::

### Dynamical (non-SSR)
Quasar CLI: If your desired Quasar Language Pack must be dynamically selected (example: depends on a cookie), then you need to create a boot file: `$ quasar new boot quasar-lang-pack [--format ts]`. This will create `/src/boot/quasar-lang-pack.js` file. Edit it to:

```tabs
<<| js With @quasar/app-vite |>>
import { defineBoot } from '#q-app/wrappers'
import { Lang } from 'quasar'

// relative path to your node_modules/quasar/..
// change to YOUR path
const langList = import.meta.glob('../../node_modules/quasar/lang/*.js')
// or just a select few (example below with only DE and FR):
// import.meta.glob('../../node_modules/quasar/lang/(de|fr).js')

export default defineBoot(async () => {
  const langIso = 'de' // ... some logic to determine it (use Cookies Plugin?)

  try {
    langList[ `../../node_modules/quasar/lang/${ langIso }.js` ]().then(lang => {
      Lang.set(lang.default)
    })
  }
  catch (err) {
    console.error(err)
    // Requested Quasar Language Pack does not exist,
    // let's not break the app, so catching error
  }
})
<<| js With @quasar/app-webpack |>>
import { defineBoot } from '#q-app/wrappers'
import { Lang } from 'quasar'

export default defineBoot(async () => {
  const langIso = 'de' // ... some logic to determine it (use Cookies Plugin?)

  try {
    await import(
      /* webpackInclude: /(de|en-US)\.js$/ */
      'quasar/lang/' + langIso
    ).then(lang => {
      Lang.set(lang.default)
    })
  }
  catch (err) {
    console.error(err)
    // Requested Quasar Language Pack does not exist,
    // let's not break the app, so catching error
  }
})
```

Then register this boot file into the `/quasar.config` file:

```js
boot: [
  'quasar-lang-pack'
]
```

::: warning Always constrain a dynamic import
Notice the use of the [Webpack magic comment](https://webpack.js.org/api/module-methods/#magic-comments) - `webpackInclude`. Otherwise all the available language packs will be bundled, resulting in an increase in the compilation time and the bundle size. See [Caveat for dynamic imports](/quasar-cli-webpack/lazy-loading#caveat-for-dynamic-imports)
:::

### Dynamical (SSR)
When dealing with SSR, we can't use singleton objects because that would pollute sessions. As a result, as opposed to the dynamical example above (read it first!), you must also specify the `ssrContext` from your boot file:

```tabs
<<| js With @quasar/app-vite |>>
import { defineBoot } from '#q-app/wrappers'
import { Lang } from 'quasar'

// relative path to your node_modules/quasar/..
// change to YOUR path
const langList = import.meta.glob('../../node_modules/quasar/lang/*.js')
// or just a select few (example below with only DE and FR):
// import.meta.glob('../../node_modules/quasar/lang/(de|fr).js')

// ! NOTICE ssrContext param:
export default defineBoot(async ({ ssrContext }) => {
  const langIso = 'de' // ... some logic to determine it (use Cookies Plugin?)

  try {
    langList[ `../../node_modules/quasar/lang/${ langIso }.js` ]().then(lang => {
      Lang.set(lang.default, ssrContext)
    })
  }
  catch (err) {
    console.error(err)
    // Requested Quasar Language Pack does not exist,
    // let's not break the app, so catching error
  }
})
<<| js With @quasar/app-webpack |>>
import { defineBoot } from '#q-app/wrappers'
import { Lang } from 'quasar'

// ! NOTICE ssrContext param:
export default defineBoot(async ({ ssrContext }) => {
  const langIso = 'de' // ... some logic to determine it (use Cookies Plugin?)

  try {
    await import(
      /* webpackInclude: /(de|en-US)\.js$/ */
      'quasar/lang/' + langIso
    ).then(lang => {
      Lang.set(lang.default, ssrContext)
    })
  }
  catch (err) {
    console.error(err)
    // Requested Quasar Language Pack does not exist,
    // let's not break the app, so catching error
  }
})
```

## Change Quasar Language Pack at Runtime

### Changing Language Pack

Example with a QSelect to dynamically change the Quasar components language:

```tabs
<<| html With @quasar/app-vite |>>
<template>
  <q-select
    v-model="lang"
    :options="langOptions"
    label="Quasar Language"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  />
  <div>{{ $q.lang.label.close }}</div>
</template>

<script>
import { useQuasar } from 'quasar'
import languages from 'quasar/lang/index.json'
import { ref, watch } from 'vue'

const modules = import.meta.glob('../../node_modules/quasar/lang/(de|en-US|es).js')

const appLanguages = languages.filter(lang =>
  ['de', 'en-US', 'es'].includes(lang.isoName)
)

const langOptions = appLanguages.map(lang => ({
  label: lang.nativeName, value: lang.isoName
}))

export default {
  setup () {
    const $q = useQuasar()
    const lang = ref($q.lang.isoName)

    watch(lang, val => {
      modules[`../../node_modules/quasar/lang/${val}.js`]().then(lang => {
        $q.lang.set(lang.default)
      })
    })

    return {
      lang,
      langOptions
    }
  }
}
</script>
<<| html With @quasar/app-webpack |>>
<template>
  <q-select
    v-model="lang"
    :options="langOptions"
    label="Quasar Language"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  />
</template>

<script>
import { useQuasar } from 'quasar'
import languages from 'quasar/lang/index.json'
import { ref, watch } from 'vue'

const appLanguages = languages.filter(lang =>
  [ 'de', 'en-US' ].includes(lang.isoName)
)

const langOptions = appLanguages.map(lang => ({
  label: lang.nativeName, value: lang.isoName
}))

export default {
  setup () {
    const $q = useQuasar()
    const lang = ref($q.lang.isoName)

    watch(lang, val => {
      // dynamic import, so loading on demand only
      import(
        /* webpackInclude: /(de|en-US)\.js$/ */
        'quasar/lang/' + val
        ).then(lang => {
          $q.lang.set(lang.default)
        })
    })

    return {
      lang,
      langOptions
    }
  }
}
</script>
```

### Changing a Specific Label at Runtime
If you want to change a specific label to another, you can. Here is an example:

```tabs
<<| js Composition API |>>
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  function changeLabel () {
    $q.lang.table.noData = 'Hey... there is no data...'
  }

  return { changeLabel }
}
<<| js Options API |>>
methods: {
  changeLabel () {
    this.$q.lang.table.noData = 'Hey... there is no data...'
  }
}
```

If you want to do this outside of a .vue file (and you are NOT on SSR mode) then you can

```js /src/boot/some-boot-file.js
import { defineBoot } from '#q-app/wrappers'
import { Lang } from 'quasar'

export default defineBoot(() {
  Lang.props.table.noData = 'Hey... there is no data...'
})
```

## Using Quasar Language Pack in App Space
Although the Quasar Language Packs **are designed only for Quasar components internal usage**, you can still use their labels for your own website/app components too.

```
"Close" label in current Quasar Language Pack is:
{{ $q.lang.label.close }}
```

Check a Quasar Language Pack on [GitHub](https://github.com/quasarframework/quasar/tree/dev/ui/lang) to see the structure of `$q.lang`.

## Detecting Locale
There's also a method to determine user locale which is supplied by Quasar out of the box:

```js
// outside of a Vue file
import { Lang } from 'quasar'
Lang.getLocale() // returns a string

// inside of a Vue file
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  $q.lang.getLocale() // returns a string
}
```
