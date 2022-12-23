import {App, Plugin as Plugin_2} from "vue";
import registerConfig from "../../mixins/registerConfig";
import BsAppContainer from "./BsAppContainer";
import BsContainer from "./BsContainer";
import BsContent from "./BsContent";
import "./container.scss"
import "../../../scss/utilities/_others.scss";

const BsContainerPlugin: Plugin_2 = {
    install: (app: App): void => {
        registerConfig(app);
        app.component(BsAppContainer.name, BsAppContainer);
        app.component(BsContainer.name, BsContainer);
        app.component(BsContent.name, BsContent);
    }
}

export {BsContainerPlugin, BsAppContainer, BsContainer, BsContent}
