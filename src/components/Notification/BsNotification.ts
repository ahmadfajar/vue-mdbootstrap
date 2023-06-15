import {defineComponent, onMounted, shallowRef} from "vue";
import {useVueMdbNotification} from "../../mixins/CommonApi";
import {useRenderNotificationContainer} from "./mixins/notificationApi";
import type {INotificationProvider} from "./types";

export default defineComponent({
    name: "BsNotification",
    setup() {
        const provider = shallowRef<INotificationProvider>();

        onMounted(
            () => {
                provider.value = useVueMdbNotification();
            }
        );

        return () => useRenderNotificationContainer(provider);
    }
});
