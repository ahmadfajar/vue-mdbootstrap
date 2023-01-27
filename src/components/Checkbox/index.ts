import type {App, Plugin as Plugin_2} from "vue";
import BsCheckbox from "./BsCheckbox";
import BsCheckboxGroup from "./BsCheckboxGroup";
import "../../../scss/_globalvars.scss";
import "../Field/field.scss";
import "./checkbox.scss";

const BsCheckboxPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsCheckbox.name, BsCheckbox);
        app.component(BsCheckboxGroup.name, BsCheckboxGroup);
    }
}

export {BsCheckboxPlugin, BsCheckbox, BsCheckboxGroup}
