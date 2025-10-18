import type { App, ObjectPlugin } from 'vue';
import BsPopover from './BsPopover';

const BsPopoverPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsPopover.name as string, BsPopover);
  },
};

export { BsPopover, BsPopoverPlugin };
