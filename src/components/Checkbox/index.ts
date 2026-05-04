import type { App, ObjectPlugin } from 'vue';
import BsCheckbox from './BsCheckbox.ts';
import BsCheckboxGroup from './BsCheckboxGroup.ts';

const BsCheckboxPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsCheckbox', BsCheckbox);
    app.component('BsCheckboxGroup', BsCheckboxGroup);
  },
};

export type * from '@/components/Checkbox/types';
export { BsCheckbox, BsCheckboxGroup, BsCheckboxPlugin };
