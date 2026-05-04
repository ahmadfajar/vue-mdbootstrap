import type { INotificationProvider } from '@/components/Notification/mixins/NotificationProvider.ts';
import type { TVueMdbProps } from '@/types';
import type { App } from 'vue';

export default function registerConfig(app: App) {
  app.config.globalProperties.$VueMdb = {
    app: {} as Record<string, TVueMdbProps>,
    notification: {} as INotificationProvider,
  };
}
