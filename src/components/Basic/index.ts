import type {App, Plugin} from "vue";
import BsDivider from "./BsDivider";
import BsImageHolder from "./BsImageHolder";
import BsSpacer from "./BsSpacer";
import BsSubheader from "./BsSubheader";
import "./basic.scss";

const BsBasicCmpPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsDivider.name, BsDivider);
        app.component(<string>BsImageHolder.name, BsImageHolder);
        app.component(<string>BsSpacer.name, BsSpacer);
        app.component(<string>BsSubheader.name, BsSubheader);
    }
};

export {BsBasicCmpPlugin, BsDivider, BsImageHolder, BsSpacer, BsSubheader}
