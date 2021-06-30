# Vue MDBootstrap

<p style="text-align: center">
  <a href="https://www.npmjs.com/package/vue-mdbootstrap">
    <img src="https://flat.badgen.net/npm/v/vue-mdbootstrap" alt="NPM Release">
  </a>
  <a href="https://github.com/ahmadfajar/vue-mdbootstrap">
    <img src="https://flat.badgen.net/github/release/ahmadfajar/vue-mdbootstrap?icon=github" alt="Release">
  </a>
  <a href="https://www.npmjs.com/package/vue-mdbootstrap">
    <img src="https://flat.badgen.net/npm/dt/vue-mdbootstrap" alt="Downloads">
  </a>
  <a href="https://www.npmjs.com/package/vue-mdbootstrap">
    <img src="https://flat.badgen.net/github/license/ahmadfajar/vue-mdbootstrap" alt="License">
  </a>
</p>


**Vue MDBootstrap** is a collection of **Vue** components and built according to 
the <a href="https://material.io/design" target="_blank">Google Material Design</a> 
specs. They can be used to built **Single Page Application (SPA)** by using module 
bundler or built common web page by using the resources from the CDN.


These components were build in the spirit of **Vue framework**, and utilize **Bootstrap 4** 
css framework. Long ago, I use them on all my VueJs projects. Now, I decide to publish 
these components and hope it will be useful to anyone who wants to use it as an alternative of
many Vue components out there. 


## How To Use

### Using Module Bundlers

If you are building Single Page Application and using module bundlers like 
[Webpack](https://webpack.js.org/), [Vue Cli](https://cli.vuejs.org/) or 
[Symfony Encore](https://symfony.com/doc/current/frontend/encore/installation.html), 
you may prefer to directly include the package into your project. To get started, 
use `yarn` or `npm` to get the latest version of Vue.js, and Vue MDBootstrap.

```bash
# With npm
npm install vue vue-mdbootstrap --save
npm install node-sass@6.0.1 --save-dev
npm install sass-loader@10.2.0 --save-dev

# With yarn
yarn add vue vue-mdbootstrap
yarn add node-sass@6.0.1 --dev
yarn add sass-loader@10.2.0 --dev
```

Then, register Vue MDBootstrap in your app entry point.

```js
// main.js
import Vue from "vue";
import VueMdb, { AxiosPlugin } from "vue-mdbootstrap";

// Default requirement
Vue.use(VueMdb);
// Optionally, install the MDBootstrap Axios plugin
// only requires if using BsGrid, BsTreeGrid, BsModel, BsStore, BsTreeStore or needs to perform HTTP Request
Vue.use(AxiosPlugin);
```

Now, you are ready to go. You can use any of **Vue MDBootstrap** components without 
using `import` statement again. Please note, these components still need css from 
**Bootstrap4** css framework. 


### Using CDN

If you aren't building Single Page Application and not using module bundlers, and 
your goals is building common web page to display on the web browser, grab the 
supplied **css** and **js** from the **dist** folder. Or you can get the latest 
version of the resource from [unpkg.com/vue-mdbootstrap](https://unpkg.com/vue-mdbootstrap)
and use the js and css files on your html `<head>` section on the page to get started. 

Code below is an example how to load and initialize the components.

```html
<link rel="stylesheet" href="https://unpkg.com/bootstrap@4.5.2/dist/css/bootstrap.min.css" crossorigin="anonymous">
<link rel="stylesheet" href="https://unpkg.com/vue-mdbootstrap/dist/vue-mdb.min.css" crossorigin="anonymous">
<script src="https://unpkg.com/vue@2.6.14/dist/vue.min.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/vue-mdbootstrap/dist/vue-mdb.min.js" crossorigin="anonymous"></script>
```

If you are using `BsGrid`, `BsTreeGrid`, `BsModel`, `BsStore`, `BsTreeStore` and/or 
need to perform HTTP Request, you can use example code below in your javascript to 
initialize MDBootstrap Axios plugin.

```js
Vue.use(VueMdb.AxiosPlugin, {baseURL: "http://localhost/<api-url>"});
```

Now, you can use any of **Vue MDBootstrap** components in your html page.

**Notes**: 

- [FontAwesomeIcon](https://fontawesome.com/icons?d=gallery&s=solid&m=free) and 
  [Moment.js](https://momentjs.com/) already bundled except **Moment.js localization**.
- All plugins and classes placed under **VueMdb** namespace. Please refer to 
  [documentation](https://vue-mdbootstrap.fajarconsultant.com/#/reference). 


## Demos

You can clone the demos from [here](https://github.com/ahmadfajar/vue-mdbootstrap-demos) 
to see it in action.

## Start coding

Now you have implemented **Vue MDBootstrap** to your project, and it’s time to write your 
code. Please refer to each 
[component’s documentation](https://vue-mdbootstrap.fajarconsultant.com/#/components) 
to learn how to use them.

## Browser Support

Modern browsers and Internet Explorer 10+.
