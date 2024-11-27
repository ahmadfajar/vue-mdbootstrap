import type { App, ObjectPlugin } from 'vue';
import BsCombobox from './BsCombobox';

const BsComboboxPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsCombobox.name as string, BsCombobox);
    },
};

export { BsComboboxPlugin, BsCombobox };
