import type {App, Plugin} from "vue";
import BsExpandTransition from "./BsExpandTransition";
import BsOverlay from "./BsOverlay";
import BsRipple from "./BsRipple";
import "../../../scss/_transitions.scss";
import "./animation.scss";

const BsAnimationPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsExpandTransition.name, BsExpandTransition);
        app.component(<string>BsOverlay.name, BsOverlay);
        app.component(<string>BsRipple.name, BsRipple);
    }
}

export {BsAnimationPlugin, BsExpandTransition, BsOverlay, BsRipple}
