import type { App, ObjectPlugin } from 'vue';
import BsButton from './BsButton.ts';
import BsCloseButton from './BsCloseButton.ts';
import BsToggleButton from './BsToggleButton.ts';
import BsToggleField from './BsToggleField.ts';

const BsButtonPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsButton.name as string, BsButton);
    app.component(BsCloseButton.name as string, BsCloseButton);
    app.component(BsToggleButton.name as string, BsToggleButton);
    app.component(BsToggleField.name as string, BsToggleField);
    // Backward compatibility
    app.component('BsButtonToggle', BsToggleButton);
    app.component('BsButtonToggleField', BsToggleField);
  },
};

export { BsButton, BsButtonPlugin, BsCloseButton, BsToggleButton };
