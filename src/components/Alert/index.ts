import type { App, Plugin } from 'vue';
import BsAlert from './BsAlert';
import '../../../scss/_transitions.scss';
import './alert.scss';

const BsAlertPlugin: Plugin = {
    install: (app: App): void => {
        app.component(BsAlert.name as string, BsAlert);
    },
};

export { BsAlertPlugin, BsAlert };
