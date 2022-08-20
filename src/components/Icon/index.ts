import {App} from "vue";
import BsIcon from "./BsIcon";
import BsIconSvg from "./BsIconSvg";
import BsIconSpinner from "./BsIconSpinner";
import BsIconToggle from "./BsIconToggle";
import "../Progress/progress.scss";
import "./icon.scss";

const BsIconPlugin = {
    install: (app: App): void => {
        app.component(BsIcon.name, BsIcon);
        app.component(BsIconSvg.name, BsIconSvg);
        app.component(BsIconSpinner.name, BsIconSpinner);
        app.component(BsIconToggle.name, BsIconToggle);
    },
}

export {BsIconPlugin, BsIcon, BsIconSvg, BsIconSpinner, BsIconToggle}
