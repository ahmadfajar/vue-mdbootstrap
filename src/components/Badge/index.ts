import type { App, ObjectPlugin } from 'vue';
import BsBadge from './BsBadge';

const BsBadgePlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsBadge.name as string, BsBadge);
  },
};

export { BsBadge, BsBadgePlugin };
