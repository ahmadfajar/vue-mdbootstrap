import type { App } from 'vue';
import type { INotificationProvider, TMdbAppObject } from '../types';

export default function registerConfig(app: App) {
    app.config.globalProperties.$VueMdb = {
        app: {} as Record<string, TMdbAppObject>,
        notification: {} as INotificationProvider,
    };
}
