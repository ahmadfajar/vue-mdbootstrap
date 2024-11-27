import type { App, ObjectPlugin } from 'vue';
import BsSwitch from './BsSwitch';
import '../../../scss/_globalvars.scss';
import './switch.scss';

const BsSwitchPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsSwitch.name as string, BsSwitch);
    },
};

export { BsSwitchPlugin, BsSwitch };
