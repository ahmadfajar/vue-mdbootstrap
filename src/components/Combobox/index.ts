import type { App, ObjectPlugin } from 'vue';
import BsCombobox from './BsCombobox.ts';
import BsListbox from './BsListbox.ts';

const BsComboboxPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsListbox', BsListbox);
    app.component('BsCombobox', BsCombobox);
  },
};

export type * from '@/components/Combobox/types';
export { BsCombobox, BsComboboxPlugin, BsListbox };
