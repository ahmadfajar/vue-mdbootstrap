import type {App, Plugin} from "vue";
import BsColorPicker from "./BsColorPicker";
import "../../../scss/_transitions.scss";
import "../../../scss/_utilities.scss";
import "./colorPicker.scss";

const BsColorPickerPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsColorPicker.name, BsColorPicker);
    }
};

export {BsColorPickerPlugin, BsColorPicker}
