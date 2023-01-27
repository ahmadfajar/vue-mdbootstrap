import type {App, Plugin as Plugin_2} from "vue";
import registerConfig from "../../mixins/registerConfig";
import BsSideDrawer from "./BsSideDrawer";
import "./sidedrawer.scss";
import "../../../scss/utilities/_others.scss";

const BsDrawerPlugin: Plugin_2 = {
    install: (app: App): void => {
        registerConfig(app);
        app.component(BsSideDrawer.name, BsSideDrawer);
    }
}

export {BsDrawerPlugin, BsSideDrawer}
