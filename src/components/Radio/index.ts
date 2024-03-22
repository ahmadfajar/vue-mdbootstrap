import type {App, Plugin} from "vue";
import BsRadio from "./BsRadio";
import BsRadioGroup from "./BsRadioGroup";
import "../../../scss/_globalvars.scss";
import "../Field/field.scss";
import "./radio.scss";

const BsRadioPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsRadio.name, BsRadio);
        app.component(<string>BsRadioGroup.name, BsRadioGroup);
    }
}

export {BsRadioPlugin, BsRadio, BsRadioGroup}
