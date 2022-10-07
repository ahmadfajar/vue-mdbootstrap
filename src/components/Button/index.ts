import {App, Plugin as Plugin_2} from "vue";
import BsButton from "./BsButton";
import BsToggleButton from "./BsToggleButton";
import "./button.scss";

const BsButtonPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsButton.name, BsButton);
        app.component(BsToggleButton.name, BsToggleButton);
        // Backward compatibility
        app.component("BsButtonToggle", BsToggleButton);
    }
}

export {BsButtonPlugin, BsButton, BsToggleButton}
