import type { App, ObjectPlugin } from 'vue';
import BsAlert from './BsAlert.ts';

const BsAlertPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsAlert.name as string, BsAlert);
  },
};

export { BsAlert, BsAlertPlugin };
