import type { App, ObjectPlugin } from 'vue';
import BsCheckbox from './BsCheckbox.ts';
import BsCheckboxGroup from './BsCheckboxGroup.ts';

const BsCheckboxPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(<string>BsCheckbox.name, BsCheckbox);
    app.component(<string>BsCheckboxGroup.name, BsCheckboxGroup);
  },
};

export { BsCheckbox, BsCheckboxGroup, BsCheckboxPlugin };
