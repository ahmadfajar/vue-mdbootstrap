import {App, Plugin as Plugin_2} from "vue";
import BsAlert from "./BsAlert";
import "./alert.scss";

const BsAlertPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsAlert.name, BsAlert);
    }
}

export {BsAlertPlugin, BsAlert}
