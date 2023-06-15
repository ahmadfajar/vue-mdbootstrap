import type {App, Plugin as Plugin_2} from "vue";
import registerConfig from "../../mixins/registerConfig";
import BsNotification from "./BsNotification";
import NotificationProvider from "./mixins/NotificationProvider";
import "./notification.scss";

const BsNotificationPlugin: Plugin_2 = {
    install: (app: App): void => {
        registerConfig(app);
        app.config.globalProperties.$VueMdb.notification = new NotificationProvider();
        app.config.globalProperties.$notification = app.config.globalProperties.$VueMdb.notification;
        app.component(BsNotification.name, BsNotification);
        // const Notification = defineCustomElement(BsNotification);
        // customElements.define("bs-notification", Notification);
        // document.body.appendChild(new Notification());
    }
}

export {BsNotificationPlugin, BsNotification}
