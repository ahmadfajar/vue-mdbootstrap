import registerConfig from '@/mixins/RegisterConfig.ts';
import type { App, ObjectPlugin } from 'vue';
import BsSideDrawer from './BsSideDrawer.ts';

const BsDrawerPlugin: ObjectPlugin = {
  install: (app: App): void => {
    registerConfig(app);
    app.component('BsSideDrawer', BsSideDrawer);
  },
};

export type * from '@/components/Drawer/types';
export { BsDrawerPlugin, BsSideDrawer };
