import type { App, ObjectPlugin } from 'vue';
import BsCheckbox from './BsCheckbox.ts';
import BsCheckboxGroup from './BsCheckboxGroup.ts';

const BsCheckboxPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsCheckbox.name as string, BsCheckbox);
    app.component(BsCheckboxGroup.name as string, BsCheckboxGroup);
  },
};

export { BsCheckbox, BsCheckboxGroup, BsCheckboxPlugin };
