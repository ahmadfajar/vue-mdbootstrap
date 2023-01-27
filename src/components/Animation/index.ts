import type {App, Plugin as Plugin_2} from "vue";
import BsExpandTransition from "./BsExpandTransition";
import BsOverlay from "./BsOverlay";
import BsRipple from "./BsRipple";
import "../../../scss/_transitions.scss";
import "./animation.scss";

const BsAnimationPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsExpandTransition.name, BsExpandTransition);
        app.component(BsOverlay.name, BsOverlay);
        app.component(BsRipple.name, BsRipple);
    }
}

export {BsAnimationPlugin, BsExpandTransition, BsOverlay, BsRipple}
