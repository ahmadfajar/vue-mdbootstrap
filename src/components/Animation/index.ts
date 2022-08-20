import {App} from "vue";
import BsExpandTransition from "./BsExpandTransition";
import BsOverlay from "./BsOverlay";
import BsMaskLoader from "./BsMaskLoader";
import BsProgress from "./BsProgress";
import BsRipple from "./BsRipple";
import "../../../scss/_transitions.scss";
import "./animation.scss";

const BsAnimationPlugin = {
    install: (app: App): void => {
        app.component("BsExpandTransition", BsExpandTransition);
        app.component(BsOverlay.name, BsOverlay);
        app.component(BsMaskLoader.name, BsMaskLoader);
        app.component(BsProgress.name, BsProgress);
        app.component(BsRipple.name, BsRipple);
        // app.component("BsWave", BsWave);
    }
}

export {BsAnimationPlugin, BsExpandTransition, BsOverlay, BsMaskLoader, BsProgress, BsRipple}
