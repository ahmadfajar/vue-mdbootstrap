import type { App, ObjectPlugin } from 'vue';
import BsRadio from './BsRadio.ts';
import BsRadioGroup from './BsRadioGroup.ts';

const BsRadioPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsRadio', BsRadio);
    app.component('BsRadioGroup', BsRadioGroup);
  },
};

export type * from '@/components/Radio/types';
export { BsRadio, BsRadioGroup, BsRadioPlugin };
