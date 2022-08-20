import {App} from "vue";
import BsIcon from "./BsIcon";
import BsIconSvg from "./BsIconSvg";
import BsIconToggle from "./BsIconToggle";
import "../Animation/animation.scss";
import "./icon.scss";

const BsIconPlugin = {
    install: (app: App): void => {
        app.component(BsIcon.name, BsIcon);
        app.component(BsIconSvg.name, BsIconSvg);
        app.component(BsIconToggle.name, BsIconToggle);
    },
}

export {BsIconPlugin, BsIcon, BsIconSvg, BsIconToggle}
