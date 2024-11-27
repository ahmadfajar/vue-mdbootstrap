import { useRenderNotificationContainer } from '@/components/Notification/mixins/notificationApi.ts';
import type { INotificationProvider } from '@/components/Notification/types';
import { useVueMdbNotification } from '@/mixins/CommonApi.ts';
import { defineComponent, onMounted, shallowRef } from 'vue';

export default defineComponent({
    name: 'BsNotification',
    setup() {
        const provider = shallowRef<INotificationProvider>();

        onMounted(() => {
            provider.value = useVueMdbNotification();
        });

        return () => useRenderNotificationContainer(provider);
    },
});
