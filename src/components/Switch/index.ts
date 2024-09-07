import type { App, Plugin } from 'vue';
import BsSwitch from './BsSwitch';
import '../../../scss/_globalvars.scss';
import './switch.scss';

const BsSwitchPlugin: Plugin = {
    install: (app: App): void => {
        app.component(BsSwitch.name as string, BsSwitch);
    },
};

export { BsSwitchPlugin, BsSwitch };
