import {App} from "vue";
import BsChip from "./BsChip";
import "./chip.scss";
import "../../../scss/_others.scss";

const BsChipPlugin = {
    install: (app: App): void => {
        app.component(BsChip.name, BsChip);
    }
}

export {BsChipPlugin, BsChip}
