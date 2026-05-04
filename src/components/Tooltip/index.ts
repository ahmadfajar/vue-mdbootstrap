import type { App, ObjectPlugin } from 'vue';
import BsTooltip from './BsTooltip.ts';

const BsTooltipPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsTooltip', BsTooltip);
  },
};

export type * from '@/components/Tooltip/types';
export { BsTooltip, BsTooltipPlugin };
