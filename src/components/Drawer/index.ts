import type {App, Plugin as Plugin_2} from "vue";
import registerConfig from "../../mixins/registerConfig";
import BsSideDrawer from "./BsSideDrawer";
import "../../../scss/_transitions.scss";
import "../../../scss/_utilities.scss";
import "./sidedrawer.scss";

const BsDrawerPlugin: Plugin_2 = {
    install: (app: App): void => {
        registerConfig(app);
        app.component(BsSideDrawer.name, BsSideDrawer);
    }
}

export {BsDrawerPlugin, BsSideDrawer}
