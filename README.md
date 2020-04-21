# Vue MdBootstrap

<p align="center">
  <a href="https://www.npmjs.com/package/vue-mdbootstrap">
    <img src="https://flat.badgen.net/npm/v/vue-mdbootstrap" alt="NPM Release">
  </a>
  <a href="https://github.com/ahmadfajar/vue-mdbootstrap">
    <img src="https://flat.badgen.net/github/release/ahmadfajar/vue-mdbootstrap" alt="Release">
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

## How to Install

Use npm or yarn to install.

```shell script
npm install --save vue-mdbootstrap
```
or
```shell script
yarn add vue-mdbootstrap
```

## How to Use
On your primary javascript, use code below to load or initialize the components.

```shell script
import Vue from "vue";
import VueMdb, { AxiosPlugin } from "vue-mdbootstrap";

Vue.use(VueMdb);
// Below only requires if using BsGrid, BsModel, BsStore or needs to perform HTTP Request
Vue.use(AxiosPlugin);
````

Now, you are ready to go. You can use any of **Vue MdBootstrap** components without using `import` statement again. 
Please note, these components still need css from **Bootstrap4**. So don't forget to grab it and put it on
your html head before the supplied css in the **dist** folder.

You can clone the demos from [here](https://github.com/ahmadfajar/vue-mdbootstrap-demos) to see it in action.

## Browser Support

Modern browsers and Internet Explorer 10+.
