import {App} from "vue";
import BsAlert from "./BsAlert";
import "./alert.scss";

const BsAlertPlugin = {
    install: (app: App): void => {
        app.component(BsAlert.name, BsAlert);
    }
}

export {BsAlertPlugin, BsAlert}
