import type {App, Plugin} from "vue";
import BsBadge from "./BsBadge";
import "../../../scss/_utilities.scss";
import "./badge.scss";

const BsBadgePlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsBadge.name, BsBadge);
    }
}

export {BsBadgePlugin, BsBadge};
