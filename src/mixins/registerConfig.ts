import type {App} from "vue";

export default function registerConfig(app: App) {
    app.config.globalProperties.$VueMdb = {
        app: {},
        notification: {}
    };
}
