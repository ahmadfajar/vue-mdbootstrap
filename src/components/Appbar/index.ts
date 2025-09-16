import type { App, ObjectPlugin } from 'vue';
import registerConfig from '../../mixins/registerConfig.ts';
import BsAppbar from './BsAppbar.ts';
import BsAppbarItems from './BsAppbarItems.ts';
import BsAppbarTitle from './BsAppbarTitle.ts';

const BsAppbarPlugin: ObjectPlugin = {
  install: (app: App): void => {
    registerConfig(app);
    app.component(BsAppbar.name as string, BsAppbar);
    app.component(BsAppbarItems.name as string, BsAppbarItems);
    app.component(BsAppbarTitle.name as string, BsAppbarTitle);
  },
};

export { BsAppbar, BsAppbarItems, BsAppbarPlugin, BsAppbarTitle };
