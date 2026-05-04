import type { App, ObjectPlugin } from 'vue';
import BsChipField from './BsChipField.ts';
import BsNumericField from './BsNumericField.ts';
import BsSearchField from './BsSearchField.ts';
import BsTextArea from './BsTextArea.ts';
import BsTextField from './BsTextField.ts';

const BsFieldPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsTextField', BsTextField);
    app.component('BsTextArea', BsTextArea);
    app.component('BsChipField', BsChipField);
    app.component('BsNumericField', BsNumericField);
    app.component('BsSearchField', BsSearchField);
  },
};

export type * from '@/components/Field/types';
export { BsChipField, BsFieldPlugin, BsNumericField, BsSearchField, BsTextArea, BsTextField };
