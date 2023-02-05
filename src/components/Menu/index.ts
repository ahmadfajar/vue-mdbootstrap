import type {App, Plugin as Plugin_2} from "vue";
import BsDropdownMenu from "./BsDropdownMenu";
import "./dropdownMenu.scss";

const BsMenuPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsDropdownMenu.name, BsDropdownMenu);
        // Backward compatibility
        app.component("BsMenu", BsDropdownMenu);
    }
}

export {BsMenuPlugin, BsDropdownMenu}
