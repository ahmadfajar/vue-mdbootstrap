import {App} from "vue";
import BsButton from "./BsButton";
import BsToggleButton from "./BsToggleButton";

const BsButtonPlugin = {
    install: (app: App): void => {
        app.component(BsButton.name, BsButton);
        app.component(BsToggleButton.name, BsToggleButton);
        // Backward compatibility
        app.component("BsButtonToggle", BsToggleButton);
    }
}

export {BsButtonPlugin, BsButton, BsToggleButton}
