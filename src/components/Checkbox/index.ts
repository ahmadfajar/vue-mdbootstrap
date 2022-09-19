import {App} from "vue";
import BsCheckbox from "./BsCheckbox";
import BsCheckboxGroup from "./BsCheckboxGroup";
import "../../../scss/_globalvars.scss";
import "../Field/field.scss";
import "./checkbox.scss";

const BsCheckboxPlugin = {
    install: (app: App): void => {
        app.component(BsCheckbox.name, BsCheckbox);
        app.component(BsCheckboxGroup.name, BsCheckboxGroup);
    }
}

export {BsCheckboxPlugin, BsCheckbox, BsCheckboxGroup}
