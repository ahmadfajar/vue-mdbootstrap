import type { App, ObjectPlugin } from 'vue';
import BsAvatar from './BsAvatar.ts';

const BsAvatarPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsAvatar.name as string, BsAvatar);
  },
};

export { BsAvatar, BsAvatarPlugin };
