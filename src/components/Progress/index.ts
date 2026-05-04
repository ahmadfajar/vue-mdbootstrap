import type { App, ObjectPlugin } from 'vue';
import BsMaskLoader from './BsMaskLoader.ts';
import BsProgress from './BsProgress.ts';
import BsProgressBar from './BsProgressBar.ts';
import BsSpinLoader from './BsSpinLoader.ts';

const BsProgressPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsMaskLoader', BsMaskLoader);
    app.component('BsProgress', BsProgress);
    app.component('BsProgressBar', BsProgressBar);
    app.component('BsSpinLoader', BsSpinLoader);
  },
};

export type * from '@/components/Progress/types';
export { BsMaskLoader, BsProgress, BsProgressBar, BsProgressPlugin, BsSpinLoader };
