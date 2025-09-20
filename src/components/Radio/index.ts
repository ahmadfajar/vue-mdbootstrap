import type { App, ObjectPlugin } from 'vue';
import BsRadio from './BsRadio.ts';
import BsRadioGroup from './BsRadioGroup.ts';

const BsRadioPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsRadio.name as string, BsRadio);
    app.component(BsRadioGroup.name as string, BsRadioGroup);
  },
};

export { BsRadio, BsRadioGroup, BsRadioPlugin };
