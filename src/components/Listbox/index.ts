import type {App, Plugin} from "vue";
import BsListbox from "./BsListbox";
import "./listbox.scss";

const BsListboxPlugin: Plugin = {
    install: (app: App): void => {
        app.component(BsListbox.name, BsListbox);
    }
}

export {BsListboxPlugin, BsListbox}
