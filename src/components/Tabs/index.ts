import type {App, Plugin as Plugin_2} from "vue";
import BsTabs from "./BsTabs";
import BsTab from "./BsTab";
import "../../../scss/_globalvars.scss";
import "../../../scss/_transitions.scss";
import "./tabView.scss";

const BsTabsPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsTab.name, BsTab);
        app.component(BsTabs.name, BsTabs);
    }
}

export {BsTabsPlugin, BsTab, BsTabs}
