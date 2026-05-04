import type { App, ObjectPlugin } from 'vue';
import BsDropdownMenu from './BsDropdownMenu.ts';

const BsMenuPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsDropdownMenu', BsDropdownMenu);
    // Backward compatibility
    app.component('BsMenu', BsDropdownMenu);
  },
};

export type * from '@/components/Menu/types';
export { BsDropdownMenu, BsMenuPlugin };
