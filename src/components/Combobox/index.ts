import type {App, Plugin} from "vue";
import BsCombobox from "./BsCombobox";
import "../../../scss/_globalvars.scss";
import "../../../scss/_transitions.scss";
import "../../../scss/_utilities.scss";
import "../Field/field.scss";
import "./combobox.scss";

const BsComboboxPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsCombobox.name, BsCombobox);
    }
}

export {BsComboboxPlugin, BsCombobox}
