import type {App, Plugin as Plugin_2} from "vue";
import BsListbox from "./BsListbox";

const BsListboxPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsListbox.name, BsListbox);
    }
}

export {BsListboxPlugin, BsListbox}
