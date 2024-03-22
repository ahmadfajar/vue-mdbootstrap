import type {App, Plugin} from "vue";
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

const BsFieldPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsTextField.name, BsTextField);
        app.component(<string>BsTextArea.name, BsTextArea);
        app.component(<string>BsChipField.name, BsChipField);
        app.component(<string>BsNumericField.name, BsNumericField);
        app.component(<string>BsSearchField.name, BsSearchField);
    }
}

export {BsFieldPlugin, BsTextField, BsTextArea, BsChipField, BsNumericField, BsSearchField}
