import type { App, ObjectPlugin } from 'vue';
import BsPopover from './BsPopover';

const BsPopoverPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(<string>BsPopover.name, BsPopover);
  },
};

export { BsPopover, BsPopoverPlugin };
