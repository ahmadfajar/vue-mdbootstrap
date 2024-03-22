import type {App, Plugin} from "vue";
import BsIcon from "./BsIcon";
import BsIconSvg from "./BsIconSvg";
import BsIconSpinner from "./BsIconSpinner";
import BsToggleIcon from "./BsToggleIcon";
import "../Progress/progress.scss";
import "./icon.scss";

const BsIconPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsIcon.name, BsIcon);
        app.component(<string>BsIconSvg.name, BsIconSvg);
        app.component(<string>BsIconSpinner.name, BsIconSpinner);
        app.component(<string>BsToggleIcon.name, BsToggleIcon);
        // Backward compatibility
        app.component("BsIconToggle", BsToggleIcon);
    },
}

export {BsIconPlugin, BsIcon, BsIconSvg, BsIconSpinner, BsToggleIcon}
