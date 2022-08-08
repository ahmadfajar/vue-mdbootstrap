import {App} from "vue";
import BsBadge from "./BsBadge";
import "./badge.scss";

const BsBadgePlugin = {
    install: (app: App): void => {
        app.component(BsBadge.name, BsBadge);
    }
}

export {BsBadgePlugin, BsBadge};
