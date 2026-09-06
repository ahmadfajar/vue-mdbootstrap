import type { App, ObjectPlugin } from 'vue';
import BsBadge from './BsBadge';

const BsBadgePlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsBadge', BsBadge);
  },
};

export { BsBadge, BsBadgePlugin };
