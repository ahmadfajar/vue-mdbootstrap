# Vue MdBootstrap

<p align="center">
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


**Vue MdBootstrap** is a collection of **Vue** components and built according to 
the <a href="https://material.io/design" target="_blank">Google Material Design</a> specs.


These components were build in the spirit of **Vue framework**, and utilize **Bootstrap 4** 
css framework. Long ago, I use them on all my VueJs projects. Now, I decide to publish 
these components and hope it will be useful to anyone who wants to use it as an alternative of
many Vue components out there. 

## How to Use

### For Building SPA with NPM/Yarn

#### Installation

Use npm or yarn to install.

```shell script
npm install --save vue-mdbootstrap
```
or
```shell script
yarn add vue-mdbootstrap
```

#### Usage

On your primary javascript, use code below to load or initialize the components.

```javascript
import Vue from "vue";
import VueMdb, { AxiosPlugin } from "vue-mdbootstrap";

// only requires if using BsGrid, BsTreeGrid, BsModel, BsStore, BsTreeStore or needs to perform HTTP Request
Vue.use(AxiosPlugin);
// default requirement, to load the UI components
Vue.use(VueMdb);
````

Now, you are ready to go. You can use any of **Vue MdBootstrap** components without using `import` statement again. 
Please note, these components still need css from **Bootstrap4**. 

### For Building non-SPA without NPM/Yarn

If you aren't building SPA and not using npm or yarn and your goals is building common web page for web browser,
grab the supplied css and js in the **dist** folder and put it on your html head. You can use example code below 
to load and initialize the components.

````html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="http://localhost/dist/vue-mdb.css">
<script src="http://localhost/dist/vue-mdb.bundle.js"></script>
````

Use script below if you are using BsGrid, BsTreeGrid, BsModel, BsStore, BsTreeStore or need to perform HTTP Request.

````javascript
Vue.use(AxiosPlugin, {baseURL: "http://localhost/<api-url>"});
````

Now, you can use any of **Vue MdBootstrap** components in your html page.

## Demos
You can clone the demos from [here](https://github.com/ahmadfajar/vue-mdbootstrap-demos) to see it in action.

## Browser Support

Modern browsers and Internet Explorer 10+.
