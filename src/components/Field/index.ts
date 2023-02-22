import type {App, Plugin as Plugin_2} from "vue";
import BsTextField from "./BsTextField";
import BsTextArea from "./BsTextArea";
import BsChipField from "./BsChipField";
import "../../../scss/_globalvars.scss";
import "../../../scss/_transitions.scss";
import "./field.scss";
import "./chipField.scss";

const BsFieldPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsTextField.name, BsTextField);
        app.component(BsTextArea.name, BsTextArea);
        app.component(BsChipField.name, BsChipField);
    }
}

export {BsFieldPlugin, BsTextField, BsTextArea, BsChipField}
