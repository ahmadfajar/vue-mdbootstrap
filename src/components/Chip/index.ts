import type { App, ObjectPlugin } from 'vue';
import BsChip from './BsChip.ts';
import BsChipGroup from './BsChipGroup.ts';

const BsChipPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsChip.name as string, BsChip);
    app.component(BsChipGroup.name as string, BsChipGroup);
  },
};

export { BsChip, BsChipGroup, BsChipPlugin };
