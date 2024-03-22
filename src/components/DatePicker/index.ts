import type {App, Plugin} from "vue";
import BsDatePicker from "./BsDatePicker";
import BsDateTimeField from "./BsDateTimeField";
import "../../../scss/_globalvars.scss";
import "../../../scss/_transitions.scss";
import "../../../scss/_utilities.scss";
import "../Field/field.scss";
import "./datePicker.scss";

const BsDatePickerPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsDatePicker.name, BsDatePicker);
        app.component(<string>BsDateTimeField.name, BsDateTimeField);
    }
}

export {BsDatePickerPlugin, BsDatePicker, BsDateTimeField}
