import type { App, ObjectPlugin } from 'vue';
import BsButton from './BsButton.ts';
import BsCloseButton from './BsCloseButton.ts';
import BsToggleButton from './BsToggleButton.ts';
import BsToggleField from './BsToggleField.ts';

const BsButtonPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsButton', BsButton);
    app.component('BsCloseButton', BsCloseButton);
    app.component('BsToggleButton', BsToggleButton);
    app.component('BsToggleField', BsToggleField);
    // Backward compatibility
    app.component('BsButtonToggle', BsToggleButton);
    app.component('BsButtonToggleField', BsToggleField);
  },
};

export type * from '@/components/Button/types';
export { BsButton, BsButtonPlugin, BsCloseButton, BsToggleButton, BsToggleField };
