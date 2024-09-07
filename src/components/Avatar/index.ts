import type { App, Plugin } from 'vue';
import BsAvatar from './BsAvatar';
import './avatar.scss';

const BsAvatarPlugin: Plugin = {
    install: (app: App): void => {
        app.component(BsAvatar.name as string, BsAvatar);
    },
};

export { BsAvatarPlugin, BsAvatar };
