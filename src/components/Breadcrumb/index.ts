import type { App, ObjectPlugin } from 'vue';
import BsBreadcrumb from './BsBreadcrumb.ts';

const BsBreadcrumbPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsBreadcrumb', BsBreadcrumb);
  },
};

export type * from '@/components/Breadcrumb/types';
export { BsBreadcrumb, BsBreadcrumbPlugin };
