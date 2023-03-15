import type {App, Plugin as Plugin_2} from "vue";
import BsTextField from "./BsTextField";
import BsTextArea from "./BsTextArea";
import BsChipField from "./BsChipField";
import BsNumericField from "./BsNumericField";
import BsSearchField from "./BsSearchField";
import "../../../scss/_globalvars.scss";
import "../../../scss/_transitions.scss";
import "../../../scss/_utilities.scss";
import "./field.scss";
import "./chipField.scss";
import "./numericField.scss";
import "./searchField.scss";

const BsFieldPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsTextField.name, BsTextField);
        app.component(BsTextArea.name, BsTextArea);
        app.component(BsChipField.name, BsChipField);
        app.component(BsNumericField.name, BsNumericField);
        app.component(BsSearchField.name, BsSearchField);
    }
}

export {BsFieldPlugin, BsTextField, BsTextArea, BsChipField, BsNumericField, BsSearchField}
