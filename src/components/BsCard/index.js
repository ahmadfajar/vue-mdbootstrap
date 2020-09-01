import BsCard from "./BsCard";
import BsCardBody from "./BsCardBody";
import BsCardContent from "./BsCardContent";
import BsCardHeader from "./BsCardHeader";
import BsCardFooter from "./BsCardFooter";
import BsCardMedia from "./BsCardMedia";

export default Vue => {
    Vue.component(BsCard.name, BsCard);
    Vue.component(BsCardBody.name, BsCardBody);
    Vue.component(BsCardContent.name, BsCardContent);
    Vue.component(BsCardHeader.name, BsCardHeader);
    Vue.component(BsCardFooter.name, BsCardFooter);
    Vue.component(BsCardMedia.name, BsCardMedia);
};
