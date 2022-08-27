import {App} from "vue";
import BsChip from "./BsChip";

const BsChipPlugin = {
    install: (app: App): void => {
        app.component(BsChip.name, BsChip);
    }
}

export {BsChipPlugin, BsChip}
