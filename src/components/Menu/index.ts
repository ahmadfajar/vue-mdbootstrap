import type { App, ObjectPlugin } from 'vue';
import BsDropdownMenu from './BsDropdownMenu.ts';

const BsMenuPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsDropdownMenu.name as string, BsDropdownMenu);
    // Backward compatibility
    app.component('BsMenu', BsDropdownMenu);
  },
};

export { BsDropdownMenu, BsMenuPlugin };
