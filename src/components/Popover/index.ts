import type {App, Plugin} from "vue";
import BsPopover from "./BsPopover";
import "../../../scss/_transitions.scss";
import "../../../scss/_utilities.scss";
import "./popover.scss";

const BsPopoverPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsPopover.name, BsPopover);
    }
}

export {BsPopoverPlugin, BsPopover};
