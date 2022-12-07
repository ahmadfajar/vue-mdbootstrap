import type {App, Plugin as Plugin_2} from "vue";
import BsAlert from "./BsAlert";
import "../../../scss/_transitions.scss";
import "./alert.scss";

const BsAlertPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsAlert.name, BsAlert);
    }
}

export {BsAlertPlugin, BsAlert}
