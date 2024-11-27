import { useRenderNotificationItem } from '@/components/Notification/mixins/notificationApi.ts';
import type {
    INotificationProvider,
    TBsNotificationItem,
    TNotificationItemOptionProps,
    TNotificationOption,
} from '@/components/Notification/types';
import { useVueMdbNotification } from '@/mixins/CommonApi.ts';
import Helper from '@/utils/Helper';
import type { Prop } from 'vue';
import { defineComponent, onMounted, ref, shallowRef } from 'vue';

export default defineComponent<TBsNotificationItem>({
    name: 'BsNotificationItem',
    props: {
        options: {
            type: Object,
            default: undefined,
        } as Prop<TNotificationOption>,
    },
    setup(props) {
        const thisProps = props as Readonly<TNotificationItemOptionProps>;
        const provider = shallowRef<INotificationProvider>();
        const timerId = ref<number>();

        onMounted(() => {
            provider.value = useVueMdbNotification();
            timerId.value = Helper.defer(() => {
                provider.value?.remove(<TNotificationOption>thisProps.options);
            }, thisProps.options?.timeout as number);
        });

        return () => useRenderNotificationItem(thisProps, provider, timerId);
    },
});
