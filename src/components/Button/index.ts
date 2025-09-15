import type { App, ObjectPlugin } from 'vue';
import BsButton from './BsButton';
import BsToggleButton from './BsToggleButton';
import BsToggleField from './BsToggleField';

const BsButtonPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsButton.name as string, BsButton);
    app.component(BsToggleButton.name as string, BsToggleButton);
    app.component(BsToggleField.name as string, BsToggleField);
    // Backward compatibility
    app.component('BsButtonToggle', BsToggleButton);
    app.component('BsButtonToggleField', BsToggleField);
  },
};

export { BsButton, BsButtonPlugin, BsToggleButton };
