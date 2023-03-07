import type {App, Plugin as Plugin_2} from "vue";
import BsDatePicker from "./BsDatePicker";
import "../../../scss/_globalvars.scss";
import "../../../scss/_transitions.scss";
import "../../../scss/_utilities.scss";
import "./datePicker.scss";

const BsDatePickerPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsDatePicker.name, BsDatePicker);
    }
}

export {BsDatePickerPlugin, BsDatePicker}
