import {App} from "vue";

export default function (app: App) {
    app.config.globalProperties.$VueMdb = {
        app: {},
        notification: {}
    };
}
