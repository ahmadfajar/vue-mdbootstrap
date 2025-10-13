import type { TVueMdb } from '@/types';
import type { App, ObjectPlugin } from 'vue';
import registerConfig from '../../mixins/registerConfig.ts';
import BsNotification from './BsNotification.ts';
import NotificationProvider from './mixins/NotificationProvider.ts';

const BsNotificationPlugin: ObjectPlugin = {
  install: (app: App): void => {
    registerConfig(app);
    (app.config.globalProperties.$VueMdb as TVueMdb).notification = new NotificationProvider();
    app.config.globalProperties.$notification = (
      app.config.globalProperties.$VueMdb as TVueMdb
    ).notification;
    app.component(BsNotification.name as string, BsNotification);
  },
};

export { BsNotification, BsNotificationPlugin };
