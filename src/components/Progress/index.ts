import type {App, Plugin} from "vue";
import BsMaskLoader from "./BsMaskLoader";
import BsProgress from "./BsProgress";
import BsProgressBar from "./BsProgressBar";
import "./progress.scss";
import "../../../scss/_utilities.scss";

const BsProgressPlugin: Plugin = {
    install: (app: App): void => {
        app.component(BsMaskLoader.name, BsMaskLoader);
        app.component(BsProgress.name, BsProgress);
        app.component(BsProgressBar.name, BsProgressBar);
    }
}

export {BsProgressPlugin, BsMaskLoader, BsProgress, BsProgressBar}
