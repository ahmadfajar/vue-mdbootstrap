import registerConfig from '@/mixins/RegisterConfig.ts';
import type { App, ObjectPlugin } from 'vue';
import BsAppbar from './BsAppbar.ts';
import BsAppbarItems from './BsAppbarItems.ts';
import BsAppbarTitle from './BsAppbarTitle.ts';

const BsAppbarPlugin: ObjectPlugin = {
  install: (app: App): void => {
    registerConfig(app);
    app.component('BsAppbar', BsAppbar);
    app.component('BsAppbarItems', BsAppbarItems);
    app.component('BsAppbarTitle', BsAppbarTitle);
  },
};

export type * from '@/components/Appbar/types';
export { BsAppbar, BsAppbarItems, BsAppbarPlugin, BsAppbarTitle };
