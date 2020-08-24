import BsOverlay from "./BsOverlay";
import BsProgress from "./BsProgress";
import BsMaskLoader from "./BsMaskLoader";
import BsRipple from "./BsRipple";
import BsExpandTransition from "./BsExpandTransition";

export default Vue => {
    Vue.component(BsOverlay.name, BsOverlay);
    Vue.component(BsProgress.name, BsProgress);
    Vue.component(BsMaskLoader.name, BsMaskLoader);
    Vue.component(BsRipple.name, BsRipple);
    Vue.component(BsExpandTransition.name, BsExpandTransition);
};
