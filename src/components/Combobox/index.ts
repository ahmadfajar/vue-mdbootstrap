import type {App, Plugin as Plugin_2} from "vue";
import BsCombobox from "./BsCombobox";
import "../../../scss/_globalvars.scss";
import "../../../scss/_transitions.scss";
import "../../../scss/_utilities.scss";
import "../Field/field.scss";
import "./combobox.scss";

const BsComboboxPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsCombobox.name, BsCombobox);
    }
}

export {BsComboboxPlugin, BsCombobox}
