import type {App, Plugin as Plugin_2} from "vue";
import BsBadge from "./BsBadge";
import "./badge.scss";
import "../../../scss/utilities/_others.scss";

const BsBadgePlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsBadge.name, BsBadge);
    }
}

export {BsBadgePlugin, BsBadge};
