import {App} from "vue";
import BsRadio from "./BsRadio";
import BsRadioGroup from "./BsRadioGroup";
import "./radio.scss";

const BsRadioPlugin = {
    install: (app: App): void => {
        app.component(BsRadio.name, BsRadio);
        app.component(BsRadioGroup.name, BsRadioGroup);
    }
}

export {BsRadioPlugin, BsRadio, BsRadioGroup}
