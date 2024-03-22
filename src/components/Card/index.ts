import type {App, Plugin} from "vue";
import BsCard from "./BsCard";
import BsCardBody from "./BsCardBody";
import BsCardContent from "./BsCardContent";
import BsCardFooter from "./BsCardFooter";
import BsCardHeader from "./BsCardHeader";
import BsCardMedia from "./BsCardMedia";
import "./card.scss";
import "../../../scss/_utilities.scss";

const BsCardPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsCard.name, BsCard);
        app.component(<string>BsCardBody.name, BsCardBody);
        app.component(<string>BsCardContent.name, BsCardContent);
        app.component(<string>BsCardFooter.name, BsCardFooter);
        app.component(<string>BsCardHeader.name, BsCardHeader);
        app.component(<string>BsCardMedia.name, BsCardMedia);
    },
}

export {
    BsCardPlugin, BsCard, BsCardBody, BsCardContent,
    BsCardFooter, BsCardHeader, BsCardMedia,
}
