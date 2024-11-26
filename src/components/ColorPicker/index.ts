import type { App, ObjectPlugin } from 'vue';
import BsColorPicker from './BsColorPicker';
import '../../../scss/_transitions.scss';
import '../../../scss/_utilities.scss';
import './colorPicker.scss';

const BsColorPickerPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsColorPicker.name as string, BsColorPicker);
    },
};

export { BsColorPickerPlugin, BsColorPicker };
