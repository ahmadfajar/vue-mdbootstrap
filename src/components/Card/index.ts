import {App} from "vue";
import BsCard from "./BsCard";
import BsCardBody from "./BsCardBody";
import BsCardContent from "./BsCardContent";
import BsCardFooter from "./BsCardFooter";
import BsCardHeader from "./BsCardHeader";
import BsCardMedia from "./BsCardMedia";
import "./card.scss";
import "../../../scss/_others.scss";

const BsCardPlugin = {
    install: (app: App): void => {
        app.component(BsCard.name, BsCard);
        app.component(BsCardBody.name, BsCardBody);
        app.component(BsCardContent.name, BsCardContent);
        app.component(BsCardFooter.name, BsCardFooter);
        app.component(BsCardHeader.name, BsCardHeader);
        app.component(BsCardMedia.name, BsCardMedia);
    },
}

export {
    BsCardPlugin, BsCard, BsCardBody, BsCardContent,
    BsCardFooter, BsCardHeader, BsCardMedia,
}
