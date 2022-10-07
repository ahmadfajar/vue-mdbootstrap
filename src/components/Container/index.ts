import {App} from "vue";
import registerApplication from "../../mixins/registerApplication";
import BsAppContainer from "./BsAppContainer";
import BsContainer from "./BsContainer";
import BsContent from "./BsContent";
import "./container.scss"
import "../../../scss/_others.scss";

const BsContainerPlugin = {
    install: (app: App): void => {
        registerApplication(app);
        app.component(BsAppContainer.name, BsAppContainer);
        app.component(BsContainer.name, BsContainer);
        app.component(BsContent.name, BsContent);
    }
}

export {BsContainerPlugin, BsAppContainer, BsContainer, BsContent}