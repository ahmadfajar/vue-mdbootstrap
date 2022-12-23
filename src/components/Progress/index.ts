import {App, Plugin as Plugin_2} from "vue";
import BsMaskLoader from "./BsMaskLoader";
import BsProgress from "./BsProgress";
import BsProgressBar from "./BsProgressBar";
import "./progress.scss";
import "../../../scss/utilities/_others.scss";

const BsProgressPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsMaskLoader.name, BsMaskLoader);
        app.component(BsProgress.name, BsProgress);
        app.component(BsProgressBar.name, BsProgressBar);
    }
}

export {BsProgressPlugin, BsMaskLoader, BsProgress, BsProgressBar}
