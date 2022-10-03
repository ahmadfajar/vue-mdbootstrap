import {App} from "vue";
import registerApplication from "../../mixins/registerApplication";
import BsAppbar from "./BsAppbar";
import BsAppbarItems from "./BsAppbarItems";
import BsAppbarTitle from "./BsAppbarTitle";
import "./appbar.scss";
import "../../../scss/_others.scss";

const BsAppbarPlugin = {
    install: (app: App): void => {
        registerApplication(app);
        app.component(BsAppbar.name, BsAppbar);
        app.component(BsAppbarItems.name, BsAppbarItems);
        app.component(BsAppbarTitle.name, BsAppbarTitle);
    }
}

export {BsAppbarPlugin, BsAppbar, BsAppbarItems, BsAppbarTitle}
