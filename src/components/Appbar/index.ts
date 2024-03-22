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
        app.component(<string>BsAppbar.name, BsAppbar);
        app.component(<string>BsAppbarItems.name, BsAppbarItems);
        app.component(<string>BsAppbarTitle.name, BsAppbarTitle);
    }
}

export {BsAppbarPlugin, BsAppbar, BsAppbarItems, BsAppbarTitle}
