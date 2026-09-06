import type { App, ObjectPlugin } from 'vue';
import BsAlert from './BsAlert.ts';

const BsAlertPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsAlert', BsAlert);
  },
};

export { BsAlert, BsAlertPlugin };
