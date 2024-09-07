import type { App, Plugin } from 'vue';
import BsCheckbox from './BsCheckbox';
import BsCheckboxGroup from './BsCheckboxGroup';
import '../../../scss/_globalvars.scss';
import '../Field/field.scss';
import './checkbox.scss';

const BsCheckboxPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsCheckbox.name, BsCheckbox);
        app.component(<string>BsCheckboxGroup.name, BsCheckboxGroup);
    },
};

export { BsCheckboxPlugin, BsCheckbox, BsCheckboxGroup };
