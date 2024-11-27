import type { App, ObjectPlugin } from 'vue';
import BsMaskLoader from './BsMaskLoader';
import BsProgress from './BsProgress';
import BsProgressBar from './BsProgressBar';

const BsProgressPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsMaskLoader.name as string, BsMaskLoader);
        app.component(BsProgress.name as string, BsProgress);
        app.component(BsProgressBar.name as string, BsProgressBar);
    },
};

export { BsProgressPlugin, BsMaskLoader, BsProgress, BsProgressBar };
