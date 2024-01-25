import type {App, Plugin} from "vue";
import BsAlert from "./BsAlert";
import "../../../scss/_transitions.scss";
import "./alert.scss";

const BsAlertPlugin: Plugin = {
    install: (app: App): void => {
        app.component(BsAlert.name, BsAlert);
    }
}

export {BsAlertPlugin, BsAlert}
