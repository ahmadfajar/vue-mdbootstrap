import {App, Plugin as Plugin_2} from "vue";
import registerConfig from "../../mixins/registerConfig";
import BsAppbar from "./BsAppbar";
import BsAppbarItems from "./BsAppbarItems";
import BsAppbarTitle from "./BsAppbarTitle";
import "./appbar.scss";
import "../../../scss/_others.scss";

const BsAppbarPlugin: Plugin_2 = {
    install: (app: App): void => {
        registerConfig(app);
        app.component(BsAppbar.name, BsAppbar);
        app.component(BsAppbarItems.name, BsAppbarItems);
        app.component(BsAppbarTitle.name, BsAppbarTitle);
    }
}

export {BsAppbarPlugin, BsAppbar, BsAppbarItems, BsAppbarTitle}
