import type { App, ObjectPlugin } from 'vue';
import BsMaskLoader from './BsMaskLoader.ts';
import BsProgress from './BsProgress.ts';
import BsProgressBar from './BsProgressBar.ts';

const BsProgressPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsMaskLoader.name as string, BsMaskLoader);
    app.component(BsProgress.name as string, BsProgress);
    app.component(BsProgressBar.name as string, BsProgressBar);
  },
};

export { BsMaskLoader, BsProgress, BsProgressBar, BsProgressPlugin };
