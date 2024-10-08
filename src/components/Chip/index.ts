import type { App, Plugin } from 'vue';
import BsChip from './BsChip';
import BsChipGroup from './BsChipGroup';
import './chip.scss';
import './chipGroup.scss';
import '../../../scss/_utilities.scss';

const BsChipPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsChip.name, BsChip);
        app.component(<string>BsChipGroup.name, BsChipGroup);
    },
};

export { BsChipPlugin, BsChip, BsChipGroup };
