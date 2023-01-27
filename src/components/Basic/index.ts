import type {App, Plugin as Plugin_2} from "vue";
import BsDivider from "./BsDivider";
import BsImageHolder from "./BsImageHolder";
import BsSpacer from "./BsSpacer";
import BsSubheader from "./BsSubheader";
import "./basic.scss";

const BsBasicCmpPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsDivider.name, BsDivider);
        app.component(BsImageHolder.name, BsImageHolder);
        app.component(BsSpacer.name, BsSpacer);
        app.component(BsSubheader.name, BsSubheader);
    }
};

export {BsBasicCmpPlugin, BsDivider, BsImageHolder, BsSpacer, BsSubheader}
