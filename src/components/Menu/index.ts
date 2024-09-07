import type { App, Plugin } from 'vue';
import BsDropdownMenu from './BsDropdownMenu';
import './dropdownMenu.scss';

const BsMenuPlugin: Plugin = {
    install: (app: App): void => {
        app.component(BsDropdownMenu.name as string, BsDropdownMenu);
        // Backward compatibility
        app.component('BsMenu', BsDropdownMenu);
    },
};

export { BsMenuPlugin, BsDropdownMenu };
