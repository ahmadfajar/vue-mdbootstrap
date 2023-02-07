import type {App, Plugin as Plugin_2} from "vue";
import BsSwitch from "./BsSwitch";
import "../../../scss/_globalvars.scss";
import "./switch.scss";

const BsSwitchPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsSwitch.name, BsSwitch);
    }
}

export {BsSwitchPlugin, BsSwitch}
