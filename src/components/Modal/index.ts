import type {App, Plugin as Plugin_2} from "vue";
import BsModal from "./BsModal";
import BsLightbox from "./BsLightbox";
import "../../../scss/_transitions.scss";
import "../../../scss/_utilities.scss";
import "./modal.scss";
import "./lightbox.scss";

const BsModalPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsModal.name, BsModal);
        app.component(BsLightbox.name, BsLightbox);
    }
}

export {BsModalPlugin, BsModal, BsLightbox}
