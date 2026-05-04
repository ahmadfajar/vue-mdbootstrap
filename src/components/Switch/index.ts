import type { App, ObjectPlugin } from 'vue';
import BsSwitch from './BsSwitch.ts';

const BsSwitchPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsSwitch', BsSwitch);
  },
};

export type * from '@/components/Switch/types';
export { BsSwitch, BsSwitchPlugin };
