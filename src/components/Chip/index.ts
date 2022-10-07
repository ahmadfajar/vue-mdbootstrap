import {App, Plugin as Plugin_2} from "vue";
import BsChip from "./BsChip";
import BsChipGroup from "./BsChipGroup";
import "./chip.scss";
import "./chipGroup.scss";
import "../../../scss/_others.scss";

const BsChipPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsChip.name, BsChip);
        app.component(BsChipGroup.name, BsChipGroup);
    }
}

export {BsChipPlugin, BsChip, BsChipGroup}
