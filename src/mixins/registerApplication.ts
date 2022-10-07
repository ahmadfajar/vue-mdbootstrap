import {App} from "vue";

export default function registerApplication(app: App) {
    app.config.globalProperties.$VueMdb = {
        app: {},
        notification: {}
    };
}
