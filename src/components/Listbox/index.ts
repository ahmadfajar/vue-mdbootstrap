import type { App, ObjectPlugin } from 'vue';
import BsListbox from './BsListbox';

const BsListboxPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsListbox.name as string, BsListbox);
    },
};

export { BsListboxPlugin, BsListbox };
