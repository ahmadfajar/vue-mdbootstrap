import {App} from "vue";
import BsCheckbox from "./BsCheckbox";
import "./checkbox.scss";

const BsCheckboxPlugin = {
    install: (app: App): void => {
        app.component(BsCheckbox.name, BsCheckbox);
    }
}

export {BsCheckboxPlugin, BsCheckbox}
