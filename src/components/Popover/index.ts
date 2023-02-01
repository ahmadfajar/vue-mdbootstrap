import type {App, Plugin as Plugin_2} from "vue";
import BsPopover from "./BsPopover";
import "./popover.scss";

const BsPopoverPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsPopover.name, BsPopover);
    }
}

export {BsPopoverPlugin, BsPopover};
