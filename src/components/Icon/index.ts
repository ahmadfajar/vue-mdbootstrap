import {App, Plugin as Plugin_2} from "vue";
import BsIcon from "./BsIcon";
import BsIconSvg from "./BsIconSvg";
import BsIconSpinner from "./BsIconSpinner";
import BsToggleIcon from "./BsToggleIcon";
import "../Progress/progress.scss";
import "./icon.scss";

const BsIconPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsIcon.name, BsIcon);
        app.component(BsIconSvg.name, BsIconSvg);
        app.component(BsIconSpinner.name, BsIconSpinner);
        app.component(BsToggleIcon.name, BsToggleIcon);
        // Backward compatibility
        app.component("BsIconToggle", BsToggleIcon);
    },
}

export {BsIconPlugin, BsIcon, BsIconSvg, BsIconSpinner, BsToggleIcon}
