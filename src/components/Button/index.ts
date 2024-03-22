import type {App, Plugin} from "vue";
import BsButton from "./BsButton";
import BsToggleButton from "./BsToggleButton";
import BsToggleField from "./BsToggleField";
import "../../../scss/_globalvars.scss";
import "../Field/field.scss";
import "./button.scss";

const BsButtonPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsButton.name, BsButton);
        app.component(<string>BsToggleButton.name, BsToggleButton);
        app.component(<string>BsToggleField.name, BsToggleField);
        // Backward compatibility
        app.component("BsButtonToggle", BsToggleButton);
        app.component("BsButtonToggleField", BsToggleField);
    }
}

export {BsButtonPlugin, BsButton, BsToggleButton}
