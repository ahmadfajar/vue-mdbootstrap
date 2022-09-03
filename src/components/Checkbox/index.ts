import {App} from "vue";
import BsCheckbox from "./BsCheckbox";
import BsCheckboxGroup from "./BsCheckboxGroup";
import "./checkbox.scss";

const BsCheckboxPlugin = {
    install: (app: App): void => {
        app.component(BsCheckbox.name, BsCheckbox);
        app.component(BsCheckboxGroup.name, BsCheckboxGroup);
    }
}

export {BsCheckboxPlugin, BsCheckbox, BsCheckboxGroup}
