import type { App, Plugin } from 'vue';
import registerConfig from '../../mixins/registerConfig';
import BsNotification from './BsNotification';
import NotificationProvider from './mixins/NotificationProvider';
import './notification.scss';

const BsNotificationPlugin: Plugin = {
    install: (app: App): void => {
        registerConfig(app);
        app.config.globalProperties.$VueMdb.notification = new NotificationProvider();
        app.config.globalProperties.$notification =
            app.config.globalProperties.$VueMdb.notification;
        app.component(BsNotification.name as string, BsNotification);
    },
};

export { BsNotificationPlugin, BsNotification };
