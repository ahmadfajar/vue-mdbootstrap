import type { App, ObjectPlugin } from 'vue';
import BsColorPicker from './BsColorPicker.ts';

const BsColorPickerPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsColorPicker.name as string, BsColorPicker);
  },
};

export { BsColorPicker, BsColorPickerPlugin };
