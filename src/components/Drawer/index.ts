import type { App, ObjectPlugin } from 'vue';
import registerConfig from '../../mixins/registerConfig';
import BsSideDrawer from './BsSideDrawer';

const BsDrawerPlugin: ObjectPlugin = {
    install: (app: App): void => {
        registerConfig(app);
        app.component(BsSideDrawer.name as string, BsSideDrawer);
    },
};

export { BsDrawerPlugin, BsSideDrawer };
