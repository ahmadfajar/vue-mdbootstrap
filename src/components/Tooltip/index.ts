import type {App, Plugin} from "vue";
import BsTooltip from "./BsTooltip";
import "./tooltip.scss";

const BsTooltipPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsTooltip.name, BsTooltip);
    }
}

export {BsTooltipPlugin, BsTooltip}
