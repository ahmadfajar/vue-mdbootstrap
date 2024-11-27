import type { App, ObjectPlugin } from 'vue';
import BsAlert from './BsAlert';

const BsAlertPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsAlert.name as string, BsAlert);
    },
};

export { BsAlertPlugin, BsAlert };
