import type { App, ObjectPlugin } from 'vue';
import BsTooltip from './BsTooltip';
import './tooltip.scss';

const BsTooltipPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsTooltip.name as string, BsTooltip);
    },
};

export { BsTooltipPlugin, BsTooltip };
