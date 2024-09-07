import type { App, Plugin } from 'vue';
import registerConfig from '../../mixins/registerConfig';
import BsSideDrawer from './BsSideDrawer';
import '../../../scss/_transitions.scss';
import '../../../scss/_utilities.scss';
import './sidedrawer.scss';

const BsDrawerPlugin: Plugin = {
    install: (app: App): void => {
        registerConfig(app);
        app.component(BsSideDrawer.name as string, BsSideDrawer);
    },
};

export { BsDrawerPlugin, BsSideDrawer };
