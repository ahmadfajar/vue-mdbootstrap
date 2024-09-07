import type { App, Plugin } from 'vue';
import BsTooltip from './BsTooltip';
import './tooltip.scss';

const BsTooltipPlugin: Plugin = {
    install: (app: App): void => {
        app.component(BsTooltip.name as string, BsTooltip);
    },
};

export { BsTooltipPlugin, BsTooltip };
