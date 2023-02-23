import type {App, Plugin as Plugin_2} from "vue";
import BsButton from "./BsButton";
import BsToggleButton from "./BsToggleButton";
import BsToggleField from "./BsToggleField";
import "../../../scss/_globalvars.scss";
import "../Field/field.scss";
import "./button.scss";

const BsButtonPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsButton.name, BsButton);
        app.component(BsToggleButton.name, BsToggleButton);
        app.component(BsToggleField.name, BsToggleField);
        // Backward compatibility
        app.component("BsButtonToggle", BsToggleButton);
        app.component("BsButtonToggleField", BsToggleField);
    }
}

export {BsButtonPlugin, BsButton, BsToggleButton}
