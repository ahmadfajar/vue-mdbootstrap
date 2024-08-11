import type {App, Plugin} from "vue";
import registerConfig from "../../mixins/registerConfig";
import BsAppbar from "./BsAppbar";
import BsAppbarItems from "./BsAppbarItems";
import BsAppbarTitle from "./BsAppbarTitle";
import "./appbar.scss";
import "../../../scss/_utilities.scss";

const BsAppbarPlugin: Plugin = {
    install: (app: App): void => {
        registerConfig(app);
        app.component(BsAppbar.name as string, BsAppbar);
        app.component(BsAppbarItems.name as string, BsAppbarItems);
        app.component(BsAppbarTitle.name as string, BsAppbarTitle);
    }
}

export {BsAppbarPlugin, BsAppbar, BsAppbarItems, BsAppbarTitle}
