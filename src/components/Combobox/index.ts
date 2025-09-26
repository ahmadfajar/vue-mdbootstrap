import type { App, ObjectPlugin } from 'vue';
import BsCombobox from './BsCombobox.ts';
import BsListbox from './BsListbox.ts';

const BsComboboxPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsListbox.name as string, BsListbox);
    app.component(BsCombobox.name as string, BsCombobox);
  },
};

export { BsCombobox, BsComboboxPlugin, BsListbox };
