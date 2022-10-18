import {App, Plugin as Plugin_2} from "vue";
import registerApplication from "../../mixins/registerApplication";
import BsSideDrawer from "./BsSideDrawer";
import "./sidedrawer.scss";
import "../../../scss/_others.scss";

const BsSideDrawerPlugin: Plugin_2 = {
    install: (app: App): void => {
        registerApplication(app);
        app.component(BsSideDrawer.name, BsSideDrawer);
    }
}

export {BsSideDrawerPlugin, BsSideDrawer}
