import {App} from "vue";
import BsChip from "./BsChip";
import BsChipGroup from "./BsChipGroup";
import "./chip.scss";
import "./chipGroup.scss";
import "../../../scss/_others.scss";

const BsChipPlugin = {
    install: (app: App): void => {
        app.component(BsChip.name, BsChip);
        app.component(BsChipGroup.name, BsChipGroup);
    }
}

export {BsChipPlugin, BsChip, BsChipGroup}
