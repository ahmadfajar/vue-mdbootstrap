import type { INotificationProvider, TMdbAppObject } from '@/types';
import type { App } from 'vue';

export default function registerConfig(app: App) {
  app.config.globalProperties.$VueMdb = {
    app: {} as Record<string, TMdbAppObject>,
    notification: {} as INotificationProvider,
  };
}
