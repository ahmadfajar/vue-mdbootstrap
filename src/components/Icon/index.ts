import type { App, ObjectPlugin } from 'vue';
import BsFontawesomeIcon from './BsFontawesomeIcon.ts';
import BsIcon from './BsIcon.ts';
import BsSpinnerIcon from './BsSpinnerIcon.ts';
import BsSvgIcon from './BsSvgIcon.ts';
import BsToggleIcon from './BsToggleIcon.ts';

const BsIconPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsIcon.name as string, BsIcon);
    app.component(BsSvgIcon.name as string, BsSvgIcon);
    app.component(BsSpinnerIcon.name as string, BsSpinnerIcon);
    app.component(BsToggleIcon.name as string, BsToggleIcon);
    app.component(BsFontawesomeIcon.name as string, BsFontawesomeIcon);

    // Backward compatibility
    app.component('BsIconToggle', BsToggleIcon);
    app.component('BsIconSvg', BsSvgIcon);
    app.component('BsIconSpinner', BsSpinnerIcon);
    app.component('BsIconFontawesome', BsFontawesomeIcon);
  },
};

export { BsFontawesomeIcon, BsIcon, BsIconPlugin, BsSpinnerIcon, BsSvgIcon, BsToggleIcon };
