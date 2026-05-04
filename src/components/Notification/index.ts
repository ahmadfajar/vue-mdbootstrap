import {
  type INotificationProvider,
  NotificationProvider,
} from '@/components/Notification/mixins/NotificationProvider.ts';
import registerConfig from '@/mixins/RegisterConfig.ts';
import type { TVueMdb } from '@/types';
import type { App, ObjectPlugin } from 'vue';
import BsNotification from './BsNotification.ts';

const BsNotificationPlugin: ObjectPlugin = {
  install: (app: App): void => {
    registerConfig(app);
    const notification: INotificationProvider = new NotificationProvider();
    (app.config.globalProperties.$VueMdb as TVueMdb).notification = notification;
    app.config.globalProperties.$notification = notification;
    app.component('BsNotification', BsNotification);
  },
};

export * from '@/components/Notification/mixins/NotificationProvider.ts';
export type * from '@/components/Notification/types';
export { BsNotification, BsNotificationPlugin };
