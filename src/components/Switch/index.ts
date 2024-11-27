import type { App, ObjectPlugin } from 'vue';
import BsSwitch from './BsSwitch';

const BsSwitchPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsSwitch.name as string, BsSwitch);
    },
};

export { BsSwitchPlugin, BsSwitch };
