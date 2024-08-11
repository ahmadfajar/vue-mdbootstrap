import type {App, Plugin} from "vue";
import BsDivider from "./BsDivider";
import BsImageHolder from "./BsImageHolder";
import BsSpacer from "./BsSpacer";
import BsSubheader from "./BsSubheader";
import "./basic.scss";

const BsBasicCmpPlugin: Plugin = {
    install: (app: App): void => {
        app.component(BsDivider.name as string, BsDivider);
        app.component(BsImageHolder.name as string, BsImageHolder);
        app.component(BsSpacer.name as string, BsSpacer);
        app.component(BsSubheader.name as string, BsSubheader);
    }
};

export {BsBasicCmpPlugin, BsDivider, BsImageHolder, BsSpacer, BsSubheader}
