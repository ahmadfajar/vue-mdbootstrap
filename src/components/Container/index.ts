import type {App, Plugin} from "vue";
import registerConfig from "../../mixins/registerConfig";
import BsAppContainer from "./BsAppContainer";
import BsContainer from "./BsContainer";
import BsContent from "./BsContent";
import "./container.scss"
import "../../../scss/_utilities.scss";

const BsContainerPlugin: Plugin = {
    install: (app: App): void => {
        registerConfig(app);
        app.component(BsAppContainer.name, BsAppContainer);
        app.component(BsContainer.name, BsContainer);
        app.component(BsContent.name, BsContent);
    }
}

export {BsContainerPlugin, BsAppContainer, BsContainer, BsContent}
