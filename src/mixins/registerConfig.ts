import type {App} from "vue";

export default function registerConfig(app: App) {
    app.config.globalProperties.$VueMdb = {
        app: {},
        notification: {}
    };
    // app.config.globalProperties.$notification = app.config.globalProperties.$VueMdb.notification;

    // Object.defineProperty(app.config.globalProperties, "$VueMdb", {
    //     enumerable: true,
    // });
}
