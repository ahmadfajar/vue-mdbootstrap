import type { App, ObjectPlugin } from 'vue';
import BsRadio from './BsRadio';
import BsRadioGroup from './BsRadioGroup';

const BsRadioPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsRadio.name as string, BsRadio);
        app.component(BsRadioGroup.name as string, BsRadioGroup);
    },
};

export { BsRadioPlugin, BsRadio, BsRadioGroup };
