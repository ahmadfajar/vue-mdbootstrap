import {App} from "vue";
import BsTextField from "./BsTextField";
import "../../../scss/_globalvars.scss";
import "./field.scss";

const BsFieldPlugin = {
    install: (app: App): void => {
        app.component(BsTextField.name, BsTextField);
    }
}

export {BsFieldPlugin, BsTextField}
