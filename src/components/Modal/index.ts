import type {App, Plugin as Plugin_2} from "vue";
import BsModal from "./BsModal";
import "../../../scss/_transitions.scss";
import "../../../scss/_utilities.scss";
import "./modal.scss";

const BsModalPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsModal.name, BsModal);
    }
}

export {BsModalPlugin, BsModal}
