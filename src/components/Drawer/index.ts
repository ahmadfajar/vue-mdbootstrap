import type { App, ObjectPlugin } from 'vue';
import registerConfig from '../../mixins/registerConfig.ts';
import BsSideDrawer from './BsSideDrawer.ts';

const BsDrawerPlugin: ObjectPlugin = {
  install: (app: App): void => {
    registerConfig(app);
    app.component(BsSideDrawer.name as string, BsSideDrawer);
  },
};

export { BsDrawerPlugin, BsSideDrawer };
