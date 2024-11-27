import type { App, ObjectPlugin } from 'vue';
import BsTabs from './BsTabs';
import BsTab from './BsTab';

const BsTabsPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsTab.name as string, BsTab);
        app.component(BsTabs.name as string, BsTabs);
    },
};

export { BsTabsPlugin, BsTab, BsTabs };
