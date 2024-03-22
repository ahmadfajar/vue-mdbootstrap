import type {App, Plugin} from "vue";
import BsModal from "./BsModal";
import BsLightbox from "./BsLightbox";
import "../../../scss/_transitions.scss";
import "../../../scss/_utilities.scss";
import "./modal.scss";
import "./lightbox.scss";

const BsModalPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsModal.name, BsModal);
        app.component(<string>BsLightbox.name, BsLightbox);
    }
}

export {BsModalPlugin, BsModal, BsLightbox}
