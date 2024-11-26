import type { App, ObjectPlugin } from 'vue';
import BsDatePicker from './BsDatePicker';
import BsDateTimeField from './BsDateTimeField';
import '../../../scss/_globalvars.scss';
import '../../../scss/_transitions.scss';
import '../../../scss/_utilities.scss';
import '../Field/field.scss';
import './datePicker.scss';

const BsDatePickerPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsDatePicker.name as string, BsDatePicker);
        app.component(BsDateTimeField.name as string, BsDateTimeField);
    },
};

export { BsDatePickerPlugin, BsDatePicker, BsDateTimeField };
