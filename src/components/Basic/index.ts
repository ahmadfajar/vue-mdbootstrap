import type { App, ObjectPlugin } from 'vue';
import BsDivider from './BsDivider.ts';
import BsImageHolder from './BsImageHolder.ts';
import BsSpacer from './BsSpacer.ts';
import BsSubheader from './BsSubheader.ts';

const BsBasicCmpPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsDivider', BsDivider);
    app.component('BsImageHolder', BsImageHolder);
    app.component('BsSpacer', BsSpacer);
    app.component('BsSubheader', BsSubheader);
  },
};

export type * from '@/components/Basic/types';
export { BsBasicCmpPlugin, BsDivider, BsImageHolder, BsSpacer, BsSubheader };
