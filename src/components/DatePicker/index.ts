import type { App, ObjectPlugin } from 'vue';
import BsDatePicker from './BsDatePicker.ts';
import BsDateTimeField from './BsDateTimeField.ts';

const BsDatePickerPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsDatePicker', BsDatePicker);
    app.component('BsDateTimeField', BsDateTimeField);
  },
};

export type * from '@/components/DatePicker/types';
export { BsDatePicker, BsDatePickerPlugin, BsDateTimeField };
