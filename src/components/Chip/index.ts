import type { App, ObjectPlugin } from 'vue';
import BsChip from './BsChip';
import BsChipGroup from './BsChipGroup';

const BsChipPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(<string>BsChip.name, BsChip);
        app.component(<string>BsChipGroup.name, BsChipGroup);
    },
};

export { BsChipPlugin, BsChip, BsChipGroup };
