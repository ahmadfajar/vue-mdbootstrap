import type { App, ObjectPlugin } from 'vue';
import BsDropdownMenu from './BsDropdownMenu';

const BsMenuPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsDropdownMenu.name as string, BsDropdownMenu);
        // Backward compatibility
        app.component('BsMenu', BsDropdownMenu);
    },
};

export { BsMenuPlugin, BsDropdownMenu };
