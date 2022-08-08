import {App} from "vue";
import BsAvatar from "./BsAvatar";
import "./avatar.scss";

const BsAvatarPlugin = {
    install: (app: App): void => {
        app.component(BsAvatar.name, BsAvatar);
    }
}

export {BsAvatarPlugin, BsAvatar}
