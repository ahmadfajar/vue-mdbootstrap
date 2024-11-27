import type { App, ObjectPlugin } from 'vue';
import BsDatePicker from './BsDatePicker';
import BsDateTimeField from './BsDateTimeField';

const BsDatePickerPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsDatePicker.name as string, BsDatePicker);
        app.component(BsDateTimeField.name as string, BsDateTimeField);
    },
};

export { BsDatePickerPlugin, BsDatePicker, BsDateTimeField };
