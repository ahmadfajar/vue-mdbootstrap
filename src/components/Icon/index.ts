import type { App, ObjectPlugin } from 'vue';
import BsFontawesomeIcon from './BsFontawesomeIcon.ts';
import BsIcon from './BsIcon.ts';
import BsSpinnerIcon from './BsSpinnerIcon.ts';
import BsSvgIcon from './BsSvgIcon.ts';
import BsToggleIcon from './BsToggleIcon.ts';

const BsIconPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsIcon', BsIcon);
    app.component('BsSvgIcon', BsSvgIcon);
    app.component('BsSpinnerIcon', BsSpinnerIcon);
    app.component('BsToggleIcon', BsToggleIcon);
    app.component('BsFontawesomeIcon', BsFontawesomeIcon);

    // Backward compatibility
    app.component('BsIconToggle', BsToggleIcon);
    app.component('BsIconSvg', BsSvgIcon);
    app.component('BsIconSpinner', BsSpinnerIcon);
    app.component('BsIconFontawesome', BsFontawesomeIcon);
  },
};

export type * from '@/components/Icon/types';
export { BsFontawesomeIcon, BsIcon, BsIconPlugin, BsSpinnerIcon, BsSvgIcon, BsToggleIcon };
