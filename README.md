<p align="center">
  <a href="https://ahmadfajar.github.io/" target="_blank">
    <img src="https://raw.githubusercontent.com/ahmadfajar/vue-mdbootstrap/refs/heads/master/.github/logo.png" alt="Vue MDBootstrap" height="120">
  </a>
</p>

<p align="center" style="font-size:1.5em; font-weight: 600">
Vue MDBootstrap
</p>
<p align="center">
Vue.js UI component library that leverages Bootstrap or Tailwind to build beautiful web applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-mdbootstrap">
    <img src="https://img.shields.io/npm/v/vue-mdbootstrap?logo=npm" alt="NPM Release">
  </a>
  <a href="https://github.com/ahmadfajar/vue-mdbootstrap">
    <img src="https://img.shields.io/github/release/ahmadfajar/vue-mdbootstrap?logo=github" alt="Release">
  </a>
  <a href="https://www.npmjs.com/package/vue-mdbootstrap">
    <img src="https://img.shields.io/npm/dt/vue-mdbootstrap" alt="Downloads">
  </a>
  <a href="https://www.npmjs.com/package/vue-mdbootstrap">
    <img src="https://img.shields.io/github/license/ahmadfajar/vue-mdbootstrap" alt="License">
  </a>
</p>

---


## Introduction

**Vue MDBootstrap** is a collection of UI components for **Vue 3** and built 
according to the [Google Material Design 3](https://m3.material.io/)
specifications. This component library is built in the spirit of **Vue 3** framework and 
can leverages the **Bootstrap v5** or **TailwindCSS v4** css framework to built beautiful web-apps.

Whether you are building an amazing **Single Page Application (SPA)** or common web page, 
you have the power at your fingertips. You don't have to be a great programmer and
have excellent UI design skills. Just use **Vue MDBootstrap**. It's easy to use and
most of the components you need are already there.


## Getting Started

**Vue MDBootstrap** can be used to built Single Page Application (SPA) by using module 
bundler or built common web page by using resources from the CDN.

### Requirements

- [Vue.js](https://vuejs.org) `v3.x` is required, `v3.5.x` is recommended
- [Bootstrap](https://getbootstrap.com) `v5.x` is optional, `v5.3.8` is recommended
- [TailwindCSS](https://tailwindcss.com) `v4.x` is optional, `v4.1.8` is recommended
- [Vue Router](https://router.vuejs.org/) `v4.x` is optional, and is required for building SPA using module bundler 
- [Pinia](https://pinia.vuejs.org/) is optional, and is required for building SPA using module bundler 
- [Vuelidate](https://vuelidate-next.netlify.app/) is optional, and is required for forms validation 


## Project Setup

### Using Module Bundler

If you are building a Single Page Application, then you can use module bundler such as 
[Vite](https://vitejs.dev/), [Vue Cli](https://cli.vuejs.org/) or 
[Webpack](https://webpack.js.org/) to build and jump-start your project. 
And use `yarn` or `npm` to get the latest version of **Vue.js** 
and **Vue MDBootstrap**. We assume you have created your project using 
[Vite + Vue](https://vuejs.org/guide/quick-start.html#creating-a-vue-application). 
If not, please read the 
[manual](https://vuejs.org/guide/quick-start.html#creating-a-vue-application) first.


```bash
# With npm
npm install vue-mdbootstrap@next --save

# With yarn
yarn add vue-mdbootstrap@next
```

Create Vue application and mount at `#app` entry point.

```ts
// file: main.ts

// import global function to register the components and create Vue application
import { createVueMdb } from "vue-mdbootstrap";

// Import the main page template
import App from '@/App.vue';

// Import router navigation, 
// read vue-router manual on how to setup the navigation
import router from '@/router'; 

// import core components css stylesheet 
import "vue-mdbootstrap/styles";
// import theme css stylesheet 
import 'vue-mdbootstrap/theme-light';

// main code start here...
createVueMdb(App).use(router).mount('#app');
```

Now, everything is registered and you are ready to go. Please note, the provided CSS only handles
component styling. You still need **Bootstrap 5** or **TailwindCSS 4** to handle page 
responsiveness and to quickly style your web pages. Use code below in the `<head>` section of
your HTML to load the Bootstrap CSS framework.

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous"/>
```


### Using CDN Resources

You can get the latest version of Vue MDBootstrap directly from 
[unpkg](https://unpkg.com/) or [jsdelivr](https://www.jsdelivr.com/package/npm/vue-mdbootstrap).
Then use the js and css files in the `<head>` section or your html to get started. 

Code below is an example on how to create HTML page using Vue MDBootstrap.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous"/>
  <link href="https://cdn.jsdelivr.net/npm/vue-mdbootstrap@2/dist/bundle-core.min.css" rel="stylesheet" crossorigin="anonymous">
  <link href="https://cdn.jsdelivr.net/npm/vue-mdbootstrap@2/dist/theme-light.min.css" rel="stylesheet" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-mdbootstrap@2/dist/vue-mdb.umd.min.js" crossorigin="anonymous"></script>
</head>

<body>
  <div id="app" class="container">
    <h3 class="mt-4">Contextual Buttons</h3>
    <bs-card class="bg-gray-200 mt-3" border-off>
      <bs-card-body>
        <div class="flex justify-center">
          <bs-button @click="count++">Click me</bs-button>
          <bs-button color="primary" @click="count++">Click me</bs-button>
          <bs-button color="secondary" @click="count++">Click me</bs-button>
          <bs-button color="success" @click="count++">Click me</bs-button>
          <bs-button color="danger" @click="count++">Click me</bs-button>
          <bs-button color="warning" @click="count++">Click me</bs-button>
          <bs-button color="info" @click="count++">Click me</bs-button>
        </div>
        <div class="mt-3 text-center font-weight-semibold">Count: {{ count }}</div>
      </bs-card-body>
    </bs-card>
  </div>
  <script>
    const { ref } = Vue;
    const { createVueMdb } = VueMdb;
    const app = createVueMdb({
      setup() {
        const count = ref(0);
        return {count};
      }
    });
    app.mount('#app');
  </script>
</body>
</html>  
```

## Documentation

For full documentation, please visit [Our Website](https://ahmadfajar.github.io/).

## Demo and Examples

You can clone the github repository below and run it by your self to see it in action. 
1. [vue3-mdb-example](https://github.com/ahmadfajar/vue3-mdb-example) - A web-apps that 
   show component usage examples.
2. [vue3-mdb-starter](https://github.com/ahmadfajar/vue3-mdb-starter) - A starter kit 
   project template that leverages the Bootstrap v5 CSS framework.


## Browser Support

All major modern browsers.
