import BsAlert from "./BsAlert";
import BsAvatar from "./BsAvatar";
import BsBadge from "./BsBadge";
import BsDivider from "./BsDivider";
import BsSpacer from "./BsSpacer";
import BsSubheader from "./BsSubheader";
import BsImageHolder from "./BsImageHolder";
import BsChip from "./BsChip";
import BsChipGroup from "./BsChipGroup";

export default Vue => {
    Vue.component(BsAlert.name, BsAlert);
    Vue.component(BsAvatar.name, BsAvatar);
    Vue.component(BsBadge.name, BsBadge);
    Vue.component(BsDivider.name, BsDivider);
    Vue.component(BsSpacer.name, BsSpacer);
    Vue.component(BsSubheader.name, BsSubheader);
    Vue.component(BsImageHolder.name, BsImageHolder);
    Vue.component(BsChip.name, BsChip);
    Vue.component(BsChipGroup.name, BsChipGroup);
};
