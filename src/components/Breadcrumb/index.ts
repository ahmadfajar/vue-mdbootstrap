import type { App, ObjectPlugin } from 'vue';
import BsBreadcrumb from './BsBreadcrumb.ts';

const BsBreadcrumbPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsBreadcrumb', BsBreadcrumb);
  },
};

export { BsBreadcrumb, BsBreadcrumbPlugin };
