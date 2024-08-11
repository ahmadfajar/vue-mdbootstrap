import type {App, Plugin} from "vue";
import BsButton from "./BsButton";
import BsToggleButton from "./BsToggleButton";
import BsToggleField from "./BsToggleField";
import "../../../scss/_globalvars.scss";
import "../Field/field.scss";
import "./button.scss";

const BsButtonPlugin: Plugin = {
    install: (app: App): void => {
        app.component(BsButton.name as string, BsButton);
        app.component(BsToggleButton.name as string, BsToggleButton);
        app.component(BsToggleField.name as string, BsToggleField);
        // Backward compatibility
        app.component("BsButtonToggle", BsToggleButton);
        app.component("BsButtonToggleField", BsToggleField);
    }
}

export {BsButtonPlugin, BsButton, BsToggleButton}
