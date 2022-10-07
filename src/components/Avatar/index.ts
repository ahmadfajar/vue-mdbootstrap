import {App, Plugin as Plugin_2} from "vue";
import BsAvatar from "./BsAvatar";
import "./avatar.scss";

const BsAvatarPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsAvatar.name, BsAvatar);
    }
}

export {BsAvatarPlugin, BsAvatar}
