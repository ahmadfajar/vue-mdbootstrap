import type { App, ObjectPlugin } from 'vue';
import BsTab from './BsTab.ts';
import BsTabs from './BsTabs.ts';

const BsTabsPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsTab', BsTab);
    app.component('BsTabs', BsTabs);
  },
};

export type { ITabsProvider } from '@/components/Tabs/mixins/TabsProvider.ts';
export type * from '@/components/Tabs/types';
export { BsTab, BsTabs, BsTabsPlugin };
