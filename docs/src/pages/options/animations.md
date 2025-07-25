---
title: Animations
desc: Helper CSS animations supplied by Animate.css for a Quasar app.
---

CSS Transitions can be handled by the [Vue Transition Component](https://vuejs.org/api/built-in-components.html). The transitions are used for entering (appearing) or leaving (disappearing) animations.

However, Quasar can supply a big list of ready to use CSS animations. The animation effects are borrowed from [Animate.css](https://animate.style/). So there are 80+ animation types available for you to use out of the box. Check the list either on Animate.css website or on the demo available for this page.

> Please refer to [Vue](https://vuejs.org/api/built-in-components.html#transition) documentation for learning on how to use the Vue supplied `<transition>` component.

## Installation

Edit the `/quasar.config` file:

```js /quasar.config file
// embedding all animations
animations: 'all'

// or embedding only specific animations
animations: [
  'bounceInLeft',
  'bounceOutRight'
]
```

If you are building a website, you can also skip configuring the quasar.config file and use a CDN link which points to Animate.css like this (following is just an example, Google for latest link). Remember this will require an Internet connection for your user, as opposed to bundling from within the quasar.config file.

```html /index.html
<head>
  ...

  <!-- CDN example for Animate.css -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  >
</head>
```

::: warning
It should be noted that when you import Animate.css through the `<link>` tag, all animation CSS classes must be prefixed with `animate__`. This is a breaking change in the migration of Animate.css from v3 to v4. If you want to avoid using prefixes, you can import the [compat version](https://animate.style/#migration).
<br><br>
However, if you're using the **Quasar CLI**, no additional changes are needed.
:::

::: warning
**Windows Developers**
If you're developing on Windows and the animations don't appear to be working, it's likely an OS level setting that's to blame.
Try changing **Visual Effects** to **Adjust for Best Appearance**.
1. Right click `My Computer` and select `Properties`
2. Click `Advanced System Settings`
3. Click the `Settings` button under `Performance`
4. Under the `Visual Effects` tab, change the radio option to: `Adjust for Best Appearance`
:::

## Usage

::: warning
Notice the string `animated` in front of the actual animation class name.
:::

```html Example with wrapping only one DOM element / component
<transition
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
  <!-- Wrapping only one DOM element, defined by QBtn -->
  <q-btn
    color="secondary"
    icon="mail"
    label="Email"
  />
</transition>
```
### Built-in animation classes
Quasar also provides some built-in classes to animate the active state between both enter and leave transitions. The animations provided are separated into three groups (click on them to expand):

::: details General classes
```
bounce
flash
flip
headShake
heartBeat
hinge
jello
pulse
rubberBand
shake
shakeX
shakeY
swing
tada
wobble
```
:::


::: details "In" classes
```
backInDown
backInLeft
backInRight
backInUp
bounceIn
bounceInDown
bounceInLeft
bounceInRight
bounceInUp
fadeIn
fadeInBottomLeft
fadeInBottomRight
fadeInDown
fadeInDownBig
fadeInLeft
fadeInLeftBig
fadeInRight
fadeInRightBig
fadeInTopLeft
fadeInTopRight
fadeInUp
fadeInUpBig
flipInX
flipInY
jackInTheBox
lightSpeedInLeft
lightSpeedInRight
rollIn
rotateIn
rotateInDownLeft
rotateInDownRight
rotateInUpLeft
rotateInUpRight
slideInDown
slideInLeft
slideInRight
slideInUp
zoomIn
zoomInDown
zoomInLeft
zoomInRight
zoomInUp
```
:::

::: details "Out" classes
```
backOutDown
backOutLeft
backOutRight
backOutUp
bounceOut
bounceOutDown
bounceOutLeft
bounceOutRight
bounceOutUp
fadeOut
fadeOutBottomLeft
fadeOutBottomRight
fadeOutDown
fadeOutDownBig
fadeOutLeft
fadeOutLeftBig
fadeOutRight
fadeOutRightBig
fadeOutTopLeft
fadeOutTopRight
fadeOutUp
fadeOutUpBig
flipOutX
flipOutY
lightSpeedOutLeft
lightSpeedOutRight
rollOut
rotateOut
rotateOutDownLeft
rotateOutDownRight
rotateOutUpLeft
rotateOutUpRight
slideOutDown
slideOutLeft
slideOutRight
slideOutUp
zoomOut
zoomOutDown
zoomOutLeft
zoomOutRight
zoomOutUp
```
:::

You can also go to the [official Vue documention](https://vuejs.org/guide/built-ins/transition.html#custom-transition-classes) for more information about the use of these classes.

### Modifier classes
There are additional classes which delay or repeat or change the speed of the animations (click to expand):

::: details Modifier classes
```js
repeat
repeat-1
repeat-2
delay-1s
delay-5s
slower
slow
fast
faster
```
:::

Example:

```html
<transition
  appear
  enter-active-class="animated fadeIn slower delay-5s repeat-2"
  leave-active-class="animated fadeOut"
>
  <!-- Wrapping only one DOM element, defined by QBtn -->
  <q-btn
    color="secondary"
    icon="mail"
    label="Email"
  />
</transition>
```

### Wrapping Multiple Elements
You can also group components or DOM elements in a transition so that the same effects are applied to all of them simultaneously.

```html Example with wrapping multiple DOM elements / components
<transition-group
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
  <!-- We wrap a "p" tag and a QBtn -->
  <p key="text">
     Lorem Ipsum
  </p>
  <q-btn
    key="email-button"
    color="secondary"
    icon="mail"
    label="Email"
  />
</transition-group>
```

Please note some things in the above example:

1. Note `<transition-group>` instead of `<transition>`.
2. The components and DOM elements must be keyed, like `key="text"` or `key="email-button"` in the example above.
3. Both examples above have the Boolean property `appear` specified, which makes the entering animation kick in right after component(s) have been rendered. This property is optional.
