import {App} from "vue";
import BsTextField from "./BsTextField";
import BsTextArea from "./BsTextArea";
import "../../../scss/_globalvars.scss";
import "./field.scss";

const BsFieldPlugin = {
    install: (app: App): void => {
        app.component(BsTextField.name, BsTextField);
        app.component(BsTextArea.name, BsTextArea);
    }
}

export {BsFieldPlugin, BsTextField, BsTextArea}
