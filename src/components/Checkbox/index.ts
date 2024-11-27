import type { App, ObjectPlugin } from 'vue';
import BsCheckbox from './BsCheckbox';
import BsCheckboxGroup from './BsCheckboxGroup';

const BsCheckboxPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(<string>BsCheckbox.name, BsCheckbox);
        app.component(<string>BsCheckboxGroup.name, BsCheckboxGroup);
    },
};

export { BsCheckboxPlugin, BsCheckbox, BsCheckboxGroup };
