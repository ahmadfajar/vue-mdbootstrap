import type { App, ObjectPlugin } from 'vue';
import BsPopover from './BsPopover';

const BsPopoverPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsPopover', BsPopover);
  },
};

export * from '@/components/Popover/mixins/PopupManager';
export type * from '@/components/Popover/types';
export { BsPopover, BsPopoverPlugin };
