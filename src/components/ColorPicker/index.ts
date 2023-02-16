import type {App, Plugin as Plugin_2} from "vue";
import BsColorPicker from "./BsColorPicker";
import "../../../scss/_utilities.scss";
import "./colorPicker.scss";

const BsColorPickerPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsColorPicker.name, BsColorPicker);
    }
};

export {BsColorPickerPlugin, BsColorPicker}
