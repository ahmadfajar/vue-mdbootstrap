import type { App, ObjectPlugin } from 'vue';
import BsChip from './BsChip.ts';
import BsChipGroup from './BsChipGroup.ts';

const BsChipPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(<string>BsChip.name, BsChip);
    app.component(<string>BsChipGroup.name, BsChipGroup);
  },
};

export { BsChip, BsChipGroup, BsChipPlugin };
