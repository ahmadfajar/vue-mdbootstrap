import {App} from "vue";
import BsDivider from "./BsDivider";
import BsImageHolder from "./BsImageHolder";
import BsSpacer from "./BsSpacer";
import BsSubheader from "./BsSubheader";
import "./basic.scss";

const BsBasicCmpPlugin = {
    install: (app: App): void => {
        app.component(BsDivider.name, BsDivider);
        app.component(BsImageHolder.name, BsImageHolder);
        app.component(BsSpacer.name, BsSpacer);
        app.component(BsSubheader.name, BsSubheader);
    }
};

export {BsBasicCmpPlugin, BsDivider, BsImageHolder, BsSpacer, BsSubheader}
