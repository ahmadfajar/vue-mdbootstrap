import type { App, ObjectPlugin } from 'vue';
import BsIcon from './BsIcon';
import BsIconSvg from './BsIconSvg';
import BsIconSpinner from './BsIconSpinner';
import BsToggleIcon from './BsToggleIcon';
import BsFontAwesome from './BsFontAwesome';

const BsIconPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsIcon.name as string, BsIcon);
        app.component(BsIconSvg.name as string, BsIconSvg);
        app.component(BsIconSpinner.name as string, BsIconSpinner);
        app.component(BsToggleIcon.name as string, BsToggleIcon);
        app.component(BsFontAwesome.name as string, BsFontAwesome);
        // Backward compatibility
        app.component('BsIconToggle', BsToggleIcon);
    },
};

export { BsIconPlugin, BsIcon, BsIconSvg, BsIconSpinner, BsToggleIcon, BsFontAwesome };
