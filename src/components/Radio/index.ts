import {App, Plugin as Plugin_2} from "vue";
import BsRadio from "./BsRadio";
import BsRadioGroup from "./BsRadioGroup";
import "../../../scss/_globalvars.scss";
import "../Field/field.scss";
import "./radio.scss";

const BsRadioPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsRadio.name, BsRadio);
        app.component(BsRadioGroup.name, BsRadioGroup);
    }
}

export {BsRadioPlugin, BsRadio, BsRadioGroup}
