import type { App, ObjectPlugin } from 'vue';
import BsChipField from './BsChipField.ts';
import BsNumericField from './BsNumericField.ts';
import BsSearchField from './BsSearchField.ts';
import BsTextArea from './BsTextArea.ts';
import BsTextField from './BsTextField.ts';

const BsFieldPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsTextField.name as string, BsTextField);
    app.component(BsTextArea.name as string, BsTextArea);
    app.component(BsChipField.name as string, BsChipField);
    app.component(BsNumericField.name as string, BsNumericField);
    app.component(BsSearchField.name as string, BsSearchField);
  },
};

export { BsChipField, BsFieldPlugin, BsNumericField, BsSearchField, BsTextArea, BsTextField };
