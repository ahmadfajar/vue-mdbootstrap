import type { App, ObjectPlugin } from 'vue';
import BsAvatar from './BsAvatar.ts';

const BsAvatarPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsAvatar', BsAvatar);
  },
};

export type * from '@/components/Avatar/types';
export { BsAvatar, BsAvatarPlugin };
