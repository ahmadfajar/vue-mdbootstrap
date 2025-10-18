import type { App, ObjectPlugin } from 'vue';
import BsDatePicker from './BsDatePicker.ts';
import BsDateTimeField from './BsDateTimeField.ts';

const BsDatePickerPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsDatePicker.name as string, BsDatePicker);
    app.component(BsDateTimeField.name as string, BsDateTimeField);
  },
};

export { BsDatePicker, BsDatePickerPlugin, BsDateTimeField };
