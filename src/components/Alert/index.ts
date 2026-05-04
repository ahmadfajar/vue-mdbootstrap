import type { App, ObjectPlugin } from 'vue';
import BsAlert from './BsAlert.ts';

const BsAlertPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsAlert', BsAlert);
  },
};

export type * from '@/components/Alert/types';
export { BsAlert, BsAlertPlugin };
