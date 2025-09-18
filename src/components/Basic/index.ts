import type { App, ObjectPlugin } from 'vue';
import BsDivider from './BsDivider.ts';
import BsImageHolder from './BsImageHolder.ts';
import BsSpacer from './BsSpacer.ts';
import BsSubheader from './BsSubheader.ts';

const BsBasicCmpPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsDivider.name as string, BsDivider);
    app.component(BsImageHolder.name as string, BsImageHolder);
    app.component(BsSpacer.name as string, BsSpacer);
    app.component(BsSubheader.name as string, BsSubheader);
  },
};

export { BsBasicCmpPlugin, BsDivider, BsImageHolder, BsSpacer, BsSubheader };
