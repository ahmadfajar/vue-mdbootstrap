import type { App, ObjectPlugin } from 'vue';
import BsMaskLoader from './BsMaskLoader.ts';
import BsProgress from './BsProgress.ts';
import BsProgressBar from './BsProgressBar.ts';
import BsSpinLoader from './BsSpinLoader.ts';

const BsProgressPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsMaskLoader.name as string, BsMaskLoader);
    app.component(BsProgress.name as string, BsProgress);
    app.component(BsProgressBar.name as string, BsProgressBar);
    app.component(BsSpinLoader.name as string, BsSpinLoader);
  },
};

export { BsMaskLoader, BsProgress, BsProgressBar, BsProgressPlugin, BsSpinLoader };
