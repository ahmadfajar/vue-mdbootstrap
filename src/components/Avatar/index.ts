import type { App, ObjectPlugin } from 'vue';
import BsAvatar from './BsAvatar';

const BsAvatarPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsAvatar.name as string, BsAvatar);
    },
};

export { BsAvatarPlugin, BsAvatar };
