import type {App, Plugin as Plugin_2} from "vue";
import BsTooltip from "./BsTooltip";
import "./tooltip.scss";

const BsTooltipPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsTooltip.name, BsTooltip);
    }
}

export {BsTooltipPlugin, BsTooltip}
