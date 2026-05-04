import type { App, ObjectPlugin } from 'vue';
import BsChip from './BsChip.ts';
import BsChipGroup from './BsChipGroup.ts';

const BsChipPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsChip', BsChip);
    app.component('BsChipGroup', BsChipGroup);
  },
};

export type * from '@/components/Chip/types';
export { BsChip, BsChipGroup, BsChipPlugin };
